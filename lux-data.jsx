
// ── Formspree IDs ─────────────────────────────────────────
// 1. Créez un compte sur https://formspree.io
// 2. Créez deux formulaires et remplacez les IDs ci-dessous
const FORMSPREE_CONTACT_ID    = 'YOUR_CONTACT_FORM_ID';
const FORMSPREE_NEWSLETTER_ID = 'YOUR_NEWSLETTER_FORM_ID';

// ── Voitures ──────────────────────────────────────────────

const MOCK_CARS = [];

const CITIES = [
  { slug: 'lyon',      name: 'Lyon',      active: true,  count: 47,  lat: 45.75, lng: 4.85  },
  { slug: 'paris',     name: 'Paris',     active: true,  count: 124, lat: 48.86, lng: 2.35  },
  { slug: 'marseille', name: 'Marseille', active: true,  count: 38,  lat: 43.30, lng: 5.37  },
  { slug: 'bordeaux',  name: 'Bordeaux',  active: true,  count: 22,  lat: 44.84, lng: -0.58 },
  { slug: 'nice',      name: 'Nice',      active: true,  count: 56,  lat: 43.71, lng: 7.26  },
  { slug: 'toulouse',  name: 'Toulouse',  active: false, count: 0,   lat: 43.60, lng: 1.44  },
  { slug: 'nantes',    name: 'Nantes',    active: false, count: 0,   lat: 47.22, lng: -1.55 },
];

const CATEGORIES = [
  { slug: 'supercar',    label: 'Supercar',      count: 12 },
  { slug: 'sport',       label: 'Sport',          count: 18 },
  { slug: 'gt',          label: 'Grand Tourisme', count: 9  },
  { slug: 'berline-luxe',label: 'Berline Luxe',   count: 7  },
  { slug: 'suv-luxe',    label: 'SUV Luxe',       count: 6  },
  { slug: 'cabriolet',   label: 'Cabriolet',      count: 8  },
];

const BRANDS = ['Ferrari','Lamborghini','Porsche','Rolls-Royce','Bentley','McLaren','Aston Martin','Bugatti','Maserati','Mercedes'];


const AGENCIES = [];

const PLANS = [
  {
    id: 'starter', name: 'Starter', price: 79, priceYear: 69,
    desc: 'Pour démarrer et tester la plateforme',
    features: ['3 annonces actives', 'Photos HD (10/annonce)', 'Profil agence basique', 'Statistiques 30 jours', 'Support email'],
    highlighted: false,
  },
  {
    id: 'pro', name: 'Pro', price: 199, priceYear: 169,
    desc: 'Le plan des agences sérieuses',
    features: ['15 annonces actives', 'Photos HD illimitées', 'Profil agence premium', 'Badge Vérifié', 'Statistiques temps réel', 'Mise en avant catalogue', 'Support prioritaire'],
    highlighted: true,
  },
  {
    id: 'elite', name: 'Elite', price: 449, priceYear: 379,
    desc: 'Visibilité maximale multi-villes',
    features: ['Annonces illimitées', 'Multi-villes inclus', 'Annonces épinglées homepage', 'Intégration calendrier', 'API accès', 'Manager dédié', 'SLA 2h garanti'],
    highlighted: false,
  },
];


const MOCK_LEADS = [];

const MOCK_ANNONCES_PENDING = [];

