const express = require('express');
const Task = require('../models/Task');
const router = express.Router();

// Créer une tâche
router.post('/', async (req, res) => {
  try {
    console.log('Données reçues:', req.body);
    const task = new Task(req.body);
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Lire toutes les tâches avec filtres et tris
router.get('/', async (req, res) => {
  try {
    const { statut, priorite, categorie, etiquette, avant, apres, q, tri, ordre } = req.query;
    const filter = {};

    if (statut) filter.statut = statut;
    if (priorite) filter.priorite = priorite;
    if (categorie) filter.categorie = categorie;
    if (etiquette) filter.etiquettes = { $in: [etiquette] };
    if (avant) filter.echeance = { ...filter.echeance, $lte: new Date(avant) };
    if (apres) filter.echeance = { ...filter.echeance, $gte: new Date(apres) };
    if (q) {
      filter.$or = [
        { titre: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } }
      ];
    }

    const sort = {};
    if (tri) sort[tri] = ordre === 'desc' ? -1 : 1;

    const tasks = await Task.find(filter).sort(sort);
    res.send(tasks);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Lire une tâche par ID
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).send();
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Mettre à jour une tâche
router.put('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) return res.status(404).send();
    res.send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Supprimer une tâche
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).send();
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router; 