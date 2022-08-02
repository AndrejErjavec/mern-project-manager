import {createContext, useReducer} from 'react';
import {TaskReducer} from '../reducers/TaskReducer';

const initialState = {
  tasks: [],
};

const TaskContext = createContext(initialState);

export const TaskStore = ({children}) => {
  const [tasks, dispatch] = useReducer(TaskReducer, initialState);
  return <TaskContext.Provider value={{tasks, dispatch}}>
    {children}
  </TaskContext.Provider>;
}

export default TaskContext;