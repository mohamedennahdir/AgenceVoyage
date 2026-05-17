# Plateforme Agence de Voyages B2C - Algérie

## 🎯 Vue d'ensemble

Plateforme web B2C de réservation de voyages pour le marché algérien, proposant : billets d'avion, hôtels, circuits, packages Omra et Hajj. Paiement en ligne via SATIM (CIB/Edahabia) + paiement en agence.

## 📋 Pour Claude Code - Instructions de démarrage

Lis les documents dans cet ordre :

1. **`prompts/00_START_HERE.md`** - Instructions principales et workflow
2. **`docs/01_cahier_des_charges.md`** - Cahier des charges complet
3. **`specs/02_architecture.md`** - Architecture technique
4. **`specs/03_data_model.md`** - Modèle de données Firestore
5. **`design/04_design_system.md`** - Design system moderne complet
6. **`design/05_wireframes.md`** - Wireframes des écrans clés
7. **`code-structure/06_project_structure.md`** - Structure du projet
8. **`specs/07_user_stories.md`** - User stories détaillées avec critères d'acceptation
9. **`specs/08_api_specifications.md`** - Specifications des APIs
10. **`prompts/09_development_roadmap.md`** - Roadmap de développement par sprints

## 🛠️ Stack technique

- **Frontend** : Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS
- **Backend** : Firebase (Firestore, Auth, Storage, Functions, Hosting)
- **Backend SATIM** : Node.js + Express sur VPS séparé
- **UI** : shadcn/ui, Radix UI, Lucide Icons
- **Animations** : Framer Motion
- **Forms** : React Hook Form + Zod
- **State** : Zustand
- **i18n** : next-intl (français principal, arabe phase 2)

## 🎨 Design

Design moderne avec :
- Palette : bleu profond (#0F4C81), corail accent (#FF6B6B), neutres chauds
- Typo : Inter (UI) + Playfair Display (titres éditoriaux)
- Style : épuré, généreux en espace, photos immersives, micro-interactions
- Inspiré de : Booking, Airbnb, Tripadvisor — adapté au goût méditerranéen

## 🚀 Commandes de démarrage

```bash
# Installation
npm install

# Développement
npm run dev

# Build production
npm run build

# Déploiement Firebase
firebase deploy
```

## 📁 Structure du package

```
voyages-app/
├── README.md                    # Ce fichier
├── docs/                        # Documentation business
│   └── 01_cahier_des_charges.md
├── specs/                       # Spécifications techniques
│   ├── 02_architecture.md
│   ├── 03_data_model.md
│   ├── 07_user_stories.md
│   └── 08_api_specifications.md
├── design/                      # Design system et UX
│   ├── 04_design_system.md
│   └── 05_wireframes.md
├── code-structure/              # Architecture du code
│   └── 06_project_structure.md
├── prompts/                     # Instructions pour Claude Code
│   ├── 00_START_HERE.md
│   └── 09_development_roadmap.md
└── assets/                      # Ressources (logos, exemples)
```

## ⚖️ Contraintes importantes

- Conformité loi 18-07 sur la protection des données (Algérie)
- Licence agence de voyages catégorie A requise
- Agrément Omra/Hajj pour ces produits
- Paiement SATIM obligatoire pour le e-commerce algérien
- Mobile-first (70%+ du trafic algérien est mobile)
- Performance sur 3G/4G parfois instable

## 📞 Support

Ce package est conçu pour permettre à Claude Code de développer l'application de manière autonome. En cas de doute :
1. Consulter d'abord les specs et le design system
2. Suivre les user stories ligne par ligne
3. Respecter la roadmap par sprints
4. Privilégier la simplicité et la lisibilité du code

---

**Version** : 1.0 | **Date** : Mai 2026 | **Marché** : Algérie
