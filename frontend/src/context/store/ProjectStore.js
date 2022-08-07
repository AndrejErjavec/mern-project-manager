import {createContext, useReducer} from 'react';
import {ProjectReducer} from '../reducers/ProjectReducer';

const initialState = {
  projects: [],
  selected: undefined
};

const ProjectContext = createContext(initialState);

export const ProjectStore = ({children}) => {
  const [store, projectDispatch] = useReducer(ProjectReducer, initialState);
  return <ProjectContext.Provider value={{projects: store.projects, selected: store.selected, projectDispatch}}>
    {children}
  </ProjectContext.Provider>;
}

export default ProjectContext;