# 🤖 INSTRUCTIONS POUR CLAUDE CODE - LIRE EN PREMIER

## Mission

Développer une plateforme web B2C d'agence de voyages pour le marché algérien, de manière autonome, en suivant les spécifications de ce package.

## Principes directeurs

### 1. Approche méthodique
- Suis la roadmap par sprints (`09_development_roadmap.md`)
- Termine un sprint avant de passer au suivant
- Teste chaque fonctionnalité avant de la valider

### 2. Qualité du code
- TypeScript strict mode partout
- Composants React fonctionnels avec hooks
- Nommage explicite en français pour le métier (réservation, voyageur, offre) et anglais pour la technique (handleSubmit, useEffect)
- Comments JSDoc sur les fonctions complexes
- Tests unitaires pour la logique métier critique

### 3. Design moderne
- Suis STRICTEMENT le design system (`04_design_system.md`)
- Mobile-first : développe d'abord pour mobile, puis adapte
- Animations subtiles avec Framer Motion (jamais agressives)
- Espaces blancs généreux
- Photos haute qualité (utiliser Unsplash via API pour le dev)

### 4. Architecture
- Server Components par défaut (Next.js App Router)
- Client Components seulement si interactivité nécessaire
- Suspense + streaming pour les chargements
- Optimistic UI pour les actions utilisateur

### 5. Performance
- Images optimisées avec next/image
- Lazy loading systématique
- Code splitting automatique
- Lighthouse score > 90 sur mobile

## Workflow recommandé

### Phase 0 : Setup (1 jour)
```bash
1. Lire tous les documents du package
2. Créer le projet Next.js avec TypeScript
3. Installer toutes les dépendances listées dans 06_project_structure.md
4. Configurer Firebase (projet, Firestore, Auth, Storage)
5. Configurer Tailwind avec le design system
6. Setup shadcn/ui
7. Configurer ESLint + Prettier
8. Premier commit
```

### Phase 1 : Foundation (Sprint 1-2)
```bash
1. Layouts principaux (public, client, admin)
2. Navigation et footer
3. Page d'accueil statique
4. Système d'authentification Firebase
5. Routes protégées
```

### Phase 2 : Core Features (Sprint 3-6)
```bash
1. Catalogue d'offres (vitrine)
2. Page de détail offre
3. Tunnel de réservation
4. Espace client
5. Intégration paiement SATIM (mock d'abord, vrai ensuite)
```

### Phase 3 : Back-Office (Sprint 7-9)
```bash
1. Dashboard admin
2. Gestion des offres CRUD
3. Gestion des réservations
4. Gestion des clients
5. Gestion du contenu
```

### Phase 4 : Polish (Sprint 10)
```bash
1. Tests end-to-end
2. Optimisations performance
3. SEO
4. Documentation
5. Déploiement
```

## Règles de design CRITIQUES

### Couleurs
- **JAMAIS** d'autres couleurs que celles du design system
- **TOUJOURS** vérifier le contraste WCAG AA minimum
- Mode sombre prévu mais en phase 2

### Typographie
- **Inter** pour tout sauf les grands titres marketing
- **Playfair Display** pour les titres éditoriaux (hero, blog)
- Tailles : utiliser UNIQUEMENT l'échelle définie

### Espacements
- Utiliser le système 4px (4, 8, 12, 16, 24, 32, 48, 64, 96)
- JAMAIS de valeurs arbitraires

### Composants
- Utiliser shadcn/ui en priorité
- Customiser seulement si nécessaire
- Composants custom dans `/components/ui/custom/`

## Conventions de code

### Structure des fichiers
```
components/
  ui/              # Composants shadcn et primitives
  layout/          # Header, Footer, Sidebar
  offers/          # Composants spécifiques aux offres
  booking/         # Composants de réservation
  shared/          # Composants partagés
```

### Naming
- Composants : `PascalCase.tsx` (ex: `OfferCard.tsx`)
- Hooks : `useCamelCase.ts` (ex: `useAuth.ts`)
- Utils : `camelCase.ts` (ex: `formatPrice.ts`)
- Types : `PascalCase` dans fichiers `.types.ts`
- Constants : `UPPER_SNAKE_CASE`

### Imports
```typescript
// 1. React
import { useState, useEffect } from 'react';

// 2. External libraries
import { motion } from 'framer-motion';
import { z } from 'zod';

// 3. Internal absolute
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

// 4. Internal relative
import { OfferCard } from './OfferCard';

// 5. Types
import type { Offer } from '@/types/offer.types';
```

## Gestion des erreurs

### Frontend
- Toujours utiliser `try/catch` pour les async
- Afficher des toasts via `sonner` pour les erreurs utilisateur
- Logger les erreurs critiques

### Firestore
- Vérifier les règles de sécurité avant chaque écriture
- Utiliser des transactions pour les opérations atomiques
- Gérer les cas hors-ligne avec la persistence Firestore

## Sécurité

### Règles Firestore
- Par défaut : tout est interdit
- Lecture publique : seulement offres publiées
- Écriture : authentification obligatoire
- Admin : custom claims `role: 'admin'`

### Validation
- Toujours valider côté client (Zod) ET serveur (Cloud Functions)
- Jamais faire confiance aux données utilisateur
- Sanitiser les inputs (XSS)

### Secrets
- Variables d'environnement dans `.env.local`
- JAMAIS commit de `.env`
- Secrets Firebase via Cloud Functions config

## Tests

### Priorités
1. **Logique métier** : calculs de prix, validations, règles
2. **Composants critiques** : tunnel de réservation, paiement
3. **Hooks custom** : useAuth, useReservation
4. **APIs** : Cloud Functions

### Outils
- Vitest pour unit tests
- Playwright pour E2E
- React Testing Library

## Déploiement

### Environnements
- `local` : développement
- `staging` : Firebase preview channel
- `production` : Firebase hosting

### CI/CD
- GitHub Actions ou Firebase App Distribution
- Tests automatiques avant deploy
- Preview deploy sur chaque PR

## Communication avec l'utilisateur

Si tu rencontres une ambiguïté :
1. Vérifie d'abord dans toutes les specs
2. Propose 2-3 options au lieu de demander des questions ouvertes
3. Documente ta décision dans un commentaire

Si tu termines une phase :
1. Résume ce qui a été fait
2. Montre les écrans/composants créés
3. Liste les prochaines étapes
4. Demande validation avant de continuer

## Quand tu commences

```
1. Lis README.md
2. Lis ce fichier (00_START_HERE.md)
3. Lis 01_cahier_des_charges.md
4. Lis 02_architecture.md
5. Lis 04_design_system.md (CRUCIAL)
6. Lis 06_project_structure.md
7. Commence par "Phase 0 : Setup"
```

**Bonne chance ! 🚀**
