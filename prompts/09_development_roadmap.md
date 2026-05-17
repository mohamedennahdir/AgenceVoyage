# 🗺️ Roadmap de développement

Plan de développement par sprints pour Claude Code. Chaque sprint = 2 semaines de travail.

## Vue d'ensemble

```
Sprint 0  : Setup et infrastructure          (1 sem)
Sprint 1  : Foundation - layouts et auth     (2 sem)
Sprint 2  : Page d'accueil et navigation     (2 sem)
Sprint 3  : Catalogue et recherche           (2 sem)
Sprint 4  : Fiche offre détaillée            (2 sem)
Sprint 5  : Tunnel de réservation            (2 sem)
Sprint 6  : Paiement SATIM                   (2 sem)
Sprint 7  : Espace client                    (2 sem)
Sprint 8  : Back-office partie 1             (2 sem)
Sprint 9  : Back-office partie 2             (2 sem)
Sprint 10 : Polish, SEO, déploiement         (2 sem)
```

**Total : ~21 semaines (5 mois)**

---

## Sprint 0 : Setup (1 semaine)

### Objectifs
Mettre en place toute l'infrastructure de développement.

### Tâches

#### 0.1 Initialisation du projet
```bash
npx create-next-app@latest voyages-frontend \
  --typescript \
  --tailwind \
  --app \
  --src-dir=false \
  --import-alias="@/*" \
  --eslint
```

#### 0.2 Installation des dépendances
Installer toutes les dépendances listées dans `06_project_structure.md`.

#### 0.3 Configuration
- [ ] Configurer `tailwind.config.ts` avec le design system complet
- [ ] Configurer ESLint et Prettier
- [ ] Configurer `tsconfig.json` strict mode
- [ ] Setup `next.config.js` avec images, headers, redirects
- [ ] Créer `.env.local.example`
- [ ] Setup Git avec `.gitignore` complet

#### 0.4 Firebase
- [ ] Créer projet Firebase
- [ ] Activer : Authentication, Firestore, Storage, Functions, Hosting
- [ ] Installer Firebase CLI et init le projet
- [ ] Configurer les règles de sécurité (Firestore + Storage)
- [ ] Créer les index Firestore initiaux

#### 0.5 shadcn/ui
```bash
npx shadcn-ui@latest init
```
Installer les composants de base :
- button, input, label, select, textarea, checkbox, radio-group
- dialog, dropdown-menu, popover, tooltip
- card, badge, separator
- toast (sonner), skeleton
- form, calendar, command (cmdk)
- tabs, accordion

#### 0.6 Structure de fichiers
Créer toute l'arborescence vide selon `06_project_structure.md`.

### Livrables Sprint 0
- ✅ Projet Next.js fonctionnel sur `localhost:3000`
- ✅ Firebase configuré et connecté
- ✅ Tailwind avec design system appliqué
- ✅ Premier commit avec structure complète
- ✅ Page d'accueil basique "Hello World" qui affiche le logo

---

## Sprint 1 : Foundation (2 semaines)

### Objectifs
Mettre en place les layouts, le système d'authentification et les composants UI de base.

### Tâches

#### 1.1 Layouts globaux
- [ ] `app/layout.tsx` : root layout avec providers (TanStack Query, Theme, Toast)
- [ ] `(public)/layout.tsx` : layout public avec Header et Footer
- [ ] `(auth)/layout.tsx` : layout auth centré
- [ ] `(account)/layout.tsx` : layout client avec sidebar
- [ ] `admin/layout.tsx` : layout admin

#### 1.2 Header et navigation
- [ ] Header desktop avec mega-menu
- [ ] Header mobile avec hamburger
- [ ] Logo SVG (placeholder + final)
- [ ] Bouton compte avec dropdown
- [ ] Bouton WhatsApp flottant
- [ ] Bottom navigation mobile

#### 1.3 Footer
- [ ] Footer complet avec liens
- [ ] Section newsletter
- [ ] Réseaux sociaux
- [ ] Mentions légales

