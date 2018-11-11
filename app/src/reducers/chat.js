const initialState = {
  roomMessages: []
};


export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ROOM_MESSAGES':
      return { ...state, roomMessages: action.data };
    case 'SET_ROOM_MESSAGES':
      return { ...state, roomMessages: action.data };
    default:
      return state;
  }
};
