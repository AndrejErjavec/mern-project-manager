import {useContext} from 'react';
import TaskContext from '../context/store/TaskStore';
import '../css/TaskItem.css';

const TaskItem = ({task, setTaskViewOpen}) => {
  const {dispatch} = useContext(TaskContext);

  const handleChange = () => {

  };

  const selectTask = () => {
    dispatch({type: 'SELECT', payload: task});
    setTaskViewOpen(true);
  }

  const dueDate = task.due_date;
  const date = new Date(dueDate).toLocaleDateString('sl-SI');

  return (
    <div className="task-item">
      <p onClick={selectTask}>{task.name}</p>
      <div>{date}</div>
      <div className={`priority-${task.priority}`}>{task.priority}</div>
      <input type="checkbox" id="completed" name="completed" value="done" checked={task.completed} onChange={handleChange}/>
    </div>
  )
}

export default TaskItem;