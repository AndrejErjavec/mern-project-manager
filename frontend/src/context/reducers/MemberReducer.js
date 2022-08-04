export const MemberReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      // spread on state and spread on payload, because payload is an array!
      return [...state, ...action.payload]
    case 'GET':
      return action.payload
    default:
      return state
  }
}