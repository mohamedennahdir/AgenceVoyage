# 📋 Cahier des charges - Plateforme Agence de Voyages B2C

## 1. Présentation du projet

### 1.1 Contexte
Plateforme web B2C destinée à commercialiser en ligne des produits de voyage à destination du marché algérien : billets d'avion, réservations hôtelières, voyages organisés et circuits, packages Omra et Hajj.

### 1.2 Objectifs
- Digitaliser l'activité commerciale et étendre la zone de chalandise
- Offrir une expérience de réservation moderne adaptée aux Algériens
- Automatiser les réservations simples
- Centraliser la gestion dans un back-office unique
- Permettre le paiement en ligne via SATIM
- Construire une marque digitale de confiance

### 1.3 Cibles
- **Voyageurs algériens** : réservation depuis l'Algérie
- **Diaspora algérienne** : voyages depuis/vers l'Algérie
- **Agents internes** : gestion via back-office

## 2. Périmètre fonctionnel MVP

### 2.1 Site public

**Page d'accueil**
- Hero avec moteur de recherche multi-produits
- Offres phares et promotions
- Destinations populaires
- Sections de réassurance (avis, agréments)
- Newsletter et CTA WhatsApp

**Recherche**
- Multi-critères : destination, dates, voyageurs, type
- Filtres dynamiques avancés
- Tri intelligent
- Sauvegarde des recherches

**Fiche offre**
- Galerie immersive
- Programme détaillé
- Calendrier de prix
- Avis vérifiés
- CTA réservation et WhatsApp

**Pages éditoriales**
- À propos
- Omra/Hajj dédiée
- Blog destinations
- FAQ
- Pages légales

### 2.2 Espace client

**Authentification**
- Inscription email + validation
- Login email/password
- Login social (Google, Facebook)
- Récupération mot de passe
- Validation SMS pour réservations

**Dashboard client**
- Vue d'ensemble
- Mes réservations (avec statuts)
- Détails réservation + documents
- Favoris
- Mes voyageurs (carnet famille)
- Profil et préférences

### 2.3 Tunnel de réservation

1. Sélection offre + options
2. Saisie voyageurs
3. Récapitulatif et CGV
4. Choix paiement
5. Paiement effectif
6. Confirmation

**Modes de paiement**
- CIB via SATIM (immédiat)
- Edahabia via SATIM (immédiat)
- Paiement en agence (48-72h)
- Virement bancaire (validation manuelle)

### 2.4 Back-office

**Dashboard**
- KPIs : ventes, panier moyen, conversion
- Graphiques tendances
- Top destinations/offres
- Alertes et actions requises

**Catalogue**
- CRUD complet des offres
- Types : vol sec, hôtel, package, circuit, Omra, Hajj
- Gestion stocks/disponibilités
- Suppléments optionnels
- Mise en avant

**Réservations**
- Liste filtrable
- Détails + historique
- Actions : confirmer, annuler, modifier, rembourser
- Édition factures conformes Algérie
- Édition vouchers et billets

**Clients**
- CRM léger
- Historique et valeur
- Segmentation
- Export

**Paiements**
- Réconciliation SATIM
- Enregistrement manuel
- Export comptable

**Contenu**
- Pages éditoriales
- Blog
- Home configuration
- Destinations

**Utilisateurs internes**
- Rôles et permissions
- Audit log

## 3. Exigences non fonctionnelles

### 3.1 Performance
- Chargement page < 2s en 4G
- Recherche < 3s
- Lighthouse mobile > 80
- 500 utilisateurs simultanés

### 3.2 Sécurité
- HTTPS partout
- Conformité PCI-DSS (déléguée SATIM)
- Chiffrement données sensibles
- Protection OWASP Top 10
- 2FA pour admin
- Conformité loi 18-07 Algérie
- Sauvegardes quotidiennes

### 3.3 Compatibilité
- Navigateurs : 2 dernières versions Chrome/Firefox/Safari/Edge
- Responsive total
- Mobile-first
- Optimisé 3G/4G algérien

### 3.4 SEO
- URLs propres
- Meta gérables admin
- Sitemap auto
- Schema.org
- SSR pour indexation

## 4. Architecture technique

### 4.1 Frontend
- Next.js 14 (App Router)
- TypeScript strict
- Tailwind CSS + shadcn/ui
- Framer Motion
- React Hook Form + Zod
- Zustand

### 4.2 Backend
- Firebase (Firestore, Auth, Storage, Functions)
- Firebase Hosting
- Cloud Functions pour logique métier

### 4.3 Backend SATIM dédié
- Node.js + Express + TypeScript
- VPS Hetzner (Europe)
- Réceptionne callbacks SATIM
- Génère factures conformes

### 4.4 Services externes
- SATIM (paiement)
- Brevo (email)
- Twilio/SMS local
- WhatsApp Business API
- Google Maps
- Unsplash (dev) / Cloudinary (prod)

## 5. Contraintes légales Algérie

### 5.1 Licences
- Licence agence catégorie A (Ministère Tourisme)
- Agrément Omra/Hajj (Ministère Affaires Religieuses)

### 5.2 Loi 18-07 (Protection données)
- Politique confidentialité claire
- Consentement explicite
- Droits accès/modification/suppression
- Déclaration ANPDP

### 5.3 Facturation
- NIF, NIS, RC sur factures
- Numérotation séquentielle
- TVA selon nature
- Archivage 10 ans

### 5.4 CGV
- Rédaction avocat spécialisé
- Conditions annulation
- Modalités remboursement
- Droit applicable

## 6. Planning

| Phase | Durée | Livrables |
|-------|-------|-----------|
| Setup et design | 3 sem | Maquettes, charte |
| MVP développement | 12 sem | Site + back-office |
| Recette | 2 sem | Tests, corrections |
| Lancement | 1 sem | Production |
| Phase 2 (GDS, mobile) | 12 sem | Extensions |

## 7. Critères d'acceptation

✅ Toutes fonctionnalités Phase 1 opérationnelles  
✅ Performance validée (Lighthouse > 80)  
✅ Sécurité validée (audit)  
✅ Formation agents réalisée  
✅ Documentation complète  
✅ Réservation E2E réussie  
✅ Paiement SATIM fonctionnel  
✅ Back-office utilisable par non-tech
