
import {
  VIDEO_CALL_CHANGE_LOCAL_STREAM,
  VIDEO_CALL_CREATE_SOCKET_RTC,
  VIDEO_CALL_DISCONNECT,
  VIDEO_CALL_FINISH_CALL,
  VIDEO_CALL_LISTENER_BUSY_CALL,
  VIDEO_CALL_LISTENER_DISCONECT_FRIEND,
  VIDEO_CALL_LISTENER_END_CALL_SERVER,
  VIDEO_CALL_LISTENER_GET_FRIEND_ONLINE,
  VIDEO_CALL_LISTENER_NEW_CALL,
  VIDEO_CALL_LISTENER_NEW_FRIEND_ONLINE,
  VIDEO_CALL_LISTENER_NEW_MESSAGE,
  VIDEO_CALL_MAKE_CALL,
  VIDEO_CALL_RECEIVER_CALL,
  VIDEO_CALL_SEND_MESSAGE,
  VIDEO_CALL_START_CALL_SUCCESS,
  VIDEO_CALL_DATA_VIDEO_LOCAL,
  VIDEO_CALL_DATA_VIDEO_SERVER,
  VIDEO_CALL_RESET_DATA_SOCKET,
  VIDEO_CALL_ADD_NEW_FRIEND,
  VIDEO_CALL_ACTION_MESSAGE_CALLBACK,
  VIDEO_CALL_RESET_MESSAGE_CALLBACK,

  //controller
  VIDEO_CALL_SWITCH_CAMERA,
  VIDEO_CALL_CAM_CONTROL,
  VIDEO_CALL_MIC_CONTROL,
  VIDEO_CALL_SOUND_CONTROL

} from "../actions/ActionType";
import {
    MediaStream,
    RTCView,
    MediaStreamTrack,
    getUserMedia} from 'react-native-webrtc';
import {createSocketRTC, makeCall, finishCall, receiveCall, sendMsg, changeLocalStream, addNewFriend} from "../lib/rtcLib";
  //Saga effects
import {put, takeLatest, take, all} from "redux-saga/effects";
//do vấn đề conflic với native-base, cho nên phải install redux-saga trước, sau đó mới install native-base
import {channel, buffers} from "redux-saga";
import { Api } from './Api';
import Constants from "../commons/Constants";
import { AsyncStorage, Platform } from "react-native";
import {Translate} from "../utils/Language"
import DefineKey from "../config/language/DefineKey";
import {convertMilliToTime, convertDateToMillisecond, isEmptyObject} from "../utils/Utils";

let config = {'socketURL':'https://dev-rtc.herokuapp.com/'};
//biến lưu trữ dữ liệu ban đầu của bác sĩ được lấy về từ api get doctor trong schedule
var dataNewDoctorsLocal = [];
//danh sách bác sĩ sau khi đã merge status online, offline từ callback socket, dữ liệu này sẽ được update liên tục và mới nhất
var dataDoctorsRTC = [];
var friendAllList = [];
var dataDoctorsOnline = [];
var mLocalStream = null;
var mIsConnectSuccess = false;
const channelCreateSocket = channel(buffers.expanding());
const channelMakeCall = channel(buffers.expanding());
const channelFinishCall = channel(buffers.expanding());

const channelSendMessage = channel(buffers.expanding());
const channelChageLocalStream = channel(buffers.expanding());
const channelReceiverData = channel(buffers.expanding());
const channelAddNewFriends = channel(buffers.expanding());

//Channel controller
const channelSwitchCamera = channel(buffers.expanding());
const channelCamControl = channel(buffers.expanding());
const channelMicControl = channel(buffers.expanding());
const channelSoundControl = channel(buffers.expanding());

var defaultUserId = 'p1';
var defaultUserType = 1;
var isSocketConnected = false;

