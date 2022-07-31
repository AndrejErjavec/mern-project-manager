import {createContext, useEffect, useReducer} from 'react';
import {UserReducer} from '../reducers/UserReducer';

const initialState = null

const UserContext = createContext(initialState);

export const UserStore = ({children}) => {
  const [user, dispatch] = useReducer(UserReducer, initialState, () => {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData): null;
  });

  return <UserContext.Provider value={{user, dispatch}}>
    {children}
  </UserContext.Provider>;
};

export default UserContext;