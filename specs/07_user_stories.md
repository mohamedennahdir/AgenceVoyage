# 📝 User Stories

Histoires utilisateur avec critères d'acceptation détaillés pour le développement.

## Format

```
US-XXX : Titre
En tant que [rôle]
Je veux [action]
Afin de [bénéfice]

Critères d'acceptation :
✅ Critère 1
✅ Critère 2
```

---

## 🏠 EPIC 1 : Page d'accueil et navigation

### US-001 : Découverte de la plateforme
**En tant que** visiteur  
**Je veux** voir une page d'accueil attrayante  
**Afin de** comprendre rapidement ce qu'offre le site

**Critères d'acceptation :**
- ✅ Header avec logo, navigation principale, login/compte
- ✅ Hero image plein écran avec titre marketing
- ✅ Moteur de recherche visible immédiatement
- ✅ Au moins 4 destinations populaires affichées
- ✅ Au moins 6 offres phares affichées
- ✅ Section dédiée Omra/Hajj
- ✅ Section "Pourquoi nous choisir" avec 4 arguments
- ✅ Témoignages clients (au moins 3)
- ✅ Footer complet avec tous les liens légaux
- ✅ Chargement < 2s en 4G
- ✅ Responsive parfait mobile/tablette/desktop

### US-002 : Navigation par catégories
**En tant que** visiteur  
**Je veux** naviguer par type de voyage  
**Afin de** trouver rapidement ce qui m'intéresse

**Critères d'acceptation :**
- ✅ Menu principal : Vols, Hôtels, Omra, Circuits, Blog
- ✅ Mega-menu au survol avec sous-catégories sur desktop
- ✅ Menu hamburger sur mobile avec animation
- ✅ Indicateur visuel de la page active
- ✅ Breadcrumbs sur toutes les pages internes

### US-003 : Bouton WhatsApp flottant
**En tant que** visiteur  
**Je veux** contacter facilement l'agence  
**Afin de** poser des questions en direct

**Critères d'acceptation :**
- ✅ Bouton WhatsApp flottant en bas à droite
- ✅ Visible sur toutes les pages
- ✅ Animation pulse pour attirer l'attention
- ✅ Tooltip "Discuter avec un conseiller"
- ✅ Click ouvre WhatsApp avec message pré-rempli
- ✅ Sur mobile : utilise l'app native si installée

---

## 🔍 EPIC 2 : Recherche d'offres

### US-010 : Recherche par destination
**En tant que** visiteur  
**Je veux** rechercher par destination  
**Afin de** trouver les offres pour un lieu précis

**Critères d'acceptation :**
- ✅ Champ avec autocomplete dès 2 caractères
- ✅ Suggestions de villes et aéroports (top 50)
- ✅ Icons différents : ✈️ aéroport, 🏙️ ville
- ✅ Highlight des matches en bold
- ✅ Navigation au clavier (flèches + Enter)
- ✅ Récents stockés en localStorage
- ✅ "Destinations populaires" si champ vide

### US-011 : Sélection des dates
**En tant que** visiteur  
**Je veux** choisir mes dates de voyage  
**Afin de** voir les offres disponibles

**Critères d'acceptation :**
- ✅ Date picker avec 2 mois visibles côte à côte (desktop)
- ✅ Date picker plein écran sur mobile
- ✅ Sélection range (départ + retour)
- ✅ Affichage des prix par jour si offre disponible
- ✅ Dates passées grisées
- ✅ Boutons rapides : "Ce week-end", "Semaine pro", "Mois prochain"
- ✅ Validation : retour ≥ départ + 1

### US-012 : Sélection des voyageurs
**En tant que** visiteur  
**Je veux** indiquer le nombre de voyageurs  
**Afin de** voir des offres adaptées

**Critères d'acceptation :**
- ✅ Sélecteur avec catégories : Adultes (18+), Enfants (2-11), Bébés (0-2)
- ✅ Boutons +/- pour chaque catégorie
- ✅ Min 1 adulte, max 9 personnes total
- ✅ Validation : 1 bébé max par adulte
- ✅ Texte indicatif : "2 adultes, 1 enfant"
- ✅ Fermeture du dropdown au click extérieur

