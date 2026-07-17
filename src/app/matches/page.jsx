'use client';
import { useState, useEffect } from 'react';
import { ChevronRight, Calendar, MapPin, Tv } from 'lucide-react';
import Tilt from 'react-parallax-tilt';

export default function MatchesPage() {
  const [activeStage, setActiveStage] = useState('All');
  const [matchesData, setMatchesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/matches')
      .then(res => res.json())
      .then(data => {
        setMatchesData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load matches", err);
        setLoading(false);
      });
  }, []);
  
  const stages = ['All', 'First Stage', 'Round of 32', 'Round of 16', 'Quarter-final', 'Semi-final', 'Final'];

  // Group matches by date
  const groupedMatches = matchesData.reduce((acc, match) => {
    if (activeStage !== 'All' && match.stage !== activeStage) return acc;
    if (!acc[match.date]) acc[match.date] = [];
    acc[match.date].push(match);
    return acc;
  }, {});

  const dates = Object.keys(groupedMatches).sort((a, b) => b.localeCompare(a)); // Sort descending for this demo

  return (
    <div style={{ paddingBottom: 'var(--space-3xl)' }}>
      {/* Header */}
      <div style={{ background: 'var(--fifa-dark)', padding: 'var(--space-xl) var(--space-lg)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h1 style={{ color: 'white', fontSize: '2.5rem', marginBottom: '16px' }}>Matches & Fixtures</h1>
          
          {/* Stage Filter */}
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px', marginTop: '32px' }}>
            {stages.map(stage => (
              <button
                key={stage}
                onClick={() => setActiveStage(stage)}
                style={{
                  background: activeStage === stage ? 'white' : 'rgba(255,255,255,0.1)',
                  color: activeStage === stage ? 'var(--fifa-dark)' : 'white',
                  border: 'none', padding: '10px 20px', borderRadius: 'var(--radius-full)',
                  fontWeight: 600, fontSize: '0.9rem', whiteSpace: 'nowrap', cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {stage}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: 'var(--space-2xl) var(--space-lg)' }}>
        
        {/* Broadcaster Section */}
        <div style={{ marginBottom: '48px', display: 'flex', alignItems: 'center', gap: '24px', overflowX: 'auto', paddingBottom: '12px' }}>
          <div style={{ fontWeight: 700, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}><Tv size={16} style={{ display: 'inline', verticalAlign: 'text-bottom' }}/> WHERE TO WATCH</div>
          {[
            { name: 'FOX Sports (US)', url: 'https://www.foxsports.com/soccer/fifa-world-cup-mens' },
            { name: 'Telemundo (US/ES)', url: 'https://www.telemundodeportes.com/copa-mundial-de-la-fifa' },
            { name: 'TSN (Canada)', url: 'https://www.tsn.ca/soccer/fifa-world-cup' },
            { name: 'BBC (UK)', url: 'https://www.bbc.co.uk/sport/football' },
            { name: 'ITV (UK)', url: 'https://www.itv.com/football' },
            { name: 'beIN SPORTS (MENA)', url: 'https://www.beinsports.com/en/' },
            { name: 'JioCinema (India)', url: 'https://www.jiocinema.com/sports' },
            { name: 'SuperSport (Africa)', url: 'https://supersport.com/football' }
          ].map(b => (
            <a 
              key={b.name} 
              href={b.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="glass-card" 
              style={{ 
                padding: '12px 24px', 
                fontWeight: 800, 
                color: 'var(--fifa-dark)', 
                whiteSpace: 'nowrap',
                textDecoration: 'none',
                transition: 'all 0.2s',
                border: '1px solid var(--glass-border-light)',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--liquid-blue)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(46, 91, 255, 0.2)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--glass-border-light)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              {b.name}
            </a>
          ))}
        </div>

        {/* Matches List */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '64px', color: 'var(--text-muted)' }}>Loading matches...</div>
        ) : dates.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '64px', color: 'var(--text-muted)' }}>No matches found for this stage.</div>
        ) : (
          dates.map(date => (
            <div key={date} style={{ marginBottom: '48px' }}>
              <div style={{ 
                display: 'flex', alignItems: 'center', gap: '12px', 
                fontSize: '1.2rem', fontWeight: 800, marginBottom: '24px',
                borderBottom: '2px solid var(--liquid-blue)', paddingBottom: '8px', width: 'fit-content'
              }}>
                <Calendar size={20} color="var(--liquid-blue)" />
                {new Date(date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {groupedMatches[date].map(match => (
                  <Tilt key={match.id} tiltMaxAngleX={5} tiltMaxAngleY={5} perspective={1000} scale={1.02} transitionSpeed={1000} glareEnable={true} glareMaxOpacity={0.15} glarePosition="all" style={{ transformStyle: "preserve-3d" }}>
                    <div className="glass-card match-card" style={{ padding: 0, overflow: 'visible', cursor: 'pointer', height: '100%' }}>
                      <div style={{ display: 'flex', alignItems: 'stretch', width: '100%', height: '100%' }}>
                        
                        {/* Left: Meta info */}
                        <div style={{ padding: '24px', borderRight: '1px solid var(--glass-border-light)', minWidth: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'center', transform: 'translateZ(20px)' }}>
                          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--liquid-purple)', textTransform: 'uppercase' }}>Match {match.id}</div>
                          <div style={{ fontWeight: 600 }}>{match.stage}</div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <MapPin size={12} /> {match.stadium}
                          </div>
                        </div>

                        {/* Middle: Teams & Score */}
                        <div style={{ flex: 1, padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '32px', transform: 'translateZ(30px)' }}>
                          <div className="match-team right" style={{ flex: 1 }}>
                            {match.homeTeam.name}
                            <span className="match-flag">{match.homeTeam.flag}</span>
                          </div>
                          
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                            {match.status === 'LIVE' && <span className="badge badge-live">LIVE</span>}
                            {match.status === 'FT' && <span className="badge badge-info" style={{ background: 'rgba(0,0,0,0.05)', color: 'var(--text-secondary)', border: 'none' }}>FT</span>}
                            {match.status === 'Upcoming' && <span style={{ fontWeight: 700, color: 'var(--text-muted)' }}>{match.time}</span>}
                            
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', background: 'rgba(0,0,0,0.03)', padding: '8px 24px', borderRadius: '8px' }}>
                              <span className="match-score">{match.homeTeam.score ?? '-'}</span>
                              <span style={{ color: 'var(--text-muted)' }}>:</span>
                              <span className="match-score">{match.awayTeam.score ?? '-'}</span>
                            </div>
                          </div>

                          <div className="match-team" style={{ flex: 1 }}>
                            <span className="match-flag">{match.awayTeam.flag}</span>
                            {match.awayTeam.name}
                          </div>
                        </div>
                        
                        {/* Right: Action */}
                        <div style={{ padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderLeft: '1px solid var(--glass-border-light)', transform: 'translateZ(10px)' }}>
                          <ChevronRight color="var(--text-muted)" />
                        </div>

                      </div>
                    </div>
                  </Tilt>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
