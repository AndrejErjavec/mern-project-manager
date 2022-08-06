import {useState, useContext, useEffect} from 'react';
import TaskContext from '../context/store/TaskStore';
import taskService from '../features/taskService';
import SubtaskContext from '../context/store/SubtaskStore';
import '../css/TaskItem.css';

const TaskItem = ({task, setTaskViewOpen}) => {
  const [completed, setCompleted] = useState(task.completed);
  const {taskDispatch} = useContext(TaskContext);
  const [subtasks, setSubtasks] = useState([]);
  const [progress, setProgress] = useState(0);
  // const {subtasks, subtaskDispatch} = useContext(SubtaskContext);

  useEffect(() => {
    taskService.getSubtasks(task.id)
    .then((subtasks) => {
      setSubtasks(subtasks);
      // subtaskDispatch({type: 'GET', payload: subtasks});
    })
    .catch((err) => {
      console.log(err);
    })
  }, []);

  useEffect(() => {
    const fixDate = new Date(task.due_date).toISOString().slice(0, 19).replace('T', ' ');
    taskService.updateTask({name: task.name, dueDate: fixDate, description: task.description, priority: task.priority, completed: completed}, task.id)
    .then((response) => {
      // console.log(response)
      // taskDispatch({type: 'UPDATE', payload: {name: task.name, dueDate: fixDate, description: task.description, priority: task.priority, completed: completed}});
    })
    .catch((err) => {
      console.log(err)
    })
  }, [completed, task]);


  const handleChange = () => {
    setCompleted(completed => !completed);
  };

  const selectTask = () => {
    taskDispatch({type: 'SELECT', payload: task});
    setTaskViewOpen(true);
  }

  
  // data processing for component - time
  const dueDate = task.due_date;
  const date = new Date(dueDate).toLocaleDateString('sl-SI');

  // data processing for component - subtask count
  const allSubtasks = subtasks.length;
  const completedSubtasks = subtasks.filter((subtask) => subtask.completed === 1).length;
  const completeRate = Math.floor((completedSubtasks / allSubtasks) * 100);
  // setProgress(completeRate);

  return (
    <div className="task-item">
      <div className="task-item-section align-start">
        <p onClick={selectTask}>{task.name}</p>
      </div>
      <div className="task-item-section align-mid">
        <div>Due: {date}</div>
      </div>
      <div className="task-item-section align-mid">
        <div className={`priority-${task.priority}`}>{task.priority}</div>
      </div>
      <div className="task-item-section align-end">
        {subtasks.length > 0 ? (
        <div className="progress-display">
          <progress id="completion" value={completeRate} max="100"></progress>
          <label htmlFor="completion">{completeRate}%</label>
        </div>
        ) : (<><p>No subtasks</p><input type="checkbox" id="completed" name="completed" checked={completed} onChange={handleChange}/></>)}
      </div>
    </div>
  )
}

export default TaskItem;