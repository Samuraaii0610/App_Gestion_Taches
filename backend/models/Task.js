const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  description: { type: String, required: true },
  dateCreation: { type: Date, default: Date.now },
  echeance: Date,
  statut: { type: String, enum: ['à faire', 'en cours', 'terminée', 'annulée'], default: 'à faire' },
  priorite: { type: String, enum: ['basse', 'moyenne', 'haute', 'critique'], default: 'moyenne' },
  auteur: {
    nom: String,
    prenom: String,
    email: String
  },
  categorie: String,
  etiquettes: [String],
  sousTaches: [{
    titre: String,
    statut: String,
    echeance: Date
  }],
  commentaires: [{
    auteur: String,
    date: { type: Date, default: Date.now },
    contenu: String
  }],
  historiqueModifications: [{
    champModifie: String,
    ancienneValeur: String,
    nouvelleValeur: String,
    date: { type: Date, default: Date.now }
  }]
});

// Ajout des index
taskSchema.index({ echeance: 1 });        // Index ascendant sur la date d'échéance
taskSchema.index({ priorite: 1 });       // Index ascendant sur la priorité
taskSchema.index({ dateCreation: -1 });  // Index descendant sur la date de création

module.exports = mongoose.model('Task', taskSchema); 