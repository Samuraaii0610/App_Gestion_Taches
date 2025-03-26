import React, { useState } from 'react';

const TaskItem = ({ task, onDeleteTask, onEditTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    onEditTask(editedTask);
    setIsEditing(false);
  };

  return (
    <li>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editedTask.titre}
            onChange={(e) => setEditedTask({ ...editedTask, titre: e.target.value })}
          />
          <textarea
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
          <button onClick={handleSave}>Enregistrer</button>
        </div>
      ) : (
        <div>
          <h3>{task.titre}</h3>
          <p>{task.description}</p>
          <p>Échéance: {new Date(task.echeance).toLocaleDateString()}</p>
          <p>Priorité: {task.priorite}</p>
          <p>Statut: {task.statut}</p>
          <button onClick={handleEdit}>Modifier</button>
          <button onClick={() => onDeleteTask(task._id)}>Supprimer</button>
        </div>
      )}
    </li>
  );
};

export default TaskItem; 