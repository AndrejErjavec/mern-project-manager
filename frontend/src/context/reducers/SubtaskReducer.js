export const SubtaskReducer = (state, action) => {
  switch (action.type) {
    case 'CREATE':
      return [...state, action.payload]
    case 'GET':
      return action.payload
    case 'UPDATE':
      const index = state.findIndex(subtask => subtask.id === action.payload.id);
      const newState = [...state];
      newState[index].completed = action.payload.completed;
      return [...newState]
    default:
      return state
  }
}