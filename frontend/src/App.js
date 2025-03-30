import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import FilterForm from './components/FilterForm';
import './styles.css';

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
      console.log('Réponse de l\'API:', response.data);
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la tâche:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression de la tâche:', error);
    }
  };

  const editTask = async (updatedTask) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/tasks/${updatedTask._id}`, updatedTask);
      setTasks(tasks.map(task => task._id === updatedTask._id ? response.data : task));
    } catch (error) {
      console.error('Erreur lors de la modification de la tâche:', error);
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