import {
    VIDEO_CALL_LISTENER_GET_FRIEND_ONLINE, 
    VIDEO_CALL_LISTENER_NEW_FRIEND_ONLINE, 
    VIDEO_CALL_DATA_VIDEO_LOCAL,
    VIDEO_CALL_DATA_VIDEO_SERVER,
    VIDEO_CALL_START_CALL_SUCCESS,
    VIDEO_CALL_LISTENER_END_CALL_SERVER,
    VIDEO_CALL_ACTION_MESSAGE_CALLBACK,

    VIDEO_CALL_GET_ALL_DOCTOR,
    VIDEO_CALL_GET_ALL_DOCTOR_SUCCESS,
    VIDEO_CALL_NEW_DOCTOR_ONLINE,
    VIDEO_CALL_NEW_DOCTOR_OFFLINE,
    VIDEO_CALL_LISTENER_NEW_CALL,
    VIDEO_CALL_LISTENER_NEW_MESSAGE,

    SCHEDULE_MESSAGE_EVENTS_CALLBACK,
    VIDEO_CALL_RESET_MESSAGE_CALLBACK

} from "../actions/ActionType";

export const _INITIAL_STATE = {
    isConnected: false,
    userFriends: [],
    urlVideoLocal: null,
    urlVideoServer: null,
    actionCallback: null,
    newCallFriend: {},
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
    //console.log(`nvTien - VideoCallReducer start call success...  ` + action.type + " url server: " + action.urlVideoServer);
      return {
        ...state,
        urlVideoServer: action.urlVideoServer
      };
    case VIDEO_CALL_LISTENER_END_CALL_SERVER:
      return state;
    case VIDEO_CALL_LISTENER_NEW_MESSAGE: 
    return {
      ...state,
      newMessage: action.message
    };
    case VIDEO_CALL_LISTENER_NEW_CALL:
    return {
      ...state,
      newCallFriend: action.userFriend
    }; 
    case VIDEO_CALL_ACTION_MESSAGE_CALLBACK:
    return {
      ...state,
      actionCallback: action.actionCallback,
    }; 
    default:
      return state;
  }
};



