import React, { useState } from 'react';
import Swal from 'sweetalert2';

const TaskItem = ({ task, onDeleteTask, onEditTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [editedTask, setEditedTask] = useState(task);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleDetails = () => {
    setShowDetails(true);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedTask(task);
  };

  const handleSave = () => {
    onEditTask(editedTask);
    setIsEditing(false);
  };

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      setShowDetails(false);
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "Vous ne pourrez pas annuler cette action!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        onDeleteTask(task._id);
      }
    });
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <li>
      <h3>{task.titre}</h3>
      <button onClick={toggleFavorite}>
        {isFavorite ? '★' : '☆'}
      </button>
      <div className="task-actions">
        <button data-action="details" onClick={handleDetails}>Détails</button>
        <button data-action="edit" onClick={handleEdit}>Modifier</button>
        <button data-action="delete" onClick={handleDelete}>Supprimer</button>
      </div>
      
      {(showDetails || isEditing) && (
        <div className="modal-overlay" onClick={handleOutsideClick}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {showDetails && (
              <>
                <h2>Détails de la tâche</h2>
                <p><strong>Titre:</strong> {task.titre}</p>
                <p><strong>Description:</strong> {task.description}</p>
                <p><strong>Date de création:</strong> {new Date(task.dateCreation).toLocaleString()}</p>
                <p><strong>Échéance:</strong> {new Date(task.echeance).toLocaleDateString()}</p>
                <p><strong>Statut:</strong> {task.statut}</p>
                <p><strong>Priorité:</strong> {task.priorite}</p>
                <p><strong>Auteur:</strong> {task.auteur.prenom} {task.auteur.nom}</p>
                <p><strong>Catégorie:</strong> {task.categorie}</p>
                <p><strong>Étiquettes:</strong> {task.etiquettes.join(', ')}</p>

                <h4>Sous-tâches</h4>
                <ul>
                  {task.sousTaches.map((sousTache, index) => (
                    <li key={index}>
                      <p><strong>Titre:</strong> {sousTache.titre}</p>
                      <p><strong>Statut:</strong> {sousTache.statut}</p>
                      <p><strong>Échéance:</strong> {new Date(sousTache.echeance).toLocaleDateString()}</p>
                    </li>
                  ))}
                </ul>

                <h4>Commentaires</h4>
                <ul>
                  {task.commentaires.map((commentaire, index) => (
                    <li key={index}>
                      <p><strong>Auteur:</strong> {commentaire.auteur}</p>
                      <p><strong>Date:</strong> {new Date(commentaire.date).toLocaleString()}</p>
                      <p><strong>Contenu:</strong> {commentaire.contenu}</p>
                    </li>
                  ))}
                </ul>

                <button onClick={() => setShowDetails(false)}>Fermer</button>
              </>
            )}

            {isEditing && (
              <>
                <h2>Modifier la tâche</h2>
                <input
                  type="text"
                  placeholder="Titre"
                  value={editedTask.titre}
                  onChange={(e) => setEditedTask({ ...editedTask, titre: e.target.value })}
                />
                <textarea
                  placeholder="Description"
                  value={editedTask.description}
                  onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                />
                <input
                  type="date"
                  value={editedTask.echeance}
                  onChange={(e) => setEditedTask({ ...editedTask, echeance: e.target.value })}
                />
                <select
                  value={editedTask.statut}
                  onChange={(e) => setEditedTask({ ...editedTask, statut: e.target.value })}
                >
                  <option value="à faire">À faire</option>
                  <option value="en cours">En cours</option>
                  <option value="terminée">Terminée</option>
                  <option value="annulée">Annulée</option>
                </select>
                <select
                  value={editedTask.priorite}
                  onChange={(e) => setEditedTask({ ...editedTask, priorite: e.target.value })}
                >
                  <option value="basse">Basse</option>
                  <option value="moyenne">Moyenne</option>
                  <option value="haute">Haute</option>
                  <option value="critique">Critique</option>
                </select>
                <input
                  type="text"
                  placeholder="Catégorie"
                  value={editedTask.categorie}
                  onChange={(e) => setEditedTask({ ...editedTask, categorie: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Étiquettes (séparées par des virgules)"
                  value={editedTask.etiquettes.join(', ')}
                  onChange={(e) => setEditedTask({ 
                    ...editedTask, 
                    etiquettes: e.target.value.split(',').map(tag => tag.trim()) 
                  })}
                />

                <h4>Auteur</h4>
                <input
                  type="text"
                  placeholder="Nom"
                  value={editedTask.auteur.nom}
                  onChange={(e) => setEditedTask({ 
                    ...editedTask, 
                    auteur: { ...editedTask.auteur, nom: e.target.value } 
                  })}
                />
                <input
                  type="text"
                  placeholder="Prénom"
                  value={editedTask.auteur.prenom}
                  onChange={(e) => setEditedTask({ 
                    ...editedTask, 
                    auteur: { ...editedTask.auteur, prenom: e.target.value } 
                  })}
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={editedTask.auteur.email}
                  onChange={(e) => setEditedTask({ 
                    ...editedTask, 
                    auteur: { ...editedTask.auteur, email: e.target.value } 
                  })}
                />

                <h4>Sous-tâches</h4>
                {editedTask.sousTaches.map((sousTache, index) => (
                  <div key={index}>
                    <input
                      type="text"
                      placeholder="Titre de la sous-tâche"
                      value={sousTache.titre}
                      onChange={(e) => {
                        const newSousTaches = [...editedTask.sousTaches];
                        newSousTaches[index].titre = e.target.value;
                        setEditedTask({ ...editedTask, sousTaches: newSousTaches });
                      }}
                    />
                    <select
                      value={sousTache.statut}
                      onChange={(e) => {
                        const newSousTaches = [...editedTask.sousTaches];
                        newSousTaches[index].statut = e.target.value;
                        setEditedTask({ ...editedTask, sousTaches: newSousTaches });
                      }}
                    >
                      <option value="à faire">À faire</option>
                      <option value="en cours">En cours</option>
                      <option value="terminée">Terminée</option>
                    </select>
                    <input
                      type="date"
                      value={sousTache.echeance}
                      onChange={(e) => {
                        const newSousTaches = [...editedTask.sousTaches];
                        newSousTaches[index].echeance = e.target.value;
                        setEditedTask({ ...editedTask, sousTaches: newSousTaches });
                      }}
                    />
                  </div>
                ))}
                <button
                  data-action="add-subtask"
                  type="button"
                  onClick={() => setEditedTask({
                    ...editedTask,
                    sousTaches: [...editedTask.sousTaches, { titre: '', statut: 'à faire', echeance: '' }]
                  })}
                >
                  Ajouter une sous-tâche
                </button>

                <h4>Commentaires</h4>
                {editedTask.commentaires.map((commentaire, index) => (
                  <div key={index}>
                    <textarea
                      placeholder="Contenu du commentaire"
                      value={commentaire.contenu}
                      onChange={(e) => {
                        const newCommentaires = [...editedTask.commentaires];
                        newCommentaires[index].contenu = e.target.value;
                        setEditedTask({ ...editedTask, commentaires: newCommentaires });
                      }}
                    />
                  </div>
                ))}
                <button
                  data-action="add-comment"
                  type="button"
                  onClick={() => setEditedTask({
                    ...editedTask,
                    commentaires: [...editedTask.commentaires, { auteur: '', contenu: '', date: new Date() }]
                  })}
                >
                  Ajouter un commentaire
                </button>

                <div className="modal-actions">
                  <button data-action="save" onClick={handleSave}>Enregistrer</button>
                  <button data-action="cancel" onClick={() => setIsEditing(false)}>Annuler</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </li>
  );
};

export default TaskItem; 