import {
    VIDEO_CALL_LISTENER_GET_FRIEND_ONLINE, 
    VIDEO_CALL_LISTENER_NEW_FRIEND_ONLINE, 
    VIDEO_CALL_DATA_VIDEO_LOCAL,
    VIDEO_CALL_DATA_VIDEO_SERVER,
    VIDEO_CALL_START_CALL_SUCCESS,
    VIDEO_CALL_LISTENER_END_CALL_SERVER,
    VIDEO_CALL_ACTION_MESSAGE_CALLBACK,
    VIDEO_CALL_RESET_MESSAGE_CALLBACK,
    VIDEO_CALL_LISTENER_NEW_MESSAGE

} from "../actions/ActionType";

export const _INITIAL_STATE = {
    isConnected: false,
    userFriends: [],
    urlVideoLocal: null,
    urlVideoServer: null,
    actionCallback: null,
    newMessage: {},
};

export const listenerVideocallReducers = (state = _INITIAL_STATE, action) => {
  console.log(`nvTien - VideoCallReducer listenerVideocallReducers action...  ` + action.type);
  switch (action.type) {
    case VIDEO_CALL_LISTENER_GET_FRIEND_ONLINE:
      return {
        ...state,
        userFriends: action.userFriends
      };
    case VIDEO_CALL_LISTENER_NEW_FRIEND_ONLINE:
      return {
        ...state,
        userFriends: action.userFriends
      };
    case VIDEO_CALL_DATA_VIDEO_LOCAL:
      return {
        ...state,
        urlVideoLocal: action.urlVideoLocal
      };
    case VIDEO_CALL_DATA_VIDEO_SERVER:
      return {
        ...state,
        urlVideoServer: action.urlVideoServer
      };
    case VIDEO_CALL_START_CALL_SUCCESS:
      return {
        ...state,
        urlVideoServer: action.urlVideoServer
      };
    case VIDEO_CALL_LISTENER_END_CALL_SERVER:
      return state;
    case VIDEO_CALL_ACTION_MESSAGE_CALLBACK:
    return {
      ...state,
      actionCallback: action.actionCallback
    }; 
    case VIDEO_CALL_LISTENER_NEW_MESSAGE: 
    return {
      ...state,
      newMessage: action.message
    };
    default:
      return state;
  }
};



