'use client';
import { motion } from 'framer-motion';
import { PlayCircle, Tv, Film, Info } from 'lucide-react';

const originals = [
  { id: 1, title: "Captains: The Chosen Few", season: "Season 2", img: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&q=80&w=600" },
  { id: 2, title: "Bravas de Juárez", season: "Documentary", img: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?auto=format&fit=crop&q=80&w=600" },
  { id: 3, title: "All Roads Lead Down Under", season: "6 Episodes", img: "https://images.unsplash.com/photo-1551280857-2b9bbe5240f5?auto=format&fit=crop&q=80&w=600" },
  { id: 4, title: "Written in the Stars", season: "Official Film", img: "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&q=80&w=600" },
];

export default function PlusPage() {
  return (
    <div style={{ background: '#000', color: 'white', minHeight: '100vh', paddingBottom: 'var(--space-3xl)' }}>
      {/* Hero Video Section */}
      <div style={{ position: 'relative', height: '70vh', display: 'flex', alignItems: 'flex-end', padding: '64px 24px', background: 'url(https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&q=80&w=1600) center/cover' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to top, #000 0%, transparent 100%)' }} />
        
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--fifa-navy)', padding: '6px 12px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 800, marginBottom: '16px' }}>
            <Tv size={14} /> FIFA+ ORIGINAL
          </div>
          <h1 style={{ fontSize: '4rem', fontWeight: 900, marginBottom: '16px', maxWidth: '800px', lineHeight: 1 }}>
            THE ROAD TO 2026
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#ccc', maxWidth: '600px', marginBottom: '32px' }}>
            Go behind the scenes as all 48 nations prepare for the most expansive FIFA World Cup™ in history. 
          </p>
          <div style={{ display: 'flex', gap: '16px' }}>
            <button className="btn-glass" style={{ background: 'white', color: 'black', border: 'none', padding: '16px 32px', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <PlayCircle size={20} /> Watch Now
            </button>
            <button className="btn-glass" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: 'none', padding: '16px 32px', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Info size={20} /> More Info
            </button>
          </div>
        </div>
      </div>

      {/* Grid Rows */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px', marginTop: '48px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Film size={20} /> Trending Originals
        </h2>
        <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '32px' }}>
          {originals.map((show, i) => (
            <motion.div 
              key={show.id}
              whileHover={{ scale: 1.05 }}
              style={{ minWidth: '300px', height: '170px', borderRadius: '8px', background: `url(${show.img}) center/cover`, position: 'relative', cursor: 'pointer', overflow: 'hidden' }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)' }} />
              <div style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px' }}>
                <div style={{ color: 'var(--liquid-blue)', fontSize: '0.7rem', fontWeight: 800, marginBottom: '4px', textTransform: 'uppercase' }}>{show.season}</div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>{show.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