#### 1.4 Composants UI réutilisables
Tous les composants `shared/` :
- [ ] `LoadingSpinner`, `Skeleton`
- [ ] `EmptyState`, `ErrorState`
- [ ] `Pagination`
- [ ] `Breadcrumbs`
- [ ] `PriceDisplay`, `DateDisplay`
- [ ] `StarRating`
- [ ] `TrustBadges`
- [ ] `ConfirmDialog`

#### 1.5 Authentification Firebase
- [ ] Configuration Firebase Auth
- [ ] `useAuth` hook
- [ ] Provider `AuthProvider`
- [ ] Page connexion avec formulaire
- [ ] Page inscription avec validation
- [ ] Reset mot de passe
- [ ] Connexion sociale Google + Facebook
- [ ] Middleware Next.js pour routes protégées
- [ ] Cloud Function `onUserCreate`

#### 1.6 i18n
- [ ] Setup next-intl
- [ ] Fichiers `fr.json` et `ar.json` (structure)
- [ ] Composant LanguageSwitcher

### Livrables Sprint 1
- ✅ Header/Footer fonctionnels
- ✅ Pages connexion/inscription opérationnelles
- ✅ Création de compte Firebase fonctionne
- ✅ Routes protégées en place
- ✅ Design system visuellement validé

---

## Sprint 2 : Page d'accueil (2 semaines)

### Objectifs
Créer une page d'accueil moderne et impactante.

### Tâches

#### 2.1 Hero section
- [ ] Background image full-screen avec overlay
- [ ] Titre avec animation reveal (Framer Motion)
- [ ] Moteur de recherche en card flottante

#### 2.2 Moteur de recherche
- [ ] Composant `SearchEngine` avec tabs
- [ ] Tab Vols : destination, dates, voyageurs, classe
- [ ] Tab Hôtels : destination, check-in/out, voyageurs, chambres
- [ ] Tab Packages : destination, dates, voyageurs
- [ ] Tab Omra : période, voyageurs, type
- [ ] Tab Circuits : destination, dates, voyageurs
- [ ] Composant `DestinationPicker` avec autocomplete
- [ ] Composant `DateRangePicker` (react-day-picker)
- [ ] Composant `TravelersSelector` avec +/-

#### 2.3 Sections homepage
- [ ] `PopularDestinations` : grid de 4-8 destinations
- [ ] `FeaturedOffers` : carousel ou grid d'offres en vedette
- [ ] `OmraSection` : section dédiée Omra avec CTA
- [ ] `WhyChooseUs` : 4 arguments avec icons
- [ ] `Testimonials` : carousel d'avis clients
- [ ] `BlogTeaser` : 3 derniers articles
- [ ] `Newsletter` : inscription newsletter

#### 2.4 Animations et micro-interactions
- [ ] Reveal au scroll (Framer Motion)
- [ ] Hover effects sur cards
- [ ] Parallax léger sur hero
- [ ] Skeleton loading sur sections async

#### 2.5 Cloud Functions
- [ ] `subscribeNewsletter` callable

### Livrables Sprint 2
- ✅ Page d'accueil complète et moderne
- ✅ Moteur de recherche fonctionnel (redirige vers /recherche)
- ✅ Performance Lighthouse > 85 mobile
- ✅ Toutes les animations en place

---

## Sprint 3 : Catalogue et recherche (2 semaines)

### Objectifs
Créer le système de recherche et listing d'offres.

### Tâches

#### 3.1 Données de démo
- [ ] Script `scripts/seed-data.ts`
- [ ] Créer 20-30 offres variées (vols, hôtels, packages, Omra, circuits)
- [ ] Photos via Unsplash API
- [ ] 5-10 destinations
- [ ] 5 articles blog

#### 3.2 Page de résultats
- [ ] Route `/recherche` avec searchParams
- [ ] Layout avec sidebar filtres + grille résultats
- [ ] Header avec moteur de recherche compact
- [ ] Compteur de résultats + tri

