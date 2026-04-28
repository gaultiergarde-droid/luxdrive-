
const { useState, useEffect, createContext, useContext } = React;

// ── Config ─────────────────────────────────────────────────
// 1. Créez un projet sur https://supabase.com (gratuit)
// 2. Settings → API → copiez Project URL et anon public key
// 3. Activez Email Auth : Authentication → Providers → Email
// 4. Créez la table profiles (SQL Editor) :
//
//    create table profiles (
//      id         uuid references auth.users on delete cascade primary key,
//      email      text,
//      agency_name text,
//      city       text default 'lyon',
//      role       text default 'annonceur',  -- 'annonceur' | 'admin'
//      plan       text default 'starter',
//      created_at timestamptz default now()
//    );
//    alter table profiles enable row level security;
//    create policy "Users read own profile"  on profiles for select using (auth.uid() = id);
//    create policy "Users update own profile" on profiles for update using (auth.uid() = id);
//
//    -- Trigger pour créer automatiquement le profil à l'inscription
//    create or replace function handle_new_user()
//    returns trigger as $$
//    begin
//      insert into profiles (id, email, agency_name, city, role)
//      values (
//        new.id, new.email,
//        coalesce(new.raw_user_meta_data->>'agency_name', 'Mon Agence'),
//        coalesce(new.raw_user_meta_data->>'city', 'lyon'),
//        coalesce(new.raw_user_meta_data->>'role', 'annonceur')
//      );
//      return new;
//    end;
//    $$ language plpgsql security definer;
//    create trigger on_auth_user_created after insert on auth.users
//      for each row execute procedure handle_new_user();

const SUPABASE_URL      = 'https://fffozbpdnlmrcttwiuyq.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable__AX7bm6IOuXj-VtrINAOgg_k2lMgqve';

const DEMO_MODE = SUPABASE_URL === 'YOUR_SUPABASE_URL';

const _sb = (!DEMO_MODE && typeof supabase !== 'undefined')
  ? supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

