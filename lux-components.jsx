
const { useState, useEffect, useRef } = React;

// ─── LOGO ──────────────────────────────────────────────────
const LuxLogo = ({ onClick, size = 'md' }) => {
  const s = size === 'sm' ? 20 : 26;
  const fs = size === 'sm' ? 16 : 20;
  return (
    <button onClick={onClick} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '11px', padding: 0 }}>
      <svg width={s} height={s} viewBox="0 0 26 26" fill="none">
        <polygon points="13,1 25,13 13,25 1,13" stroke="#C9A84C" strokeWidth="1" fill="none"/>
        <polygon points="13,7 19,13 13,19 7,13" fill="#C9A84C"/>
      </svg>
      <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: fs, letterSpacing: '4px', color: '#F0EEE8', lineHeight: 1 }}>LUXDRIVE</span>
    </button>
  );
};

// ─── BUTTONS ───────────────────────────────────────────────
const Btn = ({ children, variant = 'gold', onClick, style: extra = {}, disabled, type = 'button' }) => {
  const cls = { gold: 'btn-gold', ghost: 'btn-ghost', danger: 'btn-danger', success: 'btn-success' }[variant] || 'btn-ghost';
  return (
    <button type={type} className={cls} onClick={!disabled ? onClick : undefined} disabled={disabled}
      style={{ opacity: disabled ? 0.4 : 1, cursor: disabled ? 'not-allowed' : 'pointer', ...extra }}>
      {children}
    </button>
  );
};