function* onCreateSocketRTC(action) {
  console.log(`nvTien - VideoCallSagas onCreateSocketRTC dataUser... ${JSON.stringify(action.dataUser)}`);
  try {
    yield put({ type: VIDEO_CALL_RESET_DATA_SOCKET });
    if(isSocketConnected) {
      return;
    }

    let dataUser = action.dataUser;
    friendAllList = action.dataFriends;
    defaultUserId = dataUser.userId;
    defaultUserType = dataUser.userType;

    let callback = {
      getFriendOnlineCB: getFriendOnlineCB, //Khi co danh sach ban online tra ve
      newFriendOnlineCB: newFriendOnlineCB, //khi co them 1 user online
      disconectFriend: disconectFriend, // khi co 1 user disconect
      startCallSuccessCB: startCallSuccessCB, // khi start call success
      endCallCB: endCallCB, // Khi yeu cau ket thuc cuoc goi
      onNewCallCB: onNewCallCB, // khi co cuoc goi moi đến, sử lí phía người nhận
      onNewMsgCB: onNewMsgCB, // khi co tin nhan moi
      onBusyCallCB: onBusyCallCB, // người gọi thứ 3 sẽ nhận được hàm này
      onConnectSocket: onConnectSocket,
      onDisconectSocket: onDisconectSocket
    };
    yield createSocketRTC(config, dataUser, callback);
    isSocketConnected = true;
    while (true) {
      const action = yield take(channelCreateSocket);
      yield put(action);
    }
  } catch (error) {}
}

export function* watchOnCreateSocketRTC() { 
    yield takeLatest(VIDEO_CALL_CREATE_SOCKET_RTC, onCreateSocketRTC);
    // const action = yield take(channelCreateSocket);
    // yield put(action);
}

function* onMakeCall(action) {
  let userFriend = action.userFriend;
  console.log("nvTien - VideoCallSagas onMakeCall...userFriend: " + userFriend);
  channelMakeCall.put({type: VIDEO_CALL_ACTION_MESSAGE_CALLBACK, actionCallback: ""});
  yield getLocalStream(true, true, stream => {
    console.log(`nvTien - VideoCallSagas onMakeCall return callback... ${JSON.stringify(stream)}`);
    setSelfViewSrc(stream, channelMakeCall);
    makeCall(userFriend, stream);
    mLocalStream = stream;
  });
  while (true) {
    const action = yield take(channelMakeCall);
    yield put(action);
  }
}
export function* watchOnMakeCall() { 
    yield takeLatest(VIDEO_CALL_MAKE_CALL, onMakeCall);
    // const action = yield take(channelMakeCall);
    // yield put(action);
}

function* onFinishCall(action) {
    let dataPartner = action.dataPartner;
    console.log(`nvTien - VideoCallSaga data: ${JSON.stringify(dataPartner)} `)
    if (!isEmptyObject(dataPartner)) {
        finishCall(dataPartner);
    }
    setSelfViewSrc(null, channelFinishCall);
    resetVideoView(channelFinishCall);
    
    channelFinishCall.put({type: VIDEO_CALL_ACTION_MESSAGE_CALLBACK, actionCallback: ""});
    while (true) {
        const action = yield take(channelFinishCall);
        yield put(action);
    }
}
export function* watchOnFinishCall() { 
    yield takeLatest(VIDEO_CALL_FINISH_CALL, onFinishCall);
    // const action = yield take(channelFinishCall);
    // yield put(action);
}

function* onReceiverCall(action) {
  try {
    let userFriend = action.userFriend;
    console.log("nvTien - VideoCallSagas onReceiverCall...userFriend: " + userFriend);
    channelReceiverData.put({type: VIDEO_CALL_ACTION_MESSAGE_CALLBACK, actionCallback: ""});
   
    yield getLocalStream(true, true, stream => {
      console.log(`nvTien - VideoCallSagas onReceiverCall return callback... ${JSON.stringify(stream)}`);
      setSelfViewSrc(stream, channelReceiverData);
      changeLocalStream(stream);
      receiveCall(userFriend);
    });
    
    while (true) {
      const action = yield take(channelReceiverData);
      yield put(action);
    }
  } catch (error) {}
}
export function* watchOnReceiverCall() { 
    yield takeLatest(VIDEO_CALL_RECEIVER_CALL, onReceiverCall);
    // const action = yield take(channelReceiverData);
    // yield put(action);
}

