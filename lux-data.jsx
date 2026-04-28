
// ── Formspree IDs ─────────────────────────────────────────
// 1. Créez un compte sur https://formspree.io
// 2. Créez deux formulaires et remplacez les IDs ci-dessous
const FORMSPREE_CONTACT_ID    = 'YOUR_CONTACT_FORM_ID';
const FORMSPREE_NEWSLETTER_ID = 'YOUR_NEWSLETTER_FORM_ID';

// ── Voitures ──────────────────────────────────────────────
const MOCK_CARS = [
  // ─ LYON ─────────────────────────────────────────────────
  {
    id: 1, slug: 'ferrari-sf90-lyon', brand: 'Ferrari', model: 'SF90 Stradale',
    category: 'supercar', city: 'lyon', price: 1800, priceWeek: 10500,
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1200&q=85',
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&q=85',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85',
    ],
    year: 2023, seats: 2, transmission: 'Automatique', fuel: 'Hybride', power: '1000 ch',
    agency: 'Lyon Prestige', agencySlug: 'lyon-prestige', rating: 4.9, reviews: 47,
    available: true, featured: true,
    description: 'La Ferrari SF90 Stradale est le summum de la technologie Ferrari. Hybride rechargeable développant 1000 chevaux, cette hypercar offre des performances de course avec le confort d\'une grand tourisme. Chaque détail est pensé pour sublimer l\'expérience de conduite.',
    specs: { '0–100 km/h': '2.5 s', 'Vitesse max': '340 km/h', 'Moteur': 'V8 + 3 élec.', 'Couple': '800 Nm', 'Boîte': '8 DCT', 'Traction': '4RM' },
    tags: ['supercar', 'hybride'],
  },
  {
    id: 2, slug: 'lamborghini-huracan-lyon', brand: 'Lamborghini', model: 'Huracán EVO',
    category: 'supercar', city: 'lyon', price: 1500, priceWeek: 9000,
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&q=85',
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1200&q=85',
      'https://images.unsplash.com/photo-1605559424843-9073c6e382a2?w=1200&q=85',
    ],
    year: 2022, seats: 2, transmission: 'Automatique', fuel: 'Essence', power: '640 ch',
    agency: 'Exotic Lyon', agencySlug: 'exotic-lyon', rating: 4.8, reviews: 63,
    available: true, featured: true,
    description: 'L\'Huracán EVO est l\'icône Lamborghini par excellence. Propulsée par un V10 atmosphérique de 640 chevaux, elle offre une symphonie mécanique et des sensations à l\'état pur.',
    specs: { '0–100 km/h': '2.9 s', 'Vitesse max': '325 km/h', 'Moteur': 'V10 5.2L NA', 'Couple': '600 Nm', 'Boîte': '7 DCT', 'Traction': '4RM' },
    tags: ['supercar'],
  },
  {
    id: 3, slug: 'porsche-911-turbo-lyon', brand: 'Porsche', model: '911 Turbo S',
    category: 'sport', city: 'lyon', price: 750, priceWeek: 4500,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=85',
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&q=85',
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&q=85',
    ],
    year: 2024, seats: 4, transmission: 'PDK', fuel: 'Essence', power: '650 ch',
    agency: 'Lyon Prestige', agencySlug: 'lyon-prestige', rating: 4.9, reviews: 112,
    available: true, featured: true,
    description: 'La 911 Turbo S représente l\'apogée de la 911. Performances de supercar, confort quotidien, polyvalence absolue. La voiture parfaite pour avaler les kilomètres en première classe.',
    specs: { '0–100 km/h': '2.7 s', 'Vitesse max': '330 km/h', 'Moteur': 'Flat-6 3.8T', 'Couple': '800 Nm', 'Boîte': '8 PDK', 'Traction': '4RM' },
    tags: ['sport', 'berlinette'],
  },
  {
    id: 4, slug: 'rolls-royce-ghost-lyon', brand: 'Rolls-Royce', model: 'Ghost',
    category: 'berline-luxe', city: 'lyon', price: 2200, priceWeek: 13000,
    image: 'https://images.unsplash.com/photo-1545291730-faff8ca1d4b0?w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1545291730-faff8ca1d4b0?w=1200&q=85',
      'https://images.unsplash.com/photo-1617531653332-bd46c16f5e5d?w=1200&q=85',
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1200&q=85',
    ],
    year: 2023, seats: 5, transmission: 'Automatique', fuel: 'Essence', power: '563 ch',
    agency: 'Prestige Lyon VIP', agencySlug: 'prestige-lyon-vip', rating: 5.0, reviews: 28,
    available: true, featured: true,
    description: 'La Ghost incarne l\'excellence britannique. Architecture of Luxury, quiétude absolue, étoiles au plafond — une expérience au-delà de la simple conduite.',
    specs: { '0–100 km/h': '4.8 s', 'Vitesse max': '250 km/h', 'Moteur': 'V12 6.75L', 'Couple': '820 Nm', 'Boîte': '8 Auto', 'Traction': 'RWD' },
    tags: ['berline', 'luxe', 'chauffeur'],
  },
  {
    id: 5, slug: 'bentley-continental-lyon', brand: 'Bentley', model: 'Continental GT',
    category: 'gt', city: 'lyon', price: 980, priceWeek: 5800,
    image: 'https://images.unsplash.com/photo-1617531653332-bd46c16f5e5d?w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1617531653332-bd46c16f5e5d?w=1200&q=85',
      'https://images.unsplash.com/photo-1545291730-faff8ca1d4b0?w=1200&q=85',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=85',
    ],
    year: 2023, seats: 4, transmission: 'Automatique', fuel: 'Essence', power: '542 ch',
    agency: 'Exotic Lyon', agencySlug: 'exotic-lyon', rating: 4.7, reviews: 39,
    available: true, featured: false,
    description: 'Le Continental GT est la définition du Grand Tourisme. Luxe artisanal britannique, W12 de 542 ch et confort incomparable pour vos routes les plus belles.',
    specs: { '0–100 km/h': '3.7 s', 'Vitesse max': '318 km/h', 'Moteur': 'W12 6.0L', 'Couple': '770 Nm', 'Boîte': '8 DCT', 'Traction': '4RM' },
    tags: ['gt', 'luxe'],
  },
  {
    id: 6, slug: 'mclaren-720s-lyon', brand: 'McLaren', model: '720S',
    category: 'supercar', city: 'lyon', price: 1200, priceWeek: 7000,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85',
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&q=85',
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1200&q=85',
    ],
    year: 2022, seats: 2, transmission: 'Automatique', fuel: 'Essence', power: '720 ch',
    agency: 'Lyon Prestige', agencySlug: 'lyon-prestige', rating: 4.8, reviews: 22,
    available: false, featured: false,
    description: 'La 720S repousse les limites du possible. Carrosserie en carbone, V8 biturbo de 720 ch — pour les conducteurs qui exigent le summum.',
    specs: { '0–100 km/h': '2.8 s', 'Vitesse max': '341 km/h', 'Moteur': 'V8 4.0T', 'Couple': '770 Nm', 'Boîte': '7 SSG', 'Traction': 'RWD' },
    tags: ['supercar'],
  },
  {
    id: 7, slug: 'aston-martin-db11-lyon', brand: 'Aston Martin', model: 'DB11',
    category: 'gt', city: 'lyon', price: 850, priceWeek: 5000,
    image: 'https://images.unsplash.com/photo-1605559424843-9073c6e382a2?w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1605559424843-9073c6e382a2?w=1200&q=85',
      'https://images.unsplash.com/photo-1617531653332-bd46c16f5e5d?w=1200&q=85',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=85',
    ],
    year: 2023, seats: 4, transmission: 'Automatique', fuel: 'Essence', power: '503 ch',
    agency: 'Prestige Lyon VIP', agencySlug: 'prestige-lyon-vip', rating: 4.6, reviews: 31,
    available: true, featured: false,
    description: 'La DB11 est l\'ambassadrice du style britannique. V8 AMG biturbo, design intemporel et grand confort pour vos voyages les plus mémorables.',
    specs: { '0–100 km/h': '3.9 s', 'Vitesse max': '300 km/h', 'Moteur': 'V8 4.0T AMG', 'Couple': '675 Nm', 'Boîte': '8 Auto', 'Traction': 'RWD' },
    tags: ['gt', 'luxe'],
  },
  {
    id: 8, slug: 'bmw-m8-lyon', brand: 'BMW', model: 'M8 Compétition',
    category: 'gt', city: 'lyon', price: 620, priceWeek: 3600,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&q=85',
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1200&q=85',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=85',
    ],
    year: 2023, seats: 4, transmission: 'M-DCT', fuel: 'Essence', power: '625 ch',
    agency: 'Exotic Lyon', agencySlug: 'exotic-lyon', rating: 4.7, reviews: 58,
    available: true, featured: false,
    description: 'La M8 Compétition est la berline-GT ultime de BMW. Performances M, luxe grand tourisme — l\'équilibre parfait entre sport et raffinement.',
    specs: { '0–100 km/h': '3.3 s', 'Vitesse max': '305 km/h', 'Moteur': 'V8 4.4T', 'Couple': '750 Nm', 'Boîte': '8 M-DCT', 'Traction': '4RM' },
    tags: ['gt', 'sport'],
  },

  // ─ PARIS ─────────────────────────────────────────────────
  {
    id: 9, slug: 'bugatti-chiron-paris', brand: 'Bugatti', model: 'Chiron',
    category: 'supercar', city: 'paris', price: 4500, priceWeek: 26000,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85',
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1200&q=85',
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&q=85',
    ],
    year: 2023, seats: 2, transmission: 'Automatique', fuel: 'Essence', power: '1 500 ch',
    agency: 'Paris Excellence', agencySlug: 'paris-excellence', rating: 5.0, reviews: 12,
    available: true, featured: true,
    description: 'Le Bugatti Chiron est le summum de l\'hypersport mondiale. 1 500 chevaux, quad-turbo W16, vitesse limitée à 420 km/h. Une expérience réservée à l\'élite, désormais accessible à Paris pour quelques jours d\'exception.',
    specs: { '0–100 km/h': '2.4 s', 'Vitesse max': '420 km/h', 'Moteur': 'W16 8.0L quad-T', 'Couple': '1 600 Nm', 'Boîte': '7 DSG', 'Traction': '4RM' },
    tags: ['supercar', 'hypercar'],
  },
  {
    id: 10, slug: 'rolls-royce-phantom-paris', brand: 'Rolls-Royce', model: 'Phantom VIII',
    category: 'berline-luxe', city: 'paris', price: 2800, priceWeek: 16500,
    image: 'https://images.unsplash.com/photo-1545291730-faff8ca1d4b0?w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1545291730-faff8ca1d4b0?w=1200&q=85',
      'https://images.unsplash.com/photo-1617531653332-bd46c16f5e5d?w=1200&q=85',
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1200&q=85',
    ],
    year: 2023, seats: 5, transmission: 'Automatique', fuel: 'Essence', power: '571 ch',
    agency: 'Grand Luxe Paris', agencySlug: 'grand-luxe-paris', rating: 5.0, reviews: 19,
    available: true, featured: true,
    description: 'La Rolls-Royce Phantom VIII est la voiture la plus silencieuse et la plus luxueuse au monde. Architecture of Luxury, galerie de verre arrière, starlight headliner — la définition absolue du raffinement.',
    specs: { '0–100 km/h': '5.1 s', 'Vitesse max': '250 km/h', 'Moteur': 'V12 6.75L', 'Couple': '900 Nm', 'Boîte': '8 Auto', 'Traction': 'RWD' },
    tags: ['berline', 'luxe', 'chauffeur'],
  },
  {
    id: 11, slug: 'ferrari-488-paris', brand: 'Ferrari', model: '488 GTB',
    category: 'supercar', city: 'paris', price: 1100, priceWeek: 6500,
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1200&q=85',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85',
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&q=85',
    ],
    year: 2021, seats: 2, transmission: 'Automatique', fuel: 'Essence', power: '660 ch',
    agency: 'Paris Excellence', agencySlug: 'paris-excellence', rating: 4.9, reviews: 34,
    available: true, featured: false,
    description: 'La Ferrari 488 GTB incarne la perfection technique maranellaise. V8 biturbo de 660 ch, aérodynamique active, châssis magnétique — une supercar totale pour sillonner Paris et ses environs.',
    specs: { '0–100 km/h': '3.0 s', 'Vitesse max': '330 km/h', 'Moteur': 'V8 3.9T', 'Couple': '760 Nm', 'Boîte': '7 DCT', 'Traction': 'RWD' },
    tags: ['supercar'],
  },
  {
    id: 12, slug: 'mercedes-g63-paris', brand: 'Mercedes', model: 'AMG G 63',
    category: 'suv-luxe', city: 'paris', price: 720, priceWeek: 4200,
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1200&q=85',
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&q=85',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=85',
    ],
    year: 2023, seats: 5, transmission: 'Automatique', fuel: 'Essence', power: '585 ch',
    agency: 'Paris Excellence', agencySlug: 'paris-excellence', rating: 4.8, reviews: 41,
    available: true, featured: false,
    description: 'Le Mercedes AMG G 63 est l\'icône ultime du SUV de prestige. Carrosserie carrée légendaire, V8 biturbo AMG de 585 ch, intérieur somptueux — dominer Paris avec classe et puissance.',
    specs: { '0–100 km/h': '4.5 s', 'Vitesse max': '220 km/h', 'Moteur': 'V8 4.0T', 'Couple': '850 Nm', 'Boîte': '9 AMG', 'Traction': '4RM' },
    tags: ['suv', 'luxe'],
  },
  {
    id: 13, slug: 'porsche-panamera-paris', brand: 'Porsche', model: 'Panamera Turbo S',
    category: 'berline-luxe', city: 'paris', price: 580, priceWeek: 3400,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=85',
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&q=85',
      'https://images.unsplash.com/photo-1617531653332-bd46c16f5e5d?w=1200&q=85',
    ],
    year: 2023, seats: 4, transmission: 'PDK', fuel: 'Hybride', power: '700 ch',
    agency: 'Grand Luxe Paris', agencySlug: 'grand-luxe-paris', rating: 4.7, reviews: 28,
    available: true, featured: false,
    description: 'La Porsche Panamera Turbo S E-Hybrid conjugue 700 ch hybrides avec l\'élégance d\'une berline de luxe 4 places. La voiture parfaite pour Paris — puissante, confortable et responsable.',
    specs: { '0–100 km/h': '3.2 s', 'Vitesse max': '315 km/h', 'Moteur': 'V8 4.0T + élec.', 'Couple': '870 Nm', 'Boîte': '8 PDK', 'Traction': '4RM' },
    tags: ['berline', 'hybride'],
  },

  // ─ NICE ──────────────────────────────────────────────────
  {
    id: 14, slug: 'ferrari-california-nice', brand: 'Ferrari', model: 'California T',
    category: 'cabriolet', city: 'nice', price: 1200, priceWeek: 7200,
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1200&q=85',
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&q=85',
      'https://images.unsplash.com/photo-1617531653332-bd46c16f5e5d?w=1200&q=85',
    ],
    year: 2022, seats: 4, transmission: 'Automatique', fuel: 'Essence', power: '560 ch',
    agency: 'Riviera Prestige', agencySlug: 'riviera-prestige', rating: 4.9, reviews: 38,
    available: true, featured: true,
    description: 'La Ferrari California T est faite pour la Riviera. Cabriolet 4 places, V8 turbo de 560 ch, toit métallique rétractable en 14 secondes — la compagne idéale pour longer la Méditerranée.',
    specs: { '0–100 km/h': '3.6 s', 'Vitesse max': '316 km/h', 'Moteur': 'V8 3.9T', 'Couple': '755 Nm', 'Boîte': '7 DCT', 'Traction': 'RWD' },
    tags: ['cabriolet', 'gt'],
  },
  {
    id: 15, slug: 'lamborghini-urus-nice', brand: 'Lamborghini', model: 'Urus S',
    category: 'suv-luxe', city: 'nice', price: 850, priceWeek: 5000,
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&q=85',
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1200&q=85',
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&q=85',
    ],
    year: 2023, seats: 5, transmission: 'Automatique', fuel: 'Essence', power: '666 ch',
    agency: 'Côte d\'Azur Auto', agencySlug: 'cote-azur-auto', rating: 4.8, reviews: 52,
    available: true, featured: true,
    description: 'Le Lamborghini Urus S est le Super SUV ultime. V8 biturbo de 666 ch, performances de supercar, habitacle ultra-luxueux pour 5 passagers. Régner sur la Côte d\'Azur comme jamais.',
    specs: { '0–100 km/h': '3.5 s', 'Vitesse max': '305 km/h', 'Moteur': 'V8 4.0T', 'Couple': '850 Nm', 'Boîte': '8 Auto', 'Traction': '4RM' },
    tags: ['suv', 'sport'],
  },
  {
    id: 16, slug: 'bentley-gtc-nice', brand: 'Bentley', model: 'Continental GTC',
    category: 'cabriolet', city: 'nice', price: 1050, priceWeek: 6200,
    image: 'https://images.unsplash.com/photo-1617531653332-bd46c16f5e5d?w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1617531653332-bd46c16f5e5d?w=1200&q=85',
      'https://images.unsplash.com/photo-1545291730-faff8ca1d4b0?w=1200&q=85',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=85',
    ],
    year: 2023, seats: 4, transmission: 'Automatique', fuel: 'Essence', power: '542 ch',
    agency: 'Riviera Prestige', agencySlug: 'riviera-prestige', rating: 4.9, reviews: 27,
    available: true, featured: false,
    description: 'Le Bentley Continental GTC transforme chaque trajet en événement. Cabriolet grand tourisme W12, capote acoustique en 19 secondes, cuir artisanal — le soleil de la Riviera ne méritait rien de moins.',
    specs: { '0–100 km/h': '3.9 s', 'Vitesse max': '320 km/h', 'Moteur': 'W12 6.0L', 'Couple': '900 Nm', 'Boîte': '8 DCT', 'Traction': '4RM' },
    tags: ['cabriolet', 'gt', 'luxe'],
  },
  {
    id: 17, slug: 'mclaren-570s-nice', brand: 'McLaren', model: '570S Spider',
    category: 'cabriolet', city: 'nice', price: 980, priceWeek: 5800,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85',
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1200&q=85',
      'https://images.unsplash.com/photo-1605559424843-9073c6e382a2?w=1200&q=85',
    ],
    year: 2022, seats: 2, transmission: 'Automatique', fuel: 'Essence', power: '570 ch',
    agency: 'Côte d\'Azur Auto', agencySlug: 'cote-azur-auto', rating: 4.8, reviews: 31,
    available: true, featured: false,
    description: 'La McLaren 570S Spider ouvre son toit et ses sens à la Riviera. V8 biturbo de 570 ch, châssis en carbone, toit électrique — une expérience supercar découvrable sur les routes de la Côte d\'Azur.',
    specs: { '0–100 km/h': '3.2 s', 'Vitesse max': '328 km/h', 'Moteur': 'V8 3.8T', 'Couple': '600 Nm', 'Boîte': '7 SSG', 'Traction': 'RWD' },
    tags: ['cabriolet', 'supercar'],
  },
  {
    id: 18, slug: 'porsche-911-cab-nice', brand: 'Porsche', model: '911 Carrera 4S Cab.',
    category: 'cabriolet', city: 'nice', price: 680, priceWeek: 4000,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=85',
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&q=85',
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&q=85',
    ],
    year: 2023, seats: 4, transmission: 'PDK', fuel: 'Essence', power: '450 ch',
    agency: 'Riviera Prestige', agencySlug: 'riviera-prestige', rating: 4.9, reviews: 67,
    available: true, featured: false,
    description: 'La Porsche 911 Carrera 4S Cabriolet est l\'accompagnatrice parfaite pour une semaine sur la Riviera. Flat-6 de 450 ch, traction intégrale, élégance absolue capote baissée sur les corniches.',
    specs: { '0–100 km/h': '3.6 s', 'Vitesse max': '306 km/h', 'Moteur': 'Flat-6 3.0T', 'Couple': '530 Nm', 'Boîte': '8 PDK', 'Traction': '4RM' },
    tags: ['cabriolet', 'sport'],
  },

  // ─ MARSEILLE ─────────────────────────────────────────────
  {
    id: 19, slug: 'lamborghini-huracan-spyder-marseille', brand: 'Lamborghini', model: 'Huracán EVO Spyder',
    category: 'cabriolet', city: 'marseille', price: 1600, priceWeek: 9500,
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&q=85',
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1200&q=85',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85',
    ],
    year: 2023, seats: 2, transmission: 'Automatique', fuel: 'Essence', power: '640 ch',
    agency: 'Marseille Luxe Auto', agencySlug: 'marseille-luxe-auto', rating: 4.8, reviews: 23,
    available: true, featured: true,
    description: 'Le Lamborghini Huracán EVO Spyder est la définition de la liberté. V10 atmosphérique de 640 ch, capote en toile — parcourez les calanques de Marseille avec une bande-son que vous n\'oublierez jamais.',
    specs: { '0–100 km/h': '3.1 s', 'Vitesse max': '323 km/h', 'Moteur': 'V10 5.2L NA', 'Couple': '600 Nm', 'Boîte': '7 DCT', 'Traction': '4RM' },
    tags: ['cabriolet', 'supercar'],
  },
  {
    id: 20, slug: 'bmw-m4-marseille', brand: 'BMW', model: 'M4 Competition',
    category: 'sport', city: 'marseille', price: 450, priceWeek: 2650,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&q=85',
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1200&q=85',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=85',
    ],
    year: 2023, seats: 4, transmission: 'M-DCT', fuel: 'Essence', power: '510 ch',
    agency: 'Marseille Luxe Auto', agencySlug: 'marseille-luxe-auto', rating: 4.7, reviews: 44,
    available: true, featured: false,
    description: 'La BMW M4 Competition xDrive est une sportive complète — 510 ch, traction intégrale, châssis affûté. Un compromis parfait entre usage quotidien et plaisir de conduite intense sur les routes provençales.',
    specs: { '0–100 km/h': '3.5 s', 'Vitesse max': '290 km/h', 'Moteur': 'L6 3.0T', 'Couple': '650 Nm', 'Boîte': '8 M-DCT', 'Traction': '4RM' },
    tags: ['sport'],
  },
  {
    id: 21, slug: 'aston-martin-vantage-marseille', brand: 'Aston Martin', model: 'Vantage',
    category: 'gt', city: 'marseille', price: 780, priceWeek: 4600,
    image: 'https://images.unsplash.com/photo-1605559424843-9073c6e382a2?w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1605559424843-9073c6e382a2?w=1200&q=85',
      'https://images.unsplash.com/photo-1617531653332-bd46c16f5e5d?w=1200&q=85',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85',
    ],
    year: 2022, seats: 2, transmission: 'Automatique', fuel: 'Essence', power: '510 ch',
    agency: 'Marseille Luxe Auto', agencySlug: 'marseille-luxe-auto', rating: 4.6, reviews: 18,
    available: true, featured: false,
    description: 'L\'Aston Martin Vantage est un pure-sang britannique. V8 AMG de 510 ch, design sculptural, comportement de supercar — pour explorer la Provence et les Calanques avec style.',
    specs: { '0–100 km/h': '3.6 s', 'Vitesse max': '314 km/h', 'Moteur': 'V8 4.0T AMG', 'Couple': '685 Nm', 'Boîte': '8 Auto', 'Traction': 'RWD' },
    tags: ['gt', 'sport'],
  },
  {
    id: 22, slug: 'rolls-royce-ghost-marseille', brand: 'Rolls-Royce', model: 'Ghost Black Badge',
    category: 'berline-luxe', city: 'marseille', price: 2100, priceWeek: 12500,
    image: 'https://images.unsplash.com/photo-1545291730-faff8ca1d4b0?w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1545291730-faff8ca1d4b0?w=1200&q=85',
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1200&q=85',
      'https://images.unsplash.com/photo-1617531653332-bd46c16f5e5d?w=1200&q=85',
    ],
    year: 2023, seats: 5, transmission: 'Automatique', fuel: 'Essence', power: '603 ch',
    agency: 'Marseille Luxe Auto', agencySlug: 'marseille-luxe-auto', rating: 5.0, reviews: 9,
    available: true, featured: false,
    description: 'La Rolls-Royce Ghost Black Badge est la plus sportive des Rolls. Motorisation rehaussée à 603 ch, finitions dark chrome, silence de cathédrale — arriver à Marseille comme nulle part ailleurs.',
    specs: { '0–100 km/h': '4.6 s', 'Vitesse max': '250 km/h', 'Moteur': 'V12 6.75L', 'Couple': '900 Nm', 'Boîte': '8 Auto', 'Traction': 'RWD' },
    tags: ['berline', 'luxe'],
  },

  // ─ BORDEAUX ──────────────────────────────────────────────
  {
    id: 23, slug: 'porsche-911-gt3-bordeaux', brand: 'Porsche', model: '911 GT3',
    category: 'sport', city: 'bordeaux', price: 890, priceWeek: 5300,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=85',
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&q=85',
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1200&q=85',
    ],
    year: 2023, seats: 2, transmission: 'PDK', fuel: 'Essence', power: '510 ch',
    agency: 'Bordeaux Prestige', agencySlug: 'bordeaux-prestige', rating: 5.0, reviews: 16,
    available: true, featured: true,
    description: 'La Porsche 911 GT3 est le summum du plaisir de conduite. Flat-6 4.0L atmosphérique de 510 ch à 9 000 tr/min, aileron actif — vivre une expérience de pilotage sur les routes du Médoc.',
    specs: { '0–100 km/h': '3.4 s', 'Vitesse max': '318 km/h', 'Moteur': 'Flat-6 4.0L NA', 'Couple': '470 Nm', 'Boîte': '7 PDK', 'Traction': 'RWD' },
    tags: ['sport', 'piste'],
  },
  {
    id: 24, slug: 'ferrari-roma-bordeaux', brand: 'Ferrari', model: 'Roma',
    category: 'gt', city: 'bordeaux', price: 980, priceWeek: 5800,
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1200&q=85',
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&q=85',
      'https://images.unsplash.com/photo-1605559424843-9073c6e382a2?w=1200&q=85',
    ],
    year: 2023, seats: 4, transmission: 'Automatique', fuel: 'Essence', power: '620 ch',
    agency: 'Bordeaux Prestige', agencySlug: 'bordeaux-prestige', rating: 4.9, reviews: 21,
    available: true, featured: false,
    description: 'La Ferrari Roma incarne la dolce vita contemporaine. V8 biturbo de 620 ch, design néo-classique, 2+2 places — l\'élégance absolue pour découvrir Saint-Émilion et le Bordelais.',
    specs: { '0–100 km/h': '3.4 s', 'Vitesse max': '320 km/h', 'Moteur': 'V8 3.9T', 'Couple': '760 Nm', 'Boîte': '8 DCT', 'Traction': 'RWD' },
    tags: ['gt', 'luxe'],
  },
  {
    id: 25, slug: 'bentley-flying-spur-bordeaux', brand: 'Bentley', model: 'Flying Spur',
    category: 'berline-luxe', city: 'bordeaux', price: 780, priceWeek: 4600,
    image: 'https://images.unsplash.com/photo-1617531653332-bd46c16f5e5d?w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1617531653332-bd46c16f5e5d?w=1200&q=85',
      'https://images.unsplash.com/photo-1545291730-faff8ca1d4b0?w=1200&q=85',
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1200&q=85',
    ],
    year: 2023, seats: 5, transmission: 'Automatique', fuel: 'Hybride', power: '544 ch',
    agency: 'Bordeaux Prestige', agencySlug: 'bordeaux-prestige', rating: 4.8, reviews: 14,
    available: true, featured: false,
    description: 'La Bentley Flying Spur est la plus dynamique des grandes routières de luxe. V8 hybride de 544 ch, coupons cuir artisanal — parfaite pour une escapade luxueuse en Gironde.',
    specs: { '0–100 km/h': '3.8 s', 'Vitesse max': '333 km/h', 'Moteur': 'V8 4.0T', 'Couple': '770 Nm', 'Boîte': '8 DCT', 'Traction': '4RM' },
    tags: ['berline', 'luxe'],
  },
];

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

