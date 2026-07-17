'use client';
import { useState } from 'react';
import { MapPin, Users, Navigation } from 'lucide-react';

export default function StadiumsPage() {
  const stadiums = [
    { city: 'New York/New Jersey', name: 'MetLife Stadium', capacity: '82,500', region: 'East', final: true },
    { city: 'Dallas', name: 'Dallas Stadium', capacity: '92,967', region: 'Central' },
    { city: 'Mexico City', name: 'Estadio Azteca', capacity: '83,264', region: 'Mexico' },
    { city: 'Los Angeles', name: 'Los Angeles Stadium', capacity: '70,240', region: 'West' },
    { city: 'Atlanta', name: 'Atlanta Stadium', capacity: '75,000', region: 'East' },
    { city: 'Miami', name: 'Miami Stadium', capacity: '65,326', region: 'East' },
    { city: 'Vancouver', name: 'BC Place Vancouver', capacity: '54,500', region: 'Canada' },
    { city: 'Toronto', name: 'Toronto Stadium', capacity: '45,000', region: 'Canada' }
  ];

  const [activeRegion, setActiveRegion] = useState('All');
  const regions = ['All', 'West', 'Central', 'East', 'Canada', 'Mexico'];

  const filteredStadiums = activeRegion === 'All' ? stadiums : stadiums.filter(s => s.region === activeRegion);

  return (
    <div style={{ paddingBottom: 'var(--space-3xl)' }}>
      {/* Header */}
      <div style={{ background: 'var(--fifa-dark)', padding: 'var(--space-xl) var(--space-lg)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h1 style={{ color: 'white', fontSize: '2.5rem', marginBottom: '16px' }}>Host Cities & Stadiums</h1>
          <p style={{ color: 'var(--text-light-secondary)', maxWidth: '600px', fontSize: '0.95rem' }}>
            The 2026 tournament will be hosted across 16 magnificent venues in Canada, Mexico, and the United States.
          </p>
          
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px', marginTop: '32px' }}>
            {regions.map(region => (
              <button
                key={region}
                onClick={() => setActiveRegion(region)}
                style={{
                  background: activeRegion === region ? 'white' : 'rgba(255,255,255,0.1)',
                  color: activeRegion === region ? 'var(--fifa-dark)' : 'white',
                  border: 'none', padding: '10px 20px', borderRadius: 'var(--radius-full)',
                  fontWeight: 600, fontSize: '0.9rem', whiteSpace: 'nowrap', cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {region}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: 'var(--space-2xl) var(--space-lg)' }}>
        
        {/* Interactive 3D Stadium Map Mockup */}
        <div className="glass-card-dark" style={{ height: '400px', marginBottom: '48px', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, rgba(0, 161, 228, 0.2) 0%, var(--fifa-dark) 70%)' }} />
          
          {/* Abstract 3D Pitch representation */}
          <div style={{
            width: '60%', height: '80%', 
            border: '2px solid rgba(255,255,255,0.2)', borderRadius: '20px',
            transform: 'perspective(1000px) rotateX(60deg) rotateZ(-30deg)',
            position: 'relative',
            background: 'rgba(16, 185, 129, 0.1)',
            boxShadow: '0 50px 100px rgba(0,0,0,0.5)'
          }}>
            {/* Center circle */}
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '30%', height: '30%', border: '2px solid rgba(255,255,255,0.2)', borderRadius: '50%' }} />
            <div style={{ position: 'absolute', top: '50%', left: '0', right: '0', height: '2px', background: 'rgba(255,255,255,0.2)' }} />
          </div>
          
          <div style={{ position: 'absolute', top: '24px', left: '24px' }}>
            <h3 style={{ color: 'white', fontSize: '1.2rem' }}>Interactive Venue Explorer</h3>
            <p style={{ color: 'var(--text-light-muted)', fontSize: '0.8rem' }}>Select a stadium below to view 3D seating</p>
          </div>
          
          <button className="btn-glass btn-glass-primary" style={{ position: 'absolute', bottom: '24px', right: '24px' }}>
            <Navigation size={16} /> Open Wayfinder
          </button>
        </div>

        {/* Stadium Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '32px' }}>
          {filteredStadiums.map((stadium, i) => (
            <div key={i} className="glass-card" style={{ overflow: 'hidden', cursor: 'pointer', transition: 'all 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-8px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <div style={{ height: '160px', background: 'var(--bg-content-alt)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MapPin size={48} color="var(--text-muted)" opacity={0.3} />
              </div>
              <div style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--liquid-blue)', textTransform: 'uppercase' }}>{stadium.city}</div>
                  {stadium.final && <div className="badge badge-warning">Final</div>}
                </div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>{stadium.name}</h3>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  <Users size={16} /> Capacity: {stadium.capacity}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
