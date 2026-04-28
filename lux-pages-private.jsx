
const { useState, useEffect, useRef } = React;

// ── Shared sidebar ─────────────────────────────────────────
const AdminSideNav = ({ active, setActive, items, onBack, title, subtitle }) => (
  <div style={{ width: '240px', flexShrink: 0, background: '#08080D', borderRight: '1px solid rgba(255,255,255,0.05)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
    <div style={{ padding: '28px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      <LuxLogo size="sm" onClick={onBack} />
      {title && <div style={{ marginTop: '20px', padding: '10px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: '2px', border: '1px solid rgba(255,255,255,0.06)' }}>
        <p style={{ color: '#C9A84C', fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', fontFamily: 'var(--font-ui)' }}>{title}</p>
        {subtitle && <p style={{ color: 'var(--muted)', fontSize: '11px', fontFamily: 'var(--font-ui)', marginTop: '2px' }}>{subtitle}</p>}
      </div>}
    </div>
    <nav style={{ padding: '16px 12px', flex: 1 }}>
      {items.map(item => (
        <button key={item.id} className="side-item" onClick={() => item.onClick ? item.onClick() : setActive(item.id)}
          style={{ width: '100%', background: active === item.id ? 'rgba(201,168,76,0.08)' : 'transparent', border: `1px solid ${active === item.id ? 'rgba(201,168,76,0.22)' : 'transparent'}`, color: active === item.id ? '#C9A84C' : 'var(--muted)', padding: '10px 14px', borderRadius: '3px', cursor: 'pointer', fontFamily: 'var(--font-ui)', fontSize: '12px', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '2px', letterSpacing: '0.3px', transition: 'all 0.15s' }}>
          <span style={{ opacity: 0.6, fontSize: '13px' }}>{item.icon}</span>
          <span style={{ flex: 1 }}>{item.label}</span>
          {item.badge > 0 && (
            <span style={{ background: '#EF4444', color: '#fff', fontSize: '9px', fontWeight: 700, padding: '2px 6px', borderRadius: '10px', fontFamily: 'var(--font-mono)' }}>{item.badge}</span>
          )}
        </button>
      ))}
    </nav>
    <div style={{ padding: '18px 20px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <p style={{ color: 'rgba(240,238,232,0.25)', fontSize: '10px', fontFamily: 'var(--font-ui)', lineHeight: 1.6 }}>
        {title === 'ADMIN' ? 'LuxDrive Ops · v2.0' : 'Lyon Prestige · Plan Pro'}
      </p>
    </div>
  </div>
);

// ── Dashboard stat card ────────────────────────────────────
const DashStat = ({ label, value, trend, accent, mono }) => (
  <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '3px', padding: '28px 24px' }}>
    <p style={{ color: 'var(--muted)', fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', fontFamily: 'var(--font-ui)', marginBottom: '14px' }}>{label}</p>
    <div className={mono ? 'price-mono' : ''} style={{ fontSize: '40px', fontWeight: mono ? 500 : 400, color: accent || '#F0EEE8', lineHeight: 1, fontFamily: mono ? 'var(--font-mono)' : 'Cormorant Garamond, serif', letterSpacing: mono ? '-1px' : '0' }}>{value}</div>
    {trend !== undefined && <p style={{ color: trend >= 0 ? '#22C55E' : '#EF4444', fontSize: '11px', fontFamily: 'var(--font-ui)', marginTop: '8px' }}>{trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}% ce mois</p>}
  </div>
);

// ══════════════════════════════════════════════════════
//  DASHBOARD (annonceur)
// ══════════════════════════════════════════════════════
const DashboardPage = ({ route, navigate, user, profile: authProfile, onLogout }) => {
  const [section,       setSection]       = useState('overview');
  const [step,          setStep]          = useState(1);
  const [nf,            setNf]            = useState({ brand: '', model: '', category: '', city: '', price: '', year: '', fuel: '', transmission: '', seats: '', power: '', description: '', caution: '', kmParJour: '', assuranceIncluse: false, permisRequis: 'B', carburantInclus: false });
  const [profileForm,   setProfileForm]   = useState({ name: '', city: '', address: '', phone: '', email: '', siret: '', description: '', website: '' });
  const [profileSaved,  setProfileSaved]  = useState(false);
  const [profileSaving, setProfileSaving] = useState(false);
  const [submitting,    setSubmitting]    = useState(false);
  const [formErrors,    setFormErrors]    = useState({});
  const [leadFilter,    setLeadFilter]    = useState('all');
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const fileRef = useRef(null);

  const db = (typeof useDashboard !== 'undefined') ? useDashboard(user) : {};

  // Sync profile form quand les données DB arrivent
  useEffect(() => {
    const p = db.dbProfile || authProfile;
    if (!p) return;
    setProfileForm({
      name:        p.agency_name  || '',
      city:        p.city         || '',
      address:     p.address      || '',
      phone:       p.phone        || '',
      email:       p.email        || user?.email || '',
      siret:       p.siret        || '',
      description: p.description  || '',
      website:     p.website      || '',
    });
  }, [db.dbProfile, authProfile]);

  // Annonces : données DB si disponibles, sinon mock
  const MOCK_ANNONCES = [
    { id: 1, brand: '', model: 'Ferrari SF90 Stradale', status: 'published', views: 1247, price: 1800, created_at: '2026-03-12' },
    { id: 2, brand: '', model: 'Porsche 911 Turbo S',   status: 'published', views: 3021, price: 750,  created_at: '2026-02-03' },
    { id: 3, brand: '', model: 'McLaren 720S',           status: 'pending',   views: 0,    price: 1200, created_at: '2026-04-27' },
  ];
  const annonces    = db.annonces !== null && db.annonces !== undefined ? db.annonces : (window.luxSb ? [] : MOCK_ANNONCES);
  const agencyName  = db.dbProfile?.agency_name || authProfile?.agency_name || user?.user_metadata?.agency_name || 'Mon Agence';
  const agencyCity  = db.dbProfile?.city        || authProfile?.city        || user?.user_metadata?.city        || 'lyon';

  // Leads : données DB si disponibles, sinon mock
  const leads = db.dbLeads !== null && db.dbLeads !== undefined ? db.dbLeads : MOCK_LEADS;

  const isUserAdmin = db.dbProfile?.role === 'admin' || authProfile?.role === 'admin';

  const navItems = [
    { id: 'overview', icon: '◈', label: 'Vue globale' },
    { id: 'annonces', icon: '◆', label: 'Mes annonces' },
    { id: 'nouvelle', icon: '+', label: 'Nouvelle annonce' },
    { id: 'profil', icon: '◎', label: 'Profil agence' },
    { id: 'abonnement', icon: '◇', label: 'Abonnement' },
    { id: 'stats', icon: '▣', label: 'Statistiques' },
    { id: 'leads', icon: '◉', label: 'Leads reçus', badge: 2 },
    ...(isUserAdmin ? [{ id: 'admin', icon: '⚙', label: 'Modération admin', onClick: () => navigate({ page: 'admin' }) }] : []),
  ];

  const statusMap = {
    published: { label: 'Publiée', v: 'green' },
    pending:   { label: 'En attente', v: 'orange' },
    rejected:  { label: 'Refusée', v: 'red' },
  };

  const renderMain = () => {
    const lbl = { color: 'var(--muted)', fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', fontFamily: 'var(--font-ui)', display: 'block', marginBottom: '8px' };
    const err = { color: '#EF4444', fontSize: '10px', fontFamily: 'var(--font-ui)', marginTop: '4px' };
    const validateStep = () => {
      const errors = {};
      if (step === 1) {
        if (!nf.brand.trim())                          errors.brand        = 'Requis';
        if (!nf.model.trim())                          errors.model        = 'Requis';
        if (!nf.category)                              errors.category     = 'Requis';
        if (!nf.year || parseInt(nf.year) < 1990)      errors.year         = 'Année invalide (min. 1990)';
        if (!nf.fuel)                                  errors.fuel         = 'Requis';
        if (!nf.power || parseInt(nf.power) < 50)      errors.power        = 'Puissance invalide (min. 50 ch)';
        if (!nf.transmission)                          errors.transmission = 'Requis';
        if (nf.description.trim().length < 50)         errors.description  = `${nf.description.trim().length}/50 caractères minimum`;
      }
      if (step === 2) {
        if (uploadedPhotos.filter(p => p.url && !p.uploading).length === 0)
          errors.photos = 'Au moins 1 photo est requise';
      }
      if (step === 3) {
        if (!nf.price || parseInt(nf.price) <= 0) errors.price = 'Le prix doit être supérieur à 0';
      }
      setFormErrors(errors);
      return Object.keys(errors).length === 0;
    };
    if (section === 'overview') return (
      <div>
        <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '40px', marginBottom: '6px', color: '#F0EEE8' }}>Vue globale</h1>
        <p style={{ color: 'var(--muted)', fontSize: '12px', fontFamily: 'var(--font-ui)', marginBottom: '36px' }}>{agencyName} · {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '40px' }}>
          <DashStat label="Vues totales" value={annonces.reduce((s,a) => s+(a.views||0), 0).toLocaleString('fr-FR')} accent="#C9A84C" mono />
          <DashStat label="Leads reçus" value={leads.length.toString()} mono />
          <DashStat label="Annonces actives" value={`${annonces.filter(a=>a.status==='published').length} / ${annonces.length}`} accent="#F0EEE8" mono />
          <DashStat label="Note moyenne" value="4.9" accent="#C9A84C" mono />
        </div>
        {/* Chart */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '3px', padding: '28px', marginBottom: '20px' }}>
          <p style={{ color: 'var(--muted)', fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', fontFamily: 'var(--font-ui)', marginBottom: '20px' }}>Vues — 30 derniers jours</p>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '80px' }}>
            {[40,65,45,80,55,90,70,85,60,95,75,100,80,65,88,72,95,60,78,85,92,68,75,88,62,79,95,82,90,100].map((v,i) => (
              <div key={i} style={{ flex: 1, background: `rgba(201,168,76,${0.15 + v/220})`, borderRadius: '1px 1px 0 0', height: `${v}%`, transition: 'height 0.3s', minWidth: '4px' }} />
            ))}
          </div>
        </div>
        {/* Leads */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '3px', padding: '28px' }}>
          <p style={{ color: 'var(--muted)', fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', fontFamily: 'var(--font-ui)', marginBottom: '20px' }}>Derniers leads</p>
          {leads.slice(0, 5).map(lead => (
            <div key={lead.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
              <div>
                <span style={{ fontFamily: 'var(--font-ui)', fontSize: '13px', fontWeight: 500, color: '#F0EEE8' }}>{lead.client}</span>
                <span style={{ color: 'var(--muted)', fontSize: '12px' }}> · {lead.car} · {lead.type}</span>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <span style={{ color: 'var(--muted)', fontSize: '11px', fontFamily: 'var(--font-mono)' }}>{lead.date}</span>
                <Badge variant={lead.status === 'new' ? 'gold' : lead.status === 'confirmed' ? 'green' : 'default'}>
                  {lead.status === 'new' ? 'Nouveau' : lead.status === 'confirmed' ? 'Confirmé' : 'Attente'}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    );

    if (section === 'annonces') return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '40px' }}>Mes annonces</h1>
          <Btn variant="gold" onClick={() => setSection('nouvelle')}>+ Nouvelle annonce</Btn>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {annonces.map(a => {
            const s = statusMap[a.status];
            return (
              <div key={a.id} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '3px', padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '24px' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '18px', fontWeight: 500, color: '#F0EEE8' }}>{a.brand ? `${a.brand} ${a.model}` : a.model}</span>
                    <Badge variant={s.v}>{s.label}</Badge>
                  </div>
                  <span className="price-mono" style={{ color: 'var(--muted)', fontSize: '12px' }}>{a.price.toLocaleString('fr-FR')} €/j · {a.since || (a.created_at ? new Date(a.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }) : '')}</span>
                </div>
                {a.status === 'published' && (
                  <div style={{ display: 'flex', gap: '32px' }}>
                    <div style={{ textAlign: 'center' }}>
                      <div className="price-mono" style={{ fontSize: '24px', fontWeight: 500, color: '#C9A84C' }}>{a.views.toLocaleString()}</div>
                      <div style={{ color: 'var(--muted)', fontSize: '10px', fontFamily: 'var(--font-ui)', textTransform: 'uppercase', letterSpacing: '1px' }}>vues</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div className="price-mono" style={{ fontSize: '24px', fontWeight: 500, color: '#F0EEE8' }}>{a.leads}</div>
                      <div style={{ color: 'var(--muted)', fontSize: '10px', fontFamily: 'var(--font-ui)', textTransform: 'uppercase', letterSpacing: '1px' }}>leads</div>
                    </div>
                  </div>
                )}
                <div style={{ display: 'flex', gap: '8px' }}>
                  <Btn variant="ghost" style={{ padding: '7px 14px' }}>{a.status === 'rejected' ? 'Voir motif' : 'Modifier'}</Btn>
                  {db.deleteAnnonce && <Btn variant="danger" style={{ padding: '7px 14px' }} onClick={() => { if (confirm(`Supprimer "${a.brand ? a.brand+' ' : ''}${a.model}" ?`)) db.deleteAnnonce(a.id); }}>Supprimer</Btn>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );

    if (section === 'nouvelle') return (
      <div>
        <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '40px', marginBottom: '8px' }}>Nouvelle annonce</h1>
        {/* Steps */}
        <div style={{ display: 'flex', gap: '4px', marginBottom: '40px', alignItems: 'center' }}>
          {['Véhicule', 'Photos', 'Tarif', 'Validation'].map((s, i) => (
            <React.Fragment key={s}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: i + 1 <= step ? '#C9A84C' : 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 700, color: i + 1 <= step ? '#0A0A0F' : 'var(--muted)', fontFamily: 'var(--font-mono)', flexShrink: 0 }}>{i + 1}</div>
                <span style={{ fontSize: '11px', fontFamily: 'var(--font-ui)', color: i + 1 === step ? '#F0EEE8' : 'var(--muted)', letterSpacing: '0.5px' }}>{s}</span>
              </div>
              {i < 3 && <div style={{ flex: 1, height: '1px', background: i + 1 < step ? '#C9A84C' : 'rgba(255,255,255,0.08)', maxWidth: '40px' }} />}
            </React.Fragment>
          ))}
        </div>
        {step < 4 ? (
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '3px', padding: '32px' }}>
            {step === 1 && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px', marginBottom: '24px' }}>
                {/* Marque */}
                <div>
                  <label style={lbl}>Marque *</label>
                  <input list="brand-list" value={nf.brand}
                    onChange={e => { setNf(f => ({ ...f, brand: e.target.value })); setFormErrors(fe => ({ ...fe, brand: '' })); }}
                    className="lux-input" placeholder="Ferrari, Porsche…" />
                  <datalist id="brand-list">
                    {['Ferrari','Lamborghini','Porsche','Rolls-Royce','Bentley','McLaren','Aston Martin','Mercedes-AMG','BMW M','Audi','Maserati','Bugatti','Koenigsegg','Pagani'].map(b => <option key={b} value={b} />)}
                  </datalist>
                  {formErrors.brand && <p style={err}>{formErrors.brand}</p>}
                </div>
                {/* Modèle */}
                <div>
                  <label style={lbl}>Modèle *</label>
                  <input value={nf.model}
                    onChange={e => { setNf(f => ({ ...f, model: e.target.value })); setFormErrors(fe => ({ ...fe, model: '' })); }}
                    className="lux-input" placeholder="SF90, 911 Turbo S, Huracán…" />
                  {formErrors.model && <p style={err}>{formErrors.model}</p>}
                </div>
                {/* Catégorie */}
                <div>
                  <label style={lbl}>Catégorie *</label>
                  <select value={nf.category}
                    onChange={e => { setNf(f => ({ ...f, category: e.target.value })); setFormErrors(fe => ({ ...fe, category: '' })); }}
                    className="lux-input" style={{ appearance: 'none' }}>
                    <option value="">— Choisir —</option>
                    {[['supercar','Supercar'],['sport','Sport'],['gt','GT'],['berline','Berline Luxe'],['suv','SUV Luxe'],['cabriolet','Cabriolet']].map(([v,l]) => <option key={v} value={v}>{l}</option>)}
                  </select>
                  {formErrors.category && <p style={err}>{formErrors.category}</p>}
                </div>
                {/* Année */}
                <div>
                  <label style={lbl}>Année *</label>
                  <input type="number" min="1990" max="2026" value={nf.year}
                    onChange={e => { setNf(f => ({ ...f, year: e.target.value })); setFormErrors(fe => ({ ...fe, year: '' })); }}
                    className="lux-input" placeholder="2024" />
                  {formErrors.year && <p style={err}>{formErrors.year}</p>}
                </div>
                {/* Carburant */}
                <div>
                  <label style={lbl}>Carburant *</label>
                  <select value={nf.fuel}
                    onChange={e => { setNf(f => ({ ...f, fuel: e.target.value })); setFormErrors(fe => ({ ...fe, fuel: '' })); }}
                    className="lux-input" style={{ appearance: 'none' }}>
                    <option value="">— Choisir —</option>
                    {['Essence','Hybride','Hybride rechargeable','Électrique','Diesel'].map(f => <option key={f} value={f}>{f}</option>)}
                  </select>
                  {formErrors.fuel && <p style={err}>{formErrors.fuel}</p>}
                </div>
                {/* Puissance */}
                <div>
                  <label style={lbl}>Puissance (ch) *</label>
                  <input type="number" min="50" max="2000" value={nf.power}
                    onChange={e => { setNf(f => ({ ...f, power: e.target.value })); setFormErrors(fe => ({ ...fe, power: '' })); }}
                    className="lux-input" placeholder="450" />
                  {formErrors.power && <p style={err}>{formErrors.power}</p>}
                </div>
                {/* Boîte */}
                <div>
                  <label style={lbl}>Boîte de vitesses *</label>
                  <select value={nf.transmission}
                    onChange={e => { setNf(f => ({ ...f, transmission: e.target.value })); setFormErrors(fe => ({ ...fe, transmission: '' })); }}
                    className="lux-input" style={{ appearance: 'none' }}>
                    <option value="">— Choisir —</option>
                    {['Automatique','Manuelle','Semi-automatique (PDK)','Semi-automatique (DCT)','Robotisée'].map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                  {formErrors.transmission && <p style={err}>{formErrors.transmission}</p>}
                </div>
                {/* Places */}
                <div>
                  <label style={lbl}>Nombre de places</label>
                  <select value={nf.seats} onChange={e => setNf(f => ({ ...f, seats: e.target.value }))} className="lux-input" style={{ appearance: 'none' }}>
                    <option value="">— Choisir —</option>
                    {['2','4','5','7'].map(s => <option key={s} value={s}>{s} places</option>)}
                  </select>
                </div>
                {/* Description */}
                <div style={{ gridColumn: '1/-1' }}>
                  <label style={lbl}>
                    Description *
                    <span style={{ color: 'var(--muted)', textTransform: 'none', letterSpacing: 0, fontWeight: 400, marginLeft: '6px' }}>(min. 50 caractères)</span>
                  </label>
                  <textarea value={nf.description}
                    onChange={e => { setNf(f => ({ ...f, description: e.target.value })); setFormErrors(fe => ({ ...fe, description: '' })); }}
                    rows={4} className="lux-input" placeholder="Décrivez le véhicule, son histoire, ses équipements…" style={{ resize: 'vertical' }} />
                  <p style={{ color: nf.description.length >= 50 ? '#22C55E' : 'var(--muted)', fontSize: '10px', fontFamily: 'var(--font-ui)', marginTop: '5px' }}>
                    {nf.description.length} / 50 caractères
                  </p>
                  {formErrors.description && <p style={err}>{formErrors.description}</p>}
                </div>
                {/* Ville */}
                <div>
                  <label style={lbl}>Ville de l'annonce</label>
                  <select value={nf.city || agencyCity} onChange={e => setNf(f => ({ ...f, city: e.target.value }))} className="lux-input" style={{ appearance: 'none' }}>
                    {['lyon','paris','marseille','nice','bordeaux','toulouse','nantes','strasbourg','lille','montpellier'].map(c => (
                      <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                    ))}
                  </select>
                </div>
                {/* Conditions */}
                <div style={{ gridColumn: '1/-1', marginTop: '8px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                  <p style={{ color: '#C9A84C', fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', fontFamily: 'var(--font-ui)', marginBottom: '20px' }}>Conditions de location</p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
                    {[['caution','Caution (€)'],['kmParJour','Km inclus / jour']].map(([k, l]) => (
                      <div key={k}>
                        <label style={lbl}>{l}</label>
                        <input type="number" value={nf[k]} onChange={e => setNf(f => ({ ...f, [k]: e.target.value }))} className="lux-input" placeholder="0" />
                      </div>
                    ))}
                    <div>
                      <label style={lbl}>Permis requis</label>
                      <select value={nf.permisRequis} onChange={e => setNf(f => ({ ...f, permisRequis: e.target.value }))} className="lux-input" style={{ appearance: 'none' }}>
                        {['B','A','A2','BE','C','D'].map(p => <option key={p} value={p}>Permis {p}</option>)}
                      </select>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      {[['assuranceIncluse','Assurance incluse'],['carburantInclus','Carburant inclus']].map(([k, l]) => (
                        <div key={k} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <label style={{ ...lbl, marginBottom: 0 }}>{l}</label>
                          <button type="button" onClick={() => setNf(f => ({ ...f, [k]: !f[k] }))}
                            style={{ width: '42px', height: '22px', borderRadius: '11px', background: nf[k] ? '#C9A84C' : 'rgba(255,255,255,0.1)', border: 'none', cursor: 'pointer', position: 'relative', flexShrink: 0, transition: 'background 0.2s' }}>
                            <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#fff', position: 'absolute', top: '3px', left: nf[k] ? '23px' : '3px', boxShadow: '0 1px 3px rgba(0,0,0,0.3)', transition: 'left 0.2s' }} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {step === 2 && (
              <div style={{ marginBottom: '24px' }}>
                <style>{`@keyframes spin-upload { to { transform: rotate(360deg); } }`}</style>
                <input type="file" accept="image/*" multiple ref={fileRef} style={{ display: 'none' }}
                  onChange={async (e) => {
                    const files = Array.from(e.target.files).slice(0, 10 - uploadedPhotos.length);
                    if (!files.length) return;
                    const sb = window.luxSb;
                    const previews = files.map(f => ({ file: f, url: null, uploading: true, localUrl: URL.createObjectURL(f) }));
                    const startIdx = uploadedPhotos.length;
                    setUploadedPhotos(prev => [...prev, ...previews]);
                    for (let i = 0; i < files.length; i++) {
                      const f = files[i];
                      const path = `${user?.id || 'anon'}/${Date.now()}-${f.name.replace(/[^a-z0-9._-]/gi, '_')}`;
                      let url = previews[i].localUrl;
                      if (sb) {
                        const { data } = await sb.storage.from('annonces-photos').upload(path, f, { upsert: true });
                        if (data) url = sb.storage.from('annonces-photos').getPublicUrl(data.path).data.publicUrl;
                      }
                      setUploadedPhotos(prev => prev.map((p, idx) => idx === startIdx + i ? { ...p, url, uploading: false } : p));
                    }
                    e.target.value = '';
                  }}
                />
                <div
                  style={{ border: '2px dashed rgba(255,255,255,0.08)', padding: '48px', textAlign: 'center', borderRadius: '3px', cursor: 'pointer', transition: 'border-color 0.2s', marginBottom: uploadedPhotos.length ? '16px' : 0 }}
                  onClick={() => fileRef.current?.click()}
                  onMouseOver={e => e.currentTarget.style.borderColor = 'rgba(201,168,76,0.35)'}
                  onMouseOut={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}>
                  <p style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '20px', color: 'rgba(240,238,232,0.25)', marginBottom: '10px' }}>Glissez vos photos ici</p>
                  <p style={{ color: 'var(--muted)', fontSize: '12px', fontFamily: 'var(--font-ui)', marginBottom: '18px' }}>JPG, PNG, WebP · {10 - uploadedPhotos.length} photo{10 - uploadedPhotos.length !== 1 ? 's' : ''} restante{10 - uploadedPhotos.length !== 1 ? 's' : ''}</p>
                  <Btn variant="ghost" style={{ padding: '8px 20px' }} onClick={e => { e.stopPropagation(); fileRef.current?.click(); }}>Parcourir les fichiers</Btn>
                </div>
                {uploadedPhotos.length > 0 && (
                  <div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px', marginBottom: '10px' }}>
                      {uploadedPhotos.map((p, i) => (
                        <div key={i} style={{ position: 'relative', aspectRatio: '4/3', borderRadius: '2px', overflow: 'hidden', background: '#060610', border: '1px solid var(--border)' }}>
                          <img src={p.localUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: p.uploading ? 0.4 : 1, transition: 'opacity 0.3s' }} />
                          {p.uploading ? (
                            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <div style={{ width: '18px', height: '18px', border: '2px solid rgba(201,168,76,0.3)', borderTopColor: '#C9A84C', borderRadius: '50%', animation: 'spin-upload 0.7s linear infinite' }} />
                            </div>
                          ) : (
                            <button onClick={() => setUploadedPhotos(prev => prev.filter((_, idx) => idx !== i))}
                              style={{ position: 'absolute', top: '4px', right: '4px', width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(10,10,15,0.85)', border: 'none', color: '#F0EEE8', cursor: 'pointer', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
                          )}
                        </div>
                      ))}
                    </div>
                    <p style={{ color: 'var(--muted)', fontSize: '11px', fontFamily: 'var(--font-ui)' }}>{uploadedPhotos.length}/10 photos</p>
                  </div>
                )}
                {formErrors.photos && <p style={err}>{formErrors.photos}</p>}
              </div>
            )}
            {step === 3 && (
              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px', marginBottom: '18px' }}>
                  {[['price', 'Prix / jour (€)'], ['priceWeek', 'Prix / semaine (€)']].map(([k, l]) => (
                    <div key={k}>
                      <label style={{ color: 'var(--muted)', fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', fontFamily: 'var(--font-ui)', display: 'block', marginBottom: '8px' }}>{l}</label>
                      <input type="number" value={nf[k] || ''} onChange={e => setNf(f => ({ ...f, [k]: e.target.value }))} className="lux-input" placeholder="0" />
                    </div>
                  ))}
                </div>
                {formErrors.price && <p style={err}>{formErrors.price}</p>}
                {/* Recap conditions */}
                <div style={{ background: 'rgba(201,168,76,0.04)', border: '1px solid rgba(201,168,76,0.12)', borderRadius: '2px', padding: '16px 20px' }}>
                  <p style={{ color: '#C9A84C', fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', fontFamily: 'var(--font-ui)', marginBottom: '12px' }}>Récapitulatif conditions</p>
                  <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                    {nf.caution      && <span style={{ color: 'var(--muted)', fontSize: '12px', fontFamily: 'var(--font-ui)' }}>Caution : <strong style={{ color: '#F0EEE8' }}>{Number(nf.caution).toLocaleString('fr-FR')} €</strong></span>}
                    {nf.kmParJour    && <span style={{ color: 'var(--muted)', fontSize: '12px', fontFamily: 'var(--font-ui)' }}>Km/j : <strong style={{ color: '#F0EEE8' }}>{nf.kmParJour} km</strong></span>}
                    <span style={{ color: 'var(--muted)', fontSize: '12px', fontFamily: 'var(--font-ui)' }}>Permis : <strong style={{ color: '#F0EEE8' }}>{nf.permisRequis}</strong></span>
                    <span style={{ color: 'var(--muted)', fontSize: '12px', fontFamily: 'var(--font-ui)' }}>Assurance : <strong style={{ color: nf.assuranceIncluse ? '#22C55E' : '#F0EEE8' }}>{nf.assuranceIncluse ? 'Incluse' : 'Non incluse'}</strong></span>
                    <span style={{ color: 'var(--muted)', fontSize: '12px', fontFamily: 'var(--font-ui)' }}>Carburant : <strong style={{ color: nf.carburantInclus ? '#22C55E' : '#F0EEE8' }}>{nf.carburantInclus ? 'Inclus' : 'Non inclus'}</strong></span>
                    <span style={{ color: 'var(--muted)', fontSize: '12px', fontFamily: 'var(--font-ui)' }}>Photos : <strong style={{ color: '#F0EEE8' }}>{uploadedPhotos.filter(p => !p.uploading).length}</strong></span>
                  </div>
                </div>
              </div>
            )}
            {formErrors.submit && (
              <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: '2px', padding: '10px 14px', marginBottom: '10px' }}>
                <p style={{ color: '#EF4444', fontSize: '12px', fontFamily: 'var(--font-ui)' }}>⚠ {formErrors.submit}</p>
              </div>
            )}
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              {step > 1 && <Btn variant="ghost" onClick={() => { setStep(s => s - 1); setFormErrors({}); }}>← Retour</Btn>}
              <Btn variant="gold" disabled={submitting || (step === 2 && uploadedPhotos.some(p => p.uploading))} onClick={async () => {
                if (!validateStep()) return;
                if (step < 3) { setStep(s => s + 1); setFormErrors({}); return; }
                setSubmitting(true);
                setFormErrors({});
                const imageUrls = uploadedPhotos.filter(p => p.url && !p.uploading).map(p => p.url);
                const result = db.createAnnonce ? await db.createAnnonce({ ...nf, imageUrls }, nf.city || agencyCity) : { ok: true };
                setSubmitting(false);
                if (result.ok !== false) {
                  setStep(s => s + 1);
                  setNf({ brand: '', model: '', category: '', city: '', price: '', year: '', fuel: '', transmission: '', seats: '', power: '', description: '', caution: '', kmParJour: '', assuranceIncluse: false, permisRequis: 'B', carburantInclus: false });
                  setUploadedPhotos([]);
                  setFormErrors({});
                } else {
                  const msg = result.error?.message || result.error || 'Erreur lors de la soumission. Vérifiez votre connexion et réessayez.';
                  setFormErrors({ submit: msg });
                }
              }}>
                {submitting ? 'Envoi...' : step === 2 && uploadedPhotos.some(p => p.uploading) ? 'Upload en cours...' : step < 3 ? 'Continuer →' : 'Soumettre pour modération →'}
              </Btn>
            </div>
          </div>
        ) : (
          <div style={{ background: 'var(--surface)', border: '1px solid rgba(201,168,76,0.25)', borderRadius: '3px', padding: '56px', textAlign: 'center' }}>
            <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M4 11l5 5L18 7" stroke="#C9A84C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '28px', marginBottom: '10px' }}>Annonce soumise</h2>
            <p style={{ color: 'var(--muted)', fontSize: '13px', fontFamily: 'var(--font-ui)', marginBottom: '28px' }}>Votre annonce est en attente de modération. Délai habituel : moins de 2h.</p>
            <Btn variant="ghost" onClick={() => { setSection('annonces'); setStep(1); }}>Voir mes annonces</Btn>
          </div>
        )}
      </div>
    );

    // ── STATS ────────────────────────────────────────────
    if (section === 'stats') return (
      <div>
        <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '40px', marginBottom: '6px' }}>Statistiques</h1>
        <p style={{ color: 'var(--muted)', fontSize: '12px', fontFamily: 'var(--font-ui)', marginBottom: '36px' }}>30 derniers jours · Mise à jour en temps réel</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '28px' }}>
          <DashStat label="Taux de conversion" value="2.1%" trend={0.4} mono />
          <DashStat label="Durée moy. location" value="2.8j" accent="#F0EEE8" mono />
          <DashStat label="Revenus estimés" value="38 400 €" trend={15} accent="#C9A84C" mono />
        </div>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '3px', padding: '28px', marginBottom: '20px' }}>
          <p style={{ color: 'var(--muted)', fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', fontFamily: 'var(--font-ui)', marginBottom: '20px' }}>Vues par annonce</p>
          {[{ model: 'Porsche 911 Turbo S', views: 3021, leads: 19 }, { model: 'Ferrari SF90 Stradale', views: 1247, leads: 8 }, { model: 'McLaren 720S', views: 312, leads: 0 }].map(v => (
            <div key={v.model} style={{ marginBottom: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '7px' }}>
                <span style={{ fontFamily: 'var(--font-ui)', fontSize: '13px', color: '#F0EEE8' }}>{v.model}</span>
                <span className="price-mono" style={{ color: '#C9A84C', fontSize: '12px' }}>{v.views.toLocaleString('fr-FR')} vues · {v.leads} leads</span>
              </div>
              <div style={{ height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ height: '100%', background: '#C9A84C', width: `${(v.views / 3021) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '3px', padding: '28px' }}>
          <p style={{ color: 'var(--muted)', fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', fontFamily: 'var(--font-ui)', marginBottom: '20px' }}>Sources de trafic</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {[{ src: 'Recherche LuxDrive', pct: 58, color: '#C9A84C' }, { src: 'Google Organic', pct: 27, color: '#3B82F6' }, { src: 'Direct / Email', pct: 15, color: '#22C55E' }].map(s => (
              <div key={s.src} style={{ textAlign: 'center', background: 'var(--bg)', padding: '22px', borderRadius: '3px', border: '1px solid var(--border)' }}>
                <div className="price-mono" style={{ fontSize: '32px', fontWeight: 500, color: s.color }}>{s.pct}%</div>
                <div style={{ color: 'var(--muted)', fontSize: '11px', fontFamily: 'var(--font-ui)', marginTop: '6px' }}>{s.src}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );

    // ── PROFIL ───────────────────────────────────────────
    if (section === 'profil') return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '36px' }}>
          <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '40px' }}>Profil agence</h1>
          {profileSaved && <Badge variant="green">Modifications sauvegardées ✓</Badge>}
        </div>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '3px', padding: '32px', marginBottom: '20px' }}>
          <p style={{ color: '#C9A84C', fontSize: '9px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', fontFamily: 'var(--font-ui)', marginBottom: '24px' }}>Informations générales</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px', marginBottom: '18px' }}>
            {[['name', "Nom de l'agence"], ['city', 'Ville'], ['phone', 'Téléphone'], ['email', 'Email'], ['siret', 'SIRET'], ['website', 'Site web']].map(([k, l]) => (
              <div key={k}>
                <label style={{ color: 'var(--muted)', fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', fontFamily: 'var(--font-ui)', display: 'block', marginBottom: '8px' }}>{l}</label>
                <input value={profileForm[k]} onChange={e => { setProfileForm(f => ({ ...f, [k]: e.target.value })); setProfileSaved(false); }} className="lux-input" />
              </div>
            ))}
          </div>
          <div style={{ marginBottom: '18px' }}>
            <label style={{ color: 'var(--muted)', fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', fontFamily: 'var(--font-ui)', display: 'block', marginBottom: '8px' }}>Adresse</label>
            <input value={profileForm.address} onChange={e => { setProfileForm(f => ({ ...f, address: e.target.value })); setProfileSaved(false); }} className="lux-input" />
          </div>
          <div>
            <label style={{ color: 'var(--muted)', fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', fontFamily: 'var(--font-ui)', display: 'block', marginBottom: '8px' }}>Description publique</label>
            <textarea value={profileForm.description} onChange={e => { setProfileForm(f => ({ ...f, description: e.target.value })); setProfileSaved(false); }} rows={4} className="lux-input" style={{ resize: 'vertical' }} />
          </div>
        </div>
        <Btn variant="gold" disabled={profileSaving} onClick={async () => {
          setProfileSaving(true);
          const ok = db.saveProfile ? await db.saveProfile({
            agency_name: profileForm.name,
            city:        profileForm.city,
            address:     profileForm.address,
            phone:       profileForm.phone,
            siret:       profileForm.siret,
            description: profileForm.description,
            website:     profileForm.website,
          }) : true;
          setProfileSaving(false);
          if (ok !== false) setProfileSaved(true);
        }}>{profileSaving ? 'Sauvegarde...' : 'Sauvegarder les modifications'}</Btn>
      </div>
    );

    // ── ABONNEMENT ───────────────────────────────────────
    if (section === 'abonnement') return (
      <div>
        <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '40px', marginBottom: '36px' }}>Abonnement</h1>
        {/* Plan actuel */}
        <div style={{ background: 'var(--surface)', border: '1px solid rgba(201,168,76,0.35)', borderRadius: '3px', padding: '32px', marginBottom: '20px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: '#C9A84C' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <p style={{ color: '#C9A84C', fontSize: '9px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', fontFamily: 'var(--font-ui)', marginBottom: '8px' }}>Plan actuel</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '6px' }}>
                <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '36px', color: '#F0EEE8' }}>Pro</span>
                <span className="price-mono" style={{ color: '#C9A84C', fontSize: '20px' }}>199€<span style={{ fontSize: '13px', color: 'var(--muted)' }}>/mois</span></span>
              </div>
              <p style={{ color: 'var(--muted)', fontSize: '12px', fontFamily: 'var(--font-ui)' }}>Renouvellement le <strong style={{ color: '#F0EEE8' }}>1er juin 2026</strong></p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <Badge variant="green">Actif</Badge>
              <p style={{ color: 'var(--muted)', fontSize: '11px', fontFamily: 'var(--font-ui)', marginTop: '8px' }}>Depuis mars 2025</p>
            </div>
          </div>
          <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {[{ l: 'Annonces actives', v: '2 / 15' }, { l: 'Photos utilisées', v: '24 / ∞' }, { l: 'Leads ce mois', v: '27' }].map(s => (
              <div key={s.l}>
                <div className="price-mono" style={{ fontSize: '22px', color: '#C9A84C' }}>{s.v}</div>
                <div style={{ color: 'var(--muted)', fontSize: '11px', fontFamily: 'var(--font-ui)', marginTop: '3px' }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Changer de plan */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '3px', padding: '28px' }}>
          <p style={{ color: 'var(--muted)', fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', fontFamily: 'var(--font-ui)', marginBottom: '20px' }}>Changer de plan</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
            {PLANS.map(plan => (
              <div key={plan.id} style={{ background: plan.id === 'pro' ? 'rgba(201,168,76,0.06)' : 'var(--bg)', border: `1px solid ${plan.id === 'pro' ? 'rgba(201,168,76,0.35)' : 'var(--border)'}`, borderRadius: '3px', padding: '24px 20px' }}>
                <p style={{ color: '#C9A84C', fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', fontFamily: 'var(--font-ui)', marginBottom: '8px' }}>{plan.name}</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '16px' }}>
                  <span className="price-mono" style={{ fontSize: '28px', color: '#F0EEE8' }}>{plan.price}</span>
                  <span style={{ color: 'var(--muted)', fontSize: '11px' }}>€/mois</span>
                </div>
                <Btn variant={plan.id === 'pro' ? 'gold' : 'ghost'} style={{ width: '100%', justifyContent: 'center', padding: '8px' }}>
                  {plan.id === 'pro' ? 'Plan actuel' : plan.id === 'elite' ? 'Passer à Elite' : 'Rétrograder'}
                </Btn>
              </div>
            ))}
          </div>
        </div>
      </div>
    );

    // ── LEADS ────────────────────────────────────────────
    if (section === 'leads') {
      const filters = [{ id: 'all', label: 'Tous' }, { id: 'new', label: 'Nouveaux' }, { id: 'confirmed', label: 'Confirmés' }, { id: 'pending', label: 'En attente' }];
      const statusMap = { new: { label: 'Nouveau', v: 'gold' }, confirmed: { label: 'Confirmé', v: 'green' }, pending: { label: 'En attente', v: 'default' } };
      const visibleLeads = leadFilter === 'all' ? leads : leads.filter(l => l.status === leadFilter);
      return (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
            <div>
              <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '40px', marginBottom: '4px' }}>Leads reçus</h1>
              <p style={{ color: 'var(--muted)', fontSize: '12px', fontFamily: 'var(--font-ui)' }}>{leads.length} demandes au total · {leads.filter(l => l.status === 'new').length} non traitées</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
            {filters.map(f => <FilterPill key={f.id} label={f.label} active={leadFilter === f.id} onClick={() => setLeadFilter(f.id)} />)}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {visibleLeads.map(lead => {
              const s = statusMap[lead.status];
              return (
                <div key={lead.id} style={{ background: 'var(--surface)', border: `1px solid ${lead.status === 'new' ? 'rgba(201,168,76,0.25)' : 'var(--border)'}`, borderRadius: '3px', padding: '20px 24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                    <div>
                      <div style={{ display: 'flex', gap: '8px', marginBottom: '6px', alignItems: 'center' }}>
                        <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '18px', color: '#F0EEE8' }}>{lead.client || lead.client_name || lead.email || '—'}</span>
                        <Badge variant={s.v}>{s.label}</Badge>
                        {lead.status === 'new' && <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#C9A84C', display: 'inline-block', boxShadow: '0 0 6px rgba(201,168,76,0.5)' }} />}
                      </div>
                      <p style={{ color: 'var(--muted)', fontSize: '12px', fontFamily: 'var(--font-ui)' }}>{lead.type || lead.rental_type || 'Demande'} · <strong style={{ color: '#F0EEE8' }}>{lead.car || (lead.annonces ? `${lead.annonces.brand} ${lead.annonces.model}` : '—')}</strong></p>
                      <p style={{ color: 'rgba(240,238,232,0.35)', fontSize: '11px', fontFamily: 'var(--font-mono)', marginTop: '4px' }}>
                        {lead.dateFrom && `${lead.dateFrom} → ${lead.dateTo}`} · {lead.city}
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <span style={{ color: 'var(--muted)', fontSize: '11px', fontFamily: 'var(--font-mono)' }}>{lead.date}</span>
                      {(lead.phone || lead.client_phone) && <span style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', color: '#3B82F6', padding: '4px 12px', fontSize: '11px', fontFamily: 'var(--font-mono)', borderRadius: '2px' }}>{lead.phone || lead.client_phone}</span>}
                      {lead.status === 'new' && <Btn variant="gold" style={{ padding: '6px 14px' }}>Contacter</Btn>}
                    </div>
                  </div>
                </div>
              );
            })}
            {visibleLeads.length === 0 && (
              <div style={{ padding: '80px', textAlign: 'center', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '3px' }}>
                <p style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '24px', color: 'rgba(240,238,232,0.15)' }}>Aucun lead dans cette catégorie</p>
              </div>
            )}
          </div>
        </div>
      );
    }

    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '28px',  color: 'rgba(240,238,232,0.18)', marginBottom: '8px' }}>Bientôt disponible</p>
          <p style={{ color: 'var(--muted)', fontFamily: 'var(--font-ui)', fontSize: '12px' }}>Section en cours de développement</p>
        </div>
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>
      <AdminSideNav active={section} setActive={setSection} items={navItems} title="ANNONCEUR" subtitle={agencyName} onBack={() => navigate({ page: 'home', city: 'lyon' })} />
      <main style={{ flex: 1, padding: '48px 56px', overflowY: 'auto' }}>{renderMain()}</main>
    </div>
  );
};

// ══════════════════════════════════════════════════════
//  ADMIN — MODÉRATION COMPLÈTE
// ══════════════════════════════════════════════════════
const AdminPage = ({ route, navigate, user, onLogout }) => {
  const [section, setSection] = useState('moderation');

  const mod = (typeof useAdminModeration !== 'undefined')
    ? useAdminModeration(user)
    : { queue: null, auditLog: [], approve: null, reject: null, isLoading: false };

  // File : DB si dispo, sinon mock
  const [queue, setQueue] = useState(MOCK_ANNONCES_PENDING);
  useEffect(() => { if (mod.queue !== null) setQueue(mod.queue); }, [mod.queue]);
  const pendingCount = queue.length;

  // Preview modal state
  const [previewItem, setPreviewItem] = useState(null);
  const [previewPhotoIdx, setPreviewPhotoIdx] = useState(0);

  // Reject modal state
  const [rejectModal, setRejectModal] = useState(null);
  const [rejectReason, setRejectReason] = useState('');
  const [rejectError, setRejectError] = useState(false);

  // Audit log : DB si dispo, sinon mock
  const MOCK_AUDIT = [
    { id: 1, admin: user?.email || 'admin', action: 'published', listing: 'Ferrari 488 GTB — Exotic Nice',           ts: 'Hier 18:42',        note: '' },
    { id: 2, admin: user?.email || 'admin', action: 'rejected',  listing: 'Maserati Ghibli — Speed Paris',           ts: 'Hier 16:10',        note: 'Photos de mauvaise qualité' },
    { id: 3, admin: user?.email || 'admin', action: 'published', listing: 'Lamborghini Huracán — Lyon Prestige',     ts: 'Avant-hier 11:25',  note: '' },
  ];
  const auditLog = mod.auditLog?.length > 0 ? mod.auditLog : MOCK_AUDIT;


  // City toggles
  const [cityToggles, setCityToggles] = useState(
    CITIES.reduce((acc, c) => ({ ...acc, [c.slug]: c.active }), {})
  );

  const [localAuditExtra, setLocalAuditExtra] = useState([]);
  const logAction = (action, listing, note = '') => {
    setLocalAuditExtra(prev => [{ id: Date.now(), admin: user?.email || 'admin', action, listing, ts: 'À l\'instant', note }, ...prev]);
  };
  const fullAuditLog = [...localAuditExtra, ...auditLog];

  const handleApprove = async (item) => {
    if (mod.approve) {
      await mod.approve(item);
    } else {
      setQueue(q => q.filter(x => x.id !== item.id));
      logAction('published', `${item.brand} ${item.model} — ${item.agency}`);
    }
  };

  const openRejectModal = (item) => {
    setRejectModal(item);
    setRejectReason('');
    setRejectError(false);
  };

  const handleReject = async () => {
    if (!rejectReason.trim()) { setRejectError(true); return; }
    if (mod.reject) {
      await mod.reject(rejectModal, rejectReason);
    } else {
      setQueue(q => q.filter(x => x.id !== rejectModal.id));
      logAction('rejected', `${rejectModal.brand} ${rejectModal.model} — ${rejectModal.agency}`, rejectReason);
    }
    setRejectModal(null);
  };

  const navItems = [
    { id: 'moderation', icon: '◈', label: 'Modération', badge: pendingCount },
    { id: 'annonceurs', icon: '◆', label: 'Annonceurs' },
    { id: 'villes',     icon: '◎', label: 'Villes' },
    { id: 'plans',      icon: '◇', label: 'Plans & tarifs' },
    { id: 'audit',      icon: '▣', label: 'Journal d\'audit' },
  ];

  const renderSection = () => {
    // ── MODERATION ──────────────────────────────────────
    if (section === 'moderation') return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '36px' }}>
          <div>
            <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '40px', color: '#F0EEE8', marginBottom: '6px' }}>File de modération</h1>
            <p style={{ color: 'var(--muted)', fontSize: '12px', fontFamily: 'var(--font-ui)' }}>
              {queue.length > 0
                ? <><span style={{ color: '#EF4444', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{queue.length}</span> annonce{queue.length > 1 ? 's' : ''} en attente de validation</>
                : 'File vide — toutes les annonces ont été traitées'}
            </p>
          </div>
          {/* Real-time indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--surface)', border: '1px solid rgba(34,197,94,0.2)', padding: '8px 14px', borderRadius: '2px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22C55E', boxShadow: '0 0 6px rgba(34,197,94,0.6)', animation: 'pulse 2s infinite', display: 'block' }}></span>
            <span style={{ color: '#22C55E', fontSize: '10px', fontFamily: 'var(--font-ui)', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>Temps réel</span>
          </div>
        </div>

        <style>{`@keyframes pulse { 0%,100%{opacity:1;box-shadow:0 0 6px rgba(34,197,94,0.6)} 50%{opacity:0.5;box-shadow:0 0 12px rgba(34,197,94,0.8)} }`}</style>

        {queue.length === 0 ? (
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '3px', padding: '96px', textAlign: 'center' }}>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" style={{ margin: '0 auto 16px', display: 'block' }}>
              <circle cx="20" cy="20" r="19" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
              <path d="M13 20l5 5L27 14" stroke="rgba(34,197,94,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '24px',  color: 'rgba(240,238,232,0.3)', marginBottom: '6px' }}>File vide</p>
            <p style={{ color: 'var(--muted)', fontSize: '12px', fontFamily: 'var(--font-ui)' }}>Toutes les annonces ont été traitées</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {queue.map((item, idx) => (
              <div key={item.id} style={{ display: 'flex', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '3px', overflow: 'hidden', transition: 'border-color 0.2s' }}
                onMouseOver={e => e.currentTarget.style.borderColor = 'rgba(201,168,76,0.2)'}
                onMouseOut={e => e.currentTarget.style.borderColor = 'var(--border)'}>

                {/* LEFT — Photo gallery */}
                <div style={{ width: '280px', flexShrink: 0, position: 'relative', background: '#060610' }}>
                  <img src={(item.image_urls && item.image_urls.length > 0) ? item.image_urls[0] : (item.image_url || '')} alt={`${item.brand} ${item.model}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: '180px' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,15,0.7) 0%, transparent 50%)' }} />
                  {/* Photo count badge */}
                  <div style={{ position: 'absolute', bottom: '12px', left: '12px', background: 'rgba(10,10,15,0.8)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(240,238,232,0.7)', padding: '3px 9px', fontSize: '10px', fontFamily: 'var(--font-mono)', borderRadius: '2px' }}>
                    {(item.image_urls?.length || (item.image_url ? 1 : 0))} photos
                  </div>
                  {/* Submission time */}
                  <div style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(10,10,15,0.85)', color: 'var(--muted)', padding: '3px 9px', fontSize: '9px', fontFamily: 'var(--font-mono)', borderRadius: '2px', border: '1px solid rgba(255,255,255,0.08)' }}>
                    {item.submitted}
                  </div>
                </div>

                {/* RIGHT — Details */}
                <div style={{ flex: 1, padding: '24px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
                      <Badge variant="orange">En attente</Badge>
                      <Badge variant="default">{item.city}</Badge>
                      <span style={{ marginLeft: 'auto', color: 'var(--muted)', fontSize: '11px', fontFamily: 'var(--font-ui)' }}>ID #{item.id}</span>
                    </div>
                    <h3 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '24px', color: '#F0EEE8', marginBottom: '4px' }}>
                      {item.brand} {item.model}
                    </h3>
                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '16px' }}>
                      <span style={{ color: 'var(--muted)', fontSize: '12px', fontFamily: 'var(--font-ui)' }}>{item.agency}</span>
                      <span className="price-mono" style={{ color: '#C9A84C', fontSize: '16px', fontWeight: 500 }}>{item.price.toLocaleString('fr-FR')} €/j</span>
                    </div>

                    {/* Moderation checklist */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                      {['Photos ✓', 'Description ✓', 'Prix défini ✓', 'Agence vérifiée ✓'].map(c => (
                        <span key={c} style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.18)', color: '#22C55E', padding: '3px 10px', fontSize: '10px', fontFamily: 'var(--font-ui)', borderRadius: '2px' }}>{c}</span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    <Btn variant="ghost" style={{ padding: '8px 16px' }} onClick={() => { setPreviewItem(item); setPreviewPhotoIdx(0); }}>Voir l'annonce complète</Btn>
                    <div style={{ marginLeft: 'auto', display: 'flex', gap: '10px' }}>
                      <button className="btn-danger" onClick={() => openRejectModal(item)}>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 2l8 8M10 2L2 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                        Rejeter
                      </button>
                      <button className="btn-success" onClick={() => handleApprove(item)}>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        Publier
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );

    // ── VILLES ──────────────────────────────────────────
    if (section === 'villes') return (
      <div>
        <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '40px', marginBottom: '32px' }}>Gestion des villes</h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
          {CITIES.map(city => (
            <div key={city.slug} style={{ background: 'var(--surface)', border: `1px solid ${cityToggles[city.slug] ? 'rgba(201,168,76,0.22)' : 'var(--border)'}`, borderRadius: '3px', padding: '24px', transition: 'border-color 0.2s' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h3 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '24px', color: '#F0EEE8' }}>{city.name}</h3>
                {/* Toggle */}
                <button className="toggle-track"
                  onClick={() => setCityToggles(t => ({ ...t, [city.slug]: !t[city.slug] }))}
                  style={{ width: '42px', height: '22px', borderRadius: '11px', background: cityToggles[city.slug] ? '#C9A84C' : 'rgba(255,255,255,0.1)', border: 'none', cursor: 'pointer', position: 'relative', flexShrink: 0 }}>
                  <div className="toggle-thumb" style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#fff', position: 'absolute', top: '3px', left: cityToggles[city.slug] ? '23px' : '3px', boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }} />
                </button>
              </div>
              <div className="price-mono" style={{ color: cityToggles[city.slug] ? '#C9A84C' : 'var(--muted)', fontSize: '13px' }}>
                {cityToggles[city.slug] ? `${city.count} véhicules actifs` : 'Désactivée'}
              </div>
              <div style={{ marginTop: '8px' }}>
                <Badge variant={cityToggles[city.slug] ? 'green' : 'default'}>{cityToggles[city.slug] ? 'Active' : 'Inactive'}</Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    );

    // ── ANNONCEURS ───────────────────────────────────────
    if (section === 'annonceurs') return (
      <div>
        <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '40px', marginBottom: '32px' }}>Comptes annonceurs</h1>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '3px', overflow: 'hidden' }}>
          {[
            { name: 'Lyon Prestige', city: 'Lyon', plan: 'Pro', count: 18, verified: true, status: 'active' },
            { name: 'Exotic Lyon', city: 'Lyon', plan: 'Starter', count: 14, verified: true, status: 'active' },
            { name: 'Prestige Lyon VIP', city: 'Lyon', plan: 'Elite', count: 9, verified: true, status: 'active' },
            { name: 'Speed Rental Paris', city: 'Paris', plan: 'Pro', count: 6, verified: false, status: 'pending' },
            { name: 'Marseille Luxe Auto', city: 'Marseille', plan: 'Starter', count: 3, verified: false, status: 'pending' },
          ].map((a, i) => (
            <div key={a.name} style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.04)', transition: 'background 0.15s' }}
              onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.015)'}
              onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, rgba(201,168,76,0.2), rgba(201,168,76,0.05))', border: '1px solid rgba(201,168,76,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Bebas Neue, sans-serif', fontSize: '16px', color: '#C9A84C', flexShrink: 0 }}>{a.name[0]}</div>
              <div style={{ flex: 1 }}>
                <span style={{ fontFamily: 'var(--font-ui)', fontSize: '14px', fontWeight: 500, color: '#F0EEE8', display: 'block', marginBottom: '4px' }}>{a.name}</span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <Badge variant={a.verified ? 'green' : 'orange'}>{a.verified ? 'Vérifié' : 'En attente'}</Badge>
                  <Badge variant="gold">{a.plan}</Badge>
                  <Badge variant="default">{a.city}</Badge>
                </div>
              </div>
              <span className="price-mono" style={{ color: 'var(--muted)', fontSize: '13px' }}>{a.count} annonces</span>
              <Btn variant="ghost" style={{ padding: '6px 14px' }}>Gérer</Btn>
            </div>
          ))}
        </div>
      </div>
    );

    // ── AUDIT LOG ────────────────────────────────────────
    if (section === 'audit') return (
      <div>
        <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '40px', marginBottom: '8px' }}>Journal d'audit</h1>
        <p style={{ color: 'var(--muted)', fontSize: '12px', fontFamily: 'var(--font-ui)', marginBottom: '32px' }}>Toutes les actions de modération sont enregistrées.</p>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '3px', overflow: 'hidden' }}>
          {/* Header */}
          <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr 2fr 100px', gap: '16px', padding: '12px 24px', background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            {['Horodatage', 'Action', 'Annonce', 'Admin'].map(h => (
              <span key={h} style={{ color: 'var(--muted)', fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', fontFamily: 'var(--font-ui)' }}>{h}</span>
            ))}
          </div>
          {fullAuditLog.map(log => (
            <div key={log.id} className="audit-row" style={{ display: 'grid', gridTemplateColumns: '100px 1fr 2fr 100px', gap: '16px', padding: '14px 24px', borderBottom: '1px solid rgba(255,255,255,0.04)', alignItems: 'start' }}>
              <span className="price-mono" style={{ color: 'var(--muted)', fontSize: '11px' }}>{log.ts}</span>
              <div>
                <Badge variant={log.action === 'published' ? 'green' : 'red'}>
                  {log.action === 'published' ? 'Publié' : 'Rejeté'}
                </Badge>
              </div>
              <div>
                <span style={{ fontFamily: 'var(--font-ui)', fontSize: '13px', color: '#F0EEE8', display: 'block', marginBottom: '2px' }}>{log.listing}</span>
                {log.note && <span style={{ color: 'var(--muted)', fontSize: '11px', fontFamily: 'var(--font-ui)', fontStyle: 'italic' }}>Motif : {log.note}</span>}
              </div>
              <span style={{ color: 'var(--muted)', fontSize: '10px', fontFamily: 'var(--font-mono)' }}>admin</span>
            </div>
          ))}
        </div>
      </div>
    );

    // ── PLANS ────────────────────────────────────────────
    if (section === 'plans') return (
      <div>
        <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '40px', marginBottom: '8px' }}>Plans & tarifs</h1>
        <p style={{ color: 'var(--muted)', fontSize: '12px', fontFamily: 'var(--font-ui)', marginBottom: '36px' }}>Configuration des offres d'abonnement visibles sur la page Annonceurs.</p>

        {/* Stats rapides */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '32px' }}>
          {[{ l: 'Starter actifs', v: '8' }, { l: 'Pro actifs', v: '19' }, { l: 'Elite actifs', v: '5' }, { l: 'MRR estimé', v: '12 280 €' }].map(s => (
            <div key={s.l} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '3px', padding: '22px' }}>
              <div className="price-mono" style={{ fontSize: '28px', color: '#C9A84C' }}>{s.v}</div>
              <div style={{ color: 'var(--muted)', fontSize: '11px', fontFamily: 'var(--font-ui)', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Plans */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
          {PLANS.map(plan => (
            <div key={plan.id} style={{ background: 'var(--surface)', border: `1px solid ${plan.highlighted ? 'rgba(201,168,76,0.4)' : 'var(--border)'}`, borderRadius: '3px', padding: '28px', position: 'relative' }}>
              {plan.highlighted && <div style={{ position: 'absolute', top: '-1px', left: '50%', transform: 'translateX(-50%)', background: '#C9A84C', color: '#0A0A0F', padding: '3px 14px', fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', fontFamily: 'var(--font-ui)' }}>Recommandé</div>}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div>
                  <p style={{ color: '#C9A84C', fontSize: '9px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', fontFamily: 'var(--font-ui)', marginBottom: '6px' }}>{plan.name}</p>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                    <span className="price-mono" style={{ fontSize: '32px', color: '#F0EEE8' }}>{plan.price}</span>
                    <span style={{ color: 'var(--muted)', fontSize: '12px' }}>€/mois</span>
                  </div>
                </div>
                <Badge variant="green">Actif</Badge>
              </div>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '16px', marginBottom: '20px' }}>
                {plan.features.map(f => (
                  <div key={f} style={{ display: 'flex', gap: '8px', marginBottom: '8px', fontSize: '12px', color: 'var(--muted)', fontFamily: 'var(--font-ui)' }}>
                    <span style={{ color: '#C9A84C', flexShrink: 0 }}>—</span>{f}
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <Btn variant="ghost" style={{ flex: 1, justifyContent: 'center', padding: '7px' }}>Modifier</Btn>
                <Btn variant="danger" style={{ padding: '7px 12px' }}>Désactiver</Btn>
              </div>
            </div>
          ))}
        </div>
      </div>
    );

    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
        <p style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '26px',  color: 'rgba(240,238,232,0.2)' }}>Bientôt disponible</p>
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>
      <AdminSideNav active={section} setActive={setSection} items={navItems} title="ADMIN" subtitle={user?.email || 'admin'} onBack={() => navigate({ page: 'home', city: 'lyon' })} />

      <main style={{ flex: 1, padding: '48px 56px', overflowY: 'auto' }}>
        {/* Top bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '48px', paddingBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Badge variant="red">ADMIN</Badge>
            <span style={{ color: 'var(--muted)', fontSize: '11px', fontFamily: 'var(--font-ui)' }}>LuxDrive Ops · Accès restreint</span>
          </div>
          <Btn variant="ghost" onClick={() => navigate({ page: 'home', city: 'lyon' })} style={{ padding: '7px 16px' }}>← Site public</Btn>
        </div>
        {renderSection()}
      </main>

      {/* ── PREVIEW MODAL ── */}
      {previewItem && (() => {
        const photos = (previewItem.image_urls && previewItem.image_urls.length > 0) ? previewItem.image_urls : (previewItem.image_url ? [previewItem.image_url] : []);
        const photo = photos[previewPhotoIdx] || '';
        const specs = [
          previewItem.year        && ['Année',        previewItem.year],
          previewItem.fuel        && ['Carburant',     previewItem.fuel],
          previewItem.power       && ['Puissance',     `${previewItem.power} ch`],
          previewItem.transmission && ['Boîte',        previewItem.transmission],
          previewItem.seats       && ['Places',        previewItem.seats],
          previewItem.category    && ['Catégorie',     previewItem.category],
        ].filter(Boolean);
        return (
          <div className="modal-backdrop" onClick={e => { if (e.target === e.currentTarget) setPreviewItem(null); }} style={{ zIndex: 200 }}>
            <div className="modal-box" style={{ width: '780px', maxWidth: '96vw', padding: 0, overflow: 'hidden', maxHeight: '90vh', display: 'flex', flexDirection: 'column' }}>
              {/* Photo gallery */}
              <div style={{ position: 'relative', height: '340px', background: '#060610', flexShrink: 0 }}>
                {photo ? <img src={photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(240,238,232,0.15)', fontFamily: 'var(--font-ui)', fontSize: '12px' }}>Aucune photo</div>}
                {photos.length > 1 && (<>
                  <button onClick={() => setPreviewPhotoIdx(i => (i - 1 + photos.length) % photos.length)} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(10,10,15,0.7)', border: '1px solid rgba(255,255,255,0.15)', color: '#F0EEE8', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>‹</button>
                  <button onClick={() => setPreviewPhotoIdx(i => (i + 1) % photos.length)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(10,10,15,0.7)', border: '1px solid rgba(255,255,255,0.15)', color: '#F0EEE8', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>›</button>
                  <div style={{ position: 'absolute', bottom: '12px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '5px' }}>
                    {photos.map((_, i) => <div key={i} onClick={() => setPreviewPhotoIdx(i)} style={{ width: i === previewPhotoIdx ? '18px' : '6px', height: '6px', borderRadius: '3px', background: i === previewPhotoIdx ? '#C9A84C' : 'rgba(255,255,255,0.4)', cursor: 'pointer', transition: 'all 0.2s' }} />)}
                  </div>
                </>)}
                <button onClick={() => setPreviewItem(null)} style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(10,10,15,0.8)', border: '1px solid rgba(255,255,255,0.15)', color: '#F0EEE8', width: '30px', height: '30px', borderRadius: '50%', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
                <div style={{ position: 'absolute', bottom: '12px', right: '12px', background: 'rgba(10,10,15,0.8)', color: 'var(--muted)', padding: '3px 10px', fontSize: '10px', fontFamily: 'var(--font-mono)', borderRadius: '2px' }}>{previewPhotoIdx + 1} / {photos.length}</div>
              </div>

              {/* Content */}
              <div style={{ padding: '28px 32px', overflowY: 'auto', flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                  <div>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                      <Badge variant="orange">En attente</Badge>
                      <Badge variant="default">{previewItem.city}</Badge>
                    </div>
                    <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '32px', color: '#F0EEE8', marginBottom: '4px' }}>{previewItem.brand} {previewItem.model}</h2>
                    <p style={{ color: 'var(--muted)', fontSize: '12px', fontFamily: 'var(--font-ui)' }}>{previewItem.agency_name || previewItem.agency} · ID #{previewItem.id?.slice(0,8)}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div className="price-mono" style={{ color: '#C9A84C', fontSize: '28px', fontWeight: 500 }}>{(previewItem.price || 0).toLocaleString('fr-FR')} €<span style={{ fontSize: '14px', color: 'var(--muted)' }}>/j</span></div>
                    {previewItem.price_week && <div style={{ color: 'var(--muted)', fontSize: '12px', fontFamily: 'var(--font-ui)', marginTop: '2px' }}>{(previewItem.price_week).toLocaleString('fr-FR')} €/sem</div>}
                  </div>
                </div>

                {/* Specs grid */}
                {specs.length > 0 && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '20px' }}>
                    {specs.map(([label, value]) => (
                      <div key={label} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '2px', padding: '10px 14px' }}>
                        <p style={{ color: 'var(--muted)', fontSize: '9px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', fontFamily: 'var(--font-ui)', marginBottom: '4px' }}>{label}</p>
                        <p style={{ color: '#F0EEE8', fontSize: '13px', fontFamily: 'var(--font-ui)' }}>{value}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Description */}
                {previewItem.description && (
                  <div style={{ marginBottom: '20px' }}>
                    <p style={{ color: 'var(--muted)', fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', fontFamily: 'var(--font-ui)', marginBottom: '8px' }}>Description</p>
                    <p style={{ color: 'rgba(240,238,232,0.7)', fontSize: '13px', fontFamily: 'var(--font-ui)', lineHeight: 1.7 }}>{previewItem.description}</p>
                  </div>
                )}

                {/* Conditions */}
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', padding: '14px 18px', background: 'rgba(201,168,76,0.04)', border: '1px solid rgba(201,168,76,0.12)', borderRadius: '2px', marginBottom: '24px' }}>
                  {previewItem.caution      && <span style={{ color: 'var(--muted)', fontSize: '12px', fontFamily: 'var(--font-ui)' }}>Caution : <strong style={{ color: '#F0EEE8' }}>{Number(previewItem.caution).toLocaleString('fr-FR')} €</strong></span>}
                  {previewItem.km_par_jour  && <span style={{ color: 'var(--muted)', fontSize: '12px', fontFamily: 'var(--font-ui)' }}>Km/j : <strong style={{ color: '#F0EEE8' }}>{previewItem.km_par_jour} km</strong></span>}
                  <span style={{ color: 'var(--muted)', fontSize: '12px', fontFamily: 'var(--font-ui)' }}>Permis : <strong style={{ color: '#F0EEE8' }}>{previewItem.permis_requis || 'B'}</strong></span>
                  <span style={{ color: 'var(--muted)', fontSize: '12px', fontFamily: 'var(--font-ui)' }}>Assurance : <strong style={{ color: previewItem.assurance_incluse ? '#22C55E' : '#F0EEE8' }}>{previewItem.assurance_incluse ? 'Incluse' : 'Non incluse'}</strong></span>
                  <span style={{ color: 'var(--muted)', fontSize: '12px', fontFamily: 'var(--font-ui)' }}>Carburant : <strong style={{ color: previewItem.carburant_inclus ? '#22C55E' : '#F0EEE8' }}>{previewItem.carburant_inclus ? 'Inclus' : 'Non inclus'}</strong></span>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                  <Btn variant="ghost" onClick={() => setPreviewItem(null)}>Fermer</Btn>
                  <button className="btn-danger" onClick={() => { setPreviewItem(null); openRejectModal(previewItem); }} style={{ padding: '10px 20px', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2 2l8 8M10 2L2 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                    Rejeter
                  </button>
                  <button className="btn-success" onClick={() => { handleApprove(previewItem); setPreviewItem(null); }} style={{ padding: '10px 20px', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    Publier
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ── REJECT MODAL ── */}
      {rejectModal && (
        <div className="modal-backdrop" onClick={e => { if (e.target === e.currentTarget) setRejectModal(null); }}>
          <div className="modal-box">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
              <div>
                <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '26px', color: '#F0EEE8', marginBottom: '6px' }}>Rejeter l'annonce</h2>
                <p style={{ color: 'var(--muted)', fontSize: '13px', fontFamily: 'var(--font-ui)' }}>
                  {rejectModal.brand} {rejectModal.model} — {rejectModal.agency}
                </p>
              </div>
              <button onClick={() => setRejectModal(null)} style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontSize: '18px', lineHeight: 1, padding: '4px' }}>✕</button>
            </div>

            <div style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)', borderRadius: '2px', padding: '12px 16px', marginBottom: '24px' }}>
              <p style={{ color: '#EF4444', fontSize: '11px', fontFamily: 'var(--font-ui)', lineHeight: 1.6 }}>
                <strong>Attention :</strong> l'agence recevra un email Resend avec le motif de rejet. Ce motif sera enregistré dans l'audit log.
              </p>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ color: 'var(--muted)', fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', fontFamily: 'var(--font-ui)', display: 'block', marginBottom: '10px' }}>
                Motif du rejet <span style={{ color: '#EF4444' }}>*</span>
              </label>
              <textarea value={rejectReason} onChange={e => { setRejectReason(e.target.value); setRejectError(false); }}
                rows={5} placeholder="Ex : Photos de mauvaise qualité — merci de fournir au minimum 5 photos HD du véhicule sous différents angles…"
                className="lux-input"
                style={{ resize: 'vertical', borderColor: rejectError ? 'rgba(239,68,68,0.5)' : undefined, boxShadow: rejectError ? '0 0 0 3px rgba(239,68,68,0.08)' : undefined }} />
              {rejectError && (
                <p style={{ color: '#EF4444', fontSize: '11px', fontFamily: 'var(--font-ui)', marginTop: '6px' }}>Le motif est obligatoire avant de rejeter l'annonce.</p>
              )}
            </div>

            {/* Quick reason templates */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '28px' }}>
              {[
                'Photos insuffisantes (< 5)',
                'Prix anormalement bas',
                'Description incomplète',
                'Véhicule non éligible',
              ].map(tpl => (
                <button key={tpl} onClick={() => setRejectReason(tpl)}
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'var(--muted)', padding: '5px 12px', cursor: 'pointer', fontSize: '11px', fontFamily: 'var(--font-ui)', borderRadius: '2px', transition: 'all 0.15s' }}
                  onMouseOver={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.35)'; e.currentTarget.style.color = '#C9A84C'; }}
                  onMouseOut={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'var(--muted)'; }}>
                  {tpl}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <Btn variant="ghost" onClick={() => setRejectModal(null)}>Annuler</Btn>
              <button className="btn-danger" onClick={handleReject} style={{ padding: '10px 24px', fontSize: '11px' }}>
                Confirmer le rejet & envoyer l'email
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

Object.assign(window, { DashboardPage, AdminPage });
