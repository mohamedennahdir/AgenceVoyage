export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  activities: string[];
}

export interface HotelInfo {
  name: string;
  stars: number;
  city: string;
  description: string;
}

export interface OfferDetail {
  slug: string;
  subtitle: string;
  description: string;
  highlights: string[];
  images: string[];
  itinerary: ItineraryDay[];
  included: string[];
  notIncluded: string[];
  hotels?: HotelInfo[];
  conditions?: string;
}

// ── Données détaillées ───────────────────────────────────────────────────────

const DETAILS: Record<string, OfferDetail> = {
  'istanbul-7-jours': {
    slug: 'istanbul-7-jours',
    subtitle: 'Bosphore, palais ottomans et saveurs orientales',
    description:
      "Plongez au cœur d'Istanbul, ville majestueuse à cheval sur deux continents. De la Mosquée Bleue au Grand Bazar, en passant par une croisière sur le Bosphore, chaque moment est une découverte. Notre package tout compris vous garantit confort, sécurité et émerveillement.",
    highlights: [
      'Visite de Sainte-Sophie et la Mosquée Bleue',
      'Croisière au coucher du soleil sur le Bosphore',
      'Shopping au Grand Bazar et au Bazar des Épices',
      'Palais de Topkapi et ses trésors impériaux',
      'Quartier branché de Beyoğlu et la Tour Galata',
      'Dîner gastronomique avec vue sur le Bosphore',
    ],
    images: [
      'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1200&q=85',
      'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800&q=80',
      'https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?w=800&q=80',
      'https://images.unsplash.com/photo-1589306655070-4429e20e3d50?w=800&q=80',
      'https://images.unsplash.com/photo-1527838832700-5059252407fa?w=800&q=80',
    ],
    itinerary: [
      { day: 1, title: 'Arrivée à Istanbul', description: 'Accueil à l\'aéroport et transfert à l\'hôtel. Temps libre pour vous installer. Dîner de bienvenue au restaurant de l\'hôtel.', activities: ['Transfert aéroport → hôtel', 'Check-in & installation', 'Dîner de bienvenue'] },
      { day: 2, title: 'La Mosquée Bleue & Sainte-Sophie', description: 'Journée dans le cœur historique d\'Istanbul. Visite de la majestueuse Mosquée Bleue, chef-d\'œuvre de l\'architecture ottomane, puis de Sainte-Sophie.', activities: ['Mosquée Bleue (Sultan Ahmed)', 'Sainte-Sophie', 'Citerne Basilique', 'Hippodrome'] },
      { day: 3, title: 'Palais de Topkapi & Grand Bazar', description: 'Immersion dans l\'histoire ottomane au Palais de Topkapi et ses fabuleuses collections. L\'après-midi, perdez-vous dans les ruelles colorées du Grand Bazar.', activities: ['Palais de Topkapi', 'Grand Bazar (4000 boutiques)', 'Bazar des Épices'] },
      { day: 4, title: 'Croisière sur le Bosphore', description: 'Matinée consacrée à une croisière panoramique sur le détroit du Bosphore. Vue unique sur les palais, forteresses et villas ottomanes.', activities: ['Croisière Bosphore (3h)', 'Palais de Dolmabahçe', 'Quartier de Beşiktaş'] },
      { day: 5, title: 'Beyoğlu & Tour Galata', description: 'Découverte du quartier cosmopolite de Beyoğlu. La célèbre rue Istiklal, la Tour Galata et ses panoramas inoubliables sur la ville.', activities: ['Tour Galata', 'Rue Istiklal', 'Quartier de Karaköy', 'Temps libre shopping'] },
      { day: 6, title: 'Journée libre & excursion optionnelle', description: 'Journée à votre disposition pour découvrir Istanbul à votre rythme. Option : excursion aux Îles aux Princes ou au quartier asiatique Kadıköy.', activities: ['Excursion optionnelle : Îles aux Princes', 'Marché de Kadıköy (rive asiatique)', 'Shopping et temps libre'] },
      { day: 7, title: 'Retour en Algérie', description: 'Petit-déjeuner à l\'hôtel. Transfert à l\'aéroport Atatürk pour votre vol retour. Fin de notre circuit Istanbul inoubliable.', activities: ['Petit-déjeuner à l\'hôtel', 'Check-out', 'Transfert aéroport', 'Vol retour'] },
    ],
    included: [
      'Vol aller-retour depuis Alger (ou Oran)',
      'Hébergement 5 nuits en hôtel 4★ petit-déjeuner inclus',
      'Transferts aéroport ↔ hôtel en bus touristique',
      'Guide francophone professionnel',
      'Croisière sur le Bosphore',
      'Entrées : Sainte-Sophie, Topkapi, Citerne Basilique',
      'Dîner de bienvenue',
      'Assurance voyage multirisque',
    ],
    notIncluded: [
      'Déjeuners et dîners (sauf dîner de bienvenue)',
      'Dépenses personnelles et pourboires',
      'Excursions optionnelles',
      'Taxes d\'aéroport (incluses dans le prix)',
      'Boissons pendant les repas',
    ],
    hotels: [
      { name: 'Grand Hyatt Istanbul', stars: 5, city: 'Istanbul', description: 'Situé au cœur de Taksim, cet hôtel 5★ offre une vue imprenable sur la ville et le Bosphore.' },
    ],
    conditions: 'Réservation possible jusqu\'à 72h avant le départ. Annulation gratuite jusqu\'à 30 jours avant. Au-delà, des frais d\'annulation s\'appliquent selon les conditions générales.',
  },

  'dubai-5-jours': {
    slug: 'dubai-5-jours',
    subtitle: 'Gratte-ciels, désert doré et luxe absolu',
    description:
      'Dubai, métropole futuriste au cœur du désert, vous accueille pour une expérience unique entre modernité spectaculaire et traditions arabes authentiques. Burj Khalifa, souks d\'or, safari dans les dunes — le voyage parfait.',
    highlights: [
      'Montée au Burj Khalifa (828m), plus haute tour du monde',
      'Safari en 4x4 dans les dunes du désert',
      'Visite des souks d\'Or et d\'Épices de Deira',
      'Dubai Mall et la plus grande fontaine du monde',
      'Croisière Abra sur Dubai Creek',
      'Quartier historique d\'Al Fahidi',
    ],
    images: [
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=85',
      'https://images.unsplash.com/photo-1546412414-e1885259563a?w=800&q=80',
      'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=800&q=80',
      'https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=800&q=80',
      'https://images.unsplash.com/photo-1531299497067-0fa83e65b9c7?w=800&q=80',
    ],
    itinerary: [
      { day: 1, title: 'Arrivée à Dubai', description: 'Accueil à l\'aéroport international de Dubai. Transfert et installation dans votre hôtel 5★. Découverte de la marina en soirée.', activities: ['Transfert aéroport', 'Check-in hôtel', 'Dubai Marina (soirée)'] },
      { day: 2, title: 'Burj Khalifa & Downtown Dubai', description: 'Journée emblématique à Downtown Dubai. Montée au sommet du Burj Khalifa (124e étage) pour une vue à couper le souffle, puis visite du Dubai Mall.', activities: ['Burj Khalifa (124e étage)', 'Dubai Mall & Fontaine', 'Dubai Frame'] },
      { day: 3, title: 'Souks & Vieille Dubai', description: 'Plongée dans le Dubai authentique. Croisière en Abra sur Dubai Creek, visite des souks d\'Or et d\'Épices, quartier historique Al Fahidi.', activities: ['Souk de l\'Or & des Épices', 'Croisière Abra', 'Quartier Al Fahidi', 'Musée de Dubai'] },
      { day: 4, title: 'Safari Désert', description: 'Journée inoubliable dans les dunes de sable rouge. Safari en 4x4, sand boarding, coucher de soleil et dîner berbère sous les étoiles avec spectacles.', activities: ['Dune Bashing en 4x4', 'Sand boarding', 'Coucher de soleil', 'Dîner berbère & spectacles'] },
      { day: 5, title: 'Shopping & Retour', description: 'Matinée shopping dans les boutiques duty-free et les malls. Après-midi, transfert vers l\'aéroport pour votre vol retour.', activities: ['Shopping libre', 'Duty-free aéroport', 'Vol retour'] },
    ],
    included: [
      'Vol aller-retour depuis Alger',
      'Hébergement 4 nuits hôtel 5★ (Dubai Marina)',
      'Petit-déjeuner buffet chaque matin',
      'Transferts aéroport inclus',
      'Safari désert avec dîner et spectacles',
      'Croisière Abra sur Dubai Creek',
      'Entrée Burj Khalifa (124e étage)',
      'Guide francophone',
      'Assurance voyage',
    ],
    notIncluded: [
      'Déjeuners et dîners (sauf safari)',
      'Dépenses personnelles',
      'Pourboires',
      'Shopping (duty-free)',
    ],
    hotels: [
      { name: 'JW Marriott Marquis Dubai', stars: 5, city: 'Dubai Marina', description: 'Hôtel 5★ iconique avec vue sur la marina. Spa, piscine rooftop et restaurants gastronomiques.' },
    ],
    conditions: 'Réservation jusqu\'à 48h avant le départ. Annulation gratuite jusqu\'à 21 jours.',
  },

  'omra-confort-2026': {
    slug: 'omra-confort-2026',
    subtitle: 'Pèlerinage spirituel accompagné de A à Z',
    description:
      'Notre package Omra Confort vous offre une expérience spirituelle d\'une profondeur incomparable. Hôtels 4★ à quelques centaines de mètres des lieux saints, vol direct, guide islamique agréé et prise en charge complète du visa Omra.',
    highlights: [
      'Vol direct depuis 4 aéroports algériens',
      'Hôtel 4★ à 300m de la Mosquée Al-Haram',
      'Hôtel 4★ au centre de Médine',
      'Visa Omra pris en charge par l\'agence',
      'Accompagnement par un guide islamique agréé',
      'Assurance voyage et médicale incluse',
    ],
    images: [
      'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=1200&q=85',
      'https://images.unsplash.com/photo-1587536849024-4da0c2f23c69?w=800&q=80',
      'https://images.unsplash.com/photo-1564769625905-50e93615e769?w=800&q=80',
      'https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=800&q=80',
    ],
    itinerary: [
      { day: 1, title: 'Départ depuis l\'Algérie', description: 'Rassemblement à l\'aéroport. Vol direct vers Djeddah ou Médine. Accueil et orientation des pèlerins.', activities: ['Rassemblement aéroport', 'Vol direct Algérie → Arabie Saoudite', 'Transfert vers hôtel Médine'] },
      { day: 2, title: 'Arrivée à Médine', description: 'Installation à l\'hôtel. Première visite à la Mosquée du Prophète (Masjid an-Nabawi). Prière à la Rawdah Sharifah.', activities: ['Masjid an-Nabawi (Mosquée du Prophète)', 'Prière à la Rawdah', 'Découverte de Médine'] },
      { day: 3, title: 'Sites de Médine', description: 'Visites guidées des lieux historiques et spirituels de Médine la lumineuse.', activities: ['Masjid Quba (1ère mosquée de l\'Islam)', 'Masjid al-Qiblatayn', 'Mont Uhud', 'Cimetière Al-Baqi'] },
      { day: 4, title: 'Médine - sites spirituels', description: 'Journée de recueillement et de prières. Temps libre pour les prières et la méditation.', activities: ['Prières à la Mosquée du Prophète', 'Temps libre', 'Shopping à Médine'] },
      { day: 5, title: 'Départ vers La Mecque', description: 'Transfert en car climatisé de Médine vers La Mecque. Entrée en état d\'ihram.', activities: ['Ihram à Masjid al-Miqat', 'Transfert Médine → La Mecque (5h)', 'Arrivée et installation hôtel'] },
      { day: 6, title: 'Arrivée à La Mecque & Omra', description: 'Accomplissement des rites de l\'Omra : Tawaf (7 tours autour de la Kaaba), Sa\'i (entre Safa et Marwa), coupe de cheveux.', activities: ['Tawaf autour de la Kaaba', 'Sa\'i entre Safa et Marwa', 'Tonte (coupe cheveux)', 'Sortie d\'ihram'] },
      { day: 7, title: 'La Mecque — Lieux saints', description: 'Visites guidées des sites historiques et spirituels de La Mecque.', activities: ['Masjid Aisha (Tan\'im)', 'Jabal an-Nour (Grotte de Hira)', 'Jabal Thawr', 'Musée Al-Zaher'] },
      { day: 8, title: 'La Mecque — prières & recueillement', description: 'Journée consacrée aux prières et à la méditation. Possibilité de Tawaf additionnel.', activities: ['Tawaf voluntaire', 'Prières à Masjid al-Haram', 'Temps libre'] },
      { day: 9, title: 'La Mecque — achats & prières', description: 'Dernière journée à La Mecque. Shopping souvenirs et prières.', activities: ['Shopping souvenirs', 'Prières finales à la Mosquée Al-Haram', 'Préparation retour'] },
      { day: 10, title: 'La Mecque', description: 'Journée libre à La Mecque.', activities: ['Tawaf de Wada\' (adieu)', 'Temps libre', 'Préparation bagages'] },
      { day: 11, title: 'La Mecque', description: 'Dernière matinée. Transfert vers l\'aéroport de Djeddah.', activities: ['Petit-déjeuner', 'Check-out', 'Transfert aéroport Djeddah'] },
      { day: 12, title: 'Retour en Algérie', description: 'Vol retour vers l\'Algérie. Arrivée au pays chargé de souvenirs spirituels.', activities: ['Vol Djeddah → Algérie', 'Arrivée en Algérie'] },
    ],
    included: [
      'Vol aller-retour direct (Alger, Oran, Constantine ou Annaba)',
      'Visa Omra pris en charge',
      'Hébergement 4★ à Médine (4 nuits) et La Mecque (7 nuits)',
      'Petit-déjeuner et dîner en buffet chaque jour',
      'Transferts Médine ↔ La Mecque en car climatisé',
      'Guide islamique agréé par le Ministère',
      'Assurance voyage et médicale',
      'Documentation et orientation complète',
    ],
    notIncluded: [
      'Déjeuners',
      'Sacrifices (Udhiya)',
      'Dépenses personnelles',
      'Pourboires',
      'Excursions non mentionnées',
    ],
    hotels: [
      { name: 'Sheraton Al Nour', stars: 4, city: 'La Mecque', description: 'À 300 mètres de la Mosquée Al-Haram. Vue directe sur la Kaaba depuis les chambres supérieures.' },
      { name: 'Movenpick Médine', stars: 4, city: 'Médine', description: 'À 200 mètres de la Mosquée du Prophète. Idéalement situé pour les prières.' },
    ],
    conditions: 'Paiement en 3 fois sans frais possible. Dossier visa à soumettre 45 jours avant le départ. Annulation : remboursement intégral jusqu\'à 45 jours avant.',
  },

  'le-caire-4-jours': {
    slug: 'le-caire-4-jours',
    subtitle: 'Pyramides, pharaons et nil millénaire',
    description:
      "Le Caire, l'une des plus vieilles métropoles du monde, vous ouvre ses portes sur une civilisation de 5000 ans. Des pyramides de Gizeh au Musée Égyptien, chaque pierre raconte une histoire extraordinaire.",
    highlights: [
      'Les Pyramides de Gizeh et le Grand Sphinx',
      'Musée Égyptien et ses trésors de Toutankhamon',
      'Citadelle de Saladin et Mosquée Muhammad Ali',
      'Khan el-Khalili, le plus grand souk d\'Afrique',
      'Croisière sur le Nil en Felouque',
      'Vieille ville islamique — quartiers historiques',
    ],
    images: [
      'https://images.unsplash.com/photo-1539768942893-daf53e448371?w=1200&q=85',
      'https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=800&q=80',
      'https://images.unsplash.com/photo-1572252009286-96463070c3b8?w=800&q=80',
      'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?w=800&q=80',
    ],
    itinerary: [
      { day: 1, title: 'Arrivée au Caire', description: 'Accueil à l\'aéroport international du Caire. Transfert et installation. Soirée découverte du quartier moderne.', activities: ['Transfert aéroport → hôtel', 'Dîner de bienvenue', 'Vue panoramique sur Le Caire nocturne'] },
      { day: 2, title: 'Pyramides de Gizeh & Sphinx', description: 'La journée la plus emblématique de votre séjour. Visite des 3 grandes pyramides de Gizeh, du Grand Sphinx et du Temple de la Vallée.', activities: ['Pyramide de Khéops (grande pyramide)', 'Sphinx & Temple de la Vallée', 'Panorama des pyramides (photo)', 'Musée Solaire (barque funéraire)'] },
      { day: 3, title: 'Musée Égyptien & Citadelle', description: 'Matin au Musée Égyptien : Chambre d\'Or de Toutankhamon et ses 5000 pièces. Après-midi à la Citadelle de Saladin.', activities: ['Musée Égyptien (trésor Toutankhamon)', 'Citadelle de Saladin', 'Mosquée Muhammad Ali', 'Khan el-Khalili (souk)'] },
      { day: 4, title: 'Vieille ville & Retour', description: 'Matinée dans la vieille ville islamique. Croisière en Felouque sur le Nil. Transfert aéroport en début d\'après-midi.', activities: ['Quartier islamique historique', 'Mosquée Ibn Tulun (876 ap. JC)', 'Croisière Felouque sur le Nil', 'Vol retour'] },
    ],
    included: [
      'Vol aller-retour depuis Alger ou Constantine',
      'Hébergement 3 nuits hôtel 4★ au centre du Caire',
      'Petit-déjeuner américain chaque matin',
      'Tous les transferts en minibus climatisé',
      'Entrées : Pyramides, Sphinx, Musée Égyptien, Citadelle',
      'Guide francophone egyptologue diplômé',
      'Croisière Felouque sur le Nil',
      'Assurance voyage',
    ],
    notIncluded: [
      'Déjeuners et dîners',
      'Dépenses personnelles',
      'Pourboires guide et chauffeur',
      'Optionnel : entrée dans la pyramide (50 USD)',
    ],
    hotels: [
      { name: 'Steigenberger El Tahrir', stars: 4, city: 'Le Caire (Centre)', description: 'Situé sur la Place Tahrir, à 5 minutes à pied du Musée Égyptien. Vue sur le Nil depuis les chambres supérieures.' },
    ],
    conditions: 'Annulation gratuite jusqu\'à 21 jours avant le départ. Paiement en 2 fois possible.',
  },
};

