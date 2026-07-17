'use client';
import Link from 'next/link';

export default function Footer() {
  const footerColumns = [
    {
      title: 'FIFA World Cup 2026™',
      links: [
        { label: 'Matches', href: '/matches' },
        { label: 'Standings', href: '/standings' },
        { label: 'Teams & Stats', href: '/teams' },
        { label: 'Tickets & Hospitality', href: '/tickets' },
        { label: 'Fantasy & Gaming', href: '/gaming' },
        { label: 'Host Cities', href: '/stadiums' },
      ],
    },
    {
      title: 'FIFA Tournaments',
      links: [
        { label: 'FIFA Club World Cup', href: '/about' },
        { label: "FIFA Women's World Cup", href: '/about' },
        { label: 'FIFA U-20 World Cup', href: '/about' },
        { label: 'FIFA U-17 World Cup', href: '/about' },
        { label: 'FIFA Futsal World Cup', href: '/about' },
      ],
    },
    {
      title: 'About FIFA',
      links: [
        { label: 'Inside FIFA', href: '/about' },
        { label: 'Sustainability', href: '/about' },
        { label: 'Media Releases', href: '/news' },
        { label: 'Legal Information', href: '/about' },
        { label: 'Contact FIFA', href: '/about' },
      ],
    },
    {
      title: 'FIFA Platforms',
      links: [
        { label: 'FIFA+', href: '/plus' },
        { label: 'FIFA Rewards', href: '/rewards' },
        { label: 'FIFA Store', href: '/store' },
        { label: 'FIFA Collect', href: '/store' },
        { label: 'FIFA Play', href: '/gaming' },
      ],
    },
  ];

  const socialLinks = [
    { label: 'Follow FIFA on X', icon: '𝕏', href: 'https://x.com/FIFAcom' },
    { label: 'Follow FIFA on Instagram', icon: '📷', href: 'https://www.instagram.com/fifa/' },
    { label: 'Watch FIFA on YouTube', icon: '▶️', href: 'https://www.youtube.com/@FIFA' },
  ];

  return (
    <footer style={{
      background: 'var(--fifa-dark)',
      color: 'var(--text-light-secondary)',
      borderTop: '1px solid rgba(255,255,255,0.06)',
    }}>
      {/* Main Footer Grid */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '48px 24px 32px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '32px',
          marginBottom: '40px',
        }}>
          {footerColumns.map((col, ci) => (
            <div key={ci}>
              <h4 style={{
                fontFamily: 'var(--font-accent)',
                fontWeight: 700,
                fontSize: '0.85rem',
                color: 'var(--text-light)',
                marginBottom: '16px',
                letterSpacing: '0.02em',
              }}>
                {col.title}
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      style={{
                        fontSize: '0.8rem',
                        color: 'var(--text-light-muted)',
                        transition: 'color 0.2s',
                      }}
                      onMouseEnter={(e) => e.target.style.color = 'white'}
                      onMouseLeave={(e) => e.target.style.color = 'var(--text-light-muted)'}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social + Partners Row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          paddingTop: '24px',
          flexWrap: 'wrap',
          gap: '16px',
        }}>
          {/* Social Icons */}
          <div style={{ display: 'flex', gap: '12px' }}>
            {socialLinks.map(({ label, icon, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                style={{
                  width: '36px', height: '36px',
                  borderRadius: '50%',
                  border: '1px solid rgba(255,255,255,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--text-light-muted)',
                  transition: 'all 0.3s',
                  fontSize: '14px',
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--liquid-blue)'; e.currentTarget.style.color = 'var(--liquid-blue)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'var(--text-light-muted)'; }}
              >
                <span aria-hidden="true">{icon}</span>
              </a>
            ))}
          </div>

          {/* Tournament Partners */}
          <div style={{ fontSize: '0.7rem', color: 'var(--text-light-muted)', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            {['adidas', 'Coca-Cola', 'Hyundai•KIA', 'VISA', 'Wanda Group', 'Hisense', 'Vivo', 'McDonald\'s'].map((partner) => (
              <span key={partner} style={{ opacity: 0.5 }}>{partner}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Legal Bar */}
      <div style={{
        background: 'rgba(0,0,0,0.3)',
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '0.7rem',
        color: 'var(--text-light-muted)',
        flexWrap: 'wrap',
        gap: '12px',
      }}>
        <span>© FIFA 2026. All rights reserved. (Demo Project — Not Affiliated)</span>
        <div style={{ display: 'flex', gap: '16px' }}>
          <Link href="/about" style={{ color: 'var(--text-light-muted)' }}>Privacy Policy</Link>
          <Link href="/about" style={{ color: 'var(--text-light-muted)' }}>Terms of Service</Link>
          <Link href="/about" style={{ color: 'var(--text-light-muted)' }}>Cookie Settings</Link>
        </div>
      </div>
    </footer>
  );
}