// ─── NAV ───────────────────────────────────────────────────
const LuxNav = ({ route, navigate, user, profile, onLogout, openAuth }) => {
  const [cityOpen,     setCityOpen]     = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled,     setScrolled]     = useState(false);
  const cities = CITIES.filter(c => c.active);
  const currentCity = route.city ? route.city.charAt(0).toUpperCase() + route.city.slice(1) : 'Lyon';

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const agencyName = profile?.agency_name || user?.user_metadata?.agency_name || user?.email?.split('@')[0] || 'Mon compte';
  const isAdmin    = profile?.role === 'admin' || user?.user_metadata?.role === 'admin';
  const initials   = agencyName.slice(0, 2).toUpperCase();

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
      height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 52px',
      background: scrolled ? 'rgba(10,10,15,0.96)' : 'linear-gradient(to bottom, rgba(10,10,15,0.88), transparent)',
      backdropFilter: scrolled ? 'blur(20px) saturate(1.4)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent',
      transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
    }}>
      <LuxLogo onClick={() => navigate({ page: 'home', city: route.city || 'lyon' })} />

      <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
        <button className="nav-link" onClick={() => navigate({ page: 'listings', city: route.city || 'lyon' })}
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '11px', fontFamily: 'var(--font-ui)', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
          Annonces
        </button>
        <button className="nav-link" onClick={() => navigate({ page: 'blog' })}
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '11px', fontFamily: 'var(--font-ui)', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
          Blog
        </button>

        {/* CitySelector */}
        <div style={{ position: 'relative' }}>
          <button onClick={() => setCityOpen(!cityOpen)}
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', color: '#F0EEE8', padding: '7px 14px', borderRadius: '2px', cursor: 'pointer', fontFamily: 'var(--font-ui)', fontSize: '11px', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '10px', transition: 'border-color 0.2s', textTransform: 'uppercase' }}
            onMouseOver={e => e.currentTarget.style.borderColor = 'rgba(201,168,76,0.4)'}
            onMouseOut={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)'}>
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#C9A84C', flexShrink: 0, boxShadow: '0 0 6px rgba(201,168,76,0.5)' }}></span>
            {currentCity}
            <svg width="9" height="5" viewBox="0 0 9 5" fill="none" style={{ transform: cityOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}><path d="M1 1L4.5 4L8 1" stroke="rgba(240,238,232,0.35)" strokeWidth="1.3" strokeLinecap="round"/></svg>
          </button>
          {cityOpen && (
            <div className="glass" style={{ position: 'absolute', top: 'calc(100% + 6px)', left: 0, border: '1px solid rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden', minWidth: '190px', zIndex: 300, boxShadow: '0 20px 52px rgba(0,0,0,0.6)' }}>
              {cities.map(c => (
                <button key={c.slug} onClick={() => { navigate({ page: 'city', city: c.slug }); setCityOpen(false); }}
                  style={{ width: '100%', background: c.slug === route.city ? 'rgba(201,168,76,0.08)' : 'transparent', border: 'none', color: c.slug === route.city ? '#C9A84C' : '#F0EEE8', padding: '11px 16px', textAlign: 'left', cursor: 'pointer', fontFamily: 'var(--font-ui)', fontSize: '12px', borderBottom: '1px solid rgba(255,255,255,0.04)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', letterSpacing: '0.5px', transition: 'background 0.15s' }}
                  onMouseOver={e => { if (c.slug !== route.city) e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
                  onMouseOut={e => { if (c.slug !== route.city) e.currentTarget.style.background = 'transparent'; }}>
                  {c.name}
                  <span style={{ color: '#C9A84C', fontSize: '10px', fontFamily: 'var(--font-mono)' }}>{c.count}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <button className="nav-link" onClick={() => navigate({ page: 'annonceurs' })}
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '11px', fontFamily: 'var(--font-ui)', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
          Annonceurs
        </button>
      </div>

      {/* Auth zone */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {!user ? (
          <>
            <Btn variant="ghost" onClick={openAuth} style={{ padding: '8px 18px' }}>Se connecter</Btn>
            <Btn variant="gold"  onClick={() => openAuth && openAuth('signup')} style={{ padding: '8px 18px' }}>Devenir annonceur</Btn>
          </>
        ) : (
          <div style={{ position: 'relative' }}>
            <button onClick={() => setUserMenuOpen(!userMenuOpen)}
              style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '2px', padding: '7px 14px', cursor: 'pointer', transition: 'border-color 0.2s' }}
              onMouseOver={e => e.currentTarget.style.borderColor = 'rgba(201,168,76,0.4)'}
              onMouseOut={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)'}>
              <span style={{ width: '26px', height: '26px', borderRadius: '50%', background: 'linear-gradient(135deg, #C9A84C, #8B6914)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 700, color: '#0A0A0F', fontFamily: 'var(--font-ui)', flexShrink: 0 }}>{initials}</span>
              <span style={{ color: '#F0EEE8', fontSize: '12px', fontFamily: 'var(--font-ui)', maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{agencyName}</span>
              {isAdmin && <span style={{ background: 'rgba(201,168,76,0.15)', color: '#C9A84C', fontSize: '9px', letterSpacing: '1.5px', padding: '2px 7px', borderRadius: '2px', fontFamily: 'var(--font-ui)', fontWeight: 700 }}>ADMIN</span>}
              <svg width="9" height="5" viewBox="0 0 9 5" fill="none" style={{ transform: userMenuOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}><path d="M1 1L4.5 4L8 1" stroke="rgba(240,238,232,0.35)" strokeWidth="1.3" strokeLinecap="round"/></svg>
            </button>
            {userMenuOpen && (
              <div className="glass" style={{ position: 'absolute', top: 'calc(100% + 6px)', right: 0, border: '1px solid rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden', minWidth: '200px', zIndex: 300, boxShadow: '0 20px 52px rgba(0,0,0,0.6)' }}>
                <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <p style={{ color: 'var(--muted)', fontSize: '10px', fontFamily: 'var(--font-ui)', letterSpacing: '0.5px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.email}</p>
                </div>
                {[
                  { label: 'Mon tableau de bord', icon: '◈', page: 'dashboard' },
                  ...(isAdmin ? [{ label: 'Administration', icon: '⚙', page: 'admin' }] : []),
                ].map(item => (
                  <button key={item.page} onClick={() => { navigate({ page: item.page }); setUserMenuOpen(false); }}
                    style={{ width: '100%', background: 'transparent', border: 'none', color: '#F0EEE8', padding: '11px 16px', textAlign: 'left', cursor: 'pointer', fontFamily: 'var(--font-ui)', fontSize: '12px', borderBottom: '1px solid rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', gap: '10px', transition: 'background 0.15s' }}
                    onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                    onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
                    <span style={{ color: '#C9A84C', fontSize: '11px' }}>{item.icon}</span>
                    {item.label}
                  </button>
                ))}
                <button onClick={() => { onLogout(); setUserMenuOpen(false); }}
                  style={{ width: '100%', background: 'transparent', border: 'none', color: '#EF4444', padding: '11px 16px', textAlign: 'left', cursor: 'pointer', fontFamily: 'var(--font-ui)', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '10px', transition: 'background 0.15s' }}
                  onMouseOver={e => e.currentTarget.style.background = 'rgba(239,68,68,0.05)'}
                  onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
                  <span style={{ fontSize: '11px' }}>→</span>
                  Déconnexion
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

// ─── VEHICLE CARD ──────────────────────────────────────────
const CarCard = ({ car, navigate, size = 'md' }) => {
  const city = car.city?.charAt(0).toUpperCase() + car.city?.slice(1);
  return (
    <div className="vc-wrap" onClick={() => navigate({ page: 'detail', city: car.city, slug: car.slug })}
      style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '3px', overflow: 'hidden', cursor: 'pointer' }}>
      <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden', background: '#060610' }}>
        <img className="vc-img" src={car.image} alt={`Location ${car.brand} ${car.model} ${city}`}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,15,0.72) 0%, rgba(10,10,15,0.08) 55%, transparent 100%)', pointerEvents: 'none' }} />
        {!car.available && (
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,10,15,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ border: '1px solid rgba(240,238,232,0.25)', color: 'rgba(240,238,232,0.7)', padding: '6px 14px', fontSize: '10px', letterSpacing: '2.5px', textTransform: 'uppercase', fontFamily: 'var(--font-ui)' }}>Indisponible</span>
          </div>
        )}
        <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
          <span style={{ background: 'rgba(10,10,15,0.85)', border: '1px solid rgba(201,168,76,0.3)', color: '#C9A84C', padding: '3px 10px', fontSize: '9px', fontWeight: 700, letterSpacing: '2px', fontFamily: 'var(--font-ui)', textTransform: 'uppercase' }}>{car.brand}</span>
        </div>
        <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
          <span style={{ background: 'rgba(10,10,15,0.75)', color: 'rgba(240,238,232,0.5)', padding: '3px 9px', fontSize: '9px', letterSpacing: '1.5px', fontFamily: 'var(--font-ui)', textTransform: 'uppercase', border: '1px solid rgba(255,255,255,0.08)' }}>{city}</span>
        </div>
      </div>
      <div style={{ padding: size === 'sm' ? '14px' : '18px' }}>
        <h3 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: size === 'sm' ? '20px' : '24px', letterSpacing: '1px', color: '#F0EEE8', marginBottom: '4px', lineHeight: 1 }}>{car.model}</h3>
        <p style={{ color: 'var(--muted)', fontSize: '11px', marginBottom: '14px' }}>{car.year} · {car.fuel} · {car.power}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <span className="price-mono" style={{ fontSize: size === 'sm' ? '20px' : '23px', fontWeight: 500, color: '#C9A84C' }}>{car.price.toLocaleString('fr-FR')} €</span>
            <span style={{ color: 'var(--muted)', fontSize: '11px', marginLeft: '3px' }}>/jour</span>
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', color: '#C9A84C', fontSize: '12px' }}>★ {car.rating}</span>
        </div>
        <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <AgencyBadgeMini name={car.agency} verified={true} />
          <span style={{ fontSize: '10px', color: 'var(--muted)', letterSpacing: '0.5px' }}>Voir →</span>
        </div>
      </div>
    </div>
  );
};

// ─── AGENCY BADGE MINI ─────────────────────────────────────
const AgencyBadgeMini = ({ name, verified }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
    <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '7px', color: '#C9A84C', fontWeight: 700 }}>{name?.[0]}</div>
    <span style={{ fontSize: '10px', color: 'rgba(240,238,232,0.5)' }}>{name}</span>
    {verified && <span style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.2)', color: '#22C55E', padding: '1px 5px', fontSize: '7px', fontWeight: 700, letterSpacing: '1px' }}>✓</span>}
  </div>
);

// ─── AGENCY BADGE FULL ─────────────────────────────────────
const AgencyBadge = ({ agency }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', background: 'var(--surface)', border: '1px solid var(--border)', padding: '18px 22px', borderRadius: '3px' }}>
    <div style={{ width: '46px', height: '46px', borderRadius: '50%', background: 'linear-gradient(135deg, rgba(201,168,76,0.25), rgba(201,168,76,0.08))', border: '1px solid rgba(201,168,76,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', color: '#C9A84C', fontFamily: 'Bebas Neue, sans-serif', flexShrink: 0 }}>
      {agency.name?.[0]}
    </div>
    <div style={{ flex: 1 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
        <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '18px', letterSpacing: '1px', color: '#F0EEE8' }}>{agency.name}</span>
        {agency.verified && <span style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.22)', color: '#22C55E', padding: '2px 7px', fontSize: '8px', fontWeight: 700, letterSpacing: '1.5px' }}>VÉRIFIÉ</span>}
      </div>
      <div style={{ display: 'flex', gap: '16px', fontSize: '11px', color: 'var(--muted)' }}>
        <span style={{ fontFamily: 'var(--font-mono)', color: '#C9A84C' }}>★ {agency.rating}</span>
        <span>{agency.count} véhicules</span>
        <span>Rép. {agency.response}</span>
      </div>
    </div>
  </div>
);

// ─── SECTION TITLE ─────────────────────────────────────────
const SectionTitle = ({ eyebrow, title, subtitle, centered, as = 'h2' }) => {
  const Title = as;
  return (
    <div style={{ textAlign: centered ? 'center' : 'left' }}>
      {eyebrow && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: centered ? 'center' : 'flex-start', marginBottom: '16px' }}>
          <span style={{ display: 'block', width: '28px', height: '1px', background: '#C9A84C' }}></span>
          <span style={{ color: '#C9A84C', fontSize: '10px', fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase', fontFamily: 'var(--font-ui)' }}>{eyebrow}</span>
        </div>
      )}
      <Title style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(32px, 4vw, 52px)', letterSpacing: '1px', lineHeight: 1.02, color: '#F0EEE8', marginBottom: subtitle ? '16px' : 0 }}>{title}</Title>
      {subtitle && <p style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: 1.75, maxWidth: centered ? '500px' : '620px', margin: centered ? '0 auto' : '0' }}>{subtitle}</p>}
    </div>
  );
};

// ─── BADGE ─────────────────────────────────────────────────
const Badge = ({ children, variant = 'default' }) => {
  const styles = {
    default: { background: 'rgba(255,255,255,0.05)', color: 'var(--muted)', border: '1px solid rgba(255,255,255,0.08)' },
    gold:    { background: 'rgba(201,168,76,0.12)', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.28)' },
    green:   { background: 'rgba(34,197,94,0.1)', color: '#22C55E', border: '1px solid rgba(34,197,94,0.22)' },
    red:     { background: 'rgba(239,68,68,0.1)', color: '#EF4444', border: '1px solid rgba(239,68,68,0.25)' },
    orange:  { background: 'rgba(251,146,60,0.1)', color: '#fb923c', border: '1px solid rgba(251,146,60,0.22)' },
    blue:    { background: 'rgba(59,130,246,0.1)', color: '#3B82F6', border: '1px solid rgba(59,130,246,0.22)' },
  };
  return <span style={{ ...styles[variant], padding: '3px 9px', borderRadius: '2px', fontSize: '10px', fontWeight: 600, letterSpacing: '0.8px', fontFamily: 'var(--font-ui)', display: 'inline-block', textTransform: 'uppercase' }}>{children}</span>;
};

// ─── FILTER PILL ───────────────────────────────────────────
const FilterPill = ({ label, active, onClick }) => (
  <button onClick={onClick} style={{ background: active ? '#C9A84C' : 'rgba(255,255,255,0.04)', border: `1px solid ${active ? '#C9A84C' : 'rgba(255,255,255,0.08)'}`, color: active ? '#0A0A0F' : 'rgba(240,238,232,0.65)', padding: '7px 16px', borderRadius: '2px', cursor: 'pointer', fontSize: '11px', fontFamily: 'var(--font-ui)', fontWeight: active ? 600 : 400, letterSpacing: '0.8px', transition: 'all 0.18s', whiteSpace: 'nowrap', textTransform: 'uppercase' }}>
    {label}
  </button>
);

// ─── GOLD DIVIDER ──────────────────────────────────────────
const GoldDivider = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
    <div style={{ height: '1px', flex: 1, background: 'rgba(255,255,255,0.05)' }} />
    <div style={{ width: '3px', height: '3px', transform: 'rotate(45deg)', background: '#C9A84C', opacity: 0.7 }} />
    <div style={{ height: '1px', flex: 1, background: 'rgba(255,255,255,0.05)' }} />
  </div>
);

// ─── SHIMMER ───────────────────────────────────────────────
const CardSkeleton = () => (
  <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '3px', overflow: 'hidden' }}>
    <div className="shimmer" style={{ aspectRatio: '16/9' }} />
    <div style={{ padding: '18px' }}>
      <div className="shimmer" style={{ height: '22px', width: '65%', marginBottom: '8px' }} />
      <div className="shimmer" style={{ height: '12px', width: '40%', marginBottom: '16px' }} />
      <div className="shimmer" style={{ height: '18px', width: '35%' }} />
    </div>
  </div>
);

// ─── REVIEWS CAROUSEL ──────────────────────────────────────
const REVIEWS = [
  { id: 1, name: 'Thomas D.', city: 'Lyon', car: 'Ferrari SF90', rating: 5, date: 'Avril 2026', text: "En 10 minutes j'avais trouvé et contacté l'agence. Avant LuxDrive je passais des heures sur Google. La Ferrari était exactement comme décrite, irréprochable." },
  { id: 2, name: 'Sophie M.', city: 'Paris', car: 'Lamborghini Huracán', rating: 5, date: 'Mars 2026', text: "Toutes les agences au même endroit, les prix affichés sans surprises. J'ai comparé 4 offres en 5 minutes. Service impeccable, je recommande à 100%." },
  { id: 3, name: 'Marc L.', city: 'Nice', car: 'Rolls-Royce Ghost', rating: 5, date: 'Mars 2026', text: "Pour l'anniversaire de ma femme, j'avais besoin d'une voiture d'exception rapidement. LuxDrive m'a répondu en moins d'une heure. Expérience de rêve." },
  { id: 4, name: 'Julie P.', city: 'Bordeaux', car: 'Porsche 911 Turbo S', rating: 5, date: 'Fév. 2026', text: "Fini de chercher partout — une seule recherche, toutes les offres disponibles dans ma ville. La Porsche était parfaite pour notre week-end en Gironde." },
  { id: 5, name: 'Alexandre B.', city: 'Marseille', car: 'Bentley Continental GT', rating: 5, date: 'Fév. 2026', text: "Interface ultra-simple, agence vérifiée, véhicule immaculé. LuxDrive est clairement la meilleure solution pour louer du prestige sans perdre de temps." },
  { id: 6, name: 'Camille R.', city: 'Lyon', car: 'McLaren 720S', rating: 5, date: 'Janv. 2026', text: "Le badge Partenaire Vérifié m'a mis en confiance. Tout s'est passé exactement comme promis. La McLaren était à couper le souffle, merci LuxDrive !" },
];

const ReviewsCarousel = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = REVIEWS.length;

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setActive(a => (a + 1) % total), 4500);
    return () => clearInterval(t);
  }, [paused]);

  const prev = () => setActive(a => (a - 1 + total) % total);
  const next = () => setActive(a => (a + 1) % total);

  // Show 3 cards
  const visible = [active, (active + 1) % total, (active + 2) % total];

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} style={{ position: 'relative' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '32px' }}>
        {visible.map((idx, pos) => {
          const r = REVIEWS[idx];
          return (
            <div key={r.id} style={{ background: 'var(--surface)', border: `1px solid ${pos === 1 ? 'rgba(201,168,76,0.3)' : 'var(--border)'}`, borderRadius: '3px', padding: '28px', transition: 'all 0.4s', transform: pos === 1 ? 'translateY(-4px)' : 'none', boxShadow: pos === 1 ? '0 16px 40px rgba(201,168,76,0.08)' : 'none' }}>
              {/* Stars */}
              <div style={{ display: 'flex', gap: '3px', marginBottom: '16px' }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} style={{ color: '#C9A84C', fontSize: '14px' }}>★</span>
                ))}
              </div>
              {/* Quote */}
              <p style={{ color: 'rgba(240,238,232,0.75)', fontSize: '14px', lineHeight: 1.8, fontStyle: 'italic', marginBottom: '20px', fontFamily: 'var(--font-ui)' }}>"{r.text}"</p>
              {/* Author */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '16px' }}>
                <div>
                  <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '16px', letterSpacing: '1px', color: '#F0EEE8' }}>{r.name}</div>
                  <div style={{ color: 'var(--muted)', fontSize: '11px' }}>{r.city}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)', color: '#C9A84C', padding: '3px 9px', fontSize: '10px', fontFamily: 'var(--font-ui)', marginBottom: '3px' }}>{r.car}</div>
                  <div style={{ color: 'rgba(240,238,232,0.25)', fontSize: '10px', fontFamily: 'var(--font-mono)' }}>{r.date}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '24px' }}>
        <button onClick={prev} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(240,238,232,0.5)', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s', fontSize: '14px' }}
          onMouseOver={e => { e.currentTarget.style.borderColor = '#C9A84C'; e.currentTarget.style.color = '#C9A84C'; }}
          onMouseOut={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(240,238,232,0.5)'; }}>←</button>
        <div style={{ display: 'flex', gap: '8px' }}>
          {REVIEWS.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} style={{ width: i === active ? '24px' : '6px', height: '6px', borderRadius: '3px', background: i === active ? '#C9A84C' : 'rgba(255,255,255,0.15)', border: 'none', cursor: 'pointer', transition: 'all 0.3s', padding: 0 }} />
          ))}
        </div>
        <button onClick={next} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(240,238,232,0.5)', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s', fontSize: '14px' }}
          onMouseOver={e => { e.currentTarget.style.borderColor = '#C9A84C'; e.currentTarget.style.color = '#C9A84C'; }}
          onMouseOut={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(240,238,232,0.5)'; }}>→</button>
      </div>
    </div>
  );
};

