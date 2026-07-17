'use client';
import { useState } from 'react';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    // In a real app we'd get callbackUrl from query params, hardcoding redirect to root for demo
    const res = await signIn('credentials', {
      redirect: false,
      email,
      password
    });

    if (res?.error) {
      setError('Invalid credentials');
    } else {
      router.push('/');
      router.refresh();
    }
  };

  return (
    <div style={{ paddingBottom: 'var(--space-3xl)', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      
      <div className="glass-card" style={{ maxWidth: '480px', width: '100%', padding: '48px', position: 'relative' }}>
        <Link href="/" style={{ position: 'absolute', top: '24px', left: '24px', color: 'var(--text-muted)' }}>
          <ArrowLeft size={20} />
        </Link>
        
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '2.5rem', fontWeight: 900, fontFamily: 'var(--font-accent)', marginBottom: '16px' }}>FIFA ID</div>
          <p style={{ color: 'var(--text-secondary)' }}>Sign in to access your digital ecosystem</p>
        </div>
        
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {error && (
            <div style={{ background: 'rgba(244, 63, 94, 0.1)', color: 'var(--liquid-pink)', padding: '12px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
              <ShieldAlert size={16} /> {error}
            </div>
          )}

          <div>
            <label htmlFor="email" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '8px' }}>Email Address</label>
            <input 
              id="email"
              type="email" 
              className="glass-input" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="e.g. admin@fifa.com" 
              style={{ width: '100%' }}
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '8px' }}>Password</label>
            <input 
              id="password"
              type="password" 
              className="glass-input" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••" 
              style={{ width: '100%' }}
              required
            />
          </div>
          
          <button type="submit" className="btn-glass btn-glass-primary" style={{ width: '100%', padding: '16px', marginTop: '16px', fontSize: '1.1rem' }}>
            Continue
          </button>
        </form>
        
        <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid var(--glass-border-light)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          <b>Seeded Accounts (Password: password123)</b><br/>
          Admin: <code>admin@fifa.com</code><br/>
          Management: <code>manager@fifa.com</code><br/>
          Fan: <code>fan@fifa.com</code>
        </div>
      </div>
      
    </div>
  );
}
