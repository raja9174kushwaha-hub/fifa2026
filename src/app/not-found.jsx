'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div style={{ 
      minHeight: '70vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: 'var(--space-2xl)'
    }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card" 
        style={{ textAlign: 'center', padding: '64px', maxWidth: '500px' }}
      >
        <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🚧</div>
        <h1 style={{ fontSize: '2rem', marginBottom: '16px', color: 'var(--fifa-dark)' }}>Page Under Construction</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
          This section of the FIFA portal is currently being built for the 2026 World Cup. Please check back later!
        </p>
        <Link href="/" className="btn-glass btn-glass-primary" style={{ display: 'inline-flex' }}>
          Return to Homepage
        </Link>
      </motion.div>
    </div>
  );
}