function* onChangeLocalStream(action) {
  try {
    
  } catch (error) {}
}
export function* watchOnChangeLocalStream() { 
    yield takeLatest(VIDEO_CALL_CHANGE_LOCAL_STREAM, onChangeLocalStream);
    // const action = yield take(channelChageLocalStream);
    // yield put(action);
}

function* onSendMessage(action) {
  try {
    let userFriend = action.userFriend;
    let message = action.message;
    sendMsg(userFriend,message);
  } catch (error) {}
}

export function* watchOnSendMessage() { 
    yield takeLatest(VIDEO_CALL_SEND_MESSAGE, onSendMessage);
}

//kiem tra trang thai online cua friends
function* onAddNewFriends(action) {
  try {
    console.log(`nvTien - VideoCallSagas onAddNewFriends...data doctors ${JSON.stringify(action.dataDoctors)}`);
    yield put({ type: VIDEO_CALL_RESET_MESSAGE_CALLBACK, actionCallbackDoctor: ""});
    let inputDoctors = action.dataDoctors;
    dataNewDoctorsLocal = inputDoctors;
    let formatDoctors = yield formatDataDoctor(inputDoctors);
    yield addNewFriend(formatDoctors);
  } catch (error) {

  }
}

export function* watchOnAddNewFriends() { 
    yield takeLatest(VIDEO_CALL_ADD_NEW_FRIEND, onAddNewFriends);
    // const action = yield take(channelSendMessage);
    // yield put(action);
}

function* onSwitchCamera(action) {
  try {
    let isFrontCam = action.isFrontCamera;
    let isOnMic = action.isOnMic;
    console.log(`nvTien - VideoCallSagas onSwitchCamera... `+ isFrontCam + " isOnMic " + isOnMic);
    yield getLocalStream(isFrontCam, isOnMic, stream => {
      setSelfViewSrc(stream, channelSwitchCamera);
      changeLocalStream(stream);
      
    });
    while (true) {
      const action = yield take(channelSwitchCamera);
      yield put(action);
    }
  } catch (error) {

  }
}

export function* watchOnSwitchCamera() { 
    yield takeLatest(VIDEO_CALL_SWITCH_CAMERA, onSwitchCamera);
}

function* onMicControl(action) {
  try {
    let isOnMic = action.isOnMic;
    let isFrontCam = action.isFrontCam;
    console.log(`nvTien - VideoCallSagas onMicControl...mic `+ isOnMic + " isFrontCam " + isFrontCam);
    yield getLocalStream(isFrontCam, isOnMic, stream => {
      setSelfViewSrc(stream, channelMicControl);
      changeLocalStream(stream);
      
    });
    while (true) {
      const action = yield take(channelMicControl);
      yield put(action);
    }
  } catch (error) {

  }
}

export function* watchOnMicControl() { 
    yield takeLatest(VIDEO_CALL_MIC_CONTROL, onMicControl);
}

function* onCameraControl(action) {
  try {
    let isFrontCam = action.isFrontCamera;
    console.log(`nvTien - VideoCallSagas onSwitchCamera...`+ isFrontCam);
    // yield getLocalStream(isFrontCam, true, stream => {
    //   setSelfViewSrc(stream, channelCamControl);
    //   changeLocalStream(stream);
      
    // });
    while (true) {
      const action = yield take(channelCamControl);
      yield put(action);
    }
  } catch (error) {

  }
}

export function* watchOnCameraControl() { 
    yield takeLatest(VIDEO_CALL_CAM_CONTROL, onCameraControl);
}


function* onSoundControl(action) {
  try {
    let isFrontCam = action.isFrontCamera;
    console.log(`nvTien - VideoCallSagas onSwitchCamera...`+ isFrontCam);
    // yield getLocalStream(isFrontCam, true, stream => {
    //   setSelfViewSrc(stream, channelSwitchCamera);
    //   changeLocalStream(stream);
      
    // });
    while (true) {
      const action = yield take(channelSoundControl);
      yield put(action);
    }
  } catch (error) {

  }
}

