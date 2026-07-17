'use client';
import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <div style={{ paddingBottom: 'var(--space-3xl)' }}>
      <div style={{ background: 'var(--fifa-dark)', color: 'white', padding: '64px 24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <h1 style={{ fontSize: '4rem', marginBottom: '24px', textTransform: 'uppercase' }}>
            ABOUT FIFA WORLD CUP 2026™
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-light-secondary)', maxWidth: '800px', margin: '0 auto' }}>
            The 2026 FIFA World Cup™ will be the 23rd FIFA World Cup™, the quadrennial international men&apos;s football championship contested by the national teams of the member associations of FIFA. The tournament will be jointly hosted by 16 cities in three North American countries: Canada, Mexico, and the United States.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1400px', margin: '64px auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
          <div className="glass-card" style={{ padding: '32px' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>Host Nations</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              For the first time ever, three nations are co-hosting the World Cup. Canada, Mexico, and the United States have joined forces to bring the greatest spectacle on earth to North America.
            </p>
          </div>
          <div className="glass-card" style={{ padding: '32px' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>48 Teams</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              The 2026 tournament will be the first to feature 48 teams, expanded from 32. This means more matches, more drama, and more opportunities for nations to shine on the global stage.
            </p>
          </div>
          <div className="glass-card" style={{ padding: '32px' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>104 Matches</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              With the expanded format, the tournament will feature a record 104 matches over a 39-day period. The final will take place on July 19, 2026.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
