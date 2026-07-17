'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Target, Users, ArrowRight } from 'lucide-react';

export default function GamingPage() {
  const [activeTab, setActiveTab] = useState('Fantasy');

  return (
    <div style={{ paddingBottom: 'var(--space-3xl)', background: 'var(--bg-content-alt)' }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(to right, #0F172A, #3B82F6)', color: 'white', padding: '64px 24px' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '3rem', marginBottom: '16px', textTransform: 'uppercase' }}>Play. Compete. Win.</h1>
            <p style={{ fontSize: '1.2rem', opacity: 0.9, maxWidth: '500px', marginBottom: '32px' }}>
              Build your ultimate dream team or predict match outcomes to win exclusive FIFA World Cup 2026™ tickets and merchandise.
            </p>
            <div style={{ display: 'flex', gap: '16px' }}>
              <button className="btn-glass" onClick={() => setActiveTab('Fantasy')} style={{ background: activeTab === 'Fantasy' ? 'white' : 'rgba(255,255,255,0.1)', color: activeTab === 'Fantasy' ? '#0F172A' : 'white', border: 'none' }}>
                <Users size={18} /> Fantasy Classic
              </button>
              <button className="btn-glass" onClick={() => setActiveTab('Predictor')} style={{ background: activeTab === 'Predictor' ? 'white' : 'rgba(255,255,255,0.1)', color: activeTab === 'Predictor' ? '#0F172A' : 'white', border: 'none' }}>
                <Target size={18} /> Match Predictor
              </button>
            </div>
          </div>
          <div style={{ width: '400px', height: '300px', background: 'url(https://images.unsplash.com/photo-1574629810360-7efbb6b04560?auto=format&fit=crop&q=80&w=800) center/cover', borderRadius: 'var(--radius-xl)', boxShadow: '0 25px 50px rgba(0,0,0,0.5)' }} />
        </div>
      </div>

      <div style={{ maxWidth: '1400px', margin: '64px auto', padding: '0 24px' }}>
        {activeTab === 'Fantasy' ? (
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '32px' }}>
              {/* Pitch Area */}
              <div className="glass-card" style={{ padding: '32px', background: 'linear-gradient(to bottom, #2E7D32, #1B5E20)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                  <h2 style={{ color: 'white', display: 'flex', alignItems: 'center', gap: '12px' }}><Trophy size={24} /> My Squad</h2>
                  <div style={{ background: 'rgba(0,0,0,0.3)', padding: '8px 16px', borderRadius: 'var(--radius-full)', color: 'white', fontWeight: 800 }}>
                    Budget: $100M
                  </div>
                </div>
                
                {/* Mock Pitch */}
                <div style={{ height: '500px', border: '2px solid rgba(255,255,255,0.3)', borderRadius: 'var(--radius-lg)', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                  {/* FWD */}
                  <div style={{ display: 'flex', justifyContent: 'space-around', padding: '0 100px' }}>
                    {[1, 2].map(i => <div key={i} style={{ width: '60px', height: '60px', background: 'rgba(255,255,255,0.9)', borderRadius: '50%', border: '4px solid #3B82F6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</div>)}
                  </div>
                  {/* MID */}
                  <div style={{ display: 'flex', justifyContent: 'space-around', padding: '0 20px' }}>
                    {[1, 2, 3, 4].map(i => <div key={i} style={{ width: '60px', height: '60px', background: 'rgba(255,255,255,0.9)', borderRadius: '50%', border: '4px solid #3B82F6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</div>)}
                  </div>
                  {/* DEF */}
                  <div style={{ display: 'flex', justifyContent: 'space-around', padding: '0 20px' }}>
                    {[1, 2, 3, 4].map(i => <div key={i} style={{ width: '60px', height: '60px', background: 'rgba(255,255,255,0.9)', borderRadius: '50%', border: '4px solid #3B82F6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</div>)}
                  </div>
                  {/* GK */}
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{ width: '60px', height: '60px', background: 'rgba(255,255,255,0.9)', borderRadius: '50%', border: '4px solid #F59E0B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div className="glass-card" style={{ padding: '24px' }}>
                  <h3 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}><Star size={20} color="#F59E0B" /> Global Leaderboard</h3>
                  {[
                    { rank: 1, name: 'AlexTheGreat', pts: 1240 },
                    { rank: 2, name: 'SoccerFan99', pts: 1205 },
                    { rank: 3, name: 'TacticsMaster', pts: 1198 },
                  ].map(user => (
                    <div key={user.rank} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--glass-border-light)' }}>
                      <div style={{ display: 'flex', gap: '12px' }}>
                        <span style={{ fontWeight: 800, color: 'var(--text-muted)' }}>{user.rank}</span>
                        <span style={{ fontWeight: 600 }}>{user.name}</span>
                      </div>
                      <span style={{ color: 'var(--liquid-blue)', fontWeight: 800 }}>{user.pts} pts</span>
                    </div>
                  ))}
                  <button className="btn-glass" style={{ width: '100%', marginTop: '16px' }}>View Full Table</button>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass-card" style={{ padding: '48px', textAlign: 'center' }}>
            <Target size={64} style={{ color: 'var(--liquid-purple)', margin: '0 auto 24px' }} />
            <h2 style={{ fontSize: '2rem', marginBottom: '16px' }}>Match Predictor</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>Guess the scores for the upcoming Quarter-Finals and climb the prediction ranks!</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px', margin: '0 auto' }}>
              {[
                { home: 'Spain 🇪🇸', away: '🇧🇪 Belgium' },
                { home: 'France 🇫🇷', away: '🇲🇦 Morocco' }
              ].map((match, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'white', padding: '16px 24px', borderRadius: 'var(--radius-md)', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                  <span style={{ fontSize: '1.2rem', fontWeight: 600, width: '150px', textAlign: 'right' }}>{match.home}</span>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <input aria-label={`${match.home} predicted score`} type="number" min="0" placeholder="0" style={{ width: '60px', height: '60px', fontSize: '1.5rem', textAlign: 'center', border: '2px solid #E2E8F0', borderRadius: 'var(--radius-sm)' }} />
                    <span style={{ fontWeight: 800, color: 'var(--text-muted)' }}>-</span>
                    <input aria-label={`${match.away} predicted score`} type="number" min="0" placeholder="0" style={{ width: '60px', height: '60px', fontSize: '1.5rem', textAlign: 'center', border: '2px solid #E2E8F0', borderRadius: 'var(--radius-sm)' }} />
                  </div>
                  <span style={{ fontSize: '1.2rem', fontWeight: 600, width: '150px', textAlign: 'left' }}>{match.away}</span>
                </div>
              ))}
            </div>
            <button className="btn-glass btn-glass-primary" style={{ marginTop: '32px', padding: '16px 48px', fontSize: '1.1rem' }}>
              Submit Predictions
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
