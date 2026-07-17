'use client';
import { useState } from 'react';
import { Ticket, Map, Coffee, Check, ArrowRight, ShieldCheck } from 'lucide-react';

export default function TicketsPage() {
  const [activeTab, setActiveTab] = useState('General');
  const [bookingStep, setBookingStep] = useState(1);

  return (
    <div style={{ paddingBottom: 'var(--space-3xl)' }}>
      {/* Header */}
      <div style={{ background: 'var(--fifa-dark)', padding: 'var(--space-xl) var(--space-lg)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h1 style={{ color: 'white', fontSize: '2.5rem', marginBottom: '16px' }}>Tickets & Hospitality</h1>
          <p style={{ color: 'var(--text-light-secondary)', maxWidth: '600px', fontSize: '0.95rem' }}>
            Secure your place in history. Official ticketing and premium hospitality packages for the FIFA World Cup 2026™.
          </p>
          
          <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
            {['General', 'Hospitality & VIP', 'My Tickets'].map(tab => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setBookingStep(1); }}
                style={{
                  background: activeTab === tab ? 'var(--liquid-blue)' : 'rgba(255,255,255,0.1)',
                  color: 'white', border: 'none',
                  padding: '10px 24px', borderRadius: 'var(--radius-full)',
                  fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
                  boxShadow: activeTab === tab ? '0 4px 16px rgba(0, 161, 228, 0.4)' : 'none'
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: 'var(--space-2xl) var(--space-lg)' }}>
        
        {/* === GENERAL TICKETING WIZARD === */}
        {activeTab === 'General' && (
          <div className="glass-card" style={{ maxWidth: '900px', margin: '0 auto' }}>
            
            {/* Wizard Progress */}
            <div style={{ display: 'flex', borderBottom: '1px solid var(--glass-border-light)' }}>
              {['Select Match', 'Choose Category', 'Seat Map', 'Checkout'].map((step, i) => (
                <div key={i} style={{ 
                  flex: 1, padding: '20px', textAlign: 'center',
                  background: bookingStep === i + 1 ? 'rgba(0, 161, 228, 0.05)' : 'transparent',
                  borderBottom: bookingStep === i + 1 ? '3px solid var(--liquid-blue)' : '3px solid transparent',
                  color: bookingStep === i + 1 ? 'var(--liquid-blue)' : bookingStep > i + 1 ? 'var(--liquid-green)' : 'var(--text-muted)',
                  fontWeight: bookingStep >= i + 1 ? 700 : 500,
                  fontSize: '0.9rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px'
                }}>
                  <div style={{ 
                    width: '24px', height: '24px', borderRadius: '50%', 
                    background: bookingStep > i + 1 ? 'var(--liquid-green)' : bookingStep === i + 1 ? 'var(--liquid-blue)' : 'rgba(0,0,0,0.1)',
                    color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem'
                  }}>
                    {bookingStep > i + 1 ? <Check size={14} /> : i + 1}
                  </div>
                  {step}
                </div>
              ))}
            </div>

            {/* Step 1: Match Selection */}
            {bookingStep === 1 && (
              <div style={{ padding: '32px' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '24px' }}>Select a Match</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {[
                    { id: 98, match: 'Spain v Belgium', stage: 'Quarter-final', stadium: 'Los Angeles Stadium', date: 'Jul 11, 2026', available: true },
                    { id: 99, match: 'England v Portugal', stage: 'Quarter-final', stadium: 'Gillette Stadium', date: 'Jul 11, 2026', available: true },
                    { id: 104, match: 'Final', stage: 'Final', stadium: 'MetLife Stadium', date: 'Jul 19, 2026', available: false },
                  ].map(match => (
                    <div 
                      key={match.id} 
                      onClick={() => match.available && setBookingStep(2)}
                      style={{ 
                        border: '1px solid var(--glass-border-light)', borderRadius: 'var(--radius-md)',
                        padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        cursor: match.available ? 'pointer' : 'not-allowed',
                        opacity: match.available ? 1 : 0.6,
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => match.available && (e.currentTarget.style.borderColor = 'var(--liquid-blue)')}
                      onMouseLeave={(e) => match.available && (e.currentTarget.style.borderColor = 'var(--glass-border-light)')}
                    >
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--liquid-purple)', textTransform: 'uppercase' }}>Match {match.id}</span>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{match.stage}</span>
                        </div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '8px' }}>{match.match}</div>
                        <div style={{ display: 'flex', gap: '16px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                          <span><Map size={14} style={{ verticalAlign: 'text-bottom' }}/> {match.stadium}</span>
                          <span>{match.date}</span>
                        </div>
                      </div>
                      <div>
                        {match.available ? (
                          <div className="btn-glass">Select <ArrowRight size={16} /></div>
                        ) : (
                          <span className="badge badge-danger">Sold Out</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Category (Mock view to show flow) */}
            {bookingStep === 2 && (
              <div style={{ padding: '32px' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '24px' }}>Choose Category</h2>
                <div style={{ display: 'flex', gap: '24px' }}>
                  <div style={{ flex: 1, height: '300px', background: 'var(--bg-content-alt)', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Map size={48} color="var(--text-muted)" />
                    <span style={{ marginLeft: '12px', color: 'var(--text-secondary)', fontWeight: 600 }}>Interactive Stadium Map</span>
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {[
                      { cat: 'Category 1', price: '$250', desc: 'Premium seats along the touchlines.' },
                      { cat: 'Category 2', price: '$180', desc: 'Corner seats with excellent view.' },
                      { cat: 'Category 3', price: '$120', desc: 'Behind the goals.' }
                    ].map(cat => (
                      <div key={cat.cat} style={{ border: '1px solid var(--glass-border-light)', padding: '20px', borderRadius: 'var(--radius-md)', cursor: 'pointer' }} onClick={() => setBookingStep(3)}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <span style={{ fontWeight: 800 }}>{cat.cat}</span>
                          <span style={{ color: 'var(--liquid-blue)', fontWeight: 800, fontSize: '1.1rem' }}>{cat.price}</span>
                        </div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{cat.desc}</div>
                      </div>
                    ))}
                    <button style={{ marginTop: 'auto', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', textAlign: 'left' }} onClick={() => setBookingStep(1)}>
                      ← Back to matches
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Step 3 & 4 stubbed for brevity */}
            {bookingStep > 2 && (
              <div style={{ padding: '64px', textAlign: 'center' }}>
                <ShieldCheck size={48} color="var(--liquid-green)" style={{ margin: '0 auto 24px' }} />
                <h2 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>Proceeding to Payment Gateway</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>Integration with official FIFA payment provider required.</p>
                <button className="btn-glass" onClick={() => setBookingStep(1)}>Start Over</button>
              </div>
            )}
          </div>
        )}

        {/* === VIP HOSPITALITY CONFIGURATOR === */}
        {activeTab === 'Hospitality & VIP' && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <h2 style={{ fontSize: '2rem', marginBottom: '16px' }}>Elevate Your Experience</h2>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                Exclusive access, gourmet dining, and the best seats in the house. Welcome to FIFA VIP Hospitality.
              </p>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
              {[
                { name: 'Match Club', price: 'From $950', features: ['Category 1 ticket', 'Street-food style dining', 'Beer & Wine', 'Pre-match access'] },
                { name: 'Match Pavilion', price: 'From $1,900', features: ['Prime Category 1 ticket', 'Chef-curated buffet', 'Premium spirits', 'Guest appearances'] },
                { name: 'Private Suite', price: 'On Request', features: ['Exclusive private box', 'Custom gourmet menu', 'Dedicated concierge', 'VIP parking & entry'] }
              ].map(pkg => (
                <div key={pkg.name} className="glass-card-dark" style={{ padding: '32px', display: 'flex', flexDirection: 'column' }}>
                  <Coffee size={32} color="var(--liquid-gold)" style={{ marginBottom: '24px' }} />
                  <h3 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '8px' }}>{pkg.name}</h3>
                  <div style={{ color: 'var(--liquid-gold)', fontWeight: 800, fontSize: '1.2rem', marginBottom: '32px' }}>{pkg.price}</div>
                  
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '48px' }}>
                    {pkg.features.map((f, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', color: 'var(--text-light-secondary)', fontSize: '0.9rem' }}>
                        <Check size={16} color="var(--liquid-green)" style={{ flexShrink: 0, marginTop: '2px' }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  
                  <button className="btn-glass" style={{ marginTop: 'auto', background: pkg.name === 'Private Suite' ? 'white' : 'var(--liquid-gold)', color: pkg.name === 'Private Suite' ? 'black' : 'var(--fifa-dark)', border: 'none', width: '100%' }}>
                    {pkg.name === 'Private Suite' ? 'Contact Sales' : 'Book Package'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