export function* watchOnSoundControl() { 
    yield takeLatest(VIDEO_CALL_SOUND_CONTROL, onSoundControl);
}

function formatDataDoctor(inputDotorsLocal) {
  let results = [];
  for(let i = 0 ; i < inputDotorsLocal.length ; i++) {
    let objectDoctor = {
      userId: inputDotorsLocal[i].doctor_id,
      userType: 0
    }
    results.push(objectDoctor);
  }
  return results;
}


//listener callback connect server rtc
function getFriendOnlineCB(data){
    console.log(`nvTien - VideoCallSagas getFriendOnlineCB ${JSON.stringify(data)}`);
    //lấy ra dữ liệu doctor mới nhất dưới local mà trước đó chưa tồn tại
    let userFriendsLocal = dataNewDoctorsLocal;
    let arrFriends = [];
    if(data == null || data.length == 0) {
      channelCreateSocket.put({type: VIDEO_CALL_LISTENER_GET_FRIEND_ONLINE, userFriends: userFriendsLocal});
    }

    //update status dữ liệu search và cần kiểm tra
    for(var i = 0; i < data.length; i++){
      for(var j = 0; j < userFriendsLocal.length;j++){
        let objectFriend = userFriendsLocal[j];
        if(objectFriend.doctor_id == data[i].userId){
          objectFriend.isonline = true;
        }
        userFriendsLocal[j] = objectFriend;
      }
    }
    if(dataDoctorsRTC.length == 0) {
      dataDoctorsRTC = userFriendsLocal;
    } else {
      //update status dữ liệu lưu trữ để thực hiện merge cho lần sau, khi đó không cần phải gửi lên server để kiểm tra và kiểm tra trực tiếp trong list này
      for(var i = 0; i < data.length; i++){
        for(var j = 0; j < dataDoctorsRTC.length;j++){
          if(dataDoctorsRTC[j].doctor_id == data[i].userId){
            dataDoctorsRTC[j].isonline = true;
          }
        }
      }
    }
    //new data friend for update flatlist
    for(let i = 0 ; i < userFriendsLocal.length ; i++) {
      let friend = userFriendsLocal[i];
      arrFriends.push(friend);
    }
    console.log(`nvTien - VideoCallSagas getFriendOnlineCB UpdateData friends ${JSON.stringify(arrFriends)}`);
    // console.log(`nvTien - VideoCallSagas getFriendOnlineCB UpdateData dataDoctorsRTC ${JSON.stringify(dataDoctorsRTC)}`);
    // console.log(`nvTien - VideoCallSagas getFriendOnlineCB UpdateData dataNewDoctorsLocal ${JSON.stringify(dataNewDoctorsLocal)}`);
    channelCreateSocket.put({type: VIDEO_CALL_LISTENER_GET_FRIEND_ONLINE, userFriends: arrFriends});
}

function newFriendOnlineCB (user){
    console.log(`nvTien - VideoCallSagas newFriendOnlineCB ${JSON.stringify(user)}`);
    var isFound = false;
    let arrFriends = [];
    if (dataDoctorsRTC == null) {
      console.log(`nvTien - VideoCallSagas dataDoctorsRTC is null`);
      return;
    }
    for(var i = 0;i < dataDoctorsRTC.length;i++){
      if(dataDoctorsRTC[i].doctor_id == user.userId){
        isFound = true;
        dataDoctorsRTC[i].isonline = true;
      }
    }
    if(isFound){
        //userFriends.push({userId:user.userId,userType:user.userType,active:true});
        if(dataNewDoctorsLocal == null && dataNewDoctorsLocal 
          == undefined && dataNewDoctorsLocal.length == 0) {
          return;
        }
        for(var i = 0;i < dataNewDoctorsLocal.length;i++){
          let objectDoctor = dataNewDoctorsLocal[i];
          if(objectDoctor.doctor_id == user.userId){
            objectDoctor.isonline = true;
          }
          arrFriends.push(objectDoctor);
        }
    }
    dataNewDoctorsLocal = arrFriends;
    console.log(`nvTien - VideoCallSagas newFriendOnlineCB UpdateData friends ${JSON.stringify(arrFriends)}`);
    channelCreateSocket.put({type: VIDEO_CALL_LISTENER_GET_FRIEND_ONLINE, userFriends: arrFriends});

}

