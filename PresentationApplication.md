### **Objectif de l'Application**  
L'application est une **API RESTful** développée avec **Node.js, Express et MongoDB**, conçue pour gérer des tâches de manière efficace. Elle permet aux utilisateurs de créer, lire, mettre à jour et supprimer des tâches (CRUD), tout en offrant des fonctionnalités avancées comme le filtrage, le tri et la gestion des sous-tâches.  

---

### **Fonctionnalités Principales**  

#### **1. Gestion des Tâches (CRUD)**  
- **Création** : Ajout de nouvelles tâches avec des détails tels que le titre, la description, la date d'échéance, etc.  
- **Lecture** :  
  - Récupération de toutes les tâches avec des filtres et tris optionnels.  
  - Récupération d'une tâche spécifique par son ID.  
- **Mise à jour** : Modification des détails d'une tâche existante.  
- **Suppression** : Suppression d'une tâche par son ID.  

#### **2. Filtrage et Tri Avancés**  
Les tâches peuvent être filtrées et triées selon plusieurs critères :  
- **Filtres** :  
  - Par statut (`à faire`, `en cours`, `terminée`, `annulée`).  
  - Par priorité (`basse`, `moyenne`, `haute`, `critique`).  
  - Par catégorie ou étiquette.  
  - Par plage de dates (`avant` ou `après` une date donnée).  
  - Par recherche textuelle (`q`) dans le titre ou la description.  
- **Tri** :  
  - Par date de création, échéance, priorité, etc.  
  - Ordre ascendant (`asc`) ou descendant (`desc`).  

#### **3. Structure des Tâches**  
Chaque tâche contient des champs détaillés :  
- **Titre** et **description** (obligatoires).  
- **Dates** : Date de création et échéance optionnelle.  
- **Statut** et **priorité** avec des valeurs prédéfinies.  
- **Auteur** : Nom, prénom et email.  
- **Catégorie** et **étiquettes** (tags).  
- **Sous-tâches** : Liste de sous-tâches avec leur propre statut et échéance.  
- **Commentaires** : Historique des discussions.  
- **Historique des modifications** : Suivi des changements (champ modifié, ancienne/nouvelle valeur).  

#### **4. Optimisation des Performances**  
- **Index MongoDB** :  
  - Index sur `echeance`, `priorite` et `dateCreation` pour accélérer les requêtes.  

#### **5. Sécurité et Compatibilité**  
- **CORS** : Autorise les requêtes cross-origin pour une intégration frontend.  
- **Environnement sécurisé** : Utilisation de variables d'environnement (`dotenv`) pour les données sensibles (URI MongoDB, port).  

---

### **Cas d'Utilisation**  
- **Gestion de projets** : Suivi des tâches par équipe.  
- **Liste personnelle** : Organisation des tâches quotidiennes.  
- **Applications collaboratives** : Ajout de commentaires et sous-tâches pour le travail en groupe.  

Cette API est idéale pour être intégrée à une interface frontend (React, Angular, etc.) ou utilisée directement via des requêtes HTTP.