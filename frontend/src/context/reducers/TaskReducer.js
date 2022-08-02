export const TaskReducer = (state, action) => {
  switch (action.type) {
    case 'CREATE':
      return [...state, action.payload]
    case 'GET':
      return action.payload
    case 'SELECT':
      return action.payload
    default:
      return state
  }
}