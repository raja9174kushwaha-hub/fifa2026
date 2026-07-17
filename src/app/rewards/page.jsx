'use client';
import { motion } from 'framer-motion';
import { Gift, Medal, Ticket, ShoppingBag, ShieldCheck } from 'lucide-react';

export default function RewardsPage() {
  return (
    <div style={{ paddingBottom: 'var(--space-3xl)' }}>
      {/* Hero Section */}
      <div style={{ background: 'var(--liquid-purple)', color: 'white', padding: '64px 24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ maxWidth: '600px' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.2)', padding: '6px 16px', borderRadius: 'var(--radius-full)', fontWeight: 800, marginBottom: '24px' }}>
              <Medal size={16} /> FIFA REWARDS PROGRAM
            </span>
            <h1 style={{ fontSize: '3.5rem', lineHeight: 1.1, marginBottom: '24px' }}>
              TURN YOUR PASSION INTO POINTS
            </h1>
            <p style={{ fontSize: '1.2rem', opacity: 0.9, marginBottom: '32px' }}>
              Earn points for every ticket bought, match predicted, and collectible converted. Redeem them for exclusive once-in-a-lifetime experiences.
            </p>
            <button className="btn-glass" style={{ background: 'white', color: 'var(--liquid-purple)', border: 'none', padding: '16px 32px', fontSize: '1.1rem' }}>
              Join the Club
            </button>
          </div>
          <div style={{ fontSize: '12rem', opacity: 0.2 }}>
            <Gift size={200} />
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1400px', margin: '64px auto', padding: '0 24px' }}>
        <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '48px', color: 'var(--fifa-dark)' }}>How to Earn Points</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px', marginBottom: '80px' }}>
          {[
            { icon: <Ticket size={32} />, title: 'Buy Tickets', desc: 'Get 100 points for every match ticket you purchase.' },
            { icon: <ShoppingBag size={32} />, title: 'Shop Merch', desc: 'Earn 10 points for every $1 spent in the official FIFA Store.' },
            { icon: <ShieldCheck size={32} />, title: 'Play Fantasy', desc: 'Unlock bonus points by finishing in the Top 10% each round.' }
          ].map((item, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card" 
              style={{ padding: '32px', textAlign: 'center' }}
            >
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--bg-content-alt)', color: 'var(--liquid-purple)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                {item.icon}
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>{item.title}</h3>
              <p style={{ color: 'var(--text-secondary)' }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="glass-card-dark" style={{ padding: '64px', textAlign: 'center', background: 'var(--fifa-navy)', color: 'white' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '24px' }}>Ready to start earning?</h2>
          <p style={{ fontSize: '1.2rem', opacity: 0.8, maxWidth: '600px', margin: '0 auto 32px' }}>
            Link your FIFA+ account today and get a welcome bonus of 500 points immediately.
          </p>
          <button className="btn-glass" style={{ background: 'var(--liquid-pink)', color: 'white', border: 'none', padding: '16px 48px', fontSize: '1.1rem' }}>
            Link Account Now
          </button>
        </div>
      </div>
    </div>
  );
}
