import {createContext, useReducer} from 'react';
import {MemberReducer} from '../reducers/MemberReducer';

const initialState = {
  members: [],
};

const MemberContext = createContext(initialState);

export const MemberStore = ({children}) => {
  const [members, dispatch] = useReducer(MemberReducer, initialState);
  return <MemberContext.Provider value={{members, dispatch}}>
    {children}
  </MemberContext.Provider>;
}

export default MemberContext;