#### 3.3 Filtres
- [ ] Composant `FiltersSidebar` desktop
- [ ] Composant `FiltersMobile` (bottom sheet)
- [ ] Filtre prix avec slider double
- [ ] Filtre étoiles hôtel
- [ ] Filtre compagnies aériennes
- [ ] Filtre escales
- [ ] Filtre durée
- [ ] Sync URL ↔ filtres
- [ ] Bouton reset

#### 3.4 Tri
- [ ] Dropdown tri
- [ ] Options : Recommandé, Prix ↑, Prix ↓, Durée, Popularité
- [ ] Animation lors du changement

#### 3.5 Cards d'offres
- [ ] Composant `OfferCard` (vertical, mobile)
- [ ] Composant `OfferCardLarge` (horizontal, desktop)
- [ ] Badges promo et statuts
- [ ] Lazy loading des images
- [ ] Hover effects

#### 3.6 Hook et state
- [ ] Hook `useOffers` avec TanStack Query
- [ ] Hook `useSearch`
- [ ] Pagination ou scroll infini

### Livrables Sprint 3
- ✅ Recherche fonctionnelle avec 20+ offres
- ✅ Filtres et tri opérationnels
- ✅ Performance < 3s pour résultats
- ✅ Mobile parfait

---

## Sprint 4 : Fiche offre (2 semaines)

### Objectifs
Page de détail immersive et persuasive.

### Tâches

#### 4.1 Route et SEO
- [ ] Route `/offres/[slug]`
- [ ] Metadata dynamique (titre, description, OG)
- [ ] Schema.org JSON-LD pour rich snippets

#### 4.2 Galerie photos
- [ ] Composant `ImageGallery` desktop (grid)
- [ ] Composant `ImageGallery` mobile (carousel)
- [ ] Lightbox plein écran avec navigation
- [ ] Lazy loading + blur placeholder
- [ ] Préchargement images

#### 4.3 Contenu offre
- [ ] Section infos principales (titre, lieu, étoiles)
- [ ] Section highlights
- [ ] Section programme (tabs jour par jour)
- [ ] Section inclus/non inclus
- [ ] Section conditions
- [ ] Section formalités (visa, vaccins)

#### 4.4 Card de réservation sticky
- [ ] Composant `BookingCard` sticky droite
- [ ] Sélecteur de date avec calendrier de prix
- [ ] Sélecteur voyageurs
- [ ] Calcul prix temps réel
- [ ] Bouton "Réserver" primary
- [ ] Bouton WhatsApp secondary
- [ ] Trust badges
- [ ] Sticky bottom mobile

#### 4.5 Avis et localisation
- [ ] Section avis avec note moyenne
- [ ] Liste paginée des avis
- [ ] Carte Google Maps
- [ ] Marqueurs personnalisés

#### 4.6 Offres similaires
- [ ] Algorithme simple (même destination ou type)
- [ ] Carousel d'offres similaires en bas

#### 4.7 Favoris et partage
- [ ] Bouton favoris (cœur) avec animation
- [ ] Bouton partage avec options
- [ ] Web Share API mobile

### Livrables Sprint 4
- ✅ Page détail complète et immersive
- ✅ Galerie photo fluide
- ✅ Card sticky responsive
- ✅ SEO optimisé

---

## Sprint 5 : Tunnel de réservation (2 semaines)

### Objectifs
Tunnel fluide et rassurant qui convertit.

### Tâches

#### 5.1 Architecture du tunnel
- [ ] Layout `(booking)/layout.tsx` avec stepper
- [ ] Store Zustand `bookingStore` pour state cross-pages
- [ ] Persistence localStorage (récupération si abandon)
- [ ] Composant `BookingStepper` visuel
- [ ] Composant `PriceBreakdown` (récap latéral sticky)

