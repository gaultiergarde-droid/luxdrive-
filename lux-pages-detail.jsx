
const { useState, useEffect } = React;

// ══════════════════════════════════════════════════════
//  VEHICLE DETAIL
// ══════════════════════════════════════════════════════
const VehicleDetailPage = ({ route, navigate }) => {
  const mockCar = MOCK_CARS.find(c => c.slug === route.slug);
  const [car,        setCar]        = useState(mockCar || null);
  const [carLoading, setCarLoading] = useState(!mockCar);

  useEffect(() => {
    if (mockCar) return;
    const sb = window.luxSb;
    if (!sb) { setCar(MOCK_CARS[0]); setCarLoading(false); return; }
    sb.from('annonces')
      .select('*')
      .eq('slug', route.slug)
      .eq('status', 'published')
      .single()
      .then(({ data }) => {
        if (data) {
          setCar(normalizeAnnonce(data));
          sb.from('annonces').update({ views: (data.views || 0) + 1 }).eq('id', data.id);
        } else {
          setCar(MOCK_CARS[0]);
        }
        setCarLoading(false);
      });
  }, [route.slug]);

  const [activeImg, setActiveImg] = useState(0);
  const [form, setForm] = useState({ dateFrom: '', dateTo: '', name: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  if (carLoading || !car) return null;

  const agency  = AGENCIES.find(a => a.slug === car.agencySlug) || AGENCIES[0];
  const related = MOCK_CARS.filter(c => c.id !== car.id && (c.category === car.category || c.brand === car.brand)).slice(0, 3);
  const images  = car.images || [car.image, car.image, car.image];
  const nights = form.dateFrom && form.dateTo ? Math.max(0, (new Date(form.dateTo) - new Date(form.dateFrom)) / 86400000) : 0;

  return (
    <div className="lux-page" style={{ background: 'var(--bg)', minHeight: '100vh', paddingTop: '64px' }}>
      {/* Breadcrumb */}
      <div style={{ padding: '22px 52px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: 'var(--muted)', fontFamily: 'var(--font-ui)', background: 'var(--surface)' }}>
        {[
          { l: 'Accueil', fn: () => navigate({ page: 'home', city: car.city }) },
          { l: car.city.charAt(0).toUpperCase() + car.city.slice(1), fn: () => navigate({ page: 'city', city: car.city }) },
          { l: 'Annonces', fn: () => navigate({ page: 'listings', city: car.city }) },
          { l: `${car.brand} ${car.model}`, fn: null },
        ].map((b, i) => (
          <React.Fragment key={b.l}>
            {i > 0 && <span style={{ opacity: 0.3 }}>/</span>}
            <button onClick={b.fn} disabled={!b.fn} style={{ background: 'none', border: 'none', color: b.fn ? '#C9A84C' : '#F0EEE8', cursor: b.fn ? 'pointer' : 'default', fontSize: '11px', fontFamily: 'var(--font-ui)', padding: 0 }}>{b.l}</button>
          </React.Fragment>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: 0, maxWidth: '1440px', margin: '0 auto', padding: '52px', alignItems: 'start' }}>
        {/* LEFT */}
        <div style={{ paddingRight: '64px' }}>
          {/* Header */}
          <div style={{ marginBottom: '36px' }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
              <Badge variant="gold">{car.brand}</Badge>
              <Badge variant={car.available ? 'green' : 'red'}>{car.available ? 'Disponible' : 'Indisponible'}</Badge>
              {car.featured && <Badge variant="default">Sélection</Badge>}
            </div>
            <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '64px', letterSpacing: '1px', lineHeight: 0.92, color: '#F0EEE8', marginBottom: '16px' }}>{car.model}</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', color: '#C9A84C', fontSize: '13px' }}>★ {car.rating}</span>
              <span style={{ color: 'var(--muted)', fontSize: '12px' }}>{car.reviews} avis</span>
              <span style={{ color: 'var(--muted)', fontSize: '12px' }}>{car.year}</span>
              <span style={{ color: 'var(--muted)', fontSize: '12px' }}>{car.city.charAt(0).toUpperCase() + car.city.slice(1)}</span>
            </div>
          </div>

          {/* Gallery */}
          <div style={{ marginBottom: '48px' }}>
            <div style={{ position: 'relative', borderRadius: '3px', overflow: 'hidden', aspectRatio: '16/9', background: '#060610', marginBottom: '10px' }}>
              <img src={images[activeImg]} alt={car.model}
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 0.3s' }} />
              {!car.available && (
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,10,15,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ border: '1px solid rgba(240,238,232,0.3)', color: '#F0EEE8', padding: '10px 24px', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', fontFamily: 'var(--font-ui)' }}>Indisponible</span>
                </div>
              )}
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              {images.map((img, i) => (
                <button key={i} onClick={() => setActiveImg(i)}
                  style={{ width: '88px', height: '58px', borderRadius: '2px', overflow: 'hidden', border: `2px solid ${activeImg === i ? '#C9A84C' : 'transparent'}`, cursor: 'pointer', padding: 0, background: 'none', flexShrink: 0, transition: 'border-color 0.2s' }}>
                  <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div style={{ marginBottom: '48px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <span className="gold-line"></span>
              <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '22px', color: '#F0EEE8' }}>Description</h2>
            </div>
            <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: 1.9 }}>{car.description}</p>
          </div>

          {/* Specs */}
          <div style={{ marginBottom: '48px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <span className="gold-line"></span>
              <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '22px', color: '#F0EEE8' }}>Caractéristiques</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'rgba(255,255,255,0.04)' }}>
              {(() => {
                const items = car.fromDb ? [
                  car.year             ? ['Année',           car.year]                                                  : null,
                  car.fuel             ? ['Carburant',        car.fuel]                                                  : null,
                  car.transmission     ? ['Boîte',            car.transmission]                                          : null,
                  car.power            ? ['Puissance',        `${car.power} ch`]                                         : null,
                  car.seats            ? ['Places',           car.seats]                                                  : null,
                  car.caution          ? ['Caution',          `${Number(car.caution).toLocaleString('fr-FR')} €`]        : null,
                  car.kmParJour        ? ['Km / jour',        `${car.kmParJour} km`]                                     : null,
                  car.permisRequis     ? ['Permis',           `Permis ${car.permisRequis}`]                              : null,
                  ['Assurance',   car.assuranceIncluse ? 'Incluse'    : 'Non incluse'],
                  ['Carburant',   car.carburantInclus  ? 'Inclus'     : 'Non inclus'],
                ].filter(Boolean) : [
                  ...Object.entries(car.specs || {}).map(([k, v]) => [k, v]),
                  car.seats ? ['Places', car.seats] : null,
                ].filter(Boolean);
                return items.map(([k, v]) => (
                  <div key={k} style={{ background: 'var(--surface)', padding: '20px 22px' }}>
                    <div style={{ color: 'var(--muted)', fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', fontFamily: 'var(--font-ui)', marginBottom: '8px' }}>{k}</div>
                    <div className="price-mono" style={{ fontSize: '20px', fontWeight: 500, color: '#F0EEE8' }}>{v}</div>
                  </div>
                ));
              })()}
            </div>
          </div>

          {/* Agency */}
          <div style={{ marginBottom: '56px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <span className="gold-line"></span>
              <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '22px', color: '#F0EEE8' }}>Proposé par</h2>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--surface)', border: '1px solid var(--border)', padding: '28px', borderRadius: '3px' }}>
              <AgencyBadge agency={agency} />
              <Btn variant="ghost" style={{ marginLeft: '24px', flexShrink: 0 }}>Voir le profil →</Btn>
            </div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <span className="gold-line"></span>
                <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '22px', color: '#F0EEE8' }}>Vous pourriez aimer</h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '18px' }}>
                {related.map(c => <CarCard key={c.id} car={c} navigate={navigate} size="sm" />)}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT — Booking panel */}
        <div style={{ position: 'sticky', top: '80px' }}>
          <div style={{ background: 'var(--surface)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden', boxShadow: '0 32px 80px rgba(0,0,0,0.45)' }}>
            {/* Price header */}
            <div style={{ background: 'linear-gradient(135deg, var(--raised), #1A1A24)', padding: '32px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                <span className="price-mono" style={{ fontSize: '48px', fontWeight: 500, color: '#C9A84C', lineHeight: 1, letterSpacing: '-1.5px' }}>{car.price.toLocaleString('fr-FR')} €</span>
                <span style={{ color: 'var(--muted)', fontSize: '13px', fontFamily: 'var(--font-ui)' }}>/jour</span>
              </div>
              <p style={{ color: 'var(--muted)', fontSize: '12px', marginTop: '6px' }}>ou <span className="price-mono" style={{ color: 'rgba(201,168,76,0.7)' }}>{car.priceWeek?.toLocaleString('fr-FR')} €</span> la semaine</p>
              {nights > 0 && (
                <div style={{ marginTop: '18px', padding: '12px 16px', background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.18)', borderRadius: '2px' }}>
                  <span style={{ fontFamily: 'var(--font-ui)', fontSize: '12px', color: 'var(--muted)', display: 'block', marginBottom: '2px' }}>{nights} jour{nights > 1 ? 's' : ''}</span>
                  <span className="price-mono" style={{ fontSize: '22px', fontWeight: 500, color: '#F0EEE8' }}>Total : {(car.price * nights).toLocaleString('fr-FR')} €</span>
                </div>
              )}
            </div>

            {/* Form */}
            <div style={{ padding: '28px' }}>
              {sent ? (
                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 10l4.5 4.5L16 7" stroke="#22C55E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <h3 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '22px', fontWeight: 500, marginBottom: '8px' }}>Demande envoyée</h3>
                  <p style={{ color: 'var(--muted)', fontSize: '13px', lineHeight: 1.7 }}>{agency.name} vous contactera sous {agency.response}.</p>
                  <button onClick={() => setSent(false)} style={{ background: 'none', border: 'none', color: '#C9A84C', cursor: 'pointer', fontSize: '11px', fontFamily: 'var(--font-ui)', marginTop: '16px', textDecoration: 'underline', textUnderlineOffset: '3px' }}>Nouvelle demande</button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <p style={{ color: '#C9A84C', fontSize: '9px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', fontFamily: 'var(--font-ui)', marginBottom: '2px' }}>Demande de réservation</p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    {[['dateFrom', 'Départ', 'date'], ['dateTo', 'Retour', 'date']].map(([k, l, t]) => (
                      <div key={k}>
                        <label style={{ color: 'var(--muted)', fontSize: '9px', fontWeight: 700, letterSpacing: '1.8px', textTransform: 'uppercase', fontFamily: 'var(--font-ui)', display: 'block', marginBottom: '7px' }}>{l}</label>
                        <input type={t} value={form[k]} onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))} className="lux-input" />
                      </div>
                    ))}
                  </div>
                  {[['name', 'Nom *', 'text'], ['phone', 'Téléphone *', 'tel']].map(([k, l, t]) => (
                    <div key={k}>
                      <label style={{ color: 'var(--muted)', fontSize: '9px', fontWeight: 700, letterSpacing: '1.8px', textTransform: 'uppercase', fontFamily: 'var(--font-ui)', display: 'block', marginBottom: '7px' }}>{l}</label>
                      <input type={t} value={form[k]} onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))} placeholder={l.replace(' *', '')} className="lux-input" />
                    </div>
                  ))}
                  <div>
                    <label style={{ color: 'var(--muted)', fontSize: '9px', fontWeight: 700, letterSpacing: '1.8px', textTransform: 'uppercase', fontFamily: 'var(--font-ui)', display: 'block', marginBottom: '7px' }}>Message</label>
                    <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} placeholder="Occasion, questions…" rows={3} className="lux-input" style={{ resize: 'vertical' }} />
                  </div>
                  <Btn variant={car.available ? 'gold' : 'ghost'} disabled={!car.available || sending}
                    onClick={async () => {
                      if (!form.name || !form.phone) return;
                      setSending(true);
                      try {
                        if (typeof FORMSPREE_CONTACT_ID !== 'undefined' && FORMSPREE_CONTACT_ID !== 'YOUR_CONTACT_FORM_ID') {
                          await fetch(`https://formspree.io/f/${FORMSPREE_CONTACT_ID}`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                            body: JSON.stringify({ ...form, vehicule: `${car.brand} ${car.model}`, agence: car.agency, ville: car.city }),
                          });
                        }
                        if (window.luxSb && car.fromDb && car.agencyUserId) {
                          await window.luxSb.from('leads').insert({
                            user_id:     car.agencyUserId,
                            annonce_id:  car.id,
                            name:        form.name,
                            phone:       form.phone,
                            date_from:   form.dateFrom || null,
                            date_to:     form.dateTo   || null,
                            message:     form.message  || '',
                            rental_type: 'Demande de location',
                            status:      'new',
                            city:        car.city,
                          });
                        }
                      } catch(_) {}
                      setSending(false);
                      setSent(true);
                    }}
                    style={{ width: '100%', justifyContent: 'center', padding: '14px' }}>
                    {sending ? 'Envoi…' : car.available ? 'Envoyer la demande' : 'Véhicule indisponible'}
                  </Btn>
                  <p style={{ color: 'rgba(240,238,232,0.25)', fontSize: '10px', fontFamily: 'var(--font-ui)', textAlign: 'center', lineHeight: 1.7 }}>Sans engagement · Réponse sous {agency.response} · Gratuit</p>
                </div>
              )}
            </div>
          </div>
          <div style={{ marginTop: '14px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {car.tags?.map(t => <Badge key={t} variant="default">{t}</Badge>)}
          </div>
        </div>
      </div>

      <div style={{ padding: '0 52px 80px', maxWidth: '1440px', margin: '0 auto' }}>
        <LuxFooter navigate={navigate} />
      </div>
    </div>
  );
};

Object.assign(window, { VehicleDetailPage });
