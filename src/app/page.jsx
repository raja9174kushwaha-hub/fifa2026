'use client';
import Link from 'next/link';
import { PlayCircle, ChevronRight, Clock, Star, TrendingUp } from 'lucide-react';
import LiquidBackground from '../components/ui/LiquidBackground';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.8 }}
      style={{ paddingBottom: 'var(--space-3xl)' }}
    >
      {/* 1. STORY BUBBLES */}
      <section className="story-bubbles">
        {[
          { label: 'ESP 2-1 BEL', img: '🇪🇸' },
          { label: 'FRA 2-0 MAR', img: '🇫🇷' },
          { label: 'Slow Mo Moments', img: '⏱️' },
          { label: 'Lionel Messi', img: '🐐' },
          { label: 'Harry Kane', img: '🎯' },
          { label: 'England Goals', img: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
          { label: 'France Goals', img: '🐓' },
          { label: 'Kylian Mbappe', img: '⚡' },
          { label: 'Norway Goals', img: '🇳🇴' },
        ].map((story, i) => (
          <motion.div 
            key={i} 
            className="story-bubble"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, type: 'spring', stiffness: 300, damping: 20 }}
          >
            <div className={`story-bubble-ring ${i === 2 ? 'active' : ''}`}>
              <div className="story-bubble-img">{story.img}</div>
            </div>
            <span className="story-bubble-label">{story.label}</span>
          </motion.div>
        ))}
      </section>

      {/* 2. HERO CAROUSEL */}
      <section className="section">
        <div className="hero-carousel">
          <div className="hero-content">
            <span className="hero-label">Quarter-final, Match 98</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <span className="badge badge-live">Live</span>
            </div>
            <h1 className="hero-title" style={{ color: '#ffffff' }}>Spain v Belgium: Updates from the quarter-final in Los Angeles</h1>
            <p className="hero-desc" style={{ color: 'rgba(255,255,255,0.85)' }}>
              Follow all the action as two European heavyweights clash for a spot in the semi-finals of the FIFA World Cup 2026™.
            </p>
            <div>
              <Link href="/matches/98" className="btn-glass btn-glass-primary">
                Read more <ChevronRight size={16} />
              </Link>
            </div>
          </div>
          
          <div className="hero-image" style={{ position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(45deg, #0f172a, #4c1d95)' }} />
            <LiquidBackground />
            
            {/* Overlay Next Up */}
            <motion.div 
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, type: 'spring' }}
              style={{
                position: 'absolute', right: 0, bottom: 0, 
                width: '280px', background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(12px)',
                padding: '20px', borderTopLeftRadius: 'var(--radius-xl)'
              }}
            >
              <div style={{ fontSize: '0.8rem', color: 'var(--text-light-muted)', marginBottom: '8px' }}>Next Up</div>
              <div style={{ fontWeight: 700, color: 'white', marginBottom: '4px' }}>Match Review</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '12px' }}>
                <div style={{ flex: 1, fontSize: '0.85rem', color: 'var(--text-light)' }}>
                  A tactical breakdown of how Spain unlocked the Belgian defense.
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Hero Bottom Tabs */}
        <div style={{ display: 'flex', gap: '2px', marginTop: '4px', overflowX: 'auto', paddingBottom: '12px' }}>
          {['Hyundai — Goal of the Tournament', 'Spotlight', 'Discover', 'FIFA World Cup™'].map((tab, i) => (
            <div key={i} style={{ 
              flex: 1, minWidth: '200px', 
              padding: '12px 16px', 
              background: i === 0 ? 'var(--fifa-navy)' : 'rgba(0,0,0,0.03)',
              color: i === 0 ? 'white' : 'var(--text-secondary)',
              fontWeight: 600, fontSize: '0.85rem',
              cursor: 'pointer', transition: 'all 0.2s',
              borderBottom: i === 0 ? '3px solid var(--liquid-blue)' : '3px solid transparent'
            }}>
              {tab}
            </div>
          ))}
        </div>
      </section>

      {/* 3. HIGHLIGHTS GRID */}
      <section className="section" style={{ background: 'var(--bg-content-alt)' }}>
        <div className="section-title">
          Highlights
          <Link href="/news" className="see-all">See all <ChevronRight size={16} /></Link>
        </div>
        
        <div className="highlight-grid">
          {[
            { flags: ['🇪🇸', '🇧🇪'], vs: 'Spain v Belgium', stage: 'Quarter-final', url: 'https://www.youtube.com/embed/v7B5gL6Fmms' },
            { flags: ['🇫🇷', '🇲🇦'], vs: 'France v Morocco', stage: 'Quarter-final', url: 'https://www.youtube.com/embed/8-9-T4vJ29s' },
            { flags: ['🇨🇭', '🇨🇴'], vs: 'Switzerland v Colombia', stage: 'Round of 16', url: 'https://www.youtube.com/embed/gL2-1D_nE4A' },
          ].map((hl, i) => (
            <motion.div 
              key={i} 
              className="highlight-card"
              whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <div className="highlight-thumb" style={{ position: 'relative', overflow: 'hidden', paddingBottom: '56.25%', height: 0 }}>
                <iframe 
                  src={hl.url} 
                  title={hl.vs}
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
              <div className="highlight-title">
                {hl.vs} | {hl.stage} | FIFA World Cup™ | Highlights
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. TOP STORIES */}
      <section className="section">
        <div className="section-title">
          Top stories
          <Link href="/news" className="see-all">See all <ChevronRight size={16} /></Link>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {[
            { tag: 'Tournament News', title: 'Record attendance expected across North America', time: '2 hours ago', icon: <TrendingUp size={14}/> },
            { tag: 'Team News', title: 'Injury update: Key players missing the Quarter-finals', time: '5 hours ago', icon: <Clock size={14}/> },
            { tag: 'Fan Guide', title: 'Top 10 places to visit in New York/New Jersey between matches', time: '1 day ago', icon: <Star size={14}/> },
            { tag: 'FIFA Collect', title: 'New legendary moments drop this Friday', time: '2 days ago', icon: <Star size={14}/> },
          ].map((story, i) => (
            <motion.div 
              key={i} 
              className="glass-card glass-card-interactive" 
              style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--liquid-purple)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {story.tag}
              </div>
              <h3 style={{ fontSize: '1.1rem', flex: 1 }}>{story.title}</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {story.icon} {story.time}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