#### 5.2 Étape 1 : Options
- [ ] Route `/reservation/[offerId]/options`
- [ ] Sélection date départ
- [ ] Sélection voyageurs
- [ ] Liste suppléments avec checkboxes
- [ ] Champ code promo + validation
- [ ] Bouton "Continuer"

#### 5.3 Étape 2 : Voyageurs
- [ ] Route `/reservation/[offerId]/voyageurs`
- [ ] Formulaire dynamique selon nb voyageurs
- [ ] Composant `TravelerForm` réutilisable
- [ ] Validation Zod stricte
- [ ] Import depuis "Mes voyageurs"
- [ ] Option "Sauvegarder dans le carnet"

#### 5.4 Étape 3 : Récap
- [ ] Route `/reservation/[offerId]/recap`
- [ ] Récap complet avec toutes les infos
- [ ] Liens "Modifier" pour chaque section
- [ ] Checkbox CGV obligatoire
- [ ] Modal CGV

#### 5.5 Étape 4 : Paiement
- [ ] Route `/reservation/[offerId]/paiement`
- [ ] 4 options de paiement avec cards
- [ ] Composant `PaymentMethodCard`
- [ ] Pour paiement agence : confirmation + délai
- [ ] Pour virement : affichage RIB

#### 5.6 Cloud Functions
- [ ] `createBooking` callable
- [ ] `applyPromoCode` callable

### Livrables Sprint 5
- ✅ Tunnel complet fonctionnel (sans paiement réel)
- ✅ Création de réservation Firestore
- ✅ Validation à chaque étape
- ✅ Récupération en cas d'abandon

---

## Sprint 6 : Paiement SATIM (2 semaines)

### Objectifs
Intégration complète du paiement en ligne.

### Tâches

#### 6.1 Setup mini-backend
- [ ] Initialiser le projet Node.js + Express + TypeScript
- [ ] Configuration ESLint + Prettier
- [ ] Setup Firebase Admin SDK
- [ ] Middleware d'authentification
- [ ] Middleware rate limiting
- [ ] Middleware error handling
- [ ] Logger Winston
- [ ] Health endpoint

#### 6.2 Intégration SATIM
- [ ] Service `satim.service.ts`
- [ ] `POST /api/payments/init` : registerOrder
- [ ] `POST /api/payments/satim/callback` : vérification
- [ ] `GET /api/payments/:id/status` : statut
- [ ] Gestion des erreurs SATIM
- [ ] Mode test vs production

#### 6.3 Frontend paiement
- [ ] Click "Confirmer et payer" appelle backend
- [ ] Redirection vers SATIM
- [ ] Page de retour `/reservation/[id]/confirmation`
- [ ] Page d'échec `/reservation/echec`
- [ ] Animations de succès

#### 6.4 Génération facture
- [ ] Service `invoice.service.ts` avec PDFKit
- [ ] Template facture conforme Algérie
- [ ] Upload Cloud Storage
- [ ] Route `GET /api/invoices/:bookingId`
- [ ] QR code sur facture

#### 6.5 Voucher PDF
- [ ] Génération voucher PDF
- [ ] Template avec QR + programme
- [ ] Téléchargement depuis espace client

#### 6.6 Emails et notifications
- [ ] Setup Brevo
- [ ] Templates emails (HTML)
- [ ] Service `email.service.ts`
- [ ] Trigger `onBookingStatusChange` envoie emails
- [ ] SMS confirmation via fournisseur algérien

### Livrables Sprint 6
- ✅ Paiement SATIM fonctionnel (test mode)
- ✅ Facture PDF générée et téléchargeable
- ✅ Emails de confirmation envoyés
- ✅ Tunnel E2E complet et opérationnel

---

## Sprint 7 : Espace client (2 semaines)

### Objectifs
Espace client complet et utile.

### Tâches

#### 7.1 Dashboard
- [ ] Route `/compte` avec stats
- [ ] Card "Prochain voyage" avec countdown
- [ ] Stats : nb voyages, total, favoris
- [ ] Liste 3 dernières réservations
- [ ] Suggestions personnalisées