// ── Générateur de données par défaut ────────────────────────────────────────

function generateDefaultDetail(slug: string): OfferDetail {
  return {
    slug,
    subtitle: 'Voyage organisé tout compris',
    description:
      'Découvrez cette destination exceptionnelle avec notre package tout compris. Un voyage soigneusement organisé pour vous offrir la meilleure expérience, en toute sérénité.',
    highlights: [
      'Hébergement en hôtel de qualité',
      'Guide francophone professionnel',
      'Transferts aéroport inclus',
      'Assurance voyage multirisque',
      'Programme riche et varié',
      'Assistance 24h/24 sur place',
    ],
    images: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=85',
      'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80',
      'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80',
      'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80',
    ],
    itinerary: [
      { day: 1, title: 'Arrivée et installation', description: 'Accueil à l\'aéroport, transfert et installation dans votre hébergement. Briefing avec votre guide.', activities: ['Accueil aéroport', 'Check-in', 'Briefing guide', 'Dîner de bienvenue'] },
      { day: 2, title: 'Découverte principale', description: 'Journée dédiée à la découverte des sites incontournables de la destination.', activities: ['Visite site 1', 'Déjeuner local', 'Visite site 2', 'Soirée libre'] },
      { day: 3, title: 'Culture et gastronomie', description: 'Immersion dans la culture locale, marchés, musées et gastronomie authentique.', activities: ['Marché local', 'Musée principal', 'Déjeuner gastronomique', 'Temps libre'] },
      { day: 4, title: 'Excursion', description: 'Excursion d\'une journée vers un site naturel ou historique remarquable.', activities: ['Départ tôt le matin', 'Excursion guidée', 'Pique-nique', 'Retour en fin d\'après-midi'] },
      { day: 5, title: 'Retour', description: 'Matinée libre. Transfert vers l\'aéroport pour votre vol retour.', activities: ['Petit-déjeuner', 'Shopping souvenirs', 'Transfert aéroport', 'Vol retour'] },
    ],
    included: [
      'Vol aller-retour depuis l\'Algérie',
      'Hébergement en hôtel (petit-déjeuner inclus)',
      'Transferts aéroport ↔ hôtel',
      'Guide francophone',
      'Assurance voyage',
      'Visites mentionnées au programme',
    ],
    notIncluded: [
      'Déjeuners et dîners',
      'Dépenses personnelles',
      'Pourboires',
      'Excursions optionnelles',
    ],
    conditions: 'Annulation gratuite jusqu\'à 30 jours avant le départ. Paiement en 2 fois possible.',
  };
}

export function getOfferDetail(slug: string): OfferDetail {
  return DETAILS[slug] ?? generateDefaultDetail(slug);
}
