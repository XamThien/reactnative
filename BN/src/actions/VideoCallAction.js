import {
  VIDEO_CALL_CREATE_SOCKET_RTC,
  VIDEO_CALL_MAKE_CALL,
  VIDEO_CALL_FINISH_CALL,
  VIDEO_CALL_RECEIVER_CALL,
  VIDEO_CALL_SEND_MESSAGE,
  VIDEO_CALL_DISCONNECT,
  VIDEO_CALL_CHANGE_LOCAL_STREAM,
  VIDEO_CALL_ADD_NEW_FRIEND,
  //controll videocall
  VIDEO_CALL_SWITCH_CAMERA,
  VIDEO_CALL_CAM_CONTROL,
  VIDEO_CALL_MIC_CONTROL,
  VIDEO_CALL_SOUND_CONTROL,
  
} from "./ActionType";

export const onCreateSocketRTC = (dataUser, dataFriends) => {
  return {
    type: VIDEO_CALL_CREATE_SOCKET_RTC,
    dataUser,
    dataFriends
  };
};

export const onMakeCall = (userFriend) => {
  return {
    type: VIDEO_CALL_MAKE_CALL,
    userFriend
  };
};
export const onFinishCall = (dataPartner) => {
  return {
    type: VIDEO_CALL_FINISH_CALL,
    dataPartner
  };
};
export const onReceiverCall = (userFriend) => {
  return {
    type: VIDEO_CALL_RECEIVER_CALL,
    userFriend
  };
};
export const onSendMessage = () => {
  return {
    type: VIDEO_CALL_SEND_MESSAGE
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

export const onAddNewDoctors = (dataDoctors) => {
  return {
    type: VIDEO_CALL_ADD_NEW_FRIEND,
    dataDoctors
  };
};

export const onSwitchCamera = (isFrontCamera, isOnMic) => {
  return {
    type: VIDEO_CALL_SWITCH_CAMERA,
    isFrontCamera,
    isOnMic
  };
};

export const onCamControl = (isOnCamera) => {
  return {
    type: VIDEO_CALL_CAM_CONTROL,
    isOnCamera
  };
};

export const onMicControl = (isOnMic, isFrontCam) => {
  return {
    type: VIDEO_CALL_MIC_CONTROL,
    isOnMic,
    isFrontCam
  };
};

export const onSoundControl = (isOnSound) => {
  return {
    type: VIDEO_CALL_SOUND_CONTROL,
    isOnSound
  };
};