### US-013 : Résultats de recherche
**En tant que** visiteur  
**Je veux** voir les résultats de ma recherche  
**Afin de** comparer les offres

**Critères d'acceptation :**
- ✅ Cartes d'offres avec photo, titre, prix, durée, étoiles
- ✅ Compteur de résultats en haut
- ✅ Pagination (20 résultats par page) ou scroll infini
- ✅ Skeleton loaders pendant chargement
- ✅ Etat vide stylisé si 0 résultats
- ✅ URL avec paramètres pour partage et back/forward

### US-014 : Filtres avancés
**En tant que** visiteur  
**Je veux** filtrer les résultats  
**Afin de** trouver l'offre parfaite

**Critères d'acceptation :**
- ✅ Sidebar filtres sur desktop (sticky)
- ✅ Bottom sheet sur mobile
- ✅ Filtres : prix (range), durée, étoiles hôtel, compagnies, escales
- ✅ Compteurs entre parenthèses
- ✅ Bouton "Réinitialiser" bien visible
- ✅ Mise à jour temps réel des résultats
- ✅ URL synchronisée avec les filtres

### US-015 : Tri des résultats
**En tant que** visiteur  
**Je veux** trier les résultats  
**Afin de** voir les meilleures offres en premier

**Critères d'acceptation :**
- ✅ Dropdown avec options : Prix ↑, Prix ↓, Durée, Popularité, Recommandé
- ✅ Tri par défaut : Recommandé
- ✅ Animation lors du changement
- ✅ Persistance du choix pour la session

---

## 📄 EPIC 3 : Fiche détail d'offre

### US-020 : Consultation de l'offre
**En tant que** visiteur  
**Je veux** voir tous les détails d'une offre  
**Afin de** prendre une décision éclairée

**Critères d'acceptation :**
- ✅ Galerie photos avec photo principale + grid
- ✅ Lightbox au clic, navigation clavier + swipe
- ✅ Titre, lieu, étoiles, nombre d'avis
- ✅ Highlights en bullet points
- ✅ Programme détaillé jour par jour (si applicable)
- ✅ Tabs ou accordéon pour Inclus/Non inclus
- ✅ Carte Google Maps de la destination
- ✅ Section avis avec note moyenne et 5 derniers avis
- ✅ Formalités (visa, vaccins) si applicable
- ✅ Offres similaires en bas

### US-021 : Card de réservation sticky
**En tant que** visiteur  
**Je veux** voir le prix et CTAs toujours visibles  
**Afin de** réserver facilement

**Critères d'acceptation :**
- ✅ Card sticky à droite sur desktop
- ✅ Sticky bottom sur mobile avec prix + CTA
- ✅ Sélecteur date avec calendrier de prix
- ✅ Sélecteur voyageurs
- ✅ Recalcul prix en temps réel
- ✅ Bouton "Réserver" primary
- ✅ Bouton WhatsApp secondary
- ✅ Trust badges : annulation gratuite, paiement sécurisé, support 24/7

### US-022 : Ajout aux favoris
**En tant que** utilisateur connecté  
**Je veux** ajouter une offre aux favoris  
**Afin de** la retrouver plus tard

**Critères d'acceptation :**
- ✅ Bouton cœur en haut à droite de la fiche
- ✅ Animation au click (cœur qui se remplit)
- ✅ Toast de confirmation
- ✅ Si non connecté : modal de connexion
- ✅ Synchronisation Firestore
- ✅ Compteur de favoris dans le header

### US-023 : Partage d'offre
**En tant que** visiteur  
**Je veux** partager une offre  
**Afin de** la montrer à mes proches

**Critères d'acceptation :**
- ✅ Bouton partage sur la fiche
- ✅ Options : WhatsApp, Facebook, copier le lien
- ✅ Web Share API sur mobile
- ✅ Open Graph tags pour preview riche

---

## 🛒 EPIC 4 : Tunnel de réservation

### US-030 : Démarrage de réservation
**En tant que** utilisateur  
**Je veux** lancer une réservation  
**Afin de** commencer le processus