const AGENCIES = [
  // Lyon
  { slug: 'lyon-prestige',      name: 'Lyon Prestige',      city: 'lyon',      rating: 4.9, count: 18, verified: true, since: '2019', response: '< 1h' },
  { slug: 'exotic-lyon',        name: 'Exotic Lyon',        city: 'lyon',      rating: 4.7, count: 14, verified: true, since: '2020', response: '< 2h' },
  { slug: 'prestige-lyon-vip',  name: 'Prestige Lyon VIP',  city: 'lyon',      rating: 4.8, count: 9,  verified: true, since: '2021', response: '< 1h' },
  // Paris
  { slug: 'paris-excellence',   name: 'Paris Excellence',   city: 'paris',     rating: 4.9, count: 26, verified: true, since: '2018', response: '< 1h' },
  { slug: 'grand-luxe-paris',   name: 'Grand Luxe Paris',   city: 'paris',     rating: 4.8, count: 18, verified: true, since: '2020', response: '< 2h' },
  // Nice
  { slug: 'riviera-prestige',   name: 'Riviera Prestige',   city: 'nice',      rating: 4.9, count: 14, verified: true, since: '2019', response: '< 1h' },
  { slug: 'cote-azur-auto',     name: "Côte d'Azur Auto",   city: 'nice',      rating: 4.7, count: 11, verified: true, since: '2021', response: '< 2h' },
  // Marseille
  { slug: 'marseille-luxe-auto',name: 'Marseille Luxe Auto', city: 'marseille', rating: 4.7, count: 8,  verified: true, since: '2022', response: '< 2h' },
  // Bordeaux
  { slug: 'bordeaux-prestige',  name: 'Bordeaux Prestige',  city: 'bordeaux',  rating: 4.8, count: 6,  verified: true, since: '2021', response: '< 1h' },
];

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

