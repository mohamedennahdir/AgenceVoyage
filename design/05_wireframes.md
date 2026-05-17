# 📐 Wireframes des écrans clés

Description détaillée de chaque écran avec disposition, composants et interactions.

## 🏠 1. Page d'accueil

### Layout général (Desktop)

```
┌────────────────────────────────────────────────────────┐
│ [Logo]  Vols Hôtels Omra Circuits Blog  [👤] [🛒] [☰] │ ← Header (sticky)
├────────────────────────────────────────────────────────┤
│                                                        │
│   ┌──────────────────────────────────────────────┐    │
│   │   HERO - Image plein écran (1920x1080)       │    │
│   │   Overlay sombre 30%                         │    │
│   │                                              │    │
│   │   "Votre prochaine aventure                  │    │
│   │    commence ici" (Playfair, 72px)           │    │
│   │                                              │    │
│   │   Sous-titre rassurant (Inter, 20px)        │    │
│   │                                              │    │
│   │   ┌──────────────────────────────────────┐  │    │
│   │   │ MOTEUR DE RECHERCHE                  │  │    │
│   │   │ [Tabs: Vols|Hôtels|Packages|Omra]    │  │    │
│   │   │ [Destination] [Dates] [Voyageurs]    │  │    │
│   │   │                    [🔍 Rechercher]   │  │    │
│   │   └──────────────────────────────────────┘  │    │
│   └──────────────────────────────────────────────┘    │
│                                                        │
│   ╔══════════════════════════════════════════════╗    │
│   ║ DESTINATIONS POPULAIRES                      ║    │
│   ║                                              ║    │
│   ║ [Carte] [Carte] [Carte] [Carte]              ║    │
│   ║ Istanbul Dubaï  Tunis   Paris                ║    │
│   ╚══════════════════════════════════════════════╝    │
│                                                        │
│   ╔══════════════════════════════════════════════╗    │
│   ║ NOS OFFRES PHARES                            ║    │
│   ║                                              ║    │
│   ║ [Carte offre détaillée] [Carte] [Carte]      ║    │
│   ║ avec badge promo, prix, dates                ║    │
│   ║                                              ║    │
│   ║         [Voir toutes les offres →]           ║    │
│   ╚══════════════════════════════════════════════╝    │
│                                                        │
│   ╔══════════════════════════════════════════════╗    │
│   ║ SECTION OMRA & HAJJ (mise en avant)          ║    │
│   ║ Background image Mecque                      ║    │
│   ║ "Vivez votre pèlerinage en toute sérénité"   ║    │
│   ║ [Découvrir les packages]                     ║    │
│   ╚══════════════════════════════════════════════╝    │
│                                                        │
│   ╔══════════════════════════════════════════════╗    │
│   ║ POURQUOI NOUS CHOISIR                        ║    │
│   ║ [Icon] [Icon] [Icon] [Icon]                  ║    │
│   ║ Agréé  Support Sécurisé Prix                 ║    │
│   ╚══════════════════════════════════════════════╝    │
│                                                        │
│   ╔══════════════════════════════════════════════╗    │
│   ║ TÉMOIGNAGES CLIENTS                          ║    │
│   ║ Carousel d'avis avec photos                  ║    │
│   ╚══════════════════════════════════════════════╝    │
│                                                        │
│   ╔══════════════════════════════════════════════╗    │
│   ║ BLOG / GUIDES                                ║    │
│   ║ [Article] [Article] [Article]                ║    │
│   ╚══════════════════════════════════════════════╝    │
│                                                        │
│   ╔══════════════════════════════════════════════╗    │
│   ║ NEWSLETTER + WHATSAPP CTA                    ║    │
│   ╚══════════════════════════════════════════════╝    │
│                                                        │
├────────────────────────────────────────────────────────┤
│ FOOTER complet                                         │
│ Logo | Liens | Contact | Réseaux | Légal | Paiement   │
└────────────────────────────────────────────────────────┘
```

### Layout mobile (375px)