// ─── FAQ ACCORDION ─────────────────────────────────────────
const FAQ_ITEMS = [
  { q: "Comment fonctionne LuxDrive exactement ?", a: "LuxDrive est un agrégateur : nous réunissons toutes les annonces des agences de location de prestige en France sur une seule plateforme. Vous cherchez, comparez, puis contactez directement l'agence qui vous intéresse. Aucun intermédiaire, aucune commission cachée." },
  { q: "Est-ce gratuit pour les locataires ?", a: "Oui, totalement gratuit. LuxDrive est financé par les agences partenaires qui paient un abonnement pour publier leurs annonces. Vous accédez à toutes les offres sans frais supplémentaires." },
  { q: "Comment les agences sont-elles vérifiées ?", a: "Chaque agence partenaire est vérifiée par notre équipe : SIRET valide, assurance professionnelle, état de la flotte, avis clients. Le badge 'Partenaire Vérifié' n'est attribué qu'après validation complète." },
  { q: "Puis-je réserver directement en ligne ?", a: "Pour l'instant, LuxDrive vous met en relation avec l'agence via un formulaire de demande. L'agence vous répond sous 2h maximum pour confirmer la disponibilité et finaliser la réservation." },
  { q: "Quels types de véhicules trouve-t-on ?", a: "Supercars (Ferrari, Lamborghini, McLaren), Grand Tourisme (Bentley, Aston Martin, Porsche 911), Berlines de luxe (Rolls-Royce, Mercedes S63), SUV prestige, Cabriolets — de 200€ à 2 200€/jour selon les modèles." },
  { q: "Dans quelles villes êtes-vous disponibles ?", a: "Lyon, Paris, Marseille, Bordeaux et Nice. D'autres villes arrivent prochainement — Toulouse, Nantes, Strasbourg. Laissez votre email sur la page de votre ville pour être prévenu(e) en priorité." },
];