#### 7.2 Réservations
- [ ] Route `/compte/reservations` avec tabs
- [ ] Filtres : Toutes, À venir, Passées, Annulées
- [ ] Cards par réservation
- [ ] Route `/compte/reservations/[id]` détail
- [ ] Timeline historique
- [ ] Documents téléchargeables
- [ ] Action annulation avec confirmation

#### 7.3 Favoris
- [ ] Route `/compte/favoris`
- [ ] Liste avec retrait
- [ ] Filtres par type

#### 7.4 Voyageurs
- [ ] Route `/compte/voyageurs`
- [ ] CRUD complet
- [ ] Modal d'édition

#### 7.5 Profil
- [ ] Route `/compte/profil`
- [ ] Édition infos personnelles
- [ ] Upload avatar
- [ ] Changement mot de passe
- [ ] Suppression de compte

#### 7.6 Notifications
- [ ] Route `/compte/notifications`
- [ ] Liste avec read/unread
- [ ] Marquage comme lu
- [ ] Compteur dans header

#### 7.7 Cloud Functions
- [ ] `cancelBooking` callable
- [ ] `onBookingCreate` trigger (notifications)
- [ ] `travelReminders` scheduled

### Livrables Sprint 7
- ✅ Espace client complet
- ✅ Toutes les actions utilisateur OK
- ✅ Documents accessibles et téléchargeables

---

## Sprint 8 : Back-office partie 1 (2 semaines)

### Objectifs
Dashboard admin et gestion des offres.

### Tâches

#### 8.1 Sécurité admin
- [ ] Custom claims Firebase Auth (role: admin/agent)
- [ ] Middleware vérification rôle
- [ ] Page d'erreur si non autorisé

#### 8.2 Dashboard admin
- [ ] Route `/admin` avec stats temps réel
- [ ] Composant `StatsCards`
- [ ] Graphique ventes 30j (Recharts)
- [ ] Liste actions requises
- [ ] Top offres et destinations
- [ ] Dernières réservations

#### 8.3 Gestion offres
- [ ] Route `/admin/offres` avec liste
- [ ] Filtres : type, statut, destination
- [ ] Table avec actions
- [ ] Recherche par titre

#### 8.4 Création/édition offre
- [ ] Route `/admin/offres/nouvelle`
- [ ] Formulaire multi-sections (collapse)
- [ ] Section infos générales
- [ ] Section description (markdown editor)
- [ ] Section médias (upload multiple)
- [ ] Section programme jour par jour
- [ ] Section prix et disponibilités
- [ ] Section suppléments
- [ ] Section SEO
- [ ] Prévisualisation
- [ ] Sauvegarde brouillon

#### 8.5 Upload d'images
- [ ] Composant `ImagesUploader` drag&drop
- [ ] Génération thumbnails (Cloud Function)
- [ ] Compression et conversion WebP
- [ ] Réorganisation par drag

### Livrables Sprint 8
- ✅ Dashboard admin fonctionnel
- ✅ CRUD complet sur offres
- ✅ Upload images opérationnel

---

## Sprint 9 : Back-office partie 2 (2 semaines)

### Objectifs
Gestion réservations, clients, contenu.

### Tâches

#### 9.1 Gestion réservations
- [ ] Route `/admin/reservations`
- [ ] Filtres avancés
- [ ] Recherche multi-critères
- [ ] Détail avec timeline
- [ ] Actions : confirmer, annuler, modifier
- [ ] Validation paiement en agence
- [ ] Génération facture manuelle
- [ ] Renvoi documents
- [ ] Notes internes

#### 9.2 Gestion paiements
- [ ] Route `/admin/paiements`
- [ ] Liste transactions
- [ ] Réconciliation
- [ ] Enregistrement manuel
- [ ] Export CSV pour compta

#### 9.3 Gestion clients
- [ ] Route `/admin/clients`
- [ ] Liste avec recherche
- [ ] Fiche client détaillée
- [ ] Tags et segments
- [ ] Export CSV

