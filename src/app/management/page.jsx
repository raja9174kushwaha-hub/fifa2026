'use client';
import { useState } from 'react';
import { Shield, Calendar, Package, Lock, FileText, Settings, Users, Activity } from 'lucide-react';

export default function ManagementDashboardPage() {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div style={{ paddingBottom: 'var(--space-3xl)' }}>
      {/* Header */}
      <div style={{ background: 'var(--fifa-dark)', padding: 'var(--space-xl) var(--space-lg)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
            <h1 style={{ color: 'white', fontSize: '2.5rem', margin: 0 }}>Management Dashboard</h1>
            <span className="badge badge-warning"><Lock size={12}/> STAFF ONLY</span>
          </div>
          <p style={{ color: 'var(--text-light-secondary)', maxWidth: '600px', fontSize: '0.95rem' }}>
            Internal operations and management portal for FIFA Staff.
          </p>
          
          <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
            {['Overview', 'Match Operations', 'Inventory'].map(tab => (
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
        
        {/* === OVERVIEW === */}
        {activeTab === 'Overview' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px' }}>
            <div className="glass-card" style={{ padding: '32px', textAlign: 'center' }}>
              <Activity size={48} color="var(--liquid-blue)" style={{ margin: '0 auto 16px' }} />
              <h3>System Status</h3>
              <p style={{ color: 'var(--success-color)', fontWeight: 'bold' }}>All Systems Operational</p>
            </div>
            <div className="glass-card" style={{ padding: '32px', textAlign: 'center' }}>
              <Users size={48} color="var(--liquid-purple)" style={{ margin: '0 auto 16px' }} />
              <h3>Active Staff</h3>
              <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>1,432 Online</p>
            </div>
            <div className="glass-card" style={{ padding: '32px', textAlign: 'center' }}>
              <Shield size={48} color="var(--warning-color)" style={{ margin: '0 auto 16px' }} />
              <h3>Security Alerts</h3>
              <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>0 Active Incidents</p>
            </div>
          </div>
        )}

        {/* === MATCH OPERATIONS === */}
        {activeTab === 'Match Operations' && (
          <div>
            <h2 className="section-title">Today&apos;s Operations</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { time: '14:00 PM', task: 'Pre-match Stadium Inspection', venue: 'Los Angeles Stadium', status: 'Pending' },
                { time: '16:00 PM', task: 'Team Arrival Logistics', venue: 'Los Angeles Stadium', status: 'In Progress' },
                { time: '19:30 PM', task: 'Broadcasting Setup Verification', venue: 'Dallas Stadium', status: 'Completed' },
              ].map((item, i) => (
                <div key={i} className="glass-card" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '32px' }}>
                  <div style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--liquid-purple)', minWidth: '100px' }}>
                    {item.time}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>{item.task}</h3>
                    <div style={{ display: 'flex', gap: '24px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      <span>📍 {item.venue}</span>
                    </div>
                  </div>
                  <div style={{ 
                    padding: '6px 12px', 
                    borderRadius: '4px', 
                    fontSize: '0.85rem',
                    fontWeight: 'bold',
                    background: item.status === 'Completed' ? 'rgba(40, 167, 69, 0.2)' : 
                               item.status === 'In Progress' ? 'rgba(255, 193, 7, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                    color: item.status === 'Completed' ? '#4ade80' : 
                           item.status === 'In Progress' ? '#fbbf24' : 'var(--text-muted)'
                  }}>
                    {item.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* === INVENTORY === */}
        {activeTab === 'Inventory' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
              <h2 className="section-title" style={{ margin: 0 }}>Merchandise Inventory</h2>
              <button className="btn-glass btn-glass-primary">Add New Item</button>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
              {[
                { name: 'Official Match Ball', stock: 1250, status: 'Healthy', icon: <Package size={32}/> },
                { name: 'World Cup Replica Trophy', stock: 42, status: 'Low Stock', icon: <Package size={32}/> },
                { name: 'Commemorative Scarf', stock: 5000, status: 'Healthy', icon: <Package size={32}/> },
                { name: 'Premium Hospitality Passes', stock: 0, status: 'Out of Stock', icon: <FileText size={32}/> },
              ].map((asset, i) => (
                <div key={i} className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ marginBottom: '24px', color: 'var(--text-muted)' }}>{asset.icon}</div>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', lineHeight: 1.3 }}>{asset.name}</h3>
                  
                  <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--glass-border-light)', paddingTop: '16px' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Stock: {asset.stock}</span>
                    <span style={{ 
                      fontSize: '0.85rem', 
                      color: asset.status === 'Healthy' ? '#4ade80' : 
                             asset.status === 'Low Stock' ? '#fbbf24' : '#f87171' 
                    }}>
                      {asset.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