```
┌──────────────────────┐
│ [☰] [Logo]    [👤]  │
├──────────────────────┤
│                      │
│   HERO IMAGE         │
│                      │
│   "Votre prochaine   │
│    aventure"         │
│                      │
│   ┌──────────────┐   │
│   │ TABS scroll  │   │
│   │ ◀ Vols ▶     │   │
│   │ [Destination]│   │
│   │ [Dates]      │   │
│   │ [Voyageurs]  │   │
│   │ [Rechercher] │   │
│   └──────────────┘   │
├──────────────────────┤
│ DESTINATIONS         │
│ (carousel horizontal)│
│ [Card][Card][Card]→  │
├──────────────────────┤
│ OFFRES PHARES        │
│ [Card pleine largeur]│
│ [Card pleine largeur]│
│ [Card pleine largeur]│
│ [Voir tout →]        │
├──────────────────────┤
│ ... autres sections  │
└──────────────────────┘
│ Bottom nav (sticky)  │
│ 🏠 🔍 ❤️ 👤         │
└──────────────────────┘
```

### Détails composants

**Header**
- Hauteur : 72px desktop, 64px mobile
- Sticky avec backdrop-blur quand scroll
- Logo cliquable (retour home)
- Menu : Vols, Hôtels, Omra/Hajj, Circuits, Blog
- Icons : Compte, Favoris, WhatsApp flottant

**Hero**
- Image background avec overlay gradient
- Titre Playfair Display 72px (desktop) / 36px (mobile)
- Animation reveal au load (stagger)
- Moteur de recherche en card blanche avec ombre

**Moteur de recherche**
- Tabs colorés : Vols | Hôtels | Packages | Omra | Circuits
- Champs adaptatifs selon tab :
  - **Vols** : Départ, Arrivée, Dates, Voyageurs, Classe
  - **Hôtels** : Destination, Check-in, Check-out, Voyageurs
  - **Packages** : Destination, Dates, Voyageurs
  - **Omra** : Période, Voyageurs, Type (économique/confort/luxe)
- Autocomplete sur villes
- Date picker avec prix par jour si disponible
- Sélecteur voyageurs : adultes/enfants/bébés avec +/-

**Cards destination**
- Image full bleed avec overlay
- Nom destination en bas en blanc
- "À partir de X DZD"
- Hover : zoom léger + révéler "Voir les offres"

**Cards offre**
- Image 4:3
- Badge promo si applicable (rouge)
- Titre + lieu
- Étoiles + nombre d'avis
- Durée
- Prix barré + prix promo
- "À partir de X DZD/personne"
- Bouton "Voir détails"

## 🔍 2. Page de résultats de recherche

### Layout (Desktop)

```
┌────────────────────────────────────────────────────────┐
│ Header                                                 │
├────────────────────────────────────────────────────────┤
│ Breadcrumb : Accueil > Vols > Istanbul                │
├────────────────────────────────────────────────────────┤
│ ┌──────────┐ ┌────────────────────────────────────┐   │
│ │FILTRES   │ │ MOTEUR DE RECHERCHE (compact)      │   │
│ │          │ │ Alger → Istanbul | 15-22 Mai | 2A  │   │
│ │PRIX      │ ├────────────────────────────────────┤   │
│ │─●────────│ │ 124 résultats | Tri: [Prix ↑ ▼]   │   │
│ │0  100k   │ ├────────────────────────────────────┤   │
│ │          │ │ ┌────────────────────────────────┐ │   │
│ │COMPAGNIE │ │ │ [Photo] Istanbul - 7 jours     │ │   │
│ │☐ Air Alg │ │ │         ★★★★☆ (124 avis)       │ │   │
│ │☐ Turkish │ │ │ ✈ Vol + 🏨 Hôtel 4*           │ │   │
│ │☐ Qatar   │ │ │ 15 → 22 Mai                    │ │   │
│ │          │ │ │                  85 000 DZD/pp │ │   │
│ │ESCALES   │ │ │              [Voir détails →]  │ │   │
│ │○ Direct  │ │ └────────────────────────────────┘ │   │
│ │○ 1 escale│ │                                    │   │
│ │          │ │ [Carte offre 2]                    │   │
│ │HÔTEL ★   │ │ [Carte offre 3]                    │   │
│ │☆☆☆☆☆     │ │ ...                                │   │
│ │          │ │                                    │   │
│ │[Reset]   │ │ [Pagination 1 2 3 ... 12]          │   │
│ └──────────┘ └────────────────────────────────────┘   │
└────────────────────────────────────────────────────────┘
```

