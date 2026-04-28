
const { useState, useEffect } = React;

// ── Normalise une annonce DB → shape attendue par les composants UI ─
const normalizeAnnonce = (a) => ({
  id:               a.id,
  slug:             a.slug || `${a.brand}-${a.model}-${a.city}`.toLowerCase().replace(/[\s_]+/g, '-'),
  brand:            a.brand            || '',
  model:            a.model            || '',
  city:             a.city             || 'lyon',
  category:         a.category         || 'sport',
  price:            a.price            || 0,
  priceWeek:        a.price_week       || null,
  year:             a.year             || null,
  fuel:             a.fuel             || null,
  transmission:     a.transmission     || null,
  seats:            a.seats            || null,
  power:            a.power            || null,
  description:      a.description      || '',
  caution:          a.caution          || null,
  kmParJour:        a.km_par_jour      || null,
  assuranceIncluse: a.assurance_incluse ?? false,
  permisRequis:     a.permis_requis    || 'B',
  carburantInclus:  a.carburant_inclus ?? false,
  image:            (a.image_urls && a.image_urls.length > 0) ? a.image_urls[0] : (a.image_url || 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&q=80'),
  images:           (a.image_urls && a.image_urls.length > 0) ? a.image_urls : (a.image_url ? [a.image_url] : []),
  available:        true,
  agency:           a.agency_name      || 'Agence LuxDrive',
  agencySlug:       null,
  agencyUserId:     a.user_id          || null,
  rating:           4.8,
  reviews:          0,
  featured:         false,
  fromDb:           true,
});

// ── usePublicListings ───────────────────────────────────────
// Charge les annonces publiées pour une ville donnée.
// Retourne undefined pendant le chargement, [] si vide, [...] si données.
const usePublicListings = (city) => {
  const sb = window.luxSb;
  const [dbCars, setDbCars] = useState(undefined);

  useEffect(() => {
    if (!sb || !city) { setDbCars(null); return; }
    setDbCars(undefined);
    sb.from('annonces')
      .select('*')
      .eq('status', 'published')
      .eq('city', city.toLowerCase())
      .order('views', { ascending: false })
      .then(({ data }) => setDbCars(data ? data.map(normalizeAnnonce) : []));
  }, [city]);

  return {
    dbCars,
    isLoadingDb: dbCars === undefined && !!sb,
  };
};

// ── useDashboard ────────────────────────────────────────────
const useDashboard = (user) => {
  const sb = window.luxSb;

  const [dbProfile, setDbProfile] = useState(null);
  const [annonces,  setAnnonces]  = useState(null);
  const [dbLeads,   setDbLeads]   = useState(null);

  useEffect(() => {
    if (!user || !sb) return;
    let cancelled = false;

    const load = async () => {
      const [profRes, annRes, leadsRes] = await Promise.all([
        sb.from('profiles').select('*').eq('id', user.id).single(),
        sb.from('annonces').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
        sb.from('leads').select('*, annonces(brand, model)').eq('user_id', user.id).order('created_at', { ascending: false }),
      ]);
      if (cancelled) return;
      if (profRes.data)  setDbProfile(profRes.data);
      if (annRes.data)   setAnnonces(annRes.data);
      if (leadsRes.data) setDbLeads(leadsRes.data);
    };

    load();
    return () => { cancelled = true; };
  }, [user?.id]);

  const saveProfile = async (data) => {
    if (!sb || !user) return false;
    const { error } = await sb.from('profiles').upsert({ id: user.id, email: user.email, ...data });
    if (!error) setDbProfile(p => ({ ...(p || {}), ...data }));
    return !error;
  };

  const createAnnonce = async (formData, city) => {
    if (!sb || !user) return { ok: false, error: 'Non connecté' };
    const agencyName = dbProfile?.agency_name || user?.user_metadata?.agency_name || 'Mon Agence';
    const slug = `${formData.brand}-${formData.model}-${city}-${Date.now()}`
      .toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const { data, error } = await sb.from('annonces').insert({
      user_id:           user.id,
      brand:             formData.brand             || '',
      model:             formData.model             || '',
      category:          formData.category          || 'sport',
      city:              city                       || 'lyon',
      price:             parseInt(formData.price)          || 0,
      price_week:        parseInt(formData.priceWeek)      || null,
      year:              parseInt(formData.year)            || null,
      fuel:              formData.fuel              || null,
      transmission:      formData.transmission      || null,
      seats:             parseInt(formData.seats)           || null,
      power:             parseInt(formData.power)           || null,
      description:       formData.description       || null,
      caution:           parseInt(formData.caution)         || null,
      km_par_jour:       parseInt(formData.kmParJour)       || null,
      assurance_incluse: formData.assuranceIncluse  || false,
      permis_requis:     formData.permisRequis       || 'B',
      carburant_inclus:  formData.carburantInclus   || false,
      image_urls:        formData.imageUrls          || [],
      image_url:         formData.imageUrls?.[0]    || null,
      agency_name:       agencyName,
      slug,
      status: 'pending',
    }).select().single();
    if (!error && data) setAnnonces(a => [data, ...(a || [])]);
    return { ok: !error, error };
  };

  const deleteAnnonce = async (id) => {
    if (!sb || !user) return;
    await sb.from('annonces').delete().eq('id', id).eq('user_id', user.id);
    setAnnonces(a => (a || []).filter(x => x.id !== id));
  };

  const updateLeadStatus = async (id, status) => {
    if (!sb) return;
    await sb.from('leads').update({ status }).eq('id', id);
    setDbLeads(ls => (ls || []).map(l => l.id === id ? { ...l, status } : l));
  };

  return { dbProfile, annonces, dbLeads, saveProfile, createAnnonce, deleteAnnonce, updateLeadStatus };
};

// ── useAdminModeration ──────────────────────────────────────
// Charge toutes les annonces en attente + fonctions approve/reject.
// Nécessite role = 'admin' dans profiles + policy RLS admin.
const useAdminModeration = (user) => {
  const sb = window.luxSb;
  const [queue,    setQueue]    = useState(null); // null = loading
  const [auditLog, setAuditLog] = useState([]);

  useEffect(() => {
    if (!user || !sb) return;
    sb.from('annonces')
      .select('*')
      .eq('status', 'pending')
      .order('created_at', { ascending: false })
      .then(({ data, error }) => setQueue(error ? [] : (data || [])));

    sb.from('annonces')
      .select('id, brand, model, status, rejection_reason, updated_at, agency_name')
      .in('status', ['published', 'rejected'])
      .order('updated_at', { ascending: false })
      .limit(20)
      .then(({ data }) => {
        if (data) setAuditLog(data.map(a => ({
          id:      a.id,
          action:  a.status,
          listing: `${a.brand} ${a.model} — ${a.agency_name || ''}`,
          ts:      new Date(a.updated_at).toLocaleString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }),
          note:    a.rejection_reason || '',
          admin:   user.email,
        })));
      });
  }, [user?.id]);

  const approve = async (item) => {
    if (!sb) return { ok: false, error: 'Client Supabase non initialisé' };
    const { error } = await sb.from('annonces')
      .update({ status: 'published' })
      .eq('id', item.id);
    if (!error) {
      setQueue(q => (q || []).filter(x => x.id !== item.id));
      setAuditLog(prev => [{
        id: item.id, action: 'published',
        listing: `${item.brand} ${item.model} — ${item.agency_name || item.agency || ''}`,
        ts: 'À l\'instant', note: '', admin: user.email,
      }, ...prev]);
    }
    return { ok: !error, error: error?.message || null };
  };

  const reject = async (item, reason) => {
    if (!sb) return { ok: false, error: 'Client Supabase non initialisé' };
    const { error } = await sb.from('annonces')
      .update({ status: 'rejected', rejection_reason: reason })
      .eq('id', item.id);
    if (!error) {
      setQueue(q => (q || []).filter(x => x.id !== item.id));
      setAuditLog(prev => [{
        id: item.id, action: 'rejected',
        listing: `${item.brand} ${item.model} — ${item.agency_name || item.agency || ''}`,
        ts: 'À l\'instant', note: reason, admin: user.email,
      }, ...prev]);
    }
    return { ok: !error, error: error?.message || null };
  };

  return { queue, auditLog, approve, reject, isLoading: queue === null && !!sb };
};

Object.assign(window, { useDashboard, usePublicListings, normalizeAnnonce, useAdminModeration });