function disconectFriend (user){
    console.log(`nvTien - VideoCallSagas disconectFriend ${JSON.stringify(user)}`);
    var isFound = false;
    let arrFriends = [];
  
    for(var i = 0;i < dataDoctorsRTC.length;i++){
      if(dataDoctorsRTC[i].doctor_id == user.userId){
        isFound = true;
        dataDoctorsRTC[i].isonline = false;
      }
    }
    if(isFound){
        //userFriends.push({userId:user.userId,userType:user.userType,active:true});
        if(dataNewDoctorsLocal == null && dataNewDoctorsLocal 
          == undefined && dataNewDoctorsLocal.length == 0) {
          return;
        }
        for(var i = 0;i < dataNewDoctorsLocal.length;i++){
          let objectDoctor = dataNewDoctorsLocal[i];
          if(objectDoctor.doctor_id == user.userId){
            objectDoctor.isonline = false;
          }
          arrFriends.push(objectDoctor);
        }
    }
    console.log(`nvTien - VideoCallSagas disconectFriend UpdateData friends ${JSON.stringify(dataNewDoctorsLocal)}`);
    channelCreateSocket.put({type: VIDEO_CALL_LISTENER_GET_FRIEND_ONLINE, userFriends: arrFriends});
}

//call back start call success, return from rtc server
function startCallSuccessCB(user, stream) {
    console.log(`nvTien - VideoCallSagas startCallSuccessCB ${JSON.stringify(user)} 
    dataStream ${JSON.stringify(stream)} stream ` + stream);
    //trang thai call success, tra ve user id va stream cua customer
    if(stream != null) {
      console.log(`nvTien - VideoCallSagas set streamURLPartner URL.... ` + stream.toURL()); 
      channelCreateSocket.put({type: VIDEO_CALL_ACTION_MESSAGE_CALLBACK, actionCallback: "VIDEOCALL_LISTENER_START_CALL_SUCCESS"});
      channelCreateSocket.put({type: VIDEO_CALL_START_CALL_SUCCESS, urlVideoServer: stream.toURL()});
    }
}

function endCallCB (user) {
    console.log(`nvTien - VideoCallSagas endCallCB ${JSON.stringify(user)}`);
    setSelfViewSrc(null, channelCreateSocket);
    resetVideoView(channelCreateSocket);
    channelCreateSocket.put({type: VIDEO_CALL_ACTION_MESSAGE_CALLBACK, actionCallback: "VIDEOCALL_LISTENER_ENDCALL_CB"});
    channelCreateSocket.put({type: VIDEO_CALL_LISTENER_END_CALL_SERVER, isEncall: true})
}

function onNewCallCB (user){
    console.log(`nvTien - VideoCallSagas onNewCallCB ${JSON.stringify(user)}`);
    let userFriend = getFriendIncomingCall(user);
    channelCreateSocket.put({type: VIDEO_CALL_LISTENER_NEW_CALL, userFriend: userFriend});
    channelCreateSocket.put({type: VIDEO_CALL_ACTION_MESSAGE_CALLBACK, actionCallback: "VIDEOCALL_LISTENER_NEW_CALL_CB"});
}

function onNewMsgCB(user,msg) {
    console.log(`nvTien - VideoCallSagas onNewMsgCB ${JSON.stringify(user)} + message ${JSON.stringify(msg)}` );
    let message = {
      userFriend: user,
      message: msg
    }
    channelCreateSocket.put({type: VIDEO_CALL_LISTENER_NEW_MESSAGE, message: message })
    channelCreateSocket.put({type: VIDEO_CALL_ACTION_MESSAGE_CALLBACK, actionCallback: "VIDEOCALL_LISTENER_NEW_MESSAGE_CB"});
    
  }

  //xử lí khi gọi nhưng máy bận
