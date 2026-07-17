'use client';
import { use } from 'react';
import Link from 'next/link';
import { ArrowLeft, User, Activity } from 'lucide-react';
import teamsData from '../../../data/teams.json';

export default function TeamDetailPage({ params }) {
  // In Next.js 15, params is a promise
  const unwrappedParams = use(params);
  const teamId = unwrappedParams.teamId;
  
  // Find team details
  const allTeams = Object.values(teamsData.groups).flat();
  const team = allTeams.find(t => t.id === teamId);
  const squad = teamsData.squads[teamId];

  if (!team) {
    return <div style={{ padding: '100px', textAlign: 'center' }}>Team not found.</div>;
  }

  return (
    <div style={{ paddingBottom: 'var(--space-3xl)' }}>
      {/* Team Header */}
      <div style={{ background: 'linear-gradient(to right, var(--fifa-dark), var(--fifa-accent))', padding: 'var(--space-2xl) var(--space-lg)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <Link href="/teams" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-light-secondary)', marginBottom: '32px', fontSize: '0.9rem', fontWeight: 600 }}>
            <ArrowLeft size={16} /> Back to all teams
          </Link>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            <div style={{ fontSize: '6rem', lineHeight: 1, filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))' }}>{team.flag}</div>
            <div>
              <h1 style={{ color: 'white', fontSize: '3.5rem', margin: 0 }}>{team.name}</h1>
              <div style={{ display: 'flex', gap: '24px', marginTop: '16px' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-light-muted)', textTransform: 'uppercase' }}>Coach</div>
                  <div style={{ color: 'white', fontWeight: 600, fontSize: '1.1rem' }}>{team.coach}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-light-muted)', textTransform: 'uppercase' }}>FIFA Rank</div>
                  <div style={{ color: 'white', fontWeight: 600, fontSize: '1.1rem' }}>#{team.fifaRanking}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: 'var(--space-2xl) var(--space-lg)' }}>
        {!squad ? (
          <div className="glass-card" style={{ padding: '48px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Squad Data Pending</h3>
            <p style={{ color: 'var(--text-secondary)' }}>The final 26-man squad has not yet been announced.</p>
          </div>
        ) : (
          <div>
            <h2 className="section-title">Official Squad</h2>
            
            {/* Squad Grid grouped by position */}
            {['GK', 'DEF', 'MID', 'FWD'].map(pos => (
              squad[pos] && squad[pos].length > 0 && (
                <div key={pos} style={{ marginBottom: '48px' }}>
                  <h3 style={{ 
                    fontSize: '1rem', color: 'var(--text-muted)', 
                    borderBottom: '1px solid var(--glass-border-light)', 
                    paddingBottom: '8px', marginBottom: '24px' 
                  }}>
                    {pos === 'GK' ? 'Goalkeepers' : pos === 'DEF' ? 'Defenders' : pos === 'MID' ? 'Midfielders' : 'Forwards'}
                  </h3>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
                    {squad[pos].map((player, i) => (
                      <div key={i} className="glass-card" style={{ padding: '20px', display: 'flex', gap: '16px', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--bg-content-alt)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                          <User size={32} />
                        </div>
                        <div>
                          <div style={{ color: 'var(--liquid-blue)', fontWeight: 800, fontSize: '1.2rem', marginBottom: '2px' }}>{player.number}</div>
                          <div style={{ fontWeight: 700, lineHeight: 1.2, marginBottom: '6px' }}>{player.name}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{player.club}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
