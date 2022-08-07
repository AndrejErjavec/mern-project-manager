export const TaskReducer = (state, action) => {
  switch (action.type) {
    case 'CREATE':
      return {tasks: [...state.tasks, action.payload], selected: state.selected}
    case 'GET':
      return {tasks: action.payload, selected: state.selected}
    case 'SELECT':
      return {...state, selected: action.payload}
    case 'CLEAR':
      return {tasks: [], selected: undefined};
    default:
      return state
  }
}