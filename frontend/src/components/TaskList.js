import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onDeleteTask, onEditTask }) => {
  return (
    <ul>
      {tasks.map(task => (
        <TaskItem key={task._id} task={task} onDeleteTask={onDeleteTask} onEditTask={onEditTask} />
      ))}
    </ul>
  );
};

export default TaskList; 