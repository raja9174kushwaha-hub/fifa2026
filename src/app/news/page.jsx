'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronRight, Clock, Share2 } from 'lucide-react';

const newsArticles = [
  { id: 1, title: 'Los Angeles to host historic quarter-final clash', category: 'Tournament', time: '2 hours ago', img: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&q=80&w=800' },
  { id: 2, title: 'New fan zones announced across all 16 host cities', category: 'Fans', time: '5 hours ago', img: 'https://images.unsplash.com/photo-1614632537197-38a17061c2bd?auto=format&fit=crop&q=80&w=800' },
  { id: 3, title: 'Golden Boot race heats up as Mbappe scores twice', category: 'Players', time: '1 day ago', img: 'https://images.unsplash.com/photo-1518605368461-1ee7111d4d38?auto=format&fit=crop&q=80&w=800' },
  { id: 4, title: 'Tactical Analysis: How Spain broke through the defense', category: 'Analysis', time: '1 day ago', img: 'https://images.unsplash.com/photo-1508344928928-7137b29de216?auto=format&fit=crop&q=80&w=800' },
  { id: 5, title: 'Record attendance expected at MetLife Stadium', category: 'Tournament', time: '2 days ago', img: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?auto=format&fit=crop&q=80&w=800' },
  { id: 6, title: 'Injury updates: Key players doubtful for semi-finals', category: 'Teams', time: '3 days ago', img: 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&q=80&w=800' },
];

export default function NewsPage() {
  return (
    <div style={{ paddingBottom: 'var(--space-3xl)' }}>
      {/* Hero Section */}
      <div style={{ background: 'var(--fifa-dark)', color: 'white', padding: '64px 24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.1, background: 'url(https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&q=80&w=1600) center/cover' }} />
        <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <span className="badge badge-info" style={{ marginBottom: '16px', display: 'inline-block' }}>LATEST NEWS</span>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '24px', maxWidth: '800px', textTransform: 'uppercase', lineHeight: 1.1 }}>
            STAY UP TO DATE WITH THE FIFA WORLD CUP 2026™
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-light-secondary)', maxWidth: '600px', marginBottom: '32px' }}>
            Breaking news, tactical analysis, and exclusive interviews from the biggest sporting event on the planet.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1400px', margin: '-40px auto 0', padding: '0 24px', position: 'relative', zIndex: 10 }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '24px' }}
        >
          {newsArticles.map((article, i) => (
            <motion.div 
              key={article.id}
              whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
              className="glass-card"
              style={{ overflow: 'hidden', cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div style={{ height: '200px', background: `url(${article.img}) center/cover` }} />
              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--liquid-blue)', textTransform: 'uppercase' }}>
                    {article.category}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                    <Clock size={14} /> {article.time}
                  </div>
                </div>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--fifa-dark)', marginBottom: '16px', lineHeight: 1.3 }}>
                  {article.title}
                </h3>
                <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Link href="/" style={{ color: 'var(--fifa-navy)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    Read Full Story <ChevronRight size={16} />
                  </Link>
                  <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                    <Share2 size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