**Critères d'acceptation :**
- ✅ Click sur "Réserver" → /reservation/[offerId]/options
- ✅ Stepper visuel en haut (4 étapes)
- ✅ Récap commande à droite (sticky)
- ✅ Sauvegarde automatique du state dans Zustand
- ✅ Possibilité de revenir en arrière sans perte
- ✅ Authentification requise (redirect login si pas connecté)

### US-031 : Étape options
**En tant qu'** utilisateur  
**Je veux** choisir mes options  
**Afin de** personnaliser ma réservation

**Critères d'acceptation :**
- ✅ Sélection date de départ (calendrier)
- ✅ Sélection voyageurs (adultes/enfants/bébés)
- ✅ Liste des suppléments avec prix
- ✅ Champ code promo avec validation
- ✅ Récap mis à jour en temps réel
- ✅ Bouton "Continuer" disabled si invalide
- ✅ Message d'erreur clair si problème

### US-032 : Étape voyageurs
**En tant qu'** utilisateur  
**Je veux** renseigner les voyageurs  
**Afin de** que l'agence émette les billets

**Critères d'acceptation :**
- ✅ Formulaire par voyageur (autant que sélectionné)
- ✅ Premier voyageur = contact principal
- ✅ Champs : civilité, prénom, nom, naissance, nationalité
- ✅ Passeport pour international : numéro, date expiration
- ✅ Validation : passeport valide 6 mois après retour
- ✅ Possibilité d'importer depuis "Mes voyageurs"
- ✅ Option "Sauvegarder dans mon carnet"
- ✅ Sauvegarde auto à chaque champ

### US-033 : Étape récapitulatif
**En tant qu'** utilisateur  
**Je veux** vérifier ma réservation  
**Afin de** confirmer avant de payer

**Critères d'acceptation :**
- ✅ Récap complet : offre, dates, voyageurs, suppléments
- ✅ Détail des prix (sous-total, réduction, total)
- ✅ Lien pour modifier chaque section
- ✅ Checkbox CGV obligatoire
- ✅ Lien vers CGV (ouvre modal)
- ✅ Bouton "Continuer" disabled tant que CGV non cochées

### US-034 : Choix du paiement
**En tant qu'** utilisateur  
**Je veux** choisir mon mode de paiement  
**Afin de** payer comme je veux

**Critères d'acceptation :**
- ✅ 4 options : CIB, Edahabia, Agence, Virement
- ✅ Description claire de chaque option
- ✅ Pour CIB/Edahabia : redirect vers SATIM
- ✅ Pour Agence : confirmation avec délai 48h
- ✅ Pour Virement : RIB affiché + envoyé par email
- ✅ Indication des frais éventuels
- ✅ Bouton "Confirmer et payer"

### US-035 : Paiement SATIM
**En tant qu'** utilisateur  
**Je veux** payer en ligne avec ma carte CIB/Edahabia  
**Afin d'** avoir une confirmation immédiate

**Critères d'acceptation :**
- ✅ Création de la réservation status=pending
- ✅ Appel API mini-backend pour init paiement SATIM
- ✅ Redirect vers SATIM (page sécurisée)
- ✅ Retour sur /reservation/.../confirmation après paiement
- ✅ Callback SATIM met à jour la réservation
- ✅ Gestion des erreurs : timeout, refus, etc.
- ✅ Email de confirmation envoyé automatiquement

### US-036 : Confirmation de réservation
**En tant qu'** utilisateur  
**Je veux** voir la confirmation  
**Afin de** savoir que tout est OK

**Critères d'acceptation :**
- ✅ Page de remerciement avec animation
- ✅ Numéro de réservation visible
- ✅ Récap complet de la réservation
- ✅ Téléchargement facture PDF
- ✅ Téléchargement voucher PDF
- ✅ Bouton "Mes réservations"
- ✅ Email + SMS de confirmation
- ✅ Lien WhatsApp pour questions

---

## 🔐 EPIC 5 : Authentification

### US-040 : Inscription
**En tant que** visiteur  
**Je veux** créer un compte  
**Afin de** réserver et accéder à mon espace

