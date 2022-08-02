import '../css/TaskItem.css';

const TaskItem = ({task}) => {

  const handleChange = () => {

  };

  const dueDate = task.due_date;
  const date = new Date(dueDate);
  const locale = date.toLocaleDateString('sl-SI');

  return (
    <div className="task-item">
      <div>{task.name}</div>
      <div>{locale}</div>
      <div className={`priority-${task.priority}`}>{task.priority}</div>
      <input type="checkbox" id="completed" name="completed" value="done" checked={task.completed} onChange={handleChange}/>
    </div>
  )
}

export default TaskItem;