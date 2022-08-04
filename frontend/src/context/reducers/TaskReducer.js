export const TaskReducer = (state, action) => {
  switch (action.type) {
    case 'CREATE':
      return {tasks: [...state.tasks, action.payload], selected: state.selected}
    case 'GET':
      return {tasks: action.payload, selected: state.selected}
    case 'SELECT':
      return {...state, selected: action.payload}
    default:
      return state
  }
}