### Layout mobile

```
┌──────────────────────┐
│ ← Istanbul (124)     │ Header avec back
├──────────────────────┤
│ [Filtres] [Tri] [⊞]  │ Barre actions
├──────────────────────┤
│ ┌──────────────────┐ │
│ │ [Photo grande]   │ │
│ │ Istanbul - 7j    │ │
│ │ ★★★★☆ (124)      │ │
│ │ 15-22 Mai        │ │
│ │ 85 000 DZD       │ │
│ │ [Voir détails →] │ │
│ └──────────────────┘ │
│                      │
│ [Card 2]             │
│ [Card 3]             │
│ ...                  │
└──────────────────────┘

Filtres : bottom sheet
Tri : modal
```

### Composants

**Sidebar filtres**
- Sticky scroll
- Sections collapsibles
- Compteurs entre parenthèses
- Bouton reset bien visible
- Mobile : bottom sheet draggable

**Carte résultat (large)**
- Layout horizontal desktop, vertical mobile
- Photo grande à gauche
- Détails à droite
- CTA primary à droite
- Hover : élévation + bordure primary

## 📄 3. Page détail offre

### Layout (Desktop)

```
┌────────────────────────────────────────────────────────┐
│ Header                                                 │
├────────────────────────────────────────────────────────┤
│ ← Retour                                               │
├────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────┐ ┌───────────────────┐ │
│ │                             │ │                   │ │
│ │ GALERIE PHOTOS              │ │ CARD RÉSERVATION  │ │
│ │ ┌─────────────────────────┐ │ │ (sticky)          │ │
│ │ │   Photo principale      │ │ │                   │ │
│ │ │                         │ │ │ 85 000 DZD        │ │
│ │ ├─────────┬─────────┬─────┤ │ │ par personne      │ │
│ │ │ Photo 2 │ Photo 3 │+12  │ │ │                   │ │
│ │ └─────────┴─────────┴─────┘ │ │ ★★★★☆ (124)       │ │
│ │                             │ │                   │ │
│ │ Istanbul - 7 jours          │ │ Dates de départ : │ │
│ │ 📍 Istanbul, Turquie         │ │ [Calendrier]      │ │
│ │ ★★★★☆ (124 avis)            │ │                   │ │
│ │                             │ │ Voyageurs :       │ │
│ │ HIGHLIGHTS                  │ │ [2 adultes ▼]     │ │
│ │ • Vol direct                │ │                   │ │
│ │ • Hôtel 4* centre           │ │ Total : 170k DZD  │ │
│ │ • Petit déj inclus          │ │                   │ │
│ │ • Excursions guidées        │ │ [💳 Réserver]     │ │
│ │                             │ │ [💬 WhatsApp]      │ │
│ │ ──────────────────────────  │ │                   │ │
│ │                             │ │ ✓ Annul. gratuite │ │
│ │ PROGRAMME DÉTAILLÉ          │ │ ✓ Paiement sécur. │ │
│ │ [Jour 1] [Jour 2] ... tabs  │ │ ✓ Support 24/7    │ │
│ │                             │ └───────────────────┘ │
│ │ Description du jour...      │                       │
│ │                             │                       │
│ │ ──────────────────────────  │                       │
│ │                             │                       │
│ │ INCLUS / NON INCLUS         │                       │
│ │ ✓ Vol AR    ✗ Visa          │                       │
│ │ ✓ Hôtel     ✗ Pourboires    │                       │
│ │ ✓ Petit déj ✗ Repas hors    │                       │
│ │                             │                       │
│ │ ──────────────────────────  │                       │
│ │                             │                       │
│ │ LOCALISATION                │                       │
│ │ [Carte Google Maps]         │                       │
│ │                             │                       │
│ │ ──────────────────────────  │                       │
│ │                             │                       │
│ │ AVIS CLIENTS (124)          │                       │
│ │ ★★★★☆ 4.5/5                │                       │
│ │                             │                       │
│ │ [Avis 1] [Avis 2] ...       │                       │
│ │ [Voir tous les avis →]      │                       │
│ │                             │                       │
│ │ ──────────────────────────  │                       │
│ │                             │                       │
│ │ FORMALITÉS                  │                       │
│ │ Visa, vaccins, etc.         │                       │
│ │                             │                       │
│ └─────────────────────────────┘                       │
├────────────────────────────────────────────────────────┤
│ OFFRES SIMILAIRES                                      │
│ [Card] [Card] [Card]                                   │
├────────────────────────────────────────────────────────┤
│ Footer                                                 │
└────────────────────────────────────────────────────────┘
```

