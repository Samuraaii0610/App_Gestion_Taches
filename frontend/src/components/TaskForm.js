import React, { useState } from 'react';

const TaskForm = ({ onAddTask }) => {
  const [task, setTask] = useState({
    titre: '',
    description: '',
    echeance: '',
    statut: 'à faire',
    priorite: 'moyenne',
    auteur: { nom: '', prenom: '' },
    categorie: '',
    etiquettes: [],
    sousTaches: [{ titre: '', statut: 'à faire', echeance: '' }],
    commentaires: [{ auteur: '', contenu: '' }]
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTask({
      ...task,
      dateCreation: new Date()
    });
    setTask({
      titre: '',
      description: '',
      echeance: '',
      statut: 'à faire',
      priorite: 'moyenne',
      auteur: { nom: '', prenom: '' },
      categorie: '',
      etiquettes: [],
      sousTaches: [{ titre: '', statut: 'à faire', echeance: '' }],
      commentaires: [{ auteur: '', contenu: '' }]
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask(prev => ({ ...prev, [name]: value }));
  };

  const handleAuteurChange = (e) => {
    const { name, value } = e.target;
    setTask(prev => ({ 
      ...prev, 
      auteur: { ...prev.auteur, [name]: value } 
    }));
  };

  const handleSousTacheChange = (index, field, value) => {
    const newSousTaches = [...task.sousTaches];
    newSousTaches[index][field] = value;
    setTask({ ...task, sousTaches: newSousTaches });
  };

  const handleCommentaireChange = (index, field, value) => {
    const newCommentaires = [...task.commentaires];
    newCommentaires[index][field] = value;
    setTask({ ...task, commentaires: newCommentaires });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="titre"
        placeholder="Titre"
        value={task.titre}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={task.description}
        onChange={handleChange}
      />
      <input
        type="date"
        name="echeance"
        value={task.echeance}
        onChange={handleChange}
      />
      <select
        name="statut"
        value={task.statut}
        onChange={handleChange}
      >
        <option value="à faire">À faire</option>
        <option value="en cours">En cours</option>
        <option value="terminée">Terminée</option>
        <option value="annulée">Annulée</option>
      </select>
      <select
        name="priorite"
        value={task.priorite}
        onChange={handleChange}
      >
        <option value="basse">Basse</option>
        <option value="moyenne">Moyenne</option>
        <option value="haute">Haute</option>
        <option value="critique">Critique</option>
      </select>
      <input
        type="text"
        name="nom"
        placeholder="Nom de l'auteur"
        value={task.auteur.nom}
        onChange={handleAuteurChange}
      />
      <input
        type="text"
        name="prenom"
        placeholder="Prénom de l'auteur"
        value={task.auteur.prenom}
        onChange={handleAuteurChange}
      />
      <input
        type="text"
        name="categorie"
        placeholder="Catégorie"
        value={task.categorie}
        onChange={handleChange}
      />
      <input
        type="text"
        name="etiquettes"
        placeholder="Étiquettes (séparées par des virgules)"
        value={task.etiquettes.join(',')}
        onChange={(e) => setTask({ ...task, etiquettes: e.target.value.split(',') })}
      />
      <div>
        <h4>Sous-tâches</h4>
        {task.sousTaches.map((sousTache, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Titre de la sous-tâche"
              value={sousTache.titre}
              onChange={(e) => handleSousTacheChange(index, 'titre', e.target.value)}
            />
            <select
              value={sousTache.statut}
              onChange={(e) => handleSousTacheChange(index, 'statut', e.target.value)}
            >
              <option value="à faire">À faire</option>
              <option value="en cours">En cours</option>
              <option value="terminée">Terminée</option>
            </select>
            <input
              type="date"
              value={sousTache.echeance}
              onChange={(e) => handleSousTacheChange(index, 'echeance', e.target.value)}
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => setTask({ ...task, sousTaches: [...task.sousTaches, { titre: '', statut: 'à faire', echeance: '' }] })}
        >
          Ajouter une sous-tâche
        </button>
      </div>
      <div>
        <h4>Commentaires</h4>
        {task.commentaires.map((commentaire, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Auteur du commentaire"
              value={commentaire.auteur}
              onChange={(e) => handleCommentaireChange(index, 'auteur', e.target.value)}
            />
            <textarea
              placeholder="Contenu du commentaire"
              value={commentaire.contenu}
              onChange={(e) => handleCommentaireChange(index, 'contenu', e.target.value)}
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => setTask({ ...task, commentaires: [...task.commentaires, { auteur: '', contenu: '' }] })}
        >
          Ajouter un commentaire
        </button>
      </div>
      <button type="submit">Ajouter la tâche</button>
    </form>
  );
};

export default TaskForm; 