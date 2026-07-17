import Link from 'next/link';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

export default function UnauthorizedPage() {
  return (
    <div style={{ paddingBottom: 'var(--space-3xl)', minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyItems: 'center', justifyContent: 'center' }}>
      <div className="glass-card" style={{ maxWidth: '600px', textAlign: 'center', padding: '64px' }}>
        <ShieldAlert size={64} color="var(--liquid-pink)" style={{ margin: '0 auto 24px' }} />
        <h1 style={{ fontSize: '2.5rem', marginBottom: '16px', color: 'var(--text-dark)' }}>Access Denied</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', fontSize: '1.1rem' }}>
          You do not have the necessary permissions to view this portal. This area requires higher clearance or a specific role (e.g. Management or System Admin).
        </p>
        <Link href="/" className="btn-glass btn-glass-primary">
          <ArrowLeft size={16} /> Return to Home
        </Link>
      </div>
    </div>
  );
}