### Mobile

```
┌──────────────────────┐
│ ← [♡] [↗]            │
├──────────────────────┤
│ [Photo carousel]     │
│ • • • ●              │
├──────────────────────┤
│ Istanbul - 7 jours   │
│ 📍 Istanbul, Turquie │
│ ★★★★☆ (124 avis)     │
├──────────────────────┤
│ Description          │
│ Programme            │
│ Inclus               │
│ Avis                 │
│ ...                  │
└──────────────────────┘
│ STICKY BOTTOM        │
│ 85 000 DZD           │
│ [💳 Réserver]        │
└──────────────────────┘
```

### Composants

**Galerie**
- Photo principale grande
- Grid 2x2 ou 3x2 pour autres
- Click → Lightbox plein écran avec swipe
- Mobile : carousel horizontal

**Card réservation (sticky)**
- Largeur fixe 380px
- Position sticky avec offset header
- Prix mis en évidence (accent color)
- Sélecteurs date et voyageurs
- 2 CTAs : Réserver + WhatsApp
- Trust badges en bas

**Programme tabs**
- Onglets horizontaux scrollables
- Contenu avec image jour + description
- Inclus dans la journée (repas, activités)

## 🛒 4. Tunnel de réservation

### Étape 1 : Sélection options

```
┌────────────────────────────────────────────────────────┐
│ [1] Options - [2] Voyageurs - [3] Récap - [4] Paiement│ Stepper
├────────────────────────────────────────────────────────┤
│ ┌─────────────────────────┐ ┌──────────────────────┐  │
│ │ Date de départ          │ │ Récap commande       │  │
│ │ [Calendrier prix]       │ │                      │  │
│ │                         │ │ Istanbul - 7 jours   │  │
│ │ Voyageurs               │ │ Du 15 au 22 Mai      │  │
│ │ Adultes [2 ▼]           │ │ 2 adultes            │  │
│ │ Enfants [0 ▼]           │ │                      │  │
│ │ Bébés   [0 ▼]           │ │ Sous-total: 170k    │  │
│ │                         │ │ Suppléments: 5k     │  │
│ │ Suppléments             │ │ Réduction: -10k     │  │
│ │ ☐ Assurance (5000 DZD)  │ │ ─────────           │  │
│ │ ☐ Excursion (3000 DZD)  │ │ TOTAL: 165 000 DZD  │  │
│ │                         │ │                      │  │
│ │ Code promo              │ │ [Continuer →]        │  │
│ │ [_____] [Appliquer]     │ │                      │  │
│ └─────────────────────────┘ └──────────────────────┘  │
└────────────────────────────────────────────────────────┘
```

### Étape 2 : Voyageurs

