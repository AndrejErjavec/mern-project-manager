import {createContext, useReducer} from 'react';
import {CommentReducer} from '../reducers/CommentReducer';

const initialState = {
  comments: [],
};

const CommentContext = createContext(initialState);

export const CommentStore = ({children}) => {
  const [comments, dispatch] = useReducer(CommentReducer, initialState);
  return <CommentContext.Provider value={{comments, dispatch}}>
    {children}
  </CommentContext.Provider>;
}

export default CommentContext;