const FaqAccordion = () => {
  const [open, setOpen] = useState(null);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
      {FAQ_ITEMS.map((item, i) => (
        <div key={i} style={{ background: 'var(--surface)', border: `1px solid ${open === i ? 'rgba(201,168,76,0.25)' : 'var(--border)'}`, borderRadius: '3px', overflow: 'hidden', transition: 'border-color 0.2s' }}>
          <button onClick={() => setOpen(open === i ? null : i)}
            style={{ width: '100%', background: 'none', border: 'none', padding: '20px 24px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', textAlign: 'left' }}>
            <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '17px', letterSpacing: '0.5px', color: open === i ? '#C9A84C' : '#F0EEE8', transition: 'color 0.2s' }}>{item.q}</span>
            <span style={{ color: '#C9A84C', fontSize: '18px', flexShrink: 0, transform: open === i ? 'rotate(45deg)' : 'none', transition: 'transform 0.25s', lineHeight: 1 }}>+</span>
          </button>
          {open === i && (
            <div style={{ padding: '0 24px 20px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
              <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: 1.8, paddingTop: '16px' }}>{item.a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// ─── TRUST BAR ─────────────────────────────────────────────
const TrustBar = () => {
  const items = [
    { icon: '🔍', v: '287', l: 'Véhicules indexés' },
    { icon: '🏢', v: '32', l: 'Agences vérifiées' },
    { icon: '⚡', v: '< 2h', l: 'Délai de réponse garanti' },
    { icon: '€', v: '0€', l: 'Commission pour les locataires' },
    { icon: '★', v: '4.9/5', l: 'Note moyenne plateforme' },
    { icon: '📍', v: '5', l: 'Villes actives en France' },
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1px', background: 'rgba(255,255,255,0.04)' }}>
      {items.map(item => (
        <div key={item.l} style={{ background: 'var(--surface)', padding: '24px 20px', textAlign: 'center' }}>
          <div className="price-mono" style={{ fontSize: '22px', fontWeight: 500, color: '#C9A84C', marginBottom: '4px' }}>{item.v}</div>
          <div style={{ color: 'var(--muted)', fontSize: '11px', lineHeight: 1.5, fontFamily: 'var(--font-ui)' }}>{item.l}</div>
        </div>
      ))}
    </div>
  );
};

// ─── FOOTER ────────────────────────────────────────────────
const LuxFooter = ({ navigate }) => {
  const [email, setEmail] = useState('');
  const [subDone, setSubDone] = useState(false);
  const [subLoading, setSubLoading] = useState(false);

  return (
    <footer style={{ background: '#07070C', borderTop: '1px solid rgba(255,255,255,0.05)', padding: '64px 52px 40px' }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        {/* Newsletter */}
        <div style={{ background: 'var(--surface)', border: '1px solid rgba(201,168,76,0.15)', padding: '40px 48px', borderRadius: '3px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '56px', gap: '32px' }}>
          <div>
            <h3 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '26px', letterSpacing: '1px', marginBottom: '6px', color: '#F0EEE8' }}>Restez informé des nouvelles annonces</h3>
            <p style={{ color: 'var(--muted)', fontSize: '13px' }}>Recevez les meilleures offres de votre ville chaque semaine.</p>
          </div>
          {subDone ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#22C55E', flexShrink: 0 }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 9l4 4 8-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: '13px' }}>Inscription confirmée !</span>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: 0, flexShrink: 0, minWidth: '360px' }}>
              <input value={email} onChange={e => setEmail(e.target.value)} placeholder="votre@email.fr" className="lux-input"
                style={{ borderRadius: '2px 0 0 2px', borderRight: 'none', flex: 1 }} />
              <button className="btn-gold" disabled={subLoading}
                onClick={async () => {
                  if (!email) return;
                  setSubLoading(true);
                  try {
                    if (typeof FORMSPREE_NEWSLETTER_ID !== 'undefined' && FORMSPREE_NEWSLETTER_ID !== 'YOUR_NEWSLETTER_FORM_ID') {
                      await fetch(`https://formspree.io/f/${FORMSPREE_NEWSLETTER_ID}`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                        body: JSON.stringify({ email }),
                      });
                    }
                  } catch(_) {}
                  setSubLoading(false);
                  setSubDone(true);
                }}
                style={{ borderRadius: '0 2px 2px 0', padding: '0 24px', whiteSpace: 'nowrap', letterSpacing: '1px' }}>
                {subLoading ? '…' : "S'inscrire"}
              </button>
            </div>
          )}
        </div>

        {/* Links grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '48px', marginBottom: '48px' }}>
          <div>
            <LuxLogo onClick={() => navigate({ page: 'home', city: 'lyon' })} />
            <p style={{ color: 'var(--muted)', fontSize: '13px', lineHeight: 1.85, marginTop: '20px', maxWidth: '280px' }}>
              La marketplace de référence pour la location de voitures de prestige — toutes les agences réunies en un seul endroit.
            </p>
            <div style={{ display: 'flex', gap: '8px', marginTop: '20px' }}>
              {['robots.txt', 'llms.txt'].map(f => (
                <span key={f} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', color: 'rgba(240,238,232,0.25)', padding: '3px 9px', fontSize: '9px', fontFamily: 'var(--font-mono)', borderRadius: '2px' }}>{f}</span>
              ))}
            </div>
          </div>
          {[
            { title: 'Villes', links: [['Lyon', () => navigate({ page: 'city', city: 'lyon' })], ['Paris', () => navigate({ page: 'city', city: 'paris' })], ['Marseille', () => navigate({ page: 'city', city: 'marseille' })], ['Bordeaux', null], ['Nice', null]] },
            { title: 'Plateforme', links: [['Annonces', () => navigate({ page: 'listings', city: 'lyon' })], ['Annonceurs', () => navigate({ page: 'annonceurs' })], ['Blog', () => navigate({ page: 'blog' })], ['Contact', null]] },
            { title: 'Légal', links: [['CGU', null], ['Confidentialité', null], ['Mentions légales', null], ['Cookies', null]] },
          ].map(col => (
            <div key={col.title}>
              <p style={{ color: '#C9A84C', fontSize: '9px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '18px', fontFamily: 'var(--font-ui)' }}>{col.title}</p>
              {col.links.map(([l, fn]) => (
                <button key={l} onClick={fn} style={{ display: 'block', background: 'none', border: 'none', color: 'var(--muted)', cursor: fn ? 'pointer' : 'default', fontSize: '13px', fontFamily: 'var(--font-ui)', padding: '4px 0', transition: 'color 0.2s' }}
                  onMouseOver={e => fn && (e.target.style.color = '#C9A84C')} onMouseOut={e => (e.target.style.color = 'var(--muted)')}>
                  {l}
                </button>
              ))}
            </div>
          ))}
        </div>
        <GoldDivider />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px' }}>
          <p style={{ color: 'rgba(240,238,232,0.18)', fontSize: '11px', fontFamily: 'var(--font-ui)' }}>© 2026 LuxDrive SAS · Lyon, France</p>
          <p style={{ color: 'rgba(240,238,232,0.18)', fontSize: '11px', fontFamily: 'var(--font-mono)' }}>Lyon · Paris · Marseille · Bordeaux · Nice</p>
        </div>
      </div>
    </footer>
  );
};

Object.assign(window, { LuxLogo, Btn, LuxNav, CarCard, CardSkeleton, AgencyBadge, AgencyBadgeMini, SectionTitle, Badge, FilterPill, GoldDivider, LuxFooter, ReviewsCarousel, FaqAccordion, TrustBar, REVIEWS });
