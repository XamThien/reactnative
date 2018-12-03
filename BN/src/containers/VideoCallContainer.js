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
  onAddNewDoctors,
  onSwitchCamera, onCamControl, onSoundControl, onMicControl
} from "../actions/VideoCallAction";

const mapStateToProps = state => {
  return {
    userFriends: state.listenerVideocallReducers.userFriends,
    urlVideoLocal: state.listenerVideocallReducers.urlVideoLocal,
    urlVideoServer: state.listenerVideocallReducers.urlVideoServer,
    actionCallback: state.listenerVideocallReducers.actionCallback,
    newCallFriend: state.listenerVideocallReducers.newCallFriend,
    newMessage: state.listenerVideocallReducers.newMessage,
    //lấy danh sách doctor được get ra từ reducer của schedule 
    dataDoctors: state.specializedReducers.doctorData,
    
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
    onReceiverCall: (userFriend) => {
      dispatch(onReceiverCall(userFriend));
    },
    onChangeLocalStream: () => {
      dispatch(onChangeLocalStream());
    },
    onSendMessage: () => {
      dispatch(onSendMessage());
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
