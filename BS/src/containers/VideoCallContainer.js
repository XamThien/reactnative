import { connect } from "react-redux";
import VideoCall from "../screen/home/videocall/outgoing/VideoCall";
import {
  onCreateSocketRTC,
  onMakeCall,
  onDisconnect,
  onFinishCall,
  onReceiverCall,
  onChangeLocalStream,
  onSendMessage,
  onSwitchCamera, onCamControl, onSoundControl, onMicControl
} from "../actions/VideoCallAction";

const mapStateToProps = state => {
  return {
    userFriends: state.listenerVideocallReducers.userFriends,
    urlVideoLocal: state.listenerVideocallReducers.urlVideoLocal,
    urlVideoServer: state.listenerVideocallReducers.urlVideoServer,
    actionCallback: state.listenerVideocallReducers.actionCallback,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCreateSocketRTC: (dataUser, dataFriends) => {
      dispatch(onCreateSocketRTC(dataUser, dataFriends));
    },
    onMakeCall: (userFriend) => {
      dispatch(onMakeCall(userFriend));
    },
    onDisconnect: () => {
      dispatch(onDisconnect());
    },
    onFinishCall: (dataPartner) => {
      dispatch(onFinishCall(dataPartner));
    },
    onReceiverCall: () => {
      dispatch(onReceiverCall());
    },
    onChangeLocalStream: () => {
      dispatch(onChangeLocalStream());
    },
    onSendMessage: (userFriend, message) => {
      dispatch(onSendMessage(userFriend, message));
    },
    onSwitchCamera: (isFrontCamera, isOnMic) => {
      dispatch(onSwitchCamera(isFrontCamera, isOnMic));
    },
    onCamControl: (isOnCamera) => {
      dispatch(onCamControl(isOnCamera));
    },
    onMicControl: (isOnMic, isFrontCam) => {
      dispatch(onMicControl(isOnMic, isFrontCam));
    },
    onSoundControl: (isOnSound) => {
      dispatch(onSoundControl(isOnSound));
    }
  };
};
const VideoCallContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(VideoCall);
export default VideoCallContainer;