```
Pour chaque voyageur :
┌──────────────────────────────────────────────┐
│ Voyageur 1 (Adulte) - Contact principal     │
│                                              │
│ Civilité : ○ M. ○ Mme                       │
│ Prénom : [___________]                       │
│ Nom : [___________]                          │
│ Date naissance : [__/__/____]                │
│ Nationalité : [Algérie ▼]                    │
│                                              │
│ Passeport :                                  │
│ Numéro : [___________]                       │
│ Date expiration : [__/__/____]               │
│                                              │
│ ☐ Sauvegarder dans mon carnet                │
└──────────────────────────────────────────────┘

[Importer depuis mon carnet ▼]
```

### Étape 3 : Récapitulatif

```
┌──────────────────────────────────────────────┐
│ RÉCAPITULATIF DE VOTRE RÉSERVATION          │
│                                              │
│ Offre : Istanbul - 7 jours                  │
│ Dates : 15 → 22 Mai 2026                    │
│                                              │
│ Voyageurs (2) :                             │
│ • M. Ahmed Benali (adulte)                  │
│ • Mme Fatima Benali (adulte)                │
│                                              │
│ Suppléments :                                │
│ • Assurance voyage : 5 000 DZD              │
│                                              │
│ Sous-total : 175 000 DZD                    │
│ Code promo (OMRA2026) : -10 000 DZD         │
│ TOTAL : 165 000 DZD                          │
│                                              │
│ ☐ J'accepte les CGV et conditions          │
│   d'annulation                               │
│                                              │
│ [← Modifier]    [Continuer vers paiement →] │
└──────────────────────────────────────────────┘
```

### Étape 4 : Paiement

```
┌──────────────────────────────────────────────┐
│ CHOISISSEZ VOTRE MODE DE PAIEMENT           │
│                                              │
│ ┌──────────────────────────────────────────┐ │
│ │ [Radio] 💳 CIB                           │ │
│ │ Paiement immédiat par carte CIB          │ │
│ │ Confirmation instantanée                 │ │
│ └──────────────────────────────────────────┘ │
│                                              │
│ ┌──────────────────────────────────────────┐ │
│ │ [Radio] 🟡 Edahabia                      │ │
│ │ Paiement par carte Algérie Poste         │ │
│ └──────────────────────────────────────────┘ │
│                                              │
│ ┌──────────────────────────────────────────┐ │
│ │ [Radio] 🏢 Paiement en agence            │ │
│ │ Réservation gardée 48h                   │ │
│ │ Adresse : 12 Rue Didouche, Alger         │ │
│ └──────────────────────────────────────────┘ │
│                                              │
│ ┌──────────────────────────────────────────┐ │
│ │ [Radio] 🏦 Virement bancaire             │ │
│ │ RIB envoyé par email                     │ │
│ └──────────────────────────────────────────┘ │
│                                              │
│ Montant total : 165 000 DZD                  │
│                                              │
│ [Confirmer et payer →]                       │
└──────────────────────────────────────────────┘
```

## 👤 5. Espace client - Dashboard

```
┌────────────────────────────────────────────────────────┐
│ Header avec compte                                     │
├────────────────────────────────────────────────────────┤
│ ┌────────────┐ ┌─────────────────────────────────────┐│
│ │ Sidebar    │ │ Bonjour Ahmed 👋                    ││
│ │            │ │                                     ││
│ │ 🏠 Accueil │ │ ┌─────────────────────────────────┐ ││
│ │ 📋 Résa.   │ │ │ PROCHAIN VOYAGE                 │ ││
│ │ ❤️ Favoris │ │ │ [Photo Istanbul]                │ ││
│ │ 👥 Voyag.  │ │ │ Istanbul - 7 jours              │ ││
│ │ 👤 Profil  │ │ │ Dans 23 jours                   │ ││
│ │ 🔔 Notif.  │ │ │ [Voir détails] [Documents]      │ ││
│ │ ⚙️  Param.  │ │ └─────────────────────────────────┘ ││
│ │            │ │                                     ││
│ │ 🚪 Déconn. │ │ STATISTIQUES                        ││
│ └────────────┘ │ [3 voyages] [125k DZD] [2 favoris] ││
│                │                                     ││
│                │ HISTORIQUE RÉCENT                   ││
│                │ [Liste 3 dernières réservations]    ││
│                │                                     ││
│                │ SUGGESTIONS POUR VOUS               ││
│                │ [Offres similaires à vos goûts]     ││
│                └─────────────────────────────────────┘│
└────────────────────────────────────────────────────────┘
```