// ── Articles de blog (contenu complet) ────────────────────
const BLOG_POSTS = [
  { slug: 'louer-ferrari-lyon',         title: 'Comment louer une Ferrari à Lyon sans se faire piéger',                       category: 'Guide',       date: '22 avril 2026',  city: 'Lyon',        readTime: '6 min',  excerpt: "Les 5 erreurs à éviter quand vous cherchez à louer une Ferrari ou Lamborghini à Lyon : agences non vérifiées, frais cachés, assurance insuffisante.", img: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80' },
  { slug: 'top-5-supercar-paris',       title: 'Top 5 des supercars disponibles à la location à Paris en 2026',              category: 'Sélection',   date: '15 avril 2026',  city: 'Paris',       readTime: '4 min',  excerpt: "Ferrari, Lamborghini, McLaren, Porsche 911 Turbo S — notre sélection des 5 meilleures supercars à louer à Paris ce printemps, avec les prix et les agences.", img: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80' },
  { slug: 'weekend-voiture-luxe-nice',  title: "Idée de week-end : rouler sur la Côte d'Azur en voiture de prestige",        category: 'Lifestyle',   date: '8 avril 2026',   city: 'Nice',        readTime: '5 min',  excerpt: "Monaco, Èze, Saint-Paul-de-Vence — le circuit parfait pour un week-end inoubliable en voiture de luxe sur la Riviera française.", img: 'https://images.unsplash.com/photo-1617531653332-bd46c16f5e5d?w=800&q=80' },
  { slug: 'rolls-royce-mariage',        title: "Rolls-Royce pour votre mariage : tout ce qu'il faut savoir",                 category: 'Événements',  date: '1 avril 2026',   city: 'Toute France', readTime: '7 min', excerpt: "Ghost, Phantom ou Wraith ? Location avec chauffeur ou conduite personnelle ? Nos conseils pour le plus beau jour de votre vie.", img: 'https://images.unsplash.com/photo-1545291730-faff8ca1d4b0?w=800&q=80' },
  { slug: 'comparatif-lamborghini-ferrari', title: 'Ferrari vs Lamborghini : laquelle louer pour votre prochain week-end ?', category: 'Comparatif', date: '25 mars 2026',   city: 'France',      readTime: '8 min',  excerpt: "SF90 vs Huracán EVO — deux philosophies, deux expériences radicalement différentes. Notre comparatif pour choisir la voiture parfaite selon votre profil.", img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80' },
  { slug: 'porsche-911-turbo-avis',     title: 'Avis : 3 jours avec la Porsche 911 Turbo S — vaut-elle le prix ?',          category: 'Test',        date: '18 mars 2026',   city: 'Lyon',        readTime: '10 min', excerpt: "750€/jour pour la Porsche 911 Turbo S — est-ce raisonnable ? Nous l'avons conduite 3 jours, de Lyon à Genève. Verdict sans concession.", img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80' },
];

const BLOG_ARTICLES = {
  'louer-ferrari-lyon': {
    ...BLOG_POSTS[0],
    body: [
      { type: 'lead', text: "Louer une Ferrari à Lyon, c'est possible — mais entre les agences non vérifiées, les assurances insuffisantes et les prix cachés, il faut savoir où chercher. Voici les 5 erreurs que commettent la plupart des locataires." },
      { type: 'h2', text: "Erreur #1 : Choisir une agence sans vérification" },
      { type: 'p', text: "Le premier réflexe de beaucoup est de taper \"location Ferrari Lyon\" sur Google et de cliquer sur le premier résultat. Le problème ? Certaines annonces émanent d'agences sans assurance professionnelle, sans SIRET valide, ou dont la flotte n'est pas entretenue selon les standards du constructeur." },
      { type: 'p', text: "Sur LuxDrive, chaque agence passe par un processus de vérification complet : contrôle du SIRET, vérification de l'assurance pro, inspection de la flotte. Le badge Partenaire Vérifié n'est jamais accordé sans ces étapes." },
      { type: 'tip', icon: '✓', text: "Astuce : sur LuxDrive, toutes les agences affichant le badge vert ont été validées par notre équipe — SIRET, assurance et état de flotte vérifiés." },
      { type: 'h2', text: "Erreur #2 : Ignorer les conditions d'assurance" },
      { type: 'p', text: "La plupart des locations de supercars incluent une assurance de base avec une franchise élevée — parfois entre 5 000€ et 50 000€ selon le véhicule. Ne pas lire les petites lignes peut coûter très cher en cas d'incident." },
      { type: 'p', text: "Demandez systématiquement : quelle est la franchise ? Est-elle rachetable ? Qu'est-ce qui est couvert (vol, bris de glace, casse mécanique) ? Quelle est la limitation de kilométrage ?" },
      { type: 'h2', text: "Erreur #3 : Réserver sans voir les photos HD" },
      { type: 'p', text: "Un véhicule peut avoir des rayures, des jantes abîmées ou un intérieur usé que les petites photos ne révèlent pas. Exigez toujours des photos HD sous plusieurs angles — avant, arrière, côtés, intérieur, coffre — avant de confirmer." },
      { type: 'h2', text: "Erreur #4 : Ne pas comparer les offres" },
      { type: 'p', text: "Le prix d'une Ferrari SF90 peut varier de 1 400€ à 2 200€/jour à Lyon selon les agences, pour un véhicule similaire. Prendre 5 minutes pour comparer plusieurs offres peut vous faire économiser plusieurs centaines d'euros." },
      { type: 'h2', text: "Erreur #5 : Oublier de vérifier la disponibilité réelle" },
      { type: 'p', text: "Certains sites affichent des véhicules \"disponibles\" qui ne le sont plus. Sur LuxDrive, toutes les annonces sont à jour et l'agence vous confirme la disponibilité sous 2h maximum." },
    ],
  },
  'top-5-supercar-paris': {
    ...BLOG_POSTS[1],
    body: [
      { type: 'lead', text: "Paris concentre certaines des plus belles supercars disponibles à la location en France. Voici notre sélection de ce printemps 2026, avec les prix et les agences." },
      { type: 'h2', text: "#1 — Ferrari 488 GTB : la classique italienne" },
      { type: 'p', text: "La Ferrari 488 GTB reste une référence absolue. Son V8 biturbo de 660 ch délivre des performances saisissantes, son design est intemporel. Prix : à partir de 1 100€/jour via Paris Excellence." },
      { type: 'h2', text: "#2 — Lamborghini Huracán EVO : la fureur italienne" },
      { type: 'p', text: "Pour ceux qui veulent plus de drama, le V10 atmosphérique de l'Huracán EVO est une expérience sonore hors du commun. 640 ch, 0 à 100 km/h en 2.9 s. Prix : à partir de 1 500€/jour." },
      { type: 'h2', text: "#3 — McLaren 720S : le choix du pilote" },
      { type: 'p', text: "La McLaren 720S est la plus pure, la plus technique. Son châssis en carbone et ses 720 ch offrent une dynamique de conduite sans équivalent. Pour les connaisseurs. Prix : à partir de 1 200€/jour." },
      { type: 'h2', text: "#4 — Porsche 911 Turbo S : la polyvalence ultime" },
      { type: 'p', text: "Performances de supercar, confort de GT, fiabilité légendaire — la 911 Turbo S reste le choix le plus rationnel pour une supercar à 650 ch. Prix : à partir de 750€/jour." },
      { type: 'h2', text: "#5 — Bugatti Chiron : le graal à Paris" },
      { type: 'p', text: "1 500 chevaux, 420 km/h, 4 500€/jour. Le Bugatti Chiron est la voiture la plus exclusive disponible à la location en France. Une expérience réservée à une clientèle d'exception via Paris Excellence." },
    ],
  },
  'weekend-voiture-luxe-nice': {
    ...BLOG_POSTS[2],
    body: [
      { type: 'lead', text: "Nice, Monaco, Èze, Saint-Paul-de-Vence — la Riviera française réunit en quelques kilomètres les plus belles routes et les panoramas les plus spectaculaires d'Europe. Un week-end en voiture de luxe s'impose." },
      { type: 'h2', text: "Pourquoi la Côte d'Azur est faite pour les supercars" },
      { type: 'p', text: "Les routes de la Riviera combinent le spectaculaire et le praticable : la Grande Corniche avec ses virages en épingle et sa vue sur la Méditerranée, l'Esterel avec ses roches rouges, les ruelles de Monaco." },
      { type: 'h2', text: "L'itinéraire parfait" },
      { type: 'list', items: [
        "Jour 1 matin : Nice → Monaco par la Basse Corniche (D6098) — longer la mer, entrer dans la Principauté avec style",
        "Jour 1 après-midi : Monaco → Èze Village par la Moyenne Corniche — le village perché à 427m d'altitude",
        "Jour 2 matin : Èze → Saint-Paul-de-Vence via Vence — galeries d'art, déjeuner en terrasse",
        "Jour 2 après-midi : Saint-Paul-de-Vence → Nice via Antibes et Cap d'Antibes",
      ]},
      { type: 'h2', text: "Quelle voiture choisir ?" },
      { type: 'p', text: "Pour la Riviera, le cabriolet s'impose. La Ferrari California T ou la Bentley Continental GTC offrent le parfait mariage entre performance et élégance capote baissée. Si vous préférez la puissance pure, l'Huracán Spyder disponible à Nice est une option inoubliable." },
      { type: 'tip', icon: '☀️', text: "Conseil : réservez à l'avance au printemps et en été — la demande est forte sur la Riviera. LuxDrive permet de voir la disponibilité en temps réel." },
      { type: 'h2', text: "Budget et logistique" },
      { type: 'p', text: "Comptez entre 680€ (Porsche 911 Cab) et 1 600€ (Lamborghini Huracán Spyder) par jour. Les agences LuxDrive basées à Nice livrent directement à votre hôtel sur demande." },
    ],
  },
  'rolls-royce-mariage': {
    ...BLOG_POSTS[3],
    body: [
      { type: 'lead', text: "Location d'une Rolls-Royce pour votre mariage : Ghost, Phantom ou Wraith ? Avec ou sans chauffeur ? Voici tout ce qu'il faut savoir pour faire de ce moment un souvenir inoubliable." },
      { type: 'h2', text: "Choisir le bon modèle" },
      { type: 'p', text: "La Ghost est la plus accessible et la plus « moderne » — idéale pour les mariages contemporains. La Phantom est le must absolu, l'incarnation du luxe britannique, parfaite pour les cérémonies les plus formelles. La Wraith, plus sportive, convient mieux aux mariages décontractés." },
      { type: 'h2', text: "Avec ou sans chauffeur ?" },
      { type: 'p', text: "La plupart des agences proposent les deux options. Avec chauffeur, vous profitez de l'expérience passager — arriver et repartir dans la sérénité totale. En conduite personnelle, l'expérience est différente mais tout aussi mémorable." },
      { type: 'h2', text: "Réserver en avance — vraiment important" },
      { type: 'p', text: "Les Rolls-Royce disponibles à la location sont rares. Pour un mariage, réservez au minimum 3 à 6 mois à l'avance, surtout pour les saisons de printemps et d'été (avril → septembre)." },
      { type: 'tip', icon: '💍', text: "Astuce : demandez à l'agence si elle peut préparer le véhicule avec des décorations florales. Beaucoup le proposent sur demande." },
    ],
  },
  'comparatif-lamborghini-ferrari': {
    ...BLOG_POSTS[4],
    body: [
      { type: 'lead', text: "SF90 Stradale contre Huracán EVO — deux philosophies diamétralement opposées. Voici notre comparatif sans concession pour vous aider à choisir." },
      { type: 'h2', text: "La Ferrari SF90 : la technologie au service de l'émotion" },
      { type: 'p', text: "1 000 chevaux hybrides, 0 à 100 en 2.5 s, traction intégrale — la SF90 est une démonstration technologique vertigineuse. Elle est rapide, presque intimidante de perfection, avec un mode 100% électrique pour circuler silencieusement en ville." },
      { type: 'h2', text: "La Lamborghini Huracán : l'émotion brute" },
      { type: 'p', text: "Le V10 atmosphérique de 640 ch à 8 000 tr/min de l'Huracán est une œuvre d'art sonore. Pas de filtres électroniques, pas d'hybridation — juste le contact direct avec la mécanique. L'expérience est plus raw, plus viscérale." },
      { type: 'h2', text: "Laquelle choisir ?" },
      { type: 'list', items: [
        "Choisissez la SF90 si : vous voulez les performances absolues, la technologie de pointe, et une voiture de tous les jours",
        "Choisissez l'Huracán si : vous cherchez une expérience sensorielle pure, avec un moteur qui chante",
        "Budget : SF90 à 1 800€/j vs Huracán à 1 500€/j — un écart de 300€ pour 360 ch supplémentaires",
      ]},
    ],
  },
  'porsche-911-turbo-avis': {
    ...BLOG_POSTS[5],
    body: [
      { type: 'lead', text: "750€/jour, 3 jours, 1 400 km de Lyon à Genève via les Alpes. Notre verdict sans filtre sur la Porsche 911 Turbo S." },
      { type: 'h2', text: "Premier contact" },
      { type: 'p', text: "Retirer une 911 Turbo S chez Lyon Prestige est déjà une expérience. La voiture est préparée, vérifiée, immaculée. L'agence prend 30 minutes pour vous expliquer les modes de conduite. Exactement ce qu'on attend." },
      { type: 'h2', text: "Sur route — les Alpes" },
      { type: 'p', text: "Sur les routes alpines, la 911 Turbo S révèle son génie. 800 Nm disponibles pratiquement immédiatement, traction intégrale ultra-efficace, freinage carbone-céramique d'une puissance de feu. Elle avale les lacets avec une facilité déconcertante." },
      { type: 'h2', text: "Verdict : 750€/jour, est-ce raisonnable ?" },
      { type: 'p', text: "Sur 3 jours : 2 250€ de location + carburant (environ 150€). Soit 2 400€ pour une expérience qu'on ne vit pas tous les jours. Pour les passionnés, c'est une évidence. Pour les autres, la 911 Carrera 4S à 500€/jour offre 90% de l'expérience pour 35% moins cher." },
      { type: 'tip', icon: '★', text: "Notre note : 9.5/10 — La voiture parfaite pour ceux qui veulent la performance absolue sans renoncer au confort. Lyon Prestige, 5 étoiles." },
    ],
  },
};

Object.assign(window, {
  MOCK_CARS, CITIES, CATEGORIES, BRANDS, AGENCIES, PLANS,
  MOCK_LEADS, MOCK_ANNONCES_PENDING, BLOG_POSTS, BLOG_ARTICLES,
  FORMSPREE_CONTACT_ID, FORMSPREE_NEWSLETTER_ID,
});
