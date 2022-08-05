import {createContext, useReducer} from 'react';
import {SubtaskReducer} from '../reducers/SubtaskReducer';

const initialState = [];

const SubtaskContext = createContext(initialState);

export const SubtaskStore = ({children}) => {
  const [subtasks, subtaskDispatch] = useReducer(SubtaskReducer, initialState);
  return <SubtaskContext.Provider value={{subtasks, subtaskDispatch}}>
    {children}
  </SubtaskContext.Provider>;
}

export default SubtaskContext;