## 🔧 6. Back-office - Dashboard admin

```
┌────────────────────────────────────────────────────────┐
│ Header admin (logo + admin name + logout)             │
├────────────────────────────────────────────────────────┤
│ ┌────────────┐ ┌─────────────────────────────────────┐│
│ │ ADMIN      │ │ Vue d'ensemble                      ││
│ │            │ │                                     ││
│ │ 📊 Dashbo. │ │ ┌────┐ ┌────┐ ┌────┐ ┌────┐       ││
│ │ 📋 Résa.   │ │ │125 │ │45  │ │12k │ │+23%│       ││
│ │ 💰 Paiem.  │ │ │Resa│ │Pend│ │CA  │ │Conv│       ││
│ │ 🎫 Offres  │ │ └────┘ └────┘ └────┘ └────┘       ││
│ │ 👥 Clients │ │                                     ││
│ │ 📝 Blog    │ │ [Graphique ventes 30 jours]         ││
│ │ 🌍 Destin. │ │                                     ││
│ │ 🎟️ Promos  │ │ ACTIONS REQUISES                    ││
│ │ 📄 Pages   │ │ • 5 paiements à valider             ││
│ │ ⚙️  Param.  │ │ • 3 réservations en attente         ││
│ │ 👤 Users   │ │ • 2 avis à modérer                  ││
│ │            │ │                                     ││
│ └────────────┘ │ TOP OFFRES                          ││
│                │ [Tableau top 5 par ventes]          ││
│                │                                     ││
│                │ DERNIÈRES RÉSERVATIONS              ││
│                │ [Tableau dernières 10]              ││
│                └─────────────────────────────────────┘│
└────────────────────────────────────────────────────────┘
```

## 📱 Patterns mobile spécifiques

### Bottom navigation
```
┌──────────────────────┐
│                      │
│      CONTENT         │
│                      │
├──────────────────────┤
│ 🏠   🔍   ❤️   👤   │ ← Bottom nav
└──────────────────────┘
```

### Bottom sheet (filtres)
```
┌──────────────────────┐
│      CONTENT         │
│      (masqué)        │
│                      │
│                      │
├──────────────────────┤
│ ━━                   │ ← Handle
│ FILTRES              │
│                      │
│ [Filters content]    │
│                      │
│ [Appliquer]          │
└──────────────────────┘
```

### Sticky CTA fiche produit
```
┌──────────────────────┐
│      CONTENT         │
│                      │
│                      │
├──────────────────────┤
│ 85 000 DZD/pers      │
│ [💳 Réserver]        │ ← Toujours visible
└──────────────────────┘
```

## 🎬 Interactions clés

### Recherche avec autocomplete
1. User tape "ist"
2. Dropdown apparaît avec suggestions
3. Highlight des matches en bold
4. Icons par type (✈️ aéroport, 🏙️ ville)
5. Click → remplit le champ

### Filtres en temps réel
1. User coche un filtre
2. Skeleton apparaît brièvement
3. Résultats se mettent à jour
4. Compteur change
5. URL se met à jour (pour partage)

### Galerie photo
1. Click sur photo principale
2. Lightbox s'ouvre en fondu
3. Swipe ou flèches pour naviguer
4. Compteur "3/15"
5. Esc ou click hors → fermer

### Tunnel de réservation
1. Sauvegarde auto à chaque étape
2. Possibilité de revenir en arrière
3. Validation inline des champs
4. Récap toujours visible (sticky)
5. Loading states pendant paiement
