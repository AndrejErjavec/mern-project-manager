import {createContext, useReducer} from 'react';
import {ProjectReducer} from '../reducers/ProjectReducer';

const initialState = {
  projects: [],
  selected: undefined
};

const ProjectContext = createContext(initialState);

export const ProjectStore = ({children}) => {
  const [store, dispatch] = useReducer(ProjectReducer, initialState);
  return <ProjectContext.Provider value={{projects: store.projects, selected: store.selected, dispatch}}>
    {children}
  </ProjectContext.Provider>;
}

export default ProjectContext;