// ── Auth context ────────────────────────────────────────────
const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user,      setUser]      = useState(null);
  const [profile,   setProfile]   = useState(null);
  const [authReady, setAuthReady] = useState(false);

  const fetchProfile = async (uid) => {
    if (!_sb) return;
    const { data } = await _sb.from('profiles').select('*').eq('id', uid).single();
    if (data) setProfile(data);
  };

  useEffect(() => {
    if (!_sb) { setAuthReady(true); return; }

    _sb.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) { setUser(session.user); fetchProfile(session.user.id); }
      setAuthReady(true);
    });

    const { data: { subscription } } = _sb.auth.onAuthStateChange((_ev, session) => {
      setUser(session?.user ?? null);
      if (session?.user) fetchProfile(session.user.id);
      else setProfile(null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email, password) => {
    if (!_sb) {
      // Mode démo : accepte n'importe quel email/password
      const demoUser = { id: 'demo', email, user_metadata: { agency_name: 'Agence Démo', city: 'lyon', role: 'annonceur' } };
      setUser(demoUser);
      setProfile({ id: 'demo', email, agency_name: 'Agence Démo', city: 'lyon', role: 'annonceur', plan: 'pro' });
      return demoUser;
    }
    const { data, error } = await _sb.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data.user;
  };

  const signup = async (email, password, agencyName, city) => {
    if (!_sb) {
      const demoUser = { id: 'demo', email, user_metadata: { agency_name: agencyName, city, role: 'annonceur' } };
      setUser(demoUser);
      setProfile({ id: 'demo', email, agency_name: agencyName, city, role: 'annonceur', plan: 'starter' });
      return demoUser;
    }
    const { data, error } = await _sb.auth.signUp({
      email, password,
      options: { data: { agency_name: agencyName, city, role: 'annonceur' } },
    });
    if (error) throw error;
    return data.user;
  };

  const logout = async () => {
    await _sb?.auth.signOut();
    setUser(null);
    setProfile(null);
  };

  const isAdmin = profile?.role === 'admin'
    || user?.user_metadata?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, profile, authReady, login, signup, logout, isAdmin, demoMode: DEMO_MODE }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

// ── Label input helper ──────────────────────────────────────
const Field = ({ label, children }) => (
  <div>
    <label style={{ color: 'var(--muted)', fontSize: '10px', letterSpacing: '1.5px', textTransform: 'uppercase', fontFamily: 'var(--font-ui)', display: 'block', marginBottom: '6px' }}>
      {label}
    </label>
    {children}
  </div>
);

// ── Auth Modal ──────────────────────────────────────────────
const AuthModal = ({ initialMode = 'login', onClose, onSuccess }) => {
  const [mode,       setMode]       = useState(initialMode);
  const [email,      setEmail]      = useState('');
  const [password,   setPassword]   = useState('');
  const [agency,     setAgency]     = useState('');
  const [city,       setCity]       = useState('lyon');
  const [loading,    setLoading]    = useState(false);
  const [error,      setError]      = useState('');
  const [done,       setDone]       = useState('');
  const { login, signup, demoMode } = useAuth();

  const switchMode = (m) => { setMode(m); setError(''); setDone(''); };

  const handleLogin = async () => {
    if (!email || !password) { setError('Email et mot de passe requis'); return; }
    setLoading(true); setError('');
    try {
      const u = await login(email, password);
      onSuccess(u);
    } catch (e) {
      setError(e.message?.includes('Invalid') ? 'Email ou mot de passe incorrect' : e.message);
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    if (!email || !password || !agency) { setError('Tous les champs sont requis'); return; }
    if (password.length < 8)            { setError('Mot de passe : 8 caractères minimum'); return; }
    setLoading(true); setError('');
    try {
      const u = await signup(email, password, agency, city);
      if (demoMode) { onSuccess(u); return; }
      setDone('Compte créé ! Vérifiez votre email pour confirmer votre inscription, puis connectez-vous.');
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  };

  const handleForgot = async () => {
    if (!email) { setError('Entrez votre email'); return; }
    setLoading(true); setError('');
    try {
      if (_sb) await _sb.auth.resetPasswordForEmail(email, { redirectTo: window.location.href });
      setDone('Si un compte existe pour cet email, vous recevrez un lien de réinitialisation.');
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  };

  const handleGoogle = async () => {
    if (!_sb) { setError('Configurez Supabase pour utiliser Google'); return; }
    setLoading(true); setError('');
    try {
      sessionStorage.setItem('afterAuth', 'dashboard');
      await _sb.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: window.location.origin + window.location.pathname },
      });
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };

  const onKey = (fn) => (e) => { if (e.key === 'Enter') fn(); };

  const TITLES = {
    login:  'Espace annonceur',
    signup: 'Créer un compte',
    forgot: 'Mot de passe oublié',
  };
  const SUBTITLES = {
    login:  'Connectez-vous pour gérer vos annonces',
    signup: 'Rejoignez la marketplace premium',
    forgot: 'Nous vous enverrons un lien de réinitialisation',
  };

  return (
    <div className="modal-backdrop" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box" style={{ width: '440px' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '28px' }}>
          <div>
            <LuxLogo size="sm" />
            <p style={{ color: 'var(--muted)', fontSize: '12px', marginTop: '10px', fontFamily: 'var(--font-ui)' }}>
              {SUBTITLES[mode]}
            </p>
            {demoMode && (
              <p style={{ color: 'rgba(201,168,76,0.6)', fontSize: '10px', marginTop: '4px', fontFamily: 'var(--font-ui)', letterSpacing: '0.5px' }}>
                Mode démo — Supabase non configuré
              </p>
            )}
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontSize: '22px', lineHeight: 1, padding: '0 0 0 16px' }}>×</button>
        </div>

        {/* Success */}
        {done ? (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <div style={{ fontSize: '36px', marginBottom: '16px', color: 'var(--gold)' }}>✓</div>
            <p style={{ color: 'var(--text)', fontFamily: 'var(--font-ui)', fontSize: '14px', lineHeight: 1.6 }}>{done}</p>
            <button className="btn-ghost" style={{ marginTop: '24px' }} onClick={() => switchMode('login')}>
              Se connecter →
            </button>
          </div>
        ) : (
          <>
            {/* Error */}
            {error && (
              <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '2px', padding: '10px 14px', marginBottom: '18px' }}>
                <p style={{ color: '#EF4444', fontSize: '12px', fontFamily: 'var(--font-ui)' }}>{error}</p>
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {mode === 'signup' && (
                <>
                  <Field label="Nom de l'agence">
                    <input className="lux-input" placeholder="Lyon Prestige" value={agency} onChange={e => setAgency(e.target.value)} />
                  </Field>
                  <Field label="Ville principale">
                    <select className="lux-input" value={city} onChange={e => setCity(e.target.value)} style={{ cursor: 'pointer' }}>
                      {['lyon','paris','marseille','nice','bordeaux'].map(c => (
                        <option key={c} value={c} style={{ background: '#111118' }}>
                          {c.charAt(0).toUpperCase() + c.slice(1)}
                        </option>
                      ))}
                    </select>
                  </Field>
                </>
              )}

              <Field label="Email">
                <input className="lux-input" type="email" placeholder="contact@monagence.fr"
                  value={email} onChange={e => setEmail(e.target.value)}
                  onKeyDown={onKey(mode === 'login' ? handleLogin : mode === 'forgot' ? handleForgot : handleSignup)}
                />
              </Field>

              {mode !== 'forgot' && (
                <Field label={mode === 'signup' ? 'Mot de passe (8 caractères min.)' : 'Mot de passe'}>
                  <input className="lux-input" type="password" placeholder="••••••••"
                    value={password} onChange={e => setPassword(e.target.value)}
                    onKeyDown={onKey(mode === 'login' ? handleLogin : handleSignup)}
                  />
                </Field>
              )}
            </div>

            {/* CTA email */}
            <button className="btn-gold" style={{ width: '100%', justifyContent: 'center', marginTop: '22px' }}
              onClick={mode === 'login' ? handleLogin : mode === 'signup' ? handleSignup : handleForgot}
              disabled={loading}
            >
              {loading ? '...' : mode === 'login' ? 'Se connecter' : mode === 'signup' ? 'Créer mon compte' : 'Envoyer le lien'}
            </button>

            {/* Google OAuth — uniquement login et signup */}
            {mode !== 'forgot' && (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '16px 0 0' }}>
                  <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.07)' }} />
                  <span style={{ color: 'var(--muted)', fontSize: '11px', fontFamily: 'var(--font-ui)', letterSpacing: '0.5px' }}>ou</span>
                  <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.07)' }} />
                </div>
                <button
                  onClick={handleGoogle}
                  disabled={loading}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginTop: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', color: '#F0EEE8', padding: '11px 20px', borderRadius: '2px', cursor: 'pointer', fontFamily: 'var(--font-ui)', fontSize: '13px', fontWeight: 500, transition: 'background 0.2s, border-color 0.2s', opacity: loading ? 0.5 : 1 }}
                  onMouseOver={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.22)'; }}
                  onMouseOut={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; }}
                >
                  {/* Google G logo */}
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
                    <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" fill="#34A853"/>
                    <path d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71s.102-1.17.282-1.71V4.958H.957C.347 6.173 0 7.548 0 9s.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
                    <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
                  </svg>
                  Continuer avec Google
                </button>
              </>
            )}

            {/* Mode switches */}
            {mode === 'login' && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '14px' }}>
                <button onClick={() => switchMode('signup')} style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontFamily: 'var(--font-ui)', fontSize: '12px' }}>
                  Pas encore de compte ? S'inscrire
                </button>
                <button onClick={() => switchMode('forgot')} style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontFamily: 'var(--font-ui)', fontSize: '12px' }}>
                  Mot de passe oublié ?
                </button>
              </div>
            )}
            {mode !== 'login' && (
              <button onClick={() => switchMode('login')} style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontFamily: 'var(--font-ui)', fontSize: '12px', marginTop: '14px', display: 'block', width: '100%', textAlign: 'center' }}>
                ← Retour à la connexion
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

Object.assign(window, { AuthProvider, AuthModal, useAuth, luxSb: _sb });