function onBusyCallCB (user){
    console.log(`nvTien - VideoCallSagas onBusyCallCB ${JSON.stringify(user)} ` );
    channelCreateSocket.put({type: VIDEO_CALL_ACTION_MESSAGE_CALLBACK, actionCallback: "VIDEOCALL_LISTENER_BUSY_CB"});
    channelCreateSocket.put({type: VIDEO_CALL_LISTENER_BUSY_CALL});
}

function onConnectSocket() {
  console.log(`nvTien - VideoCallSagas onConnectSocket...` );
  channelCreateSocket.put({type: VIDEO_CALL_ACTION_MESSAGE_CALLBACK, actionCallback: "VIDEO_CALL_ONCONNECT_SOCKET"});
}

function onDisconectSocket() {
  console.log(`nvTien - VideoCallSagas onDisconectSocket...` );
  channelCreateSocket.put({type: VIDEO_CALL_ACTION_MESSAGE_CALLBACK, actionCallback: "VIDEO_CALL_DISCONNECT_SOCKET"});
}

function setSelfViewSrc(stream, channelPutData) {
    releaseOldCam();
    console.log( "nvTien - VideoCallSagas setSelfViewSrc stream " + stream);
    //this.setState({localStream: stream});
    mLocalStream = stream;
    if(stream != null) {
        console.log( "nvTien - VideoCallSagas setSelfViewSrc set url Videolocal " + stream.toURL());
        channelPutData.put({type: VIDEO_CALL_DATA_VIDEO_LOCAL, urlVideoLocal: stream.toURL()});
        console.log( "nvTien - VideoCallSagas setSelfViewSrc set end put type:   " );
    }
}

function getFriendIncomingCall(userFriend) {
  let friend = userFriend;
  if(dataDoctorsRTC != null && dataDoctorsRTC.length != 0) {
    for(let i = 0 ; i < dataDoctorsRTC.length ; i++) {
        let objectFriend = dataDoctorsRTC[i];
        if(objectFriend.doctor_id === userFriend.userId) {
          friend = {...friend, name: objectFriend.name};
        }
    }
  }

  return friend;
}

function releaseOldCam() {
  if (mLocalStream) {
    mLocalStream.getTracks().forEach(t => t.stop());
    mLocalStream.release();
    mLocalStream = null;
  }
}
//reset videoview, realese video đang chạy, sau khi nhận được listener kết thúc videocall
function resetVideoView(channelPutData) {
    console.log(`nvTien - VideoCallSagas resetVideoView.... `);
    channelPutData.put({type: VIDEO_CALL_DATA_VIDEO_LOCAL, streamURLLocal: null});
    channelPutData.put({type: VIDEO_CALL_DATA_VIDEO_SERVER, streamURLPartner: null});
    console.log(`nvTien - VideoCallSagas resetVideoView end put data reducers.... `);
}


function getLocalStream(isFront, isAudio, callback) {
  console.log(`nvTien - getLocalStream...`);
    let videoSourceId;
    // on android, you don't have to specify sourceId manually, just use facingMode
    // uncomment it if you want to specify
    if (Platform.OS === 'ios') {
      MediaStreamTrack.getSources(sourceInfos => {
        console.log("sourceInfos: ", sourceInfos);
  
        for (const i = 0; i < sourceInfos.length; i++) {
          const sourceInfo = sourceInfos[i];
          if(sourceInfo.kind == "video" && sourceInfo.facing == (isFront ? "front" : "back")) {
            videoSourceId = sourceInfo.id;
          }
        }
      });
    }
    getUserMedia({
      audio: isAudio,
      video: {
        mandatory: {
          minWidth: 640, // Provide your own width, height and frame rate here
          minHeight: 360,
          minFrameRate: 30,
        },
        facingMode: (isFront ? "user" : "environment"),
        optional: (videoSourceId ? [{sourceId: videoSourceId}] : []),
      }
    }, function (stream) {
      console.log('nvTien - getUserMedia success', stream);
      callback(stream);
    }, error => {
      console.log("nvTien - getUserMedia OutGoing..logError", error);
        throw error;
    });
  }











