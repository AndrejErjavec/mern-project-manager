export const SubtaskReducer = (state, action) => {
  switch (action.type) {
    case 'CREATE':
      return [...state, action.payload]
    case 'GET':
      return action.payload
    default:
      return state
  }
}