import React, { useState } from 'react';

const FilterForm = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    statut: '',
    priorite: '',
    categorie: '',
    etiquette: '',
    avant: '',
    apres: '',
    q: '',
    tri: '',
    ordre: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(filters);
  };

  return (
    <form onSubmit={handleSubmit}>
      <select value={filters.statut} onChange={(e) => setFilters({ ...filters, statut: e.target.value })}>
        <option value="">Tous les statuts</option>
        <option value="à faire">À faire</option>
        <option value="en cours">En cours</option>
        <option value="terminée">Terminée</option>
        <option value="annulée">Annulée</option>
      </select>

      <select value={filters.priorite} onChange={(e) => setFilters({ ...filters, priorite: e.target.value })}>
        <option value="">Toutes les priorités</option>
        <option value="basse">Basse</option>
        <option value="moyenne">Moyenne</option>
        <option value="haute">Haute</option>
        <option value="critique">Critique</option>
      </select>

      <input
        type="text"
        placeholder="Catégorie"
        value={filters.categorie}
        onChange={(e) => setFilters({ ...filters, categorie: e.target.value })}
      />

      <input
        type="text"
        placeholder="Étiquette"
        value={filters.etiquette}
        onChange={(e) => setFilters({ ...filters, etiquette: e.target.value })}
      />

      <input
        type="date"
        placeholder="Avant le"
        value={filters.avant}
        onChange={(e) => setFilters({ ...filters, avant: e.target.value })}
      />

      <input
        type="date"
        placeholder="Après le"
        value={filters.apres}
        onChange={(e) => setFilters({ ...filters, apres: e.target.value })}
      />

      <input
        type="text"
        placeholder="Recherche"
        value={filters.q}
        onChange={(e) => setFilters({ ...filters, q: e.target.value })}
      />

      <select value={filters.tri} onChange={(e) => setFilters({ ...filters, tri: e.target.value })}>
        <option value="">Trier par</option>
        <option value="echeance">Date d'échéance</option>
        <option value="priorite">Priorité</option>
        <option value="dateCreation">Date de création</option>
      </select>

      <select value={filters.ordre} onChange={(e) => setFilters({ ...filters, ordre: e.target.value })}>
        <option value="asc">Croissant</option>
        <option value="desc">Décroissant</option>
      </select>

      <button type="submit">Filtrer</button>
    </form>
  );
};

export default FilterForm; 