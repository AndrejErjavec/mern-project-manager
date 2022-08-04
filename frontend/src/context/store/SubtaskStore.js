import {createContext, useReducer} from 'react';
import {SubtaskReducer} from '../reducers/SubtaskReducer';

const initialState = {
  subtasks: [],
};

const SubtaskContext = createContext(initialState);

export const SubtaskStore = ({children}) => {
  const [subtasks, dispatch] = useReducer(SubtaskReducer, initialState);
  return <SubtaskContext.Provider value={{subtasks, dispatch}}>
    {children}
  </SubtaskContext.Provider>;
}

export default SubtaskContext;