const MOCK_LEADS = [
  { id: 1, car: 'Ferrari SF90',         client: 'Thomas D.',  phone: '+33 6 12 34 56 78', date: '27 avr', type: 'Demande devis',  status: 'new',       city: 'Lyon',  dateFrom: '3 mai', dateTo: '5 mai'  },
  { id: 2, car: 'Porsche 911 Turbo S',  client: 'Sophie M.',  phone: '+33 6 98 76 54 32', date: '26 avr', type: 'Réservation',    status: 'confirmed', city: 'Lyon',  dateFrom: '1 mai', dateTo: '4 mai'  },
  { id: 3, car: 'Lamborghini Huracán',  client: 'Marc L.',    phone: '+33 6 55 44 33 22', date: '25 avr', type: 'Demande devis',  status: 'pending',   city: 'Lyon',  dateFrom: '10 mai', dateTo: '11 mai' },
  { id: 4, car: 'Rolls-Royce Ghost',    client: 'Julie P.',   phone: '+33 6 77 88 99 00', date: '24 avr', type: 'Réservation',    status: 'confirmed', city: 'Lyon',  dateFrom: '20 mai', dateTo: '22 mai' },
  { id: 5, car: 'Bentley Continental',  client: 'Alex B.',    phone: '+33 6 11 22 33 44', date: '23 avr', type: 'Demande devis',  status: 'new',       city: 'Lyon',  dateFrom: '15 mai', dateTo: '16 mai' },
];

const MOCK_ANNONCES_PENDING = [
  { id: 101, brand: 'Audi',     model: 'R8',             agency: 'Speed Rental Paris',    city: 'Paris',     price: 680, submitted: '27 avr 09:41', image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=200&q=70' },
  { id: 102, brand: 'Porsche',  model: 'Cayenne Turbo GT',agency: 'Lyon Prestige',         city: 'Lyon',      price: 490, submitted: '26 avr 17:22', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=200&q=70' },
  { id: 103, brand: 'Mercedes', model: 'AMG GT 63',       agency: 'Marseille Luxe Auto',   city: 'Marseille', price: 420, submitted: '26 avr 14:05', image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=200&q=70' },
];

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
