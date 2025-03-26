# Gestionnaire de Tâches

## Installation

1. Cloner le dépôt
2. Installer les dépendances :
   - Backend : `cd backend && npm install`
   - Frontend : `cd frontend && npm install`
3. Démarrer MongoDB localement
4. Démarrer le serveur : `cd backend && npm start`
5. Démarrer le frontend : `cd frontend && npm start`

## Documentation API

### Endpoints

- `GET /api/tasks` - Récupérer toutes les tâches
- `GET /api/tasks/:id` - Récupérer une tâche par ID
- `POST /api/tasks` - Créer une nouvelle tâche
- `PUT /api/tasks/:id` - Mettre à jour une tâche
- `DELETE /api/tasks/:id` - Supprimer une tâche

### Filtres et tris

#### Filtres disponibles

| Paramètre | Exemple | Description |
|-----------|---------|-------------|
| `statut` | `/tasks?statut=à faire` | Tâches dans un état donné |
| `priorite` | `/tasks?priorite=haute` | Filtrage par priorité |
| `categorie` | `/tasks?categorie=perso` | Filtrage par catégorie |
| `etiquette` | `/tasks?etiquette=urgent` | Recherche par étiquette |
| `avant` | `/tasks?avant=2025-03-31` | Tâches à terminer avant une date |
| `apres` | `/tasks?apres=2025-03-24` | Tâches après une date |
| `q` | `/tasks?q=rapport` | Recherche dans titre/description |

#### Tris possibles

| Paramètre | Exemple | Description |
|-----------|---------|-------------|
| `tri` | `/tasks?tri=echeance` | Trier par date d'échéance, priorité ou date de création |
| `ordre` | `/tasks?tri=echeance&ordre=desc` | Ordre croissant (`asc`) ou décroissant (`desc`) |

## Mode d'emploi

### Ajouter une tâche
1. Remplir le formulaire avec les informations de la tâche
2. Cliquer sur "Ajouter une tâche"

### Modifier une tâche
1. Cliquer sur le bouton "Modifier" d'une tâche
2. Modifier les champs souhaités
3. Cliquer sur "Enregistrer"

### Supprimer une tâche
1. Cliquer sur le bouton "Supprimer" d'une tâche

### Filtrer et trier les tâches
1. Utiliser les champs du formulaire de filtrage
2. Sélectionner les critères de filtrage et de tri
3. Cliquer sur "Filtrer"

## Structure des données

Une tâche contient les champs suivants :

- `titre` (String, obligatoire)
- `description` (String, obligatoire)
- `dateCreation` (Date, automatique)
- `echeance` (Date)
- `statut` (String : 'à faire', 'en cours', 'terminée', 'annulée')
- `priorite` (String : 'basse', 'moyenne', 'haute', 'critique')
- `auteur` (Object : nom, prénom, email)
- `categorie` (String)
- `etiquettes` (Array de Strings)
- `sousTaches` (Array d'objets)
- `commentaires` (Array d'objets)
- `historiqueModifications` (Array d'objets)

## Technologies utilisées

- **Frontend** : React
- **Backend** : Node.js, Express
- **Base de données** : MongoDB
- **Outils** : Axios, Mongoose 