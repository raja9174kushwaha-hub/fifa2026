'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, ShoppingCart, Filter, Sparkles, Trophy, ChevronRight } from 'lucide-react';

export default function StorePage() {
  const [activePortal, setActivePortal] = useState('Collect'); // 'Store' or 'Collect'
  const [productsData, setProductsData] = useState({ merchandise: [], collectibles: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProductsData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch products", err);
        setLoading(false);
      });
  }, []);
  
  return (
    <div style={{ paddingBottom: 'var(--space-3xl)', background: activePortal === 'Collect' ? 'var(--fifa-dark)' : 'var(--bg-content)', minHeight: '100vh' }}>
      
      {/* Portal Toggle Header */}
      <div style={{ background: activePortal === 'Collect' ? '#000' : 'white', borderBottom: `1px solid ${activePortal === 'Collect' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`, padding: '16px 24px', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          
          <div style={{ display: 'flex', gap: '8px', background: activePortal === 'Collect' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)', padding: '4px', borderRadius: 'var(--radius-full)' }}>
            <button 
              onClick={() => setActivePortal('Store')}
              style={{ 
                padding: '8px 24px', border: 'none', borderRadius: 'var(--radius-full)', fontWeight: 800, fontSize: '0.9rem', cursor: 'pointer', transition: 'all 0.3s',
                background: activePortal === 'Store' ? 'var(--fifa-navy)' : 'transparent',
                color: activePortal === 'Store' ? 'white' : (activePortal === 'Collect' ? 'rgba(255,255,255,0.5)' : 'var(--text-muted)')
              }}
            >
              SHOP MERCH
            </button>
            <button 
              onClick={() => setActivePortal('Collect')}
              style={{ 
                padding: '8px 24px', border: 'none', borderRadius: 'var(--radius-full)', fontWeight: 800, fontSize: '0.9rem', cursor: 'pointer', transition: 'all 0.3s', display: 'flex', alignItems: 'center', gap: '6px',
                background: activePortal === 'Collect' ? 'var(--liquid-purple)' : 'transparent',
                color: activePortal === 'Collect' ? 'white' : (activePortal === 'Store' ? 'rgba(0,0,0,0.5)' : 'var(--text-muted)')
              }}
            >
              <Sparkles size={16} /> FIFA+ COLLECT
            </button>
          </div>

          <div style={{ display: 'flex', gap: '16px', color: activePortal === 'Collect' ? 'white' : 'var(--fifa-dark)' }}>
            <button aria-label="Search" style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}><Search size={24} /></button>
            <button aria-label="Shopping Cart" style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', position: 'relative' }}>
              <ShoppingCart size={24} />
              <span style={{ position: 'absolute', top: '-8px', right: '-8px', background: 'var(--liquid-pink)', color: 'white', fontSize: '0.7rem', padding: '2px 6px', borderRadius: '10px', fontWeight: 800 }}>0</span>
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '100px', color: activePortal === 'Collect' ? 'rgba(255,255,255,0.5)' : 'var(--text-muted)' }}>Loading Store Data...</div>
      ) : activePortal === 'Store' ? (
        <div className="fade-in">
          {/* Merch Hero */}
          <div style={{ background: 'url(https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&q=80&w=1600) center/cover', height: '400px', display: 'flex', alignItems: 'flex-end', padding: '64px 24px', position: 'relative' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(15,23,42,0.9), transparent)' }} />
            <div style={{ position: 'relative', zIndex: 1, maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
              <span className="badge badge-info" style={{ marginBottom: '16px', display: 'inline-block' }}>OFFICIAL APPAREL</span>
              <h1 style={{ color: 'white', fontSize: '3rem', marginBottom: '16px' }}>REPRESENT YOUR NATION</h1>
              <button className="btn-glass" style={{ background: 'white', color: 'var(--fifa-navy)', border: 'none', padding: '12px 32px' }}>Shop Kits</button>
            </div>
          </div>
          
          <div style={{ maxWidth: '1400px', margin: '64px auto', padding: '0 24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
              <h2 style={{ fontSize: '2rem' }}>Latest Drops</h2>
              <button style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: 'var(--fifa-navy)', fontWeight: 700, cursor: 'pointer' }}>
                View All <ChevronRight size={16} />
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '32px' }}>
              {productsData.merchandise.map((item) => (
                <div key={item.id} className="glass-card" style={{ overflow: 'hidden', cursor: 'pointer', transition: 'all 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                  <div style={{ height: '300px', background: `url(${item.image}) center/cover`, position: 'relative' }}>
                    {item.tag && (
                      <div style={{ position: 'absolute', top: 16, left: 16, background: 'white', color: 'var(--fifa-dark)', fontSize: '0.7rem', padding: '4px 8px', borderRadius: '4px', fontWeight: 800 }}>
                        {item.tag.toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div style={{ padding: '24px' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>{item.category}</div>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', minHeight: '48px' }}>{item.name}</h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '1.3rem', fontWeight: 800 }}>${item.price}</span>
                      <button 
                        className="btn-glass" 
                        style={{ padding: '8px 16px', fontSize: '0.9rem', background: 'var(--fifa-navy)', color: 'white' }}
                        onClick={(e) => { e.preventDefault(); alert(`Added ${item.name} to cart!`); }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="fade-in">
          {/* Collectibles Hero */}
          <div style={{ padding: '80px 24px', textAlign: 'center', background: 'url(https://images.unsplash.com/photo-1614632537197-38a17061c2bd?auto=format&fit=crop&q=80&w=1600) center/cover', position: 'relative' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.8)' }} />
            <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px', margin: '0 auto' }}>
              <Trophy size={64} color="var(--liquid-purple)" style={{ margin: '0 auto 24px' }} />
              <h1 style={{ color: 'white', fontSize: '3.5rem', marginBottom: '24px', lineHeight: 1.1 }}>OWN A PIECE OF FOOTBALL HISTORY</h1>
              <p style={{ color: 'var(--text-light-secondary)', fontSize: '1.2rem', marginBottom: '40px' }}>
                Collect, trade, and showcase officially licensed digital moments from the FIFA World Cup™.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
                <button className="btn-glass" style={{ background: 'var(--liquid-purple)', color: 'white', border: 'none', padding: '16px 32px', fontSize: '1.1rem' }}>Browse Packs</button>
                <button className="btn-glass" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', padding: '16px 32px', fontSize: '1.1rem' }}>My Portfolio</button>
              </div>
            </div>
          </div>

          {/* Recent Marketplace Listings */}
          <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px 64px' }}>
            <h2 style={{ color: 'white', textAlign: 'center', fontSize: '2rem', marginBottom: '32px' }}>Recent Marketplace Listings</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
              {productsData.collectibles.map((item) => (
                <div key={item.id} className="glass-card-dark" style={{ cursor: 'pointer', transition: 'all 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                  <div style={{ aspectRatio: '1', background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: 12, left: 12, background: 'var(--liquid-purple)', color: 'white', fontSize: '0.7rem', padding: '4px 8px', borderRadius: '4px', fontWeight: 700 }}>
                      {item.type}
                    </div>
                    {item.logo}
                  </div>
                  <div style={{ padding: '20px' }}>
                    <div style={{ color: 'var(--text-light-secondary)', fontSize: '0.8rem', marginBottom: '4px' }}>{item.club}</div>
                    <h3 style={{ color: 'white', fontSize: '1.1rem', marginBottom: '16px', minHeight: '40px' }}>{item.name}</h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                      <span style={{ color: 'white', fontWeight: 800 }}>${item.price}</span>
                      <button 
                        className="btn-glass" 
                        style={{ padding: '6px 16px', fontSize: '0.8rem', background: 'white', color: 'black' }}
                        onClick={(e) => { e.preventDefault(); alert(`Purchased NFT: ${item.name}!`); }}
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