#### 9.4 CMS
- [ ] Route `/admin/pages` : édition pages éditoriales
- [ ] Route `/admin/blog` : CRUD articles
- [ ] Route `/admin/destinations` : CRUD destinations
- [ ] Configuration homepage

#### 9.5 Promotions
- [ ] Route `/admin/promos`
- [ ] CRUD codes promo
- [ ] Stats utilisation

#### 9.6 Utilisateurs internes
- [ ] Route `/admin/utilisateurs`
- [ ] CRUD agents et admins
- [ ] Attribution rôles

#### 9.7 Audit
- [ ] Route `/admin/audit`
- [ ] Liste actions sensibles
- [ ] Filtres et recherche

### Livrables Sprint 9
- ✅ Back-office complet et fonctionnel
- ✅ Tous les workflows admin couverts
- ✅ Utilisable par non-tech

---

## Sprint 10 : Polish et déploiement (2 semaines)

### Objectifs
Finalisation, optimisation, mise en production.

### Tâches

#### 10.1 SEO
- [ ] Metadata sur toutes les pages
- [ ] Sitemap dynamique
- [ ] Robots.txt
- [ ] Schema.org partout
- [ ] Open Graph et Twitter Cards
- [ ] Performance Lighthouse > 90

#### 10.2 Performance
- [ ] Audit Lighthouse de toutes les pages
- [ ] Optimisation images
- [ ] Lazy loading
- [ ] Code splitting
- [ ] Suppression code mort
- [ ] Compression assets

#### 10.3 Tests
- [ ] Tests unitaires des fonctions critiques
- [ ] Tests E2E des parcours principaux
- [ ] Tests responsive sur vraies devices
- [ ] Tests d'accessibilité (axe-core)

#### 10.4 Sécurité
- [ ] Audit sécurité (OWASP)
- [ ] Test des règles Firestore
- [ ] Vérification CSP
- [ ] Test rate limiting

#### 10.5 Documentation
- [ ] README développeurs
- [ ] Manuel utilisateur admin
- [ ] Vidéos tutoriels (Loom)
- [ ] Documentation API (Swagger)

#### 10.6 Déploiement
- [ ] Setup staging environment
- [ ] CI/CD avec GitHub Actions
- [ ] Configuration domaine
- [ ] SSL en place
- [ ] Monitoring (Sentry)
- [ ] Backup automatique
- [ ] Plan de rollback

#### 10.7 Formation
- [ ] Session formation agents
- [ ] FAQ admin
- [ ] Support post-lancement

### Livrables Sprint 10
- ✅ Application en production
- ✅ Performance et SEO optimisés
- ✅ Documentation complète
- ✅ Équipe formée
- ✅ Monitoring en place

---

## 📊 Suivi de progression

À chaque fin de sprint, Claude Code doit produire :

1. **Récap des fonctionnalités livrées**
2. **Captures d'écran des nouvelles pages**
3. **Liste des bugs connus**
4. **Métriques techniques** : performance, coverage tests
5. **Plan du prochain sprint**

## 🎯 Critères de succès finaux

À la fin du sprint 10, le projet doit :

- ✅ Toutes les fonctionnalités du MVP opérationnelles
- ✅ Lighthouse mobile > 90 sur toutes les pages clés
- ✅ Tests E2E des parcours critiques OK
- ✅ Sécurité auditée
- ✅ Documentation complète
- ✅ Déployé en production
- ✅ Équipe formée et autonome

## 🚀 Phase 2 (post-MVP)

Après le lancement et la stabilisation (1-2 mois), démarrer la Phase 2 :

- Intégration GDS (Amadeus) pour vols temps réel
- Intégration Hotelbeds pour catalogue mondial
- Application mobile React Native
- Multilingue arabe complet (RTL)
- Programme de fidélité
- Marketing automation
- A/B testing
- IA pour recommandations personnalisées
