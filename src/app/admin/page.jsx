'use client';
import { useState } from 'react';
import { ShieldAlert, Activity, Users, Settings, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('Incidents');

  return (
    <div style={{ paddingBottom: 'var(--space-3xl)' }}>
      {/* Header */}
      <div style={{ background: '#111827', padding: 'var(--space-xl) var(--space-lg)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
            <h1 style={{ color: 'white', fontSize: '2.5rem', margin: 0 }}>Command Center</h1>
            <span className="badge badge-danger"><ShieldAlert size={12}/> SYSTEM ADMIN</span>
          </div>
          <p style={{ color: 'var(--text-light-secondary)', maxWidth: '600px', fontSize: '0.95rem' }}>
            Centralized operations dashboard for tournament management, security, and access control.
          </p>
          
          <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
            {[
              { id: 'Incidents', icon: <AlertTriangle size={16}/> },
              { id: 'Access Logs', icon: <Users size={16}/> },
              { id: 'System Status', icon: <Activity size={16}/> }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  background: activeTab === tab.id ? 'var(--liquid-blue)' : 'rgba(255,255,255,0.05)',
                  color: 'white', border: '1px solid', borderColor: activeTab === tab.id ? 'var(--liquid-blue)' : 'rgba(255,255,255,0.1)',
                  padding: '10px 24px', borderRadius: 'var(--radius-full)',
                  fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
                  display: 'flex', alignItems: 'center', gap: '8px',
                  boxShadow: activeTab === tab.id ? '0 4px 16px rgba(0, 161, 228, 0.4)' : 'none'
                }}
              >
                {tab.icon} {tab.id}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: 'var(--space-2xl) var(--space-lg)' }}>
        
        {/* === INCIDENT DISPATCHER === */}
        {activeTab === 'Incidents' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 className="section-title" style={{ margin: 0 }}>Active Incidents</h2>
              <button className="btn-glass" style={{ background: 'var(--liquid-green)', color: 'white', border: 'none' }}>
                + New Dispatch
              </button>
            </div>

            {/* Metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '48px' }}>
              {[
                { label: 'Critical', value: '2', color: 'var(--liquid-pink)' },
                { label: 'Warning', value: '14', color: 'var(--liquid-gold)' },
                { label: 'Resolved (24h)', value: '89', color: 'var(--liquid-green)' },
                { label: 'Avg Response', value: '3m 12s', color: 'var(--liquid-blue)' },
              ].map((metric, i) => (
                <div key={i} className="glass-card-dark" style={{ padding: '24px', borderLeft: `4px solid ${metric.color}` }}>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-light-muted)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '8px' }}>
                    {metric.label}
                  </div>
                  <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'white' }}>{metric.value}</div>
                </div>
              ))}
            </div>

            {/* List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { id: 'INC-9042', severity: 'CRITICAL', venue: 'Estadio Azteca', issue: 'Crowd congestion at Gate C', time: '12 mins ago', status: 'In Progress' },
                { id: 'INC-9041', severity: 'WARNING', venue: 'MetLife Stadium', issue: 'Network degradation in Media Tribune', time: '45 mins ago', status: 'Investigating' },
                { id: 'INC-9038', severity: 'INFO', venue: 'Miami Stadium', issue: 'VIP Convoy arrival delayed by 15m', time: '2 hours ago', status: 'Resolved' },
              ].map(inc => (
                <div key={inc.id} className="glass-card" style={{ padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: inc.severity === 'CRITICAL' ? 'rgba(244, 63, 94, 0.1)' : inc.severity === 'WARNING' ? 'rgba(250, 204, 21, 0.1)' : 'rgba(16, 185, 129, 0.1)', color: inc.severity === 'CRITICAL' ? 'var(--liquid-pink)' : inc.severity === 'WARNING' ? 'var(--liquid-gold)' : 'var(--liquid-green)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {inc.severity === 'CRITICAL' ? <AlertTriangle /> : inc.severity === 'WARNING' ? <Clock /> : <CheckCircle />}
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                        <span style={{ fontWeight: 800 }}>{inc.id}</span>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', background: 'var(--bg-content-alt)' }}>{inc.venue}</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{inc.time}</span>
                      </div>
                      <div style={{ fontSize: '1.1rem', color: 'var(--text-dark)' }}>{inc.issue}</div>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>{inc.status}</span>
                    <button className="btn-glass" style={{ padding: '8px 16px' }}>Update</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* === ACCESS LOGS === */}
        {activeTab === 'Access Logs' && (
          <div>
            <h2 className="section-title">Physical & Digital Access Logs</h2>
            <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
              <table className="group-table" style={{ margin: 0 }}>
                <thead>
                  <tr style={{ background: 'var(--bg-content-alt)' }}>
                    <th>Timestamp</th>
                    <th>User / ID</th>
                    <th>Role</th>
                    <th>Action / Location</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { time: '14:32:01', user: 'L. Messi (ARG-01)', role: 'Player', loc: 'Locker Room A - Entry', status: 'GRANTED' },
                    { time: '14:31:45', user: 'J. Smith (PR-842)', role: 'Media', loc: 'Press Tribune - Entry', status: 'GRANTED' },
                    { time: '14:28:12', user: 'Unknown (RFID-X92)', role: 'None', loc: 'VIP Suite 402 - Entry', status: 'DENIED' },
                    { time: '14:25:00', user: 'A. Wenger (TSG-01)', role: 'Official', loc: 'System Login (iPad)', status: 'GRANTED' },
                  ].map((log, i) => (
                    <tr key={i}>
                      <td style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{log.time}</td>
                      <td style={{ fontWeight: 600 }}>{log.user}</td>
                      <td><span className="badge" style={{ background: 'var(--bg-content-alt)', border: 'none' }}>{log.role}</span></td>
                      <td>{log.loc}</td>
                      <td>
                        <span style={{ color: log.status === 'GRANTED' ? 'var(--liquid-green)' : 'var(--liquid-pink)', fontWeight: 800, fontSize: '0.85rem' }}>
                          {log.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* === SYSTEM STATUS === */}
        {activeTab === 'System Status' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
            <div className="glass-card-dark" style={{ padding: '32px' }}>
              <h3 style={{ color: 'white', fontSize: '1.2rem', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Settings size={20} /> Microservices Health
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { service: 'Identity Provider (Auth)', status: 'Operational', uptime: '99.99%' },
                  { service: 'Ticketing Gateway', status: 'Operational', uptime: '99.95%' },
                  { service: 'Live Stats Sync (WebSockets)', status: 'Operational', uptime: '100%' },
                  { service: 'Payment Processor', status: 'Degraded', uptime: '98.20%' },
                ].map(svc => (
                  <div key={svc.service} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <div>
                      <div style={{ color: 'white', fontWeight: 600, marginBottom: '4px' }}>{svc.service}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-light-muted)' }}>Uptime: {svc.uptime}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: svc.status === 'Operational' ? 'var(--liquid-green)' : 'var(--liquid-gold)', fontSize: '0.85rem', fontWeight: 700 }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: svc.status === 'Operational' ? 'var(--liquid-green)' : 'var(--liquid-gold)' }} />
                      {svc.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="glass-card-dark" style={{ padding: '32px' }}>
              <h3 style={{ color: 'white', fontSize: '1.2rem', marginBottom: '24px' }}>Global Traffic Analytics</h3>
              <div style={{ height: '200px', border: '1px dashed rgba(255,255,255,0.2)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-light-muted)', marginBottom: '24px' }}>
                [ Real-time chart visualization placeholder ]
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'white' }}>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-light-muted)' }}>Current Active Users</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>1.2M</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-light-muted)' }}>Requests / Sec</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>45,210</div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
