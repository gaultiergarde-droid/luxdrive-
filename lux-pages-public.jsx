
const { useState, useEffect } = React;

// ══════════════════════════════════════════════════════
//  HOME PAGE
// ══════════════════════════════════════════════════════
const HomePage = ({ route, navigate }) => {
  const [city, setCity] = useState(route.city || 'lyon');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [loading, setLoading] = useState(true);
  const featured = MOCK_CARS.filter(c => c.featured).slice(0, 4);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="lux-page" style={{ background: 'var(--bg)', minHeight: '100vh' }}>

      {/* ── HERO ─────────────────────────────────────────── */}
      <section style={{ position: 'relative', height: '100vh', minHeight: '720px', overflow: 'hidden' }}>
        <img src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1920&q=85"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%', filter: 'brightness(0.65)' }} alt="Location voiture de luxe en France - LuxDrive" />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(110deg, rgba(10,10,15,0.95) 0%, rgba(10,10,15,0.55) 55%, rgba(10,10,15,0.2) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,15,1) 0%, rgba(10,10,15,0.2) 30%, transparent 60%)' }} />
        <div style={{ position: 'absolute', left: '52px', top: '20%', bottom: '20%', width: '1px', background: 'linear-gradient(to bottom, transparent, rgba(201,168,76,0.5), transparent)' }} />

        <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 96px', paddingTop: '64px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <span style={{ display: 'block', width: '32px', height: '1px', background: '#C9A84C' }}></span>
            <span style={{ color: '#C9A84C', fontSize: '10px', fontWeight: 600, letterSpacing: '3.5px', textTransform: 'uppercase', fontFamily: 'var(--font-ui)' }}>Toutes les agences · Une seule recherche</span>
          </div>

          {/* H1 SEO — agrégateur */}
          <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(60px, 9vw, 116px)', lineHeight: 0.92, letterSpacing: '1px', color: '#F0EEE8', maxWidth: '760px', marginBottom: '28px' }}>
            Location voiture<br />
            <span style={{ color: '#C9A84C' }}>de luxe —</span><br />
            tout en un
          </h1>

          <p style={{ color: 'rgba(240,238,232,0.6)', fontSize: '17px', maxWidth: '460px', lineHeight: 1.75, marginBottom: '16px', fontFamily: 'var(--font-ui)', fontWeight: 300 }}>
            Fini de chercher 45 minutes sur plusieurs sites. LuxDrive réunit <strong style={{ color: '#F0EEE8', fontWeight: 500 }}>toutes les agences de location de prestige</strong> de votre ville — comparez, choisissez, partez.
          </p>
          <p style={{ color: 'rgba(240,238,232,0.35)', fontSize: '13px', marginBottom: '44px', fontFamily: 'var(--font-ui)' }}>287 véhicules · 32 agences vérifiées · 5 villes · 0€ de commission</p>

          {/* Search bar */}
          <div style={{ display: 'flex', maxWidth: '720px', background: 'rgba(17,17,24,0.9)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)' }}>
            <div style={{ flex: 1, padding: '16px 20px', borderRight: '1px solid rgba(255,255,255,0.07)' }}>
              <p style={{ color: '#C9A84C', fontSize: '8px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', fontFamily: 'var(--font-ui)', marginBottom: '5px' }}>Ville</p>
              <select value={city} onChange={e => setCity(e.target.value)} style={{ background: 'none', border: 'none', color: '#F0EEE8', fontSize: '14px', fontFamily: 'var(--font-ui)', cursor: 'pointer', outline: 'none', width: '100%' }}>
                {CITIES.filter(c => c.active).map(c => <option key={c.slug} value={c.slug} style={{ background: '#111118' }}>{c.name} ({c.count})</option>)}
              </select>
            </div>
            <div style={{ flex: 1, padding: '16px 20px', borderRight: '1px solid rgba(255,255,255,0.07)' }}>
              <p style={{ color: '#C9A84C', fontSize: '8px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', fontFamily: 'var(--font-ui)', marginBottom: '5px' }}>Départ</p>
              <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} style={{ background: 'none', border: 'none', color: dateFrom ? '#F0EEE8' : 'rgba(240,238,232,0.3)', fontSize: '14px', fontFamily: 'var(--font-ui)', outline: 'none', width: '100%', colorScheme: 'dark' }} />
            </div>
            <div style={{ flex: 1, padding: '16px 20px', borderRight: '1px solid rgba(255,255,255,0.07)' }}>
              <p style={{ color: '#C9A84C', fontSize: '8px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', fontFamily: 'var(--font-ui)', marginBottom: '5px' }}>Retour</p>
              <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} style={{ background: 'none', border: 'none', color: dateTo ? '#F0EEE8' : 'rgba(240,238,232,0.3)', fontSize: '14px', fontFamily: 'var(--font-ui)', outline: 'none', width: '100%', colorScheme: 'dark' }} />
            </div>
            <button className="btn-gold" onClick={() => navigate({ page: 'listings', city })} style={{ padding: '0 32px', borderRadius: 0, letterSpacing: '1.8px', whiteSpace: 'nowrap', fontSize: '11px' }}>
              Rechercher
            </button>
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: '48px', right: '96px', display: 'flex', gap: '48px' }}>
          {[{ v: '287', l: 'Véhicules' }, { v: '32', l: 'Agences' }, { v: '4.9★', l: 'Note moy.' }, { v: '5', l: 'Villes' }].map(s => (
            <div key={s.l} style={{ textAlign: 'right' }}>
              <div className="price-mono" style={{ fontSize: '28px', fontWeight: 500, color: '#C9A84C', lineHeight: 1 }}>{s.v}</div>
              <div style={{ color: 'rgba(240,238,232,0.38)', fontSize: '9px', letterSpacing: '2px', fontFamily: 'var(--font-ui)', textTransform: 'uppercase', marginTop: '3px' }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TRUST BAR ────────────────────────────────────── */}
      <TrustBar />

      {/* ── VALUE PROP — Agrégateur ───────────────────────── */}
      <section style={{ padding: '96px 52px', background: 'var(--surface)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <span style={{ display: 'block', width: '28px', height: '1px', background: '#C9A84C' }}></span>
              <span style={{ color: '#C9A84C', fontSize: '10px', fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase', fontFamily: 'var(--font-ui)' }}>Pourquoi LuxDrive</span>
            </div>
            <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(36px, 4vw, 52px)', letterSpacing: '1px', color: '#F0EEE8', marginBottom: '20px', lineHeight: 1.02 }}>
              Plus besoin de chercher sur 10 sites différents
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: 1.85, marginBottom: '32px' }}>
              Avant LuxDrive, louer une Ferrari pour le week-end signifiait des heures de recherches sur Google, des dizaines d'onglets ouverts, des prix non affichés et des agences non vérifiées. Nous avons tout changé.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { icon: '✓', t: '1 recherche', d: 'Toutes les offres disponibles dans votre ville, en temps réel.' },
                { icon: '✓', t: 'Agences vérifiées', d: 'SIRET, assurance, état de flotte — chaque partenaire est contrôlé.' },
                { icon: '✓', t: 'Prix transparents', d: 'Tarif journalier affiché, pas de surprise à la signature.' },
                { icon: '✓', t: '0€ de commission', d: "Vous contactez l'agence directement. LuxDrive ne prend rien." },
              ].map(item => (
                <div key={item.t} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <span style={{ color: '#C9A84C', fontSize: '14px', marginTop: '1px', flexShrink: 0 }}>{item.icon}</span>
                  <div>
                    <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '16px', letterSpacing: '0.5px', color: '#F0EEE8', marginRight: '8px' }}>{item.t}</span>
                    <span style={{ color: 'var(--muted)', fontSize: '13px' }}>{item.d}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Before / After visual */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)', borderRadius: '3px', padding: '24px 28px' }}>
              <p style={{ color: '#EF4444', fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', fontFamily: 'var(--font-ui)', marginBottom: '12px' }}>Avant</p>
              {['Google → 45 sites différents', 'Prix cachés ou "nous contacter"', 'Agences non vérifiées', '45 min de recherche minimum', 'Doublons et annonces périmées'].map(t => (
                <div key={t} style={{ display: 'flex', gap: '10px', marginBottom: '8px', fontSize: '13px', color: 'rgba(240,238,232,0.5)' }}>
                  <span style={{ color: 'rgba(239,68,68,0.6)' }}>✗</span>{t}
                </div>
              ))}
            </div>
            <div style={{ background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.18)', borderRadius: '3px', padding: '24px 28px' }}>
              <p style={{ color: '#22C55E', fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', fontFamily: 'var(--font-ui)', marginBottom: '12px' }}>Avec LuxDrive</p>
              {['1 plateforme, toutes les agences', 'Prix affichés, transparent', 'Badge Partenaire Vérifié ✓', 'Résultat en moins de 2 minutes', 'Annonces fraîches en temps réel'].map(t => (
                <div key={t} style={{ display: 'flex', gap: '10px', marginBottom: '8px', fontSize: '13px', color: 'rgba(240,238,232,0.7)' }}>
                  <span style={{ color: '#22C55E' }}>✓</span>{t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ──────────────────────────────────────── */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.04)', padding: '18px 0', overflow: 'hidden', background: 'rgba(17,17,24,0.3)' }}>
        <div style={{ display: 'flex', gap: '64px', animation: 'marqueeScroll 35s linear infinite', whiteSpace: 'nowrap' }}>
          {[...BRANDS, ...BRANDS].map((b, i) => (
            <span key={i} style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '17px', letterSpacing: '4px', color: 'rgba(240,238,232,0.14)', flexShrink: 0 }}>{b}</span>
          ))}
        </div>
      </div>

      {/* ── FEATURED LISTINGS ────────────────────────────── */}
      <section style={{ padding: '96px 52px' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px' }}>
            <SectionTitle eyebrow="Disponibles maintenant" title="Véhicules d'exception" subtitle="Une sélection parmi les 287 annonces actives — toutes vérifiées par notre équipe." />
            <Btn variant="ghost" onClick={() => navigate({ page: 'listings', city })}>Voir les 287 annonces →</Btn>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
            {loading ? Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />) : featured.map(car => <CarCard key={car.id} car={car} navigate={navigate} />)}
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ───────────────────────────────────── */}
      <section style={{ padding: '0 52px 96px' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <SectionTitle eyebrow="Parcourir par type" title="Quelle expérience cherchez-vous ?" centered />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '10px', marginTop: '44px' }}>
            {CATEGORIES.map(cat => (
              <button key={cat.slug} className="cat-btn"
                onClick={() => navigate({ page: 'listings', city, category: cat.slug })}
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '26px 14px', cursor: 'pointer', textAlign: 'center', borderRadius: '3px' }}>
                <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '16px', letterSpacing: '1px', color: '#F0EEE8', marginBottom: '5px' }}>{cat.label}</div>
                <div className="price-mono" style={{ color: '#C9A84C', fontSize: '13px' }}>{cat.count}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS CAROUSEL ────────────────────────────── */}
      <section style={{ background: 'var(--surface)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '96px 52px' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '52px' }}>
            <SectionTitle eyebrow="Ce que disent nos clients" title="Ils ont trouvé leur véhicule en quelques minutes" subtitle="Des milliers de locataires satisfaits — 0€ de commission, 100% transparent." />
            <div style={{ display: 'flex', gap: '4px', alignItems: 'center', flexShrink: 0 }}>
              {Array.from({ length: 5 }).map((_, i) => <span key={i} style={{ color: '#C9A84C', fontSize: '18px' }}>★</span>)}
              <span className="price-mono" style={{ color: '#C9A84C', fontSize: '18px', marginLeft: '8px' }}>4.9</span>
              <span style={{ color: 'var(--muted)', fontSize: '12px', marginLeft: '4px' }}>/ 5 · 847 avis</span>
            </div>
          </div>
          <ReviewsCarousel />
        </div>
      </section>

      {/* ── CITIES ───────────────────────────────────────── */}
      <section style={{ padding: '96px 52px' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <SectionTitle eyebrow="Multi-villes" title="Location de voiture de luxe partout en France" subtitle="LuxDrive est disponible dans 5 grandes villes — avec de nouvelles destinations qui arrivent chaque trimestre." centered />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px', marginTop: '48px' }}>
            {CITIES.map(c => (
              <button key={c.slug} onClick={() => c.active && navigate({ page: 'city', city: c.slug })}
                style={{ background: c.active ? 'var(--surface)' : 'rgba(10,10,15,0.4)', border: `1px solid ${c.active ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.03)'}`, padding: '24px 18px', cursor: c.active ? 'pointer' : 'default', textAlign: 'left', borderRadius: '3px', opacity: c.active ? 1 : 0.45, transition: 'all 0.22s' }}
                onMouseOver={e => c.active && (e.currentTarget.style.borderColor = 'rgba(201,168,76,0.4)')}
                onMouseOut={e => c.active && (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}>
                <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '22px', letterSpacing: '2px', color: c.active ? '#F0EEE8' : 'rgba(240,238,232,0.22)', marginBottom: '6px' }}>{c.name}</div>
                <div className="price-mono" style={{ color: c.active ? '#C9A84C' : 'rgba(240,238,232,0.15)', fontSize: '12px' }}>{c.active ? `${c.count} véhicules` : 'Bientôt'}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────── */}
      <section style={{ background: 'var(--surface)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '96px 52px' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <SectionTitle eyebrow="Comment ça marche" title="Trouvez et réservez en moins de 5 minutes" centered />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', marginTop: '60px', background: 'rgba(255,255,255,0.04)' }}>
            {[
              { n: '01', t: 'Cherchez votre véhicule', d: "Entrez votre ville, vos dates. LuxDrive affiche instantanément toutes les offres disponibles — Ferrari, Porsche, Rolls-Royce et bien d'autres." },
              { n: '02', t: 'Comparez et choisissez', d: "Filtrez par marque, prix, catégorie. Consultez les fiches complètes : specs, photos HD, profil de l'agence et avis clients vérifiés." },
              { n: '03', t: 'Contactez et partez', d: "Envoyez votre demande en 30 secondes. L'agence vous rappelle sous 2h pour confirmer la réservation. Zéro commission, contact direct." },
            ].map((step) => (
              <div key={step.n} style={{ background: 'var(--bg)', padding: '48px 40px' }}>
                <div className="price-mono" style={{ fontSize: '48px', fontWeight: 300, color: 'rgba(201,168,76,0.15)', lineHeight: 1, marginBottom: '-8px' }}>{step.n}</div>
                <div style={{ borderTop: '2px solid #C9A84C', paddingTop: '20px', marginTop: '16px' }}>
                  <h3 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '22px', letterSpacing: '0.5px', color: '#F0EEE8', marginBottom: '12px' }}>{step.t}</h3>
                  <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: 1.8 }}>{step.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────── */}
      <section style={{ padding: '96px 52px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <SectionTitle eyebrow="Questions fréquentes" title="Tout ce que vous devez savoir" centered />
          <div style={{ marginTop: '48px' }}>
            <FaqAccordion />
          </div>
        </div>
      </section>

      {/* ── CTA PRO ──────────────────────────────────────── */}
      <div style={{ padding: '0 52px 96px' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', background: 'var(--surface)', border: '1px solid rgba(201,168,76,0.18)', padding: '64px 72px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', overflow: 'hidden', borderRadius: '3px' }}>
          <div style={{ position: 'absolute', right: '-40px', top: '-40px', width: '280px', height: '280px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
              <span style={{ display: 'block', width: '24px', height: '1px', background: '#C9A84C' }}></span>
              <span style={{ color: '#C9A84C', fontSize: '9px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', fontFamily: 'var(--font-ui)' }}>Pour les professionnels</span>
            </div>
            <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '44px', letterSpacing: '1px', color: '#F0EEE8', marginBottom: '10px', lineHeight: 1 }}>Vous êtes une agence de location ?</h2>
            <p style={{ color: 'var(--muted)', fontSize: '15px', maxWidth: '440px', lineHeight: 1.7 }}>Rejoignez les 32 agences partenaires. Accédez à des milliers de clients premium chaque mois — dès 79€/mois.</p>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexShrink: 0, position: 'relative' }}>
            <Btn variant="gold" onClick={() => navigate({ page: 'annonceurs' })}>Devenir partenaire</Btn>
            <Btn variant="ghost" onClick={() => navigate({ page: 'annonceurs' })}>Voir les tarifs</Btn>
          </div>
        </div>
      </div>

      <LuxFooter navigate={navigate} />
    </div>
  );
};

// ══════════════════════════════════════════════════════
//  CITY HUB
// ══════════════════════════════════════════════════════
const CityHubPage = ({ route, navigate }) => {
  const city = route.city || 'lyon';
  const cityName = city.charAt(0).toUpperCase() + city.slice(1);
  const cityData = CITIES.find(c => c.slug === city) || CITIES[0];
  const cars = MOCK_CARS.filter(c => c.city === city);

  return (
    <div className="lux-page" style={{ background: 'var(--bg)', minHeight: '100vh', paddingTop: '64px' }}>
      <div style={{ position: 'relative', height: '380px', overflow: 'hidden' }}>
        <img src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1400&q=80"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%', filter: 'brightness(0.55)' }} alt={`Location voiture de luxe ${cityName}`} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(10,10,15,0.95) 0%, rgba(10,10,15,0.4) 65%, transparent 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,15,1) 0%, transparent 55%)' }} />
        <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 96px' }}>
          <button onClick={() => navigate({ page: 'home', city })} style={{ background: 'none', border: 'none', color: '#C9A84C', cursor: 'pointer', fontSize: '10px', fontFamily: 'var(--font-ui)', letterSpacing: '1.5px', marginBottom: '20px', padding: 0, textTransform: 'uppercase' }}>← Accueil</button>
          {/* H1 city-aware SEO */}
          <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '72px', letterSpacing: '2px', color: '#F0EEE8', lineHeight: 0.93, marginBottom: '14px' }}>
            Location voiture de luxe<br /><span style={{ color: '#C9A84C' }}>{cityName}</span>
          </h1>
          <p style={{ color: 'rgba(240,238,232,0.5)', fontSize: '14px', fontFamily: 'var(--font-ui)' }}>
            {cityData.count} véhicules disponibles · {AGENCIES.length} agences partenaires vérifiées · toutes réunies ici
          </p>
        </div>
      </div>

      <div style={{ padding: '56px 52px 48px', maxWidth: '1240px', margin: '0 auto' }}>
        <SectionTitle eyebrow="Parcourir" as="h2" title={`Catégories à ${cityName}`} />
        <div style={{ display: 'flex', gap: '10px', marginTop: '24px', flexWrap: 'wrap' }}>
          {CATEGORIES.map(cat => (
            <button key={cat.slug} onClick={() => navigate({ page: 'listings', city, category: cat.slug })}
              style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '12px 22px', cursor: 'pointer', borderRadius: '2px', display: 'flex', gap: '12px', alignItems: 'center', transition: 'all 0.2s' }}
              onMouseOver={e => e.currentTarget.style.borderColor = '#C9A84C'}
              onMouseOut={e => e.currentTarget.style.borderColor = 'var(--border)'}>
              <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '15px', letterSpacing: '1px', color: '#F0EEE8' }}>{cat.label}</span>
              <span className="price-mono" style={{ color: '#C9A84C', fontSize: '12px' }}>{cat.count}</span>
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: '0 52px 48px', maxWidth: '1240px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '28px' }}>
          <SectionTitle eyebrow="Disponible maintenant" as="h2" title={`Annonces à ${cityName}`} />
          <Btn variant="ghost" onClick={() => navigate({ page: 'listings', city })}>Voir les {cityData.count} annonces →</Btn>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {(cars.length > 0 ? cars : MOCK_CARS).slice(0, 6).map(car => <CarCard key={car.id} car={car} navigate={navigate} />)}
        </div>
      </div>

      <div style={{ padding: '32px 52px 80px', maxWidth: '1240px', margin: '0 auto', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <SectionTitle eyebrow="Partenaires agréés" as="h2" title={`Agences à ${cityName}`} subtitle="Toutes les agences listées sur LuxDrive sont vérifiées par notre équipe. SIRET valide, assurance pro, flotte contrôlée." />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '28px' }}>
          {AGENCIES.map(a => (
            <div key={a.slug} style={{ cursor: 'pointer' }} onClick={() => navigate({ page: 'agency', slug: a.slug })}>
              <AgencyBadge agency={a} />
            </div>
          ))}
        </div>
      </div>
      <LuxFooter navigate={navigate} />
    </div>
  );
};

// ══════════════════════════════════════════════════════
//  LISTINGS
// ══════════════════════════════════════════════════════
const ListingsPage = ({ route, navigate }) => {
  const city = route.city || 'lyon';
  const cityName = city.charAt(0).toUpperCase() + city.slice(1);
  const [activeCat, setActiveCat] = useState(route.category || 'all');
  const [maxPrice, setMaxPrice] = useState(2500);
  const [sortBy, setSortBy] = useState('featured');
  const [search, setSearch] = useState('');
  const [view, setView] = useState('grid');
  const [isLoading, setIsLoading] = useState(true);

  const { dbCars, isLoadingDb } = (typeof usePublicListings !== 'undefined')
    ? usePublicListings(city)
    : { dbCars: null, isLoadingDb: false };

  // Annonces DB si disponibles, sinon MOCK_CARS comme expérience démo
  const sourceCars = (dbCars !== null && dbCars !== undefined) ? dbCars : MOCK_CARS;

  useEffect(() => {
    setIsLoading(true);
    const t = setTimeout(() => setIsLoading(false), isLoadingDb ? 1200 : 650);
    return () => clearTimeout(t);
  }, [activeCat, maxPrice, sortBy, city, isLoadingDb]);

  let filtered = sourceCars
    .filter(c => c.city === city)
    .filter(c => activeCat === 'all' || c.category === activeCat)
    .filter(c => c.price <= maxPrice)
    .filter(c => !search || c.model.toLowerCase().includes(search.toLowerCase()) || c.brand.toLowerCase().includes(search.toLowerCase()));
  if (sortBy === 'price-asc') filtered = [...filtered].sort((a, b) => a.price - b.price);
  else if (sortBy === 'price-desc') filtered = [...filtered].sort((a, b) => b.price - a.price);
  else if (sortBy === 'rating') filtered = [...filtered].sort((a, b) => b.rating - a.rating);

  return (
    <div className="lux-page" style={{ background: 'var(--bg)', minHeight: '100vh', paddingTop: '64px' }}>
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '32px 52px', background: 'var(--surface)' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' }}>
            <div>
              <button onClick={() => navigate({ page: 'city', city })} style={{ background: 'none', border: 'none', color: '#C9A84C', cursor: 'pointer', fontSize: '10px', fontFamily: 'var(--font-ui)', letterSpacing: '1.5px', marginBottom: '8px', padding: 0, textTransform: 'uppercase' }}>← {cityName}</button>
              {/* H1 listing SEO */}
              <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '40px', letterSpacing: '1px', color: '#F0EEE8', display: 'flex', alignItems: 'baseline', gap: '14px' }}>
                {filtered.length} voiture{filtered.length > 1 ? 's' : ''} de luxe à louer à {cityName}
              </h1>
              <p style={{ color: 'var(--muted)', fontSize: '12px', marginTop: '4px' }}>Toutes les agences partenaires réunies — comparez et contactez directement</p>
            </div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <div style={{ position: 'relative' }}>
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Marque, modèle…" className="lux-input" style={{ width: '200px', paddingLeft: '34px' }} />
                <svg style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', opacity: 0.3 }} width="13" height="13" viewBox="0 0 14 14" fill="none"><circle cx="5.5" cy="5.5" r="4" stroke="#F0EEE8" strokeWidth="1.4"/><path d="M9 9l3 3" stroke="#F0EEE8" strokeWidth="1.4" strokeLinecap="round"/></svg>
              </div>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="lux-input" style={{ width: 'auto', cursor: 'pointer' }}>
                <option value="featured" style={{ background: '#111118' }}>En vedette</option>
                <option value="price-asc" style={{ background: '#111118' }}>Prix croissant</option>
                <option value="price-desc" style={{ background: '#111118' }}>Prix décroissant</option>
                <option value="rating" style={{ background: '#111118' }}>Meilleures notes</option>
              </select>
              <div style={{ display: 'flex', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '2px', overflow: 'hidden' }}>
                {[['grid', '⊞'], ['list', '≡']].map(([v, icon]) => (
                  <button key={v} onClick={() => setView(v)} style={{ background: v === view ? '#C9A84C' : 'transparent', border: 'none', color: v === view ? '#0A0A0F' : 'rgba(240,238,232,0.45)', padding: '8px 12px', cursor: 'pointer', fontSize: '14px', transition: 'all 0.15s' }}>{icon}</button>
                ))}
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
            <FilterPill label="Tous" active={activeCat === 'all'} onClick={() => setActiveCat('all')} />
            {CATEGORIES.map(cat => <FilterPill key={cat.slug} label={cat.label} active={activeCat === cat.slug} onClick={() => setActiveCat(cat.slug)} />)}
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ color: 'var(--muted)', fontSize: '11px' }}>Budget max :</span>
              <input type="range" min={200} max={2500} step={50} value={maxPrice} onChange={e => setMaxPrice(+e.target.value)} style={{ width: '100px' }} />
              <span className="price-mono" style={{ color: '#C9A84C', fontSize: '16px', minWidth: '85px', fontWeight: 500 }}>{maxPrice.toLocaleString('fr-FR')} €/j</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '44px 52px 96px', maxWidth: '1240px', margin: '0 auto' }}>
        {isLoading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '120px 0' }}>
            <p style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '36px', color: 'rgba(240,238,232,0.15)', letterSpacing: '1px', marginBottom: '12px' }}>Aucun résultat</p>
            <p style={{ color: 'var(--muted)', fontSize: '13px' }}>Modifiez vos filtres pour afficher plus de véhicules</p>
          </div>
        ) : view === 'grid' ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {filtered.map(car => <CarCard key={car.id} car={car} navigate={navigate} />)}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {filtered.map(car => <ListRow key={car.id} car={car} navigate={navigate} />)}
          </div>
        )}
      </div>
      <LuxFooter navigate={navigate} />
    </div>
  );
};