**Critères d'acceptation :**
- ✅ Formulaire : prénom, nom, email, téléphone, mot de passe
- ✅ Validation en temps réel (Zod + RHF)
- ✅ Mot de passe : 8+ caractères, 1 majuscule, 1 chiffre
- ✅ Indicateur force mot de passe
- ✅ Vérification email dispo (Firebase Auth)
- ✅ Acceptation CGV obligatoire
- ✅ Email de validation envoyé
- ✅ Boutons login social : Google, Facebook
- ✅ Redirection vers /compte après inscription

### US-041 : Connexion
**En tant qu'** utilisateur  
**Je veux** me connecter  
**Afin d'** accéder à mon espace

**Critères d'acceptation :**
- ✅ Formulaire : email + mot de passe
- ✅ "Se souvenir de moi" (persist auth)
- ✅ "Mot de passe oublié" → reset par email
- ✅ Connexion sociale Google et Facebook
- ✅ Messages d'erreur clairs (sans révéler si email existe)
- ✅ Rate limiting : max 5 essais / 15 min
- ✅ Redirection vers page demandée (returnUrl)

### US-042 : Récupération de mot de passe
**En tant qu'** utilisateur  
**Je veux** réinitialiser mon mot de passe  
**Afin de** récupérer mon accès

**Critères d'acceptation :**
- ✅ Page /mot-de-passe-oublie avec champ email
- ✅ Email envoyé via Firebase Auth
- ✅ Lien sécurisé avec expiration (1h)
- ✅ Page de réinitialisation avec nouveau mot de passe
- ✅ Toast confirmation après reset

### US-043 : Validation email
**En tant qu'** utilisateur  
**Je veux** valider mon email  
**Afin de** prouver mon identité

**Critères d'acceptation :**
- ✅ Email avec lien envoyé après inscription
- ✅ Banner d'avertissement si non vérifié
- ✅ Possibilité de re-envoyer (rate-limited)
- ✅ Click sur lien → page validation
- ✅ Update Firestore : emailVerified = true

---

## 👤 EPIC 6 : Espace client

### US-050 : Dashboard client
**En tant qu'** utilisateur connecté  
**Je veux** voir mon tableau de bord  
**Afin d'** avoir un aperçu rapide

**Critères d'acceptation :**
- ✅ Salutation personnalisée
- ✅ Card "Prochain voyage" si applicable (avec compte à rebours)
- ✅ Stats : nb voyages, total dépensé, favoris
- ✅ Historique des 3 dernières réservations
- ✅ Suggestions d'offres personnalisées
- ✅ Notifications non lues

### US-051 : Liste des réservations
**En tant qu'** utilisateur  
**Je veux** voir toutes mes réservations  
**Afin de** suivre mes voyages

