'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';

export default function TeamsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [teamsData, setTeamsData] = useState({ groups: {} });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/teams')
      .then(res => res.json())
      .then(data => {
        const grouped = data.reduce((acc, team) => {
          const key = team.region || 'Other';
          if (!acc[key]) acc[key] = [];
          acc[key].push(team);
          return acc;
        }, {});
        setTeamsData({ groups: grouped });
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch teams", err);
        setLoading(false);
      });
  }, []);

  const allTeams = Object.values(teamsData.groups).flat().filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div style={{ paddingBottom: 'var(--space-3xl)' }}>
      {/* Header */}
      <div style={{ background: 'var(--fifa-dark)', padding: 'var(--space-xl) var(--space-lg)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h1 style={{ color: 'white', fontSize: '2.5rem', marginBottom: '16px' }}>Teams & Stats</h1>
          <p style={{ color: 'var(--text-light-secondary)', maxWidth: '600px', fontSize: '0.95rem' }}>
            Explore the 48 nations competing in the FIFA World Cup 2026™. View squads, player statistics, and match history.
          </p>
          
          <div style={{ position: 'relative', maxWidth: '400px', marginTop: '32px' }}>
            <Search style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={20} />
            <input 
              aria-label="Search for a team"
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for a team..." 
              style={{
                width: '100%', padding: '16px 20px 16px 48px',
                background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: 'var(--radius-full)', color: 'white', outline: 'none',
                fontFamily: 'var(--font-main)', fontSize: '1rem'
              }}
            />
          </div>
        </div>
      </div>

      {/* Grid */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: 'var(--space-2xl) var(--space-lg)' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '64px', color: 'var(--text-muted)' }}>Loading teams...</div>
        ) : allTeams.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '64px', color: 'var(--text-muted)' }}>
            No teams found matching your criteria.
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
            {allTeams.map((team, i) => (
              <Tilt key={team.id} tiltMaxAngleX={10} tiltMaxAngleY={10} perspective={1000} scale={1.02} transitionSpeed={1000} glareEnable={true} glareMaxOpacity={0.2} glarePosition="all" style={{ transformStyle: "preserve-3d" }}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.03 }}
                >
                  <Link href={`/teams/${team.id}`}>
                    <div className="glass-card glass-card-interactive" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                      <div style={{ fontSize: '3rem', lineHeight: 1, transform: 'translateZ(20px)' }}>{team.flag}</div>
                      <div style={{ transform: 'translateZ(10px)' }}>
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '4px' }}>{team.name}</h3>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', gap: '8px' }}>
                          <span>FIFA Rank: <b>{team.fifaRanking}</b></span>
                          <span>•</span>
                          <span>Code: <b>{team.code}</b></span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </Tilt>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
