import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import FilterForm from './components/FilterForm';
import './styles.css';
import Swal from 'sweetalert2';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    fetchTasks();
  }, [filters]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tasks', {
        params: filters
      });
      setTasks(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des tâches:', error);
    }
  };

  const addTask = async (newTask) => {
    try {
      const response = await axios.post('http://localhost:5000/api/tasks', newTask);
      setTasks([...tasks, response.data]);
      Swal.fire({
        icon: 'success',
        title: 'Tâche ajoutée',
        text: 'La tâche a été ajoutée avec succès!',
        timer: 2000
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: "Une erreur s'est produite lors de l'ajout de la tâche"
      });
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
      Swal.fire({
        icon: 'success',
        title: 'Tâche supprimée',
        text: 'La tâche a été supprimée avec succès!',
        timer: 2000
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: "Une erreur s'est produite lors de la suppression de la tâche"
      });
    }
  };

  const editTask = async (updatedTask) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/tasks/${updatedTask._id}`, updatedTask);
      setTasks(tasks.map(task => task._id === updatedTask._id ? response.data : task));
      Swal.fire({
        icon: 'success',
        title: 'Tâche modifiée',
        text: 'La tâche a été modifiée avec succès!',
        timer: 2000
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: "Une erreur s'est produite lors de la modification de la tâche"
      });
    }
  };

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="app-container">
      <div className="filter-section">
        <h1>Gestionnaire de Tâches</h1>
        <FilterForm onFilter={handleFilter} />
      </div>

      <div className="main-content">
        <TaskForm onAddTask={addTask} />
      </div>

      <div className="task-section">
        <h2>Liste des tâches</h2>
        <div className="task-list">
          <TaskList tasks={tasks} onDeleteTask={deleteTask} onEditTask={editTask} />
        </div>
      </div>
    </div>
  );
};

export default App; 