**Critères d'acceptation :**
- ✅ Tabs : Toutes, À venir, Passées, Annulées
- ✅ Tri par date (plus récente d'abord)
- ✅ Card par réservation avec photo, dates, prix, statut
- ✅ Badge statut coloré
- ✅ Click → détail de la réservation
- ✅ État vide stylisé si aucune réservation

### US-052 : Détail d'une réservation
**En tant qu'** utilisateur  
**Je veux** voir tous les détails d'une réservation  
**Afin d'** avoir toutes les infos

**Critères d'acceptation :**
- ✅ Toutes les infos : offre, dates, voyageurs, prix
- ✅ Statut bien visible
- ✅ Historique des actions (timeline)
- ✅ Documents téléchargeables : facture, voucher, billet
- ✅ Actions disponibles selon statut : annuler, modifier
- ✅ Bouton contact agence (WhatsApp + téléphone)

### US-053 : Gestion des favoris
**En tant qu'** utilisateur  
**Je veux** gérer mes favoris  
**Afin de** suivre les offres qui m'intéressent

**Critères d'acceptation :**
- ✅ Liste de toutes mes offres favorites
- ✅ Sort par date d'ajout
- ✅ Retrait depuis la liste
- ✅ Filtres par type
- ✅ État vide avec suggestion d'explorer

### US-054 : Carnet de voyageurs
**En tant qu'** utilisateur  
**Je veux** sauvegarder mes voyageurs fréquents  
**Afin de** réserver plus vite

**Critères d'acceptation :**
- ✅ Liste des voyageurs sauvegardés
- ✅ Ajout / Modification / Suppression
- ✅ Champs complets incluant passeport
- ✅ Confirmation avant suppression
- ✅ Utilisable depuis le tunnel de réservation

### US-055 : Mon profil
**En tant qu'** utilisateur  
**Je veux** gérer mon profil  
**Afin de** garder mes infos à jour

**Critères d'acceptation :**
- ✅ Formulaire : nom, prénom, email, téléphone, avatar
- ✅ Upload avatar (Cloud Storage)
- ✅ Changement mot de passe (nécessite mdp actuel)
- ✅ Changement email (revalidation requise)
- ✅ Suppression de compte (avec confirmation)

---

## 🔧 EPIC 7 : Back-office admin

### US-060 : Dashboard admin
**En tant qu'** admin  
**Je veux** voir un dashboard global  
**Afin de** piloter l'activité

**Critères d'acceptation :**
- ✅ KPIs : réservations aujourd'hui, mois, CA, conversion
- ✅ Graphique ventes 30 jours
- ✅ Actions requises (paiements à valider, etc.)
- ✅ Top 5 offres
- ✅ Top 5 destinations
- ✅ Dernières réservations (10)

### US-061 : Gestion des offres (CRUD)
**En tant qu'** admin  
**Je veux** gérer le catalogue  
**Afin de** maintenir l'offre

**Critères d'acceptation :**
- ✅ Liste avec filtres : type, statut, destination
- ✅ Recherche par titre
- ✅ Création : formulaire multi-étapes
- ✅ Upload multiple d'images (drag & drop)
- ✅ Éditeur de programme jour par jour
- ✅ Gestion disponibilités et stocks
- ✅ Édition de chaque champ
- ✅ Duplication d'une offre
- ✅ Archivage (soft delete)
- ✅ Prévisualisation avant publication
- ✅ Mise en avant (featured)

### US-062 : Gestion des réservations
**En tant qu'** agent  
**Je veux** gérer les réservations  
**Afin d'** assurer le suivi

**Critères d'acceptation :**
- ✅ Liste avec filtres : statut, type, dates, agent
- ✅ Recherche par référence, nom client
- ✅ Détail complet avec historique
- ✅ Actions : confirmer, annuler, modifier
- ✅ Validation manuelle des paiements en agence
- ✅ Génération facture conforme algérienne
- ✅ Envoi documents par email
- ✅ Notes internes
- ✅ Assignation à un agent

### US-063 : Gestion des clients
**En tant qu'** admin  
**Je veux** voir mes clients  
**Afin de** maintenir la relation

**Critères d'acceptation :**
- ✅ Liste avec recherche
- ✅ Fiche client : infos, historique, stats
- ✅ Segments : nouveaux, fidèles, VIP, inactifs
- ✅ Notes internes
- ✅ Tags personnalisés
- ✅ Export CSV pour campagnes

### US-064 : Gestion du contenu
**En tant qu'** admin  
**Je veux** gérer le contenu  
**Afin de** garder le site à jour

**Critères d'acceptation :**
- ✅ Édition des pages (À propos, FAQ, CGV)
- ✅ Création/édition d'articles de blog
- ✅ Gestion des destinations
- ✅ Configuration de la page d'accueil (sliders, mises en avant)
- ✅ Éditeur markdown avec preview

### US-065 : Gestion des promotions
**En tant qu'** admin  
**Je veux** créer des codes promo  
**Afin d'** animer les ventes

**Critères d'acceptation :**
- ✅ Création de codes avec règles
- ✅ Pourcentage ou montant fixe
- ✅ Conditions : montant min, types d'offres, dates
- ✅ Limite d'utilisation totale et par utilisateur
- ✅ Stats d'utilisation

### US-066 : Audit log
**En tant qu'** admin  
**Je veux** voir les actions sensibles  
**Afin de** suivre l'activité interne

**Critères d'acceptation :**
- ✅ Liste des actions avec filtres
- ✅ Détail : qui, quand, quoi, quels champs changés
- ✅ Recherche par utilisateur, entité, action
- ✅ Export pour audit externe
