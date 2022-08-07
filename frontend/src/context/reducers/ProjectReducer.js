export const ProjectReducer = (state, action) => {
  switch (action.type) {
    case 'CREATE':
      return {projects: [...state.projects, action.payload], selected: action.payload}
    case 'SET':
      return {projects: action.payload, selected: action.payload[0]}
    case 'SELECT':
      return {...state, selected: action.payload}
    case 'CLEAR':
      return {projects: [], selected: undefined}
    default:
      return state
  }
}
