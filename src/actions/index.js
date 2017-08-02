//REDUX principle: ACTIONS can update states, only 
export function addTime(seconds) {
  return {
    type: 'ADD_TIME',
    payload: seconds
  };
}

export function getTags() {
  return {
    type: 'GET_TAGS'
  };
}

export function saveTag(tagName, timeElapsed) {
  return {
    type: 'SAVE_TAG',
    tagName,
    timeElapsed
  };
}
