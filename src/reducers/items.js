const initialState = {
  seconds: 0,
  tags: []
};

export function items(state = initialState, action) { //REDUX principle: return immutable state
  switch (action.type) {
    case 'ADD_TIME':
      return {
        ...state,
        seconds: state.seconds + action.payload
      };
      break;
    case 'SAVE_TAG':
      return { seconds: 0, tags:[...state.tags, { tagName: action.tagName.split(','), timeElapsed: action.timeElapsed } ] };
      break;
    case 'GET_TAGS':
      return { ...state };
      break;
    default:
      return state;
  }
}
