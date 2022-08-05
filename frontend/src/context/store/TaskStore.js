import {createContext, useReducer} from 'react';
import {TaskReducer} from '../reducers/TaskReducer';

const initialState = {
  tasks: [],
  selected: undefined
};

const TaskContext = createContext(initialState);

export const TaskStore = ({children}) => {
  const [store, taskDispatch] = useReducer(TaskReducer, initialState);
  return <TaskContext.Provider value={{tasks: store.tasks, selected: store.selected, taskDispatch}}>
    {children}
  </TaskContext.Provider>;
}

export default TaskContext;