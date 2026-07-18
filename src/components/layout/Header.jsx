'use client';
import { useState } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Menu, X, Search, User, Globe, ChevronDown, Trophy, ShoppingBag, Gift, Sparkles, ShieldAlert } from 'lucide-react';
import AssistantWidget from './AssistantWidget';

/**
 * Header component for the application.
 * Contains navigation, user profile, and search functionality.
 *
 * @param {Object} props
 * @param {Object} [props.session] - NextAuth session object
 */
export default function Header({ session }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [langOpen, setLangOpen] = useState(false);

  const tournamentNav = [
    { label: 'MATCHES', href: '/matches' },
    { label: 'STANDINGS', href: '/standings' },
    { label: 'TEAMS & STATS', href: '/teams', hasDropdown: true },
    { label: 'LATEST', href: '/news', hasDropdown: true },
    { label: 'FANTASY & GAMING', href: '/gaming', hasDropdown: true },
    { label: 'TICKETS & HOSPITALITY', href: '/tickets', hasDropdown: true },
    { label: 'MORE', href: '/about', hasDropdown: true },
  ];

  const ecosystemLinks = [
    { label: 'FIFA REWARDS', href: '/rewards', icon: <Gift size={14} /> },
    { label: 'FIFA+', href: '/plus', icon: <Sparkles size={14} /> },
    { label: 'FIFA STORE', href: '/store', icon: <ShoppingBag size={14} /> },
    { label: 'FIFA COLLECT', href: '/store', icon: <Trophy size={14} /> },
  ];

  const searchSuggestions = [
    { type: 'Match', text: 'Spain v Belgium — Quarter-Final' },
    { type: 'Player', text: 'Erling Haaland — Norway' },
    { type: 'Team', text: 'France — Squad & Stats' },
    { type: 'Article', text: 'Knockout stage fixtures and results' },
    { type: 'Stadium', text: 'MetLife Stadium — New York/New Jersey' },
  ].filter(s => !searchQuery || s.text.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <>
      <header style={{ position: 'sticky', top: 0, zIndex: 100, fontFamily: 'var(--font-accent)' }}>
        {/* === ROW 1: Eyebrow Ribbon === */}
        <div style={{
          background: 'var(--fifa-dark)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          padding: '0 24px',
          height: '48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          {/* Left: Hamburger + Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{ background: 'none', border: 'none', color: 'var(--text-light)', cursor: 'pointer', padding: '4px' }}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontFamily: 'var(--font-accent)', fontWeight: 900, fontSize: '1.5rem', color: 'white', letterSpacing: '-0.02em' }}>
                FIFA
              </span>
            </Link>
          </div>

          {/* Right: Ecosystem Links + Language + Search + Account */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            {/* Ecosystem portal links */}
            <nav style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
              {ecosystemLinks.map((link, i) => (
                <Link
                  key={i}
                  href={link.href}
                  style={{
                    color: 'var(--text-light-secondary)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    padding: '6px 14px',
                    borderRadius: 'var(--radius-full)',
                    transition: 'color 0.2s',
                    letterSpacing: '0.02em',
                  }}
                  onMouseEnter={(e) => e.target.style.color = 'white'}
                  onMouseLeave={(e) => e.target.style.color = 'var(--text-light-secondary)'}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Divider */}
            <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.15)', margin: '0 8px' }} />

            {/* Language Switcher */}
            <button
              onClick={() => setLangOpen(!langOpen)}
              style={{
                background: 'none', border: 'none',
                color: 'var(--text-light)', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '6px',
                fontSize: '0.8rem', fontWeight: 600, padding: '6px 10px',
                borderRadius: 'var(--radius-full)',
              }}
              aria-label="Language selector"
              aria-expanded={langOpen}
            >
              <Globe size={16} /> English <ChevronDown size={12} />
            </button>

            {/* Divider */}
            <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.15)', margin: '0 4px' }} />

            {/* Search */}
            <button
              onClick={() => setSearchOpen(true)}
              style={{ background: 'none', border: 'none', color: 'var(--text-light)', cursor: 'pointer', padding: '8px' }}
              aria-label="Search"
            >
              <Search size={18} />
            </button>

            {/* Account */}
            {session ? (
              <Link href="/profile" style={{ 
                color: 'var(--fifa-dark)', background: 'white', 
                padding: '4px 12px', borderRadius: 'var(--radius-full)',
                display: 'flex', alignItems: 'center', gap: '8px',
                fontSize: '0.8rem', fontWeight: 800
              }}>
                <User size={14} /> 
                {session.user.name.split(' ')[0]}
                {session.user.role === 'admin' && <ShieldAlert size={12} color="var(--liquid-pink)" />}
              </Link>
            ) : (
              <Link href="/login" style={{ 
                color: 'var(--text-light)', padding: '6px 12px', 
                display: 'flex', alignItems: 'center', gap: '6px',
                fontSize: '0.85rem', fontWeight: 600
              }}>
                <User size={16} /> Sign In
              </Link>
            )}
          </div>
        </div>

        {/* === ROW 2: Tournament Navigation === */}
        <div style={{
          background: 'var(--fifa-navy)',
          padding: '0 24px',
          height: '52px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          overflowX: 'auto',
        }}>
          {/* Tournament Logo + Title */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0, marginRight: '16px' }}>
            <span style={{ fontSize: '1.6rem' }}>🏆</span>
            <span style={{
              color: 'white', fontWeight: 800, fontSize: '0.85rem',
              letterSpacing: '0.03em', whiteSpace: 'nowrap',
            }}>
              FIFA WORLD CUP 2026™
            </span>
          </Link>

          {/* Nav Items */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
            {tournamentNav.map((item, i) => (
              <Link
                key={i}
                href={item.href}
                style={{
                  color: 'var(--text-light-secondary)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-sm)',
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  letterSpacing: '0.02em',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'white'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-light-secondary)'; e.currentTarget.style.background = 'transparent'; }}
              >
                {item.label}
                {item.hasDropdown && <ChevronDown size={12} />}
              </Link>
            ))}
          </nav>
          <div style={{ marginLeft: 'auto', position: 'relative' }}>
            <AssistantWidget />
          </div>
        </div>
      </header>

      {/* === SEARCH OVERLAY === */}
      {searchOpen && (
        <>
          <div
            style={{
              position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
              background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
              zIndex: 200,
            }}
            onClick={() => setSearchOpen(false)}
          />
          <div style={{
            position: 'fixed', top: '80px', left: '50%', transform: 'translateX(-50%)',
            width: '90%', maxWidth: '640px',
            background: 'white', borderRadius: 'var(--radius-xl)',
            boxShadow: '0 25px 60px rgba(0,0,0,0.2)',
            zIndex: 201, overflow: 'hidden',
          }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--glass-border-light)', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Search size={20} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
              <input
                aria-label="Search the FIFA portal"
                type="text"
                placeholder="Search matches, teams, players, articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                style={{
                  flex: 1, border: 'none', outline: 'none',
                  fontSize: '1rem', color: 'var(--text-dark)',
                  fontFamily: 'var(--font-main)',
                }}
              />
              <button aria-label="Close search" onClick={() => setSearchOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                <X size={18} />
              </button>
            </div>
            <div style={{ maxHeight: '360px', overflowY: 'auto' }}>
              {searchSuggestions.map((s, i) => (
                <Link
                  key={i}
                  href="/"
                  onClick={() => setSearchOpen(false)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '12px',
                    padding: '12px 20px',
                    borderBottom: '1px solid rgba(0,0,0,0.03)',
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.02)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <span className="badge badge-info" style={{ flexShrink: 0, fontSize: '0.6rem' }}>{s.type}</span>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-dark)' }}>{s.text}</span>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}

      {/* === MOBILE SLIDE-OUT MENU === */}
      {mobileOpen && (
        <>
          <div
            style={{
              position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
              background: 'rgba(0,0,0,0.5)',
              zIndex: 150,
            }}
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <div 
            id="mobile-menu"
            style={{
            position: 'fixed', top: 0, left: 0, bottom: 0,
            width: '320px', maxWidth: '85vw',
            background: 'var(--fifa-dark)',
            zIndex: 151,
            padding: '24px',
            overflowY: 'auto',
            boxShadow: '4px 0 24px rgba(0,0,0,0.4)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
              <span style={{ fontWeight: 900, fontSize: '1.4rem', color: 'white' }}>FIFA</span>
              <button aria-label="Close menu" onClick={() => setMobileOpen(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
                <X size={22} />
              </button>
            </div>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {[
                { label: '🏠 Home', href: '/' },
                { label: '⚽ Matches', href: '/matches' },
                { label: '📊 Standings', href: '/standings' },
                { label: '👥 Teams & Stats', href: '/teams' },
                { label: '🎟️ Tickets & Hospitality', href: '/tickets' },
                { label: '🏟️ Stadiums', href: '/stadiums' },
                { label: '🏢 Management', href: '/management' },
                { label: '🛍️ Store & Collect', href: '/store' },
                { label: '🔒 Admin Operations', href: '/admin' },
                { label: '👤 Profile', href: '/profile' },
              ].map((item, i) => (
                <Link
                  key={i}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    color: 'var(--text-light-secondary)',
                    fontSize: '0.95rem', fontWeight: 600,
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-md)',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'white'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-light-secondary)'; }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </>
      )}
    </>
  );
}

Header.propTypes = {
  session: PropTypes.shape({
    user: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
      role: PropTypes.string,
    }),
  }),
};
