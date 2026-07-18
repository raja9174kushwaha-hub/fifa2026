'use client';
import { useState, useEffect } from 'react';
import { User, Settings, CreditCard, Ticket, Bell, Shield, LogOut, CheckCircle, XCircle } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('Personal Info');
  const { data: session } = useSession();
  const [profileData, setProfileData] = useState(null);
  
  // OTP States
  const [mobileNumber, setMobileNumber] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [otpStep, setOtpStep] = useState('idle'); // idle, requested, verified
  const [otpTargetType, setOtpTargetType] = useState('mobile'); // 'email' or 'mobile'
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (session?.user) {
      fetch('/api/profile')
        .then(res => res.json())
        .then(data => {
          if (data.user) {
            setProfileData(data.user);
            if (data.user.mobileNumber) setMobileNumber(data.user.mobileNumber);
          }
        })
        .catch(console.error);
    }
  }, [session]);

  const requestOtp = async (type) => {
    setLoading(true);
    setMessage('');
    setOtpTargetType(type);
    setOtpCode('');
    try {
      const target = type === 'email' ? profileData?.email : mobileNumber;
      if (!target) {
        setMessage('Please provide a valid target');
        setLoading(false);
        return;
      }
      
      const res = await fetch('/api/otp/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, target })
      });
      const data = await res.json();
      if (data.success) {
        setOtpStep('requested');
        setMessage('OTP requested successfully. Check terminal logs for the code.');
      } else {
        setMessage(data.error || 'Failed to request OTP');
      }
    } catch (e) {
      setMessage('Error requesting OTP');
    }
    setLoading(false);
  };

  const verifyOtp = async () => {
    setLoading(true);
    setMessage('');
    try {
      const target = otpTargetType === 'email' ? profileData?.email : mobileNumber;
      const res = await fetch('/api/otp/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: otpTargetType, target, code: otpCode })
      });
      const data = await res.json();
      if (data.success) {
        setOtpStep('verified');
        setMessage('Verified successfully!');
        // Refresh profile
        const profRes = await fetch('/api/profile');
        const profData = await profRes.json();
        if (profData.user) {
          setProfileData(profData.user);
        }
      } else {
        setMessage(data.error || 'Failed to verify OTP');
      }
    } catch (e) {
      setMessage('Error verifying OTP');
    }
    setLoading(false);
  };

  if (!session) return null;
  const user = profileData || session.user;
  const initial = user.name?.charAt(0) || 'U';

  return (
    <div style={{ paddingBottom: 'var(--space-3xl)' }}>
      {/* Header */}
      <div style={{ background: 'var(--fifa-dark)', padding: 'var(--space-xl) var(--space-lg)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--liquid-blue), var(--liquid-purple))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '2rem', fontWeight: 800 }}>
            {initial}
          </div>
          <div>
            <h1 style={{ color: 'white', fontSize: '2rem', margin: 0 }}>{user.name}</h1>
            <div style={{ color: 'var(--text-light-muted)', fontSize: '0.9rem', marginTop: '4px' }}>{user.email} • Role: {user.role?.toUpperCase()}</div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: 'var(--space-2xl) var(--space-lg)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '48px' }}>
          
          {/* Sidebar Navigation */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { id: 'Personal Info', icon: <User size={18}/> },
              { id: 'My Tickets', icon: <Ticket size={18}/> },
              { id: 'Security', icon: <Shield size={18}/> },
              { id: 'Payment Methods', icon: <CreditCard size={18}/> },
              { id: 'Notifications', icon: <Bell size={18}/> },
              { id: 'Settings', icon: <Settings size={18}/> },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setOtpStep('idle');
                  setMessage('');
                }}
                style={{
                  background: activeTab === tab.id ? 'var(--liquid-blue)' : 'transparent',
                  color: activeTab === tab.id ? 'white' : 'var(--text-secondary)',
                  border: 'none', padding: '12px 16px', borderRadius: 'var(--radius-md)',
                  fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
                  display: 'flex', alignItems: 'center', gap: '12px', textAlign: 'left'
                }}
              >
                {tab.icon} {tab.id}
              </button>
            ))}
            
            <div style={{ margin: '24px 0', height: '1px', background: 'var(--glass-border-light)' }} />
            
            <button 
              onClick={() => signOut({ callbackUrl: '/' })}
              style={{
                background: 'rgba(244, 63, 94, 0.1)', color: 'var(--liquid-pink)',
                border: 'none', padding: '12px 16px', borderRadius: 'var(--radius-md)',
                fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
                display: 'flex', alignItems: 'center', gap: '12px', textAlign: 'left'
              }}
            >
              <LogOut size={18}/> Sign Out
            </button>
          </div>

          {/* Main Content Area */}
          <div>
            
            {activeTab === 'Personal Info' && (
              <div className="glass-card" style={{ padding: '32px' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '24px' }}>Personal Information</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
                  Manage your personal details and how they are displayed across FIFA platforms.
                </p>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                    <div>
                      <label htmlFor="name" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text-muted)' }}>Name</label>
                      <input id="name" type="text" className="glass-input" defaultValue={user.name} style={{ width: '100%' }} />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text-muted)' }}>Email Address</label>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <input id="email" type="email" className="glass-input" defaultValue={user.email} disabled style={{ width: '100%', opacity: 0.7 }} />
                      {user.emailVerified ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#10b981', fontSize: '0.85rem', minWidth: '100px' }}>
                          <CheckCircle size={16} /> Verified
                        </div>
                      ) : (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#f59e0b', fontSize: '0.85rem', minWidth: '100px' }}>
                          <XCircle size={16} /> Unverified
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="mobile" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text-muted)' }}>Mobile Number</label>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <input id="mobile" type="text" className="glass-input" defaultValue={user.mobileNumber || 'Not set'} disabled style={{ width: '100%', opacity: 0.7 }} />
                      {user.mobileVerified ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#10b981', fontSize: '0.85rem', minWidth: '100px' }}>
                          <CheckCircle size={16} /> Verified
                        </div>
                      ) : (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#f59e0b', fontSize: '0.85rem', minWidth: '100px' }}>
                          <XCircle size={16} /> Unverified
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="role" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text-muted)' }}>Role</label>
                    <input id="role" type="text" className="glass-input" defaultValue={user.role?.toUpperCase()} disabled style={{ width: '100%', opacity: 0.7 }} />
                  </div>
                  
                </div>
              </div>
            )}

            {activeTab === 'Security' && (
              <div className="glass-card" style={{ padding: '32px' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '24px' }}>Security & Verification</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
                  Verify your email and mobile number using One-Time Passcodes (OTP).
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {/* Email Verification Section */}
                  <div style={{ padding: '24px', background: 'rgba(0,0,0,0.2)', borderRadius: 'var(--radius-lg)' }}>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '12px' }}>Email Verification</h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '16px' }}>{user.email}</p>
                    
                    {user.emailVerified ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', fontWeight: 600 }}>
                        <CheckCircle size={20} /> Email is verified
                      </div>
                    ) : (
                      <div>
                        {otpStep !== 'requested' || otpTargetType !== 'email' ? (
                          <button 
                            className="btn-glass btn-glass-primary" 
                            onClick={() => requestOtp('email')}
                            disabled={loading}
                          >
                            {loading && otpTargetType === 'email' ? 'Sending...' : 'Send OTP to Email'}
                          </button>
                        ) : (
                          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                            <label htmlFor="otp-email" className="sr-only" style={{ display: 'none' }}>Email OTP</label>
                            <input 
                              id="otp-email"
                              type="text" 
                              placeholder="Enter 6-digit OTP" 
                              className="glass-input" 
                              value={otpCode}
                              onChange={(e) => setOtpCode(e.target.value)}
                              style={{ width: '200px' }}
                            />
                            <button className="btn-glass btn-glass-primary" onClick={verifyOtp} disabled={loading || !otpCode}>
                              {loading ? 'Verifying...' : 'Verify'}
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Mobile Verification Section */}
                  <div style={{ padding: '24px', background: 'rgba(0,0,0,0.2)', borderRadius: 'var(--radius-lg)' }}>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '12px' }}>Mobile Verification</h3>
                    
                    {user.mobileVerified ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', fontWeight: 600 }}>
                        <CheckCircle size={20} /> Mobile is verified ({user.mobileNumber})
                      </div>
                    ) : (
                      <div>
                        <div style={{ marginBottom: '16px' }}>
                          <label htmlFor="mobile-input" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text-muted)' }}>Mobile Number</label>
                          <input 
                            id="mobile-input"
                            type="tel" 
                            className="glass-input" 
                            placeholder="+1 234 567 8900" 
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value)}
                            disabled={otpStep === 'requested' && otpTargetType === 'mobile'}
                            style={{ maxWidth: '300px', width: '100%' }}
                          />
                        </div>

                        {otpStep !== 'requested' || otpTargetType !== 'mobile' ? (
                          <button 
                            className="btn-glass btn-glass-primary" 
                            onClick={() => requestOtp('mobile')}
                            disabled={loading || !mobileNumber}
                          >
                            {loading && otpTargetType === 'mobile' ? 'Sending...' : 'Send OTP to Mobile'}
                          </button>
                        ) : (
                          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                            <label htmlFor="otp-mobile" className="sr-only" style={{ display: 'none' }}>Mobile OTP</label>
                            <input 
                              id="otp-mobile"
                              type="text" 
                              placeholder="Enter 6-digit OTP" 
                              className="glass-input" 
                              value={otpCode}
                              onChange={(e) => setOtpCode(e.target.value)}
                              style={{ width: '200px' }}
                            />
                            <button className="btn-glass btn-glass-primary" onClick={verifyOtp} disabled={loading || !otpCode}>
                              {loading ? 'Verifying...' : 'Verify'}
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  
                  {message && (
                    <div style={{ padding: '16px', background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-border-light)', fontSize: '0.95rem' }}>
                      {message}
                    </div>
                  )}

                </div>
              </div>
            )}

            {activeTab === 'My Tickets' && (
              <div>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '24px' }}>My Tickets</h2>
                
                <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
                  <div style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px dashed var(--glass-border-light)' }}>
                    <div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--liquid-purple)', textTransform: 'uppercase', marginBottom: '4px' }}>Quarter-final</div>
                      <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>Spain vs Belgium</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Jul 11, 2026</div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>Los Angeles Stadium</div>
                    </div>
                  </div>
                  <div style={{ padding: '24px', background: 'var(--bg-content-alt)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '32px' }}>
                      <div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Gate</div>
                        <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>C</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Block</div>
                        <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>104</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Row</div>
                        <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>M</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Seat</div>
                        <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>24</div>
                      </div>
                    </div>
                    <button className="btn-glass btn-glass-primary" style={{ padding: '8px 16px' }}>View QR Code</button>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab !== 'Personal Info' && activeTab !== 'My Tickets' && activeTab !== 'Security' && (
              <div className="glass-card" style={{ padding: '48px', textAlign: 'center' }}>
                <Settings size={48} color="var(--text-muted)" style={{ margin: '0 auto 24px' }} />
                <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Section Under Construction</h3>
                <p style={{ color: 'var(--text-secondary)' }}>This area is being updated for the FIFA World Cup 2026™.</p>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
