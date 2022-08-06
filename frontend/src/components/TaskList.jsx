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
  const [allTasksView, setAllTaskView] = useState(true);
  const [sort, setSort] = useState('');

  const {user} = useContext(UserContext);
  const {selected} = useContext(ProjectContext);
  const {tasks, taskDispatch} = useContext(TaskContext);

  const [localTasks, setLocalTasks] = useState(tasks);

  // useEffect(() => {
  //   console.log(sort)
  //   if (sort === 'priority') {
  //     console.log('priority')
  //     const sorted = localTasks.sort((a, b) => a.priority.length - b.priority.length);
  //     setLocalTasks(sorted);
  //   }
  //   if (sort === 'due-date') {
  //     console.log('due-date')
  //     const sorted = localTasks.sort((a, b) => new Date(b.due_date) - new Date(a.due_date));
  //     setLocalTasks(sorted)
  //   }
  //   if (sort === 'completed') {

  //   }
  //   setLocalTasks(tasks);
  // }, [sort]);


  // toggle between task list views
  useEffect(() => {
    if (allTasksView) {
      setLocalTasks(tasks);
    }
    else {
      setLocalTasks(localTasks => localTasks.filter((task) => myTasks(task)));
    }
  }, [allTasksView, tasks]);

  const myTasks = (task) => {
    return task.users.some((user) => user['id'] === user.id);
  }


  useEffect(() => {
    if (selected) {
      projectService.getProjectTasks(selected.id)
      .then((tasks) => {
        taskDispatch({type: 'GET', payload: tasks});
        setLocalTasks(tasks);
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

  const toggleTasksView = () => {
    setAllTaskView(current => !current);
  }


  const setSorting = (e) => {
    setSort(e.target.innerText)
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
        <p>view:</p>
          <ul>
            <li onClick={toggleTasksView}>{allTasksView ? ("show my tasks") : ("show all tasks")}</li>
          </ul>
          {/* <p>sort by:</p>
          <ul>
            <li onClick={setSorting} name="priority">priority</li>
            <li onClick={setSorting} name="due-date">due date</li>
            <li onClick={setSorting} name="completed">completed</li>
          </ul> */}
        </section>
      </div>
      <div className="task-list">
      {selected ? (
          <div>
            {localTasks.length > 0 ? (
              <div>
                {localTasks.map((task) => (
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