const ListRow = ({ car, navigate }) => {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      onClick={() => navigate({ page: 'detail', city: car.city, slug: car.slug })}
      style={{ display: 'flex', background: 'var(--surface)', border: `1px solid ${hov ? 'var(--border-hover)' : 'var(--border)'}`, borderRadius: '3px', overflow: 'hidden', cursor: 'pointer', transition: 'border-color 0.25s', height: '116px' }}>
      <div style={{ width: '175px', flexShrink: 0, overflow: 'hidden' }}>
        <img src={car.image} alt={car.model} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: hov ? 'grayscale(0)' : 'grayscale(0.6)', transition: 'filter 0.4s' }} />
      </div>
      <div style={{ flex: 1, padding: '18px 22px', display: 'flex', alignItems: 'center', gap: '28px' }}>
        <div style={{ flex: 1 }}>
          <Badge variant="gold">{car.brand}</Badge>
          <h3 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '20px', letterSpacing: '0.5px', marginTop: '5px', color: '#F0EEE8' }}>{car.model}</h3>
          <p style={{ color: 'var(--muted)', fontSize: '11px', marginTop: '2px' }}>{car.agency}</p>
        </div>
        <div style={{ display: 'flex', gap: '24px', fontSize: '11px', color: 'var(--muted)' }}>
          <span>{car.power}</span><span>{car.transmission}</span><span>{car.seats} pl.</span>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span className="price-mono" style={{ fontSize: '24px', fontWeight: 500, color: '#C9A84C' }}>{car.price.toLocaleString('fr-FR')} €</span>
          <div style={{ color: 'var(--muted)', fontSize: '10px' }}>par jour</div>
        </div>
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════
//  BLOG
// ══════════════════════════════════════════════════════
const BLOG_POSTS = [
  { slug: 'louer-ferrari-lyon', title: 'Comment louer une Ferrari à Lyon sans se faire piéger', category: 'Guide', date: '22 avril 2026', city: 'Lyon', readTime: '6 min', excerpt: "Les 5 erreurs à éviter quand vous cherchez à louer une Ferrari ou Lamborghini à Lyon : agences non vérifiées, frais cachés, assurance insuffisante. Notre guide complet.", img: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80' },
  { slug: 'top-5-supercar-paris', title: 'Top 5 des supercars disponibles à la location à Paris en 2026', category: 'Sélection', date: '15 avril 2026', city: 'Paris', readTime: '4 min', excerpt: "Ferrari, Lamborghini, McLaren, Porsche 911 Turbo S — notre sélection des 5 meilleures supercars à louer à Paris ce printemps, avec les prix et les agences.", img: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80' },
  { slug: 'weekend-voiture-luxe-nice', title: 'Idée de week-end : rouler sur la Côte d\'Azur en voiture de prestige', category: 'Lifestyle', date: '8 avril 2026', city: 'Nice', readTime: '5 min', excerpt: "Monaco, Èze, Saint-Paul-de-Vence — le circuit parfait pour un week-end inoubliable en voiture de luxe sur la Riviera française. Sélection véhicules incluse.", img: 'https://images.unsplash.com/photo-1617531653332-bd46c16f5e5d?w=800&q=80' },
  { slug: 'rolls-royce-mariage', title: 'Rolls-Royce pour votre mariage : tout ce qu\'il faut savoir', category: 'Événements', date: '1 avril 2026', city: 'Toute France', readTime: '7 min', excerpt: "Ghost, Phantom ou Wraith ? Location avec chauffeur ou conduite personnelle ? Délais de réservation, budget, nos conseils pour le plus beau jour de votre vie.", img: 'https://images.unsplash.com/photo-1545291730-faff8ca1d4b0?w=800&q=80' },
  { slug: 'comparatif-lamborghini-ferrari', title: 'Ferrari vs Lamborghini : laquelle louer pour votre prochain week-end ?', category: 'Comparatif', date: '25 mars 2026', city: 'France', readTime: '8 min', excerpt: "SF90 vs Huracán EVO — deux philosophies, deux expériences radicalement différentes. Notre comparatif pour choisir la voiture parfaite selon votre profil.", img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80' },
  { slug: 'porsche-911-turbo-avis', title: 'Avis : 3 jours avec la Porsche 911 Turbo S — vaut-elle le prix ?', category: 'Test', date: '18 mars 2026', city: 'Lyon', readTime: '10 min', excerpt: "750€/jour pour la Porsche 911 Turbo S — est-ce raisonnable ? Nous l'avons conduite 3 jours, de Lyon à Genève en passant par les Alpes. Verdict sans concession.", img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80' },
];

const BlogPage = ({ navigate }) => {
  const [activeCategory, setActiveCategory] = useState('Tous');
  const categories = ['Tous', 'Guide', 'Sélection', 'Lifestyle', 'Événements', 'Comparatif', 'Test'];
  const filtered = activeCategory === 'Tous' ? BLOG_POSTS : BLOG_POSTS.filter(p => p.category === activeCategory);

  return (
    <div className="lux-page" style={{ background: 'var(--bg)', minHeight: '100vh', paddingTop: '64px' }}>
      {/* Header */}
      <div style={{ padding: '64px 52px 56px', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'var(--surface)' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <span style={{ display: 'block', width: '28px', height: '1px', background: '#C9A84C' }}></span>
            <span style={{ color: '#C9A84C', fontSize: '10px', fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase', fontFamily: 'var(--font-ui)' }}>Magazine LuxDrive</span>
          </div>
          {/* H1 blog SEO */}
          <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '56px', letterSpacing: '1px', color: '#F0EEE8', marginBottom: '12px' }}>Guides, sélections et conseils pour la location de prestige</h1>
          <p style={{ color: 'var(--muted)', fontSize: '15px', maxWidth: '600px', lineHeight: 1.7 }}>Tout ce qu'il faut savoir pour louer une voiture de luxe en France : guides pratiques, sélections par ville, comparatifs et lifestyle.</p>
          <div style={{ display: 'flex', gap: '8px', marginTop: '28px', flexWrap: 'wrap' }}>
            {categories.map(cat => <FilterPill key={cat} label={cat} active={activeCategory === cat} onClick={() => setActiveCategory(cat)} />)}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div style={{ padding: '56px 52px 96px', maxWidth: '1240px', margin: '0 auto' }}>
        {/* Featured post */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '2px', background: 'rgba(255,255,255,0.03)', marginBottom: '2px', borderRadius: '3px 3px 0 0', overflow: 'hidden', cursor: 'pointer' }}
          onClick={() => filtered[0] && navigate({ page: 'blog-article', slug: filtered[0].slug })}
          onMouseOver={e => e.currentTarget.querySelector('.blog-img').style.filter = 'brightness(0.85) grayscale(0)'}
          onMouseOut={e => e.currentTarget.querySelector('.blog-img').style.filter = 'brightness(0.75) grayscale(0.2)'}>
          <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden' }}>
            <img className="blog-img" src={filtered[0]?.img} alt={filtered[0]?.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.75) grayscale(0.2)', transition: 'filter 0.4s' }} />
          </div>
          <div style={{ background: 'var(--surface)', padding: '48px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
              <Badge variant="gold">{filtered[0]?.category}</Badge>
              <Badge variant="default">{filtered[0]?.city}</Badge>
            </div>
            <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '28px', letterSpacing: '0.5px', color: '#F0EEE8', marginBottom: '14px', lineHeight: 1.1 }}>{filtered[0]?.title}</h2>
            <p style={{ color: 'var(--muted)', fontSize: '13px', lineHeight: 1.8, marginBottom: '24px' }}>{filtered[0]?.excerpt}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'var(--muted)', fontSize: '11px', fontFamily: 'var(--font-mono)' }}>{filtered[0]?.date} · {filtered[0]?.readTime} de lecture</span>
              <span style={{ color: '#C9A84C', fontSize: '12px' }}>Lire →</span>
            </div>
          </div>
        </div>

        {/* Other posts */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px', background: 'rgba(255,255,255,0.03)' }}>
          {filtered.slice(1).map(post => (
            <div key={post.slug} style={{ background: 'var(--surface)', cursor: 'pointer', overflow: 'hidden', transition: 'all 0.2s' }}
              onClick={() => navigate({ page: 'blog-article', slug: post.slug, title: post.title })}
              onMouseOver={e => { e.currentTarget.style.borderTop = '2px solid rgba(201,168,76,0.4)'; e.currentTarget.querySelector('.blog-card-img').style.filter = 'brightness(0.85) grayscale(0)'; }}
              onMouseOut={e => { e.currentTarget.style.borderTop = 'none'; e.currentTarget.querySelector('.blog-card-img').style.filter = 'brightness(0.7) grayscale(0.3)'; }}>
              <div style={{ aspectRatio: '16/9', overflow: 'hidden' }}>
                <img className="blog-card-img" src={post.img} alt={post.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.7) grayscale(0.3)', transition: 'filter 0.4s' }} />
              </div>
              <div style={{ padding: '22px 20px' }}>
                <div style={{ display: 'flex', gap: '6px', marginBottom: '10px' }}>
                  <Badge variant="gold">{post.category}</Badge>
                </div>
                <h3 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '18px', letterSpacing: '0.5px', color: '#F0EEE8', marginBottom: '8px', lineHeight: 1.15 }}>{post.title}</h3>
                <p style={{ color: 'var(--muted)', fontSize: '12px', lineHeight: 1.7, marginBottom: '14px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{post.excerpt}</p>
                <span style={{ color: 'var(--muted)', fontSize: '10px', fontFamily: 'var(--font-mono)' }}>{post.date} · {post.readTime}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <LuxFooter navigate={navigate} />
    </div>
  );
};

// ══════════════════════════════════════════════════════
//  AGENCY PROFILE (public)
// ══════════════════════════════════════════════════════
const AgencyProfilePage = ({ route, navigate }) => {
  const agency = AGENCIES.find(a => a.slug === route.slug) || AGENCIES[0];
  const cars = MOCK_CARS.filter(c => c.agencySlug === agency.slug);

  return (
    <div className="lux-page" style={{ background: 'var(--bg)', minHeight: '100vh', paddingTop: '64px' }}>
      {/* Header */}
      <div style={{ padding: '56px 52px 48px', background: 'var(--surface)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <button onClick={() => navigate({ page: 'city', city: agency.city })} style={{ background: 'none', border: 'none', color: '#C9A84C', cursor: 'pointer', fontSize: '10px', fontFamily: 'var(--font-ui)', letterSpacing: '1.5px', marginBottom: '24px', padding: 0, textTransform: 'uppercase' }}>← Annonceurs</button>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '32px' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, rgba(201,168,76,0.3), rgba(201,168,76,0.08))', border: '2px solid rgba(201,168,76,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px', color: '#C9A84C', fontFamily: 'Bebas Neue, sans-serif', flexShrink: 0 }}>
              {agency.name?.[0]}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '48px', letterSpacing: '2px', color: '#F0EEE8', lineHeight: 1 }}>{agency.name}</h1>
                <Badge variant="green">Partenaire vérifié</Badge>
              </div>
              <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '16px' }}>{agency.city.charAt(0).toUpperCase() + agency.city.slice(1)} · Partenaire depuis {agency.since} · Répond en {agency.response}</p>
              <div style={{ display: 'flex', gap: '32px' }}>
                {[{ v: agency.rating, l: 'Note' }, { v: agency.count, l: 'Véhicules' }, { v: '47', l: 'Avis' }, { v: agency.response, l: 'Réponse' }].map(s => (
                  <div key={s.l}>
                    <div className="price-mono" style={{ fontSize: '24px', fontWeight: 500, color: '#C9A84C' }}>{s.v}</div>
                    <div style={{ color: 'var(--muted)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
            <Btn variant="gold" onClick={() => {}}>Contacter l'agence</Btn>
          </div>
        </div>
      </div>

      {/* Fleet */}
      <div style={{ padding: '48px 52px 80px', maxWidth: '1240px', margin: '0 auto' }}>
        <SectionTitle eyebrow="Flotte" as="h2" title={`${cars.length || MOCK_CARS.length} véhicules disponibles`} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '28px' }}>
          {(cars.length > 0 ? cars : MOCK_CARS).slice(0, 6).map(car => <CarCard key={car.id} car={car} navigate={navigate} />)}
        </div>
      </div>
      <LuxFooter navigate={navigate} />
    </div>
  );
};

// ══════════════════════════════════════════════════════
//  ANNONCEURS
// ══════════════════════════════════════════════════════
const AnnonceurPage = ({ route, navigate }) => {
  const [billing, setBilling] = useState('month');

  return (
    <div className="lux-page" style={{ background: 'var(--bg)', minHeight: '100vh', paddingTop: '64px' }}>
      <div style={{ padding: '80px 52px 72px', maxWidth: '1240px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <span style={{ display: 'block', width: '28px', height: '1px', background: '#C9A84C' }}></span>
          <span style={{ color: '#C9A84C', fontSize: '10px', fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase', fontFamily: 'var(--font-ui)' }}>Espace professionnels</span>
        </div>
        <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(52px, 7vw, 84px)', letterSpacing: '1px', lineHeight: 0.95, color: '#F0EEE8', marginBottom: '24px', maxWidth: '700px' }}>
          Publiez vos annonces là<br />où cherchent vos clients
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: '16px', maxWidth: '520px', lineHeight: 1.8, marginBottom: '44px' }}>
          LuxDrive est l'endroit où les locataires viennent chercher — pas sur Google, pas sur des annuaires génériques. Soyez là au moment où ils décident.
        </p>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          {[{ v: '12k', l: 'Visiteurs/mois' }, { v: '847', l: 'Demandes envoyées' }, { v: '< 2h', l: 'Mise en ligne' }, { v: '32', l: 'Agences actives' }].map(s => (
            <div key={s.l} style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '18px 26px', borderRadius: '3px' }}>
              <div className="price-mono" style={{ fontSize: '28px', fontWeight: 500, color: '#C9A84C', lineHeight: 1 }}>{s.v}</div>
              <div style={{ color: 'var(--muted)', fontSize: '11px', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      <GoldDivider />

      <div style={{ padding: '72px 52px', maxWidth: '1240px', margin: '0 auto' }}>
        <SectionTitle eyebrow="Fonctionnalités" as="h2" title="Tout ce dont vous avez besoin" centered />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', marginTop: '44px', background: 'rgba(255,255,255,0.04)' }}>
          {[
            { t: 'Annonces HD illimitées', d: 'Photos haute définition, galerie multi-images, fiche technique complète et slug SEO dédié.' },
            { t: 'Dashboard temps réel', d: 'Vues, clics, leads, conversions — toutes vos métriques accessibles en un coup d\'oeil.' },
            { t: 'Leads qualifiés', d: 'Des demandes de clients réellement intéressés, triées par date et par véhicule. Zéro spam.' },
            { t: 'Multi-villes inclus', d: 'Publiez dans plusieurs villes simultanément. Gérez tout depuis un seul tableau de bord.' },
            { t: 'Badge Vérifié', d: 'Obtenez le badge de confiance LuxDrive après validation complète par notre équipe.' },
            { t: 'SEO clé en main', d: 'Chaque annonce est indexée Google avec schema markup. Bénéficiez de notre autorité de domaine.' },
          ].map(f => (
            <div key={f.t} style={{ background: 'var(--bg)', padding: '36px 30px' }}>
              <span style={{ display: 'block', width: '36px', height: '1px', background: '#C9A84C', marginBottom: '18px' }}></span>
              <h3 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '20px', letterSpacing: '0.5px', marginBottom: '10px', color: '#F0EEE8' }}>{f.t}</h3>
              <p style={{ color: 'var(--muted)', fontSize: '13px', lineHeight: 1.8 }}>{f.d}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing */}
      <div style={{ padding: '0 52px 80px', maxWidth: '1240px', margin: '0 auto' }}>
        <SectionTitle eyebrow="Tarification" as="h2" title="Choisissez votre plan" centered />
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '28px', marginBottom: '48px', border: '1px solid rgba(255,255,255,0.08)', width: 'fit-content', margin: '28px auto 48px', borderRadius: '2px', overflow: 'hidden' }}>
          {[['month', 'Mensuel'], ['year', 'Annuel — 15% off']].map(([b, l]) => (
            <button key={b} onClick={() => setBilling(b)} style={{ background: billing === b ? '#C9A84C' : 'transparent', border: 'none', color: billing === b ? '#0A0A0F' : 'rgba(240,238,232,0.5)', padding: '10px 22px', cursor: 'pointer', fontSize: '11px', fontFamily: 'var(--font-ui)', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', transition: 'all 0.2s' }}>{l}</button>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
          {PLANS.map(plan => (
            <div key={plan.id} className={plan.highlighted ? 'plan-featured' : ''}
              style={{ background: plan.highlighted ? 'rgba(17,17,24,0.85)' : 'var(--surface)', border: `1px solid ${plan.highlighted ? 'rgba(201,168,76,0.45)' : 'var(--border)'}`, backdropFilter: plan.highlighted ? 'blur(20px)' : 'none', padding: '40px 32px', borderRadius: '3px', position: 'relative' }}>
              {plan.highlighted && <div style={{ position: 'absolute', top: '-1px', left: '50%', transform: 'translateX(-50%)', background: '#C9A84C', color: '#0A0A0F', padding: '4px 16px', fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', fontFamily: 'var(--font-ui)' }}>Recommandé</div>}
              <p style={{ color: '#C9A84C', fontSize: '10px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', fontFamily: 'var(--font-ui)', marginBottom: '10px' }}>{plan.name}</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '6px' }}>
                <span className="price-mono" style={{ fontSize: '48px', fontWeight: 500, color: '#F0EEE8', lineHeight: 1, letterSpacing: '-2px' }}>{billing === 'year' ? plan.priceYear : plan.price}</span>
                <span style={{ color: 'var(--muted)', fontSize: '13px' }}>€/mois</span>
              </div>
              <p style={{ color: 'var(--muted)', fontSize: '12px', marginBottom: '28px', lineHeight: 1.6 }}>{plan.desc}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '32px' }}>
                {plan.features.map(f => (
                  <div key={f} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '13px', color: 'rgba(240,238,232,0.7)' }}>
                    <span style={{ color: '#C9A84C', flexShrink: 0, marginTop: '1px' }}>—</span>{f}
                  </div>
                ))}
              </div>
              <Btn variant={plan.highlighted ? 'gold' : 'ghost'} onClick={() => navigate({ page: 'dashboard' })} style={{ width: '100%', justifyContent: 'center' }}>Démarrer</Btn>
            </div>
          ))}
        </div>
      </div>
      <LuxFooter navigate={navigate} />
    </div>
  );
};

// ══════════════════════════════════════════════════════
//  BLOG ARTICLE PAGE
// ══════════════════════════════════════════════════════
const BlogArticlePage = ({ route, navigate }) => {
  const article = BLOG_ARTICLES[route.slug];
  if (!article) {
    return (
      <div className="lux-page" style={{ background: 'var(--bg)', minHeight: '100vh', paddingTop: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '40px', color: 'rgba(240,238,232,0.15)' }}>Article introuvable</p>
          <Btn variant="ghost" onClick={() => navigate({ page: 'blog' })} style={{ marginTop: '20px' }}>← Retour au blog</Btn>
        </div>
      </div>
    );
  }

  const renderBlock = (block, i) => {
    if (block.type === 'lead') return (
      <p key={i} style={{ fontSize: '18px', lineHeight: 1.85, color: 'rgba(240,238,232,0.85)', fontWeight: 300, borderLeft: '3px solid #C9A84C', paddingLeft: '24px', marginBottom: '36px', fontFamily: 'var(--font-ui)' }}>{block.text}</p>
    );
    if (block.type === 'h2') return (
      <h2 key={i} style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '30px', letterSpacing: '0.5px', color: '#F0EEE8', marginTop: '48px', marginBottom: '18px' }}>{block.text}</h2>
    );
    if (block.type === 'p') return (
      <p key={i} style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: 1.9, marginBottom: '20px', fontFamily: 'var(--font-ui)' }}>{block.text}</p>
    );
    if (block.type === 'tip') return (
      <div key={i} style={{ background: 'rgba(201,168,76,0.07)', border: '1px solid rgba(201,168,76,0.22)', borderRadius: '3px', padding: '18px 22px', marginBottom: '28px', display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
        <span style={{ fontSize: '18px', flexShrink: 0 }}>{block.icon}</span>
        <p style={{ color: 'rgba(240,238,232,0.8)', fontSize: '14px', lineHeight: 1.75, margin: 0, fontFamily: 'var(--font-ui)' }}>{block.text}</p>
      </div>
    );
    if (block.type === 'list') return (
      <ul key={i} style={{ margin: '0 0 28px 0', padding: 0, listStyle: 'none' }}>
        {block.items.map((item, j) => (
          <li key={j} style={{ display: 'flex', gap: '12px', marginBottom: '12px', color: 'var(--muted)', fontSize: '14px', lineHeight: 1.75, fontFamily: 'var(--font-ui)' }}>
            <span style={{ color: '#C9A84C', flexShrink: 0, marginTop: '2px' }}>—</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
    return null;
  };

  const related = BLOG_POSTS.filter(p => p.slug !== article.slug).slice(0, 3);

  return (
    <div className="lux-page" style={{ background: 'var(--bg)', minHeight: '100vh', paddingTop: '64px' }}>
      {/* Hero image */}
      <div style={{ position: 'relative', height: '420px', overflow: 'hidden' }}>
        <img src={article.img} alt={article.title}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.55)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,15,1) 0%, rgba(10,10,15,0.3) 50%, transparent 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(10,10,15,0.7) 0%, transparent 60%)' }} />
        <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '48px 96px' }}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
            <Badge variant="gold">{article.category}</Badge>
            <Badge variant="default">{article.city}</Badge>
          </div>
          <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(28px, 4vw, 52px)', letterSpacing: '1px', color: '#F0EEE8', lineHeight: 1.05, maxWidth: '700px', marginBottom: '14px' }}>{article.title}</h1>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ color: 'var(--muted)', fontSize: '12px', fontFamily: 'var(--font-mono)' }}>{article.date}</span>
            <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '10px' }}>·</span>
            <span style={{ color: 'var(--muted)', fontSize: '12px', fontFamily: 'var(--font-mono)' }}>{article.readTime} de lecture</span>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div style={{ padding: '16px 96px', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'var(--surface)', display: 'flex', gap: '8px', fontSize: '11px', color: 'var(--muted)', fontFamily: 'var(--font-ui)' }}>
        <button onClick={() => navigate({ page: 'home', city: 'lyon' })} style={{ background: 'none', border: 'none', color: '#C9A84C', cursor: 'pointer', fontSize: '11px', fontFamily: 'var(--font-ui)', padding: 0 }}>Accueil</button>
        <span style={{ opacity: 0.3 }}>/</span>
        <button onClick={() => navigate({ page: 'blog' })} style={{ background: 'none', border: 'none', color: '#C9A84C', cursor: 'pointer', fontSize: '11px', fontFamily: 'var(--font-ui)', padding: 0 }}>Blog</button>
        <span style={{ opacity: 0.3 }}>/</span>
        <span style={{ color: 'rgba(240,238,232,0.4)' }}>{article.title.substring(0, 50)}{article.title.length > 50 ? '…' : ''}</span>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '780px', margin: '0 auto', padding: '64px 24px 80px' }}>
        {article.body.map((block, i) => renderBlock(block, i))}

        {/* Author / Share */}
        <div style={{ marginTop: '64px', paddingTop: '32px', borderTop: '1px solid rgba(255,255,255,0.07)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, rgba(201,168,76,0.3), rgba(201,168,76,0.08))', border: '1px solid rgba(201,168,76,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Bebas Neue, sans-serif', fontSize: '16px', color: '#C9A84C' }}>L</div>
            <div>
              <div style={{ fontFamily: 'var(--font-ui)', fontSize: '13px', color: '#F0EEE8', fontWeight: 500 }}>Équipe LuxDrive</div>
              <div style={{ color: 'var(--muted)', fontSize: '11px' }}>Magazine LuxDrive</div>
            </div>
          </div>
          <Btn variant="ghost" onClick={() => navigate({ page: 'listings', city: 'lyon' })} style={{ padding: '9px 20px' }}>Trouver un véhicule →</Btn>
        </div>
      </div>

      {/* Related articles */}
      <div style={{ background: 'var(--surface)', borderTop: '1px solid rgba(255,255,255,0.05)', padding: '56px 52px 80px' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <SectionTitle eyebrow="Magazine LuxDrive" title="Articles similaires" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '32px' }}>
            {related.map(post => (
              <div key={post.slug} style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '3px', overflow: 'hidden', cursor: 'pointer', transition: 'border-color 0.2s' }}
                onClick={() => navigate({ page: 'blog-article', slug: post.slug })}
                onMouseOver={e => e.currentTarget.style.borderColor = 'rgba(201,168,76,0.35)'}
                onMouseOut={e => e.currentTarget.style.borderColor = 'var(--border)'}>
                <div style={{ aspectRatio: '16/9', overflow: 'hidden' }}>
                  <img src={post.img} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.7) grayscale(0.25)', transition: 'filter 0.4s' }}
                    onMouseOver={e => e.target.style.filter = 'brightness(0.9) grayscale(0)'}
                    onMouseOut={e => e.target.style.filter = 'brightness(0.7) grayscale(0.25)'} />
                </div>
                <div style={{ padding: '18px' }}>
                  <Badge variant="gold">{post.category}</Badge>
                  <h3 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '16px', color: '#F0EEE8', marginTop: '10px', marginBottom: '8px', lineHeight: 1.2 }}>{post.title}</h3>
                  <span style={{ color: 'var(--muted)', fontSize: '10px', fontFamily: 'var(--font-mono)' }}>{post.readTime} de lecture</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <LuxFooter navigate={navigate} />
    </div>
  );
};

Object.assign(window, { HomePage, CityHubPage, ListingsPage, ListRow, AnnonceurPage, BlogPage, BlogArticlePage, AgencyProfilePage, BLOG_POSTS });
