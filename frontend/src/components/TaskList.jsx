import {useState, useEffect, useContext} from 'react';
import projectService from '../features/projectService';
import {toast} from "react-toastify";
import ProjectContext from '../context/store/ProjectStore';
import TaskContext from '../context/store/TaskStore';
import UserContext from '../context/store/UserStore';
import CreateTaskForm from './CreateTaskForm';
import TaskItem from './TaskItem';
import '../css/TaskList.css';

const TaskList = ({setTaskViewOpen}) => {
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const [isFormOpen, setFormOpen] = useState(false);

  const {user} = useContext(UserContext);
  const {selected} = useContext(ProjectContext);
  const {tasks, taskDispatch} = useContext(TaskContext);


  useEffect(() => {
    if (selected) {
      projectService.getProjectTasks(selected.id)
      .then((tasks) => {
        taskDispatch({type: 'GET', payload: tasks});
      })
      .catch((err) => {
        setMessage(err.response.data.message);
        setIsError(true);
      });
    }
    
  }, [taskDispatch, selected]);


  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  }, [isError, message]);

  const showForm = () => {
    setFormOpen(true);
  }

  return (
    <>
    <section className="tasks">
      <div className="task-list-header">
        <div className="task-header-left">
          <h3>Tasks</h3>
          {selected ? (<button onClick={showForm}>New Task</button>) : (<></>)}
          
        </div>
        <section className="sorting">
          <p>sort by:</p>
          <ul>
            <li>priority</li>
            <li>due date</li>
            <li>completed</li>
          </ul>
        </section>
      </div>
      <div className="task-list">
      {selected ? (
          <div>
            {tasks.length > 0 ? (
              <div>
                {tasks.map((task) => (
                <TaskItem key={task.id} task={task} setTaskViewOpen={setTaskViewOpen}></TaskItem>
              ))}
              </div>
            ) : (<p>no tasks to show</p>)}
            </div>
          
        ) : (<p>select a project to show tasks</p>)}
        </div>
    </section>
    
    {isFormOpen && <CreateTaskForm setIsOpen={setFormOpen}/>}
    </>
  )
}

export default TaskList;