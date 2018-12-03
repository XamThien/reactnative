import {
  VIDEO_CALL_CREATE_SOCKET_RTC,
  VIDEO_CALL_MAKE_CALL,
  VIDEO_CALL_FINISH_CALL,
  VIDEO_CALL_RECEIVER_CALL,
  VIDEO_CALL_SEND_MESSAGE,
  VIDEO_CALL_DISCONNECT,
  VIDEO_CALL_CHANGE_LOCAL_STREAM,
  VIDEO_CALL_ADD_NEW_FRIEND
} from "./ActionType";

export const onCreateSocketRTC = (dataUser, dataFriends) => {
  return {
    type: VIDEO_CALL_CREATE_SOCKET_RTC,
    dataUser,
    dataFriends
  };
};

export const onMakeCall = userFriend => {
  return {
    type: VIDEO_CALL_MAKE_CALL,
    userFriend
  };
};
export const onFinishCall = dataPartner => {
  return {
    type: VIDEO_CALL_FINISH_CALL,
    dataPartner
  };
};
export const onReceiverCall = () => {
  return {
    type: VIDEO_CALL_RECEIVER_CALL
  };
};
export const onSendMessage = (userFriend, message) => {
  return {
    type: VIDEO_CALL_SEND_MESSAGE,
    userFriend, 
    message
  };
};
export const onDisconnect = () => {
  return {
    type: VIDEO_CALL_DISCONNECT
  };
};
export const onChangeLocalStream = () => {
  return {
    type: VIDEO_CALL_CHANGE_LOCAL_STREAM
  };
};

export const onAddNewPatients = (dataPatients) => {
  return {
    type: VIDEO_CALL_ADD_NEW_FRIEND,
    dataPatients
  };
};
