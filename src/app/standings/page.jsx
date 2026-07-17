'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Filter } from 'lucide-react';
import teamsData from '../../data/teams.json';

export default function StandingsPage() {
  const [activeTab, setActiveTab] = useState('Groups');
  
  // Flatten groups for rendering
  const groups = Object.entries(teamsData.groups);
  
  // Mock bracket data matching the FIFA screenshot
  const bracketRounds = [
    { name: 'Round of 32', matches: [
      { id: 'M74', team1: { code: 'GER', flag: '🇩🇪', score: 1, pen: 3 }, team2: { code: 'PAR', flag: '🇵🇾', score: 1, pen: 4, isWinner: true } },
      { id: 'M77', team1: { code: 'FRA', flag: '🇫🇷', score: 3, isWinner: true }, team2: { code: 'SWE', flag: '🇸🇪', score: 0 } },
      { id: 'M81', team1: { code: 'RSA', flag: '🇿🇦', score: 0 }, team2: { code: 'MAR', flag: '🇲🇦', score: 2, isWinner: true } }
    ]},
    { name: 'Round of 16', matches: [
      { id: 'M89', team1: { code: 'PAR', flag: '🇵🇾', score: 0 }, team2: { code: 'FRA', flag: '🇫🇷', score: 1, isWinner: true } },
      { id: 'M92', team1: { code: 'MAR', flag: '🇲🇦', score: 0 }, team2: { code: 'ESP', flag: '🇪🇸', score: 2, isWinner: true } }
    ]},
    { name: 'Quarter-final', matches: [
      { id: 'M97', team1: { code: 'FRA', flag: '🇫🇷', score: 2, isWinner: true }, team2: { code: 'MAR', flag: '🇲🇦', score: 0 } }
    ]},
    { name: 'Semi-final', matches: [
      { id: 'M101', team1: { code: 'FRA', flag: '🇫🇷', score: '?' }, team2: { code: 'ESP', flag: '🇪🇸', score: '?' } }
    ]}
  ];

  return (
    <div style={{ paddingBottom: 'var(--space-3xl)' }}>
      {/* Page Header */}
      <div style={{ background: 'var(--fifa-dark)', padding: 'var(--space-xl) var(--space-lg)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h1 style={{ color: 'white', fontSize: '2.5rem', marginBottom: '16px' }}>Standings & Bracket</h1>
          <p style={{ color: 'var(--text-light-secondary)', maxWidth: '600px', fontSize: '0.95rem' }}>
            Standings are updated live during matches and are subject to change while games are in progress.
          </p>
          
          <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
            {['Groups', 'Knockout Bracket', 'Golden Boot'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  background: activeTab === tab ? 'var(--liquid-blue)' : 'rgba(255,255,255,0.1)',
                  color: 'white', border: 'none',
                  padding: '10px 24px', borderRadius: 'var(--radius-full)',
                  fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
                  boxShadow: activeTab === tab ? '0 4px 16px rgba(0, 161, 228, 0.4)' : 'none'
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: 'var(--space-2xl) var(--space-lg)' }}>
        
        {/* === KNOCKOUT BRACKET === */}
        {activeTab === 'Knockout Bracket' && (
          <div>
            <h2 className="section-title">Knockout bracket</h2>
            <div className="bracket-container">
              <div className="bracket-stages">
                {bracketRounds.map((round, ri) => (
                  <div key={ri} className="bracket-stage">
                    <div className="bracket-stage-title">{round.name}</div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: ri === 0 ? '24px' : ri === 1 ? '96px' : ri === 2 ? '240px' : '300px', marginTop: ri === 1 ? '48px' : ri === 2 ? '120px' : ri === 3 ? '180px' : '0' }}>
                      {round.matches.map((match, mi) => (
                        <div key={mi} style={{ position: 'relative' }}>
                          {/* Match ID label */}
                          <div style={{ position: 'absolute', left: '-30px', top: '50%', transform: 'translateY(-50%)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                            {match.id}
                          </div>
                          
                          {/* Match Box */}
                          <div className="bracket-match">
                            <div className="bracket-match-label">Full time</div>
                            
                            <div className={`bracket-team-row ${match.team1.isWinner ? 'winner' : ''}`}>
                              <div className="bracket-team-info">
                                <span>{match.team1.flag}</span>
                                <span>{match.team1.code}</span>
                              </div>
                              <div style={{ display: 'flex', gap: '8px' }}>
                                {match.team1.pen && <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>({match.team1.pen})</span>}
                                <span className={`bracket-score ${match.team1.isWinner ? 'winner-score' : ''}`}>{match.team1.score}</span>
                              </div>
                            </div>
                            
                            <div className={`bracket-team-row ${match.team2.isWinner ? 'winner' : ''}`}>
                              <div className="bracket-team-info">
                                <span>{match.team2.flag}</span>
                                <span>{match.team2.code}</span>
                              </div>
                              <div style={{ display: 'flex', gap: '8px' }}>
                                {match.team2.pen && <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>({match.team2.pen})</span>}
                                <span className={`bracket-score ${match.team2.isWinner ? 'winner-score' : ''}`}>{match.team2.score}</span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Connecting lines for bracket logic (simplified visual representation) */}
                          {ri < bracketRounds.length - 1 && (
                            <div style={{
                              position: 'absolute',
                              right: '-24px',
                              top: mi % 2 === 0 ? '50%' : 'auto',
                              bottom: mi % 2 !== 0 ? '50%' : 'auto',
                              width: '24px',
                              height: 'calc(50% + 12px)',
                              borderRight: '2px solid var(--glass-border-light)',
                              borderTop: mi % 2 === 0 ? '2px solid var(--glass-border-light)' : 'none',
                              borderBottom: mi % 2 !== 0 ? '2px solid var(--glass-border-light)' : 'none',
                              zIndex: -1
                            }} />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* === GROUP TABLES === */}
        {activeTab === 'Groups' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 className="section-title" style={{ margin: 0 }}>First Stage</h2>
              <button className="btn-glass" style={{ padding: '6px 12px', fontSize: '0.8rem' }}><Filter size={14} /> Filter Groups</button>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '32px' }}>
              {groups.map(([groupName, teams]) => (
                <div key={groupName} className="glass-card" style={{ padding: '24px' }}>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>Group {groupName}</h3>
                  <table className="group-table">
                    <thead>
                      <tr>
                        <th>Team</th>
                        <th className="stat">MP</th>
                        <th className="stat">W</th>
                        <th className="stat">D</th>
                        <th className="stat">L</th>
                        <th className="stat">GF</th>
                        <th className="stat">GA</th>
                        <th className="stat" style={{ color: 'var(--text-dark)' }}>Pts</th>
                      </tr>
                    </thead>
                    <tbody>
                      {teams.map((team, ti) => (
                        <tr key={team.code} className={ti < 2 ? 'qualified' : ''}>
                          <td>
                            <div className="team-cell">
                              <span style={{ fontSize: '1.2rem' }}>{team.flag}</span>
                              <span style={{ fontSize: '0.85rem' }}>{team.code}</span>
                            </div>
                          </td>
                          <td className="stat">{team.stats.mp}</td>
                          <td className="stat">{team.stats.w}</td>
                          <td className="stat">{team.stats.d}</td>
                          <td className="stat">{team.stats.l}</td>
                          <td className="stat">{team.stats.gf}</td>
                          <td className="stat">{team.stats.ga}</td>
                          <td className="stat" style={{ color: 'var(--text-dark)', fontWeight: 800 }}>{team.stats.pts}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div style={{ marginTop: '16px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    <span style={{ display: 'inline-block', width: '8px', height: '8px', background: 'var(--liquid-green)', borderRadius: '50%', marginRight: '6px' }} />
                    Top 2 teams advance to Round of 32
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* === GOLDEN BOOT === */}
        {activeTab === 'Golden Boot' && (
          <div className="glass-card" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ background: 'var(--fifa-dark)', padding: '24px', color: 'white', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '8px' }}>🥾</div>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '4px' }}>adidas Golden Boot</h2>
              <p style={{ color: 'var(--text-light-muted)', fontSize: '0.9rem' }}>Top Goalscorers of the Tournament</p>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', padding: '12px 24px', background: 'rgba(0,0,0,0.02)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                <div style={{ width: '48px', textAlign: 'center' }}>Rank</div>
                <div style={{ flex: 1 }}>Player</div>
                <div style={{ width: '60px', textAlign: 'center' }}>Goals</div>
                <div style={{ width: '60px', textAlign: 'center' }}>Assists</div>
                <div style={{ width: '80px', textAlign: 'center' }}>Mins</div>
              </div>
              
              {teamsData.goldenBoot.map((player, i) => (
                <div key={i} className="leaderboard-row">
                  <div className={`leaderboard-rank ${i < 3 ? 'top-3' : ''}`}>{i + 1}</div>
                  <div className="leaderboard-player">
                    <div className="leaderboard-name">{player.name}</div>
                    <div className="leaderboard-team">{player.flag} {player.team}</div>
                  </div>
                  <div className="leaderboard-goals" style={{ width: '60px', textAlign: 'center' }}>{player.goals}</div>
                  <div style={{ width: '60px', textAlign: 'center', fontWeight: 600, color: 'var(--text-secondary)' }}>{player.assists}</div>
                  <div style={{ width: '80px', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>{player.minutesPlayed}&apos;</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
