import {createContext, useReducer} from 'react';
import {ProjectReducer} from '../reducers/ProjectReducer';

const initialState = {
  projects: []
};

const ProjectContext = createContext(initialState);

export const ProjectStore = ({children}) => {
  const [projects, dispatch] = useReducer(ProjectReducer, initialState);
  return <ProjectContext.Provider value={{projects, dispatch}}>
    {children}
  </ProjectContext.Provider>;
}

export default ProjectContext;