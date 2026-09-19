import { CheckCircle2, Circle, Trash2 } from 'lucide-react';

function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className="task-item">
      <div 
        className="task-content"
        onClick={() => onToggle(task.id)}
      >
        {task.completed ? (
          <CheckCircle2 className="task-icon completed" />
        ) : (
          <Circle className="task-icon pending" />
        )}
        <span className={`task-text ${task.completed ? 'completed' : ''}`}>
          {task.title}
        </span>
      </div>
      <button 
        className="delete-btn" 
        onClick={() => onDelete(task.id)}
        aria-label="Delete task"
        title="Delete task"
      >
        <Trash2 size={16} />
      </button>
    </li>
  );
}

export default TaskItem;