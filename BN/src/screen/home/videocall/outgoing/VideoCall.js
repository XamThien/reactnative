import React, { Component } from "react";
import { StyleSheet, ScrollView, ImageBackground,Image, 
  TouchableWithoutFeedback, TouchableOpacity, Platform, Dimensions, Vibration, AsyncStorage } from "react-native";
import { SafeAreaView } from "react-navigation";
import {
  Container,
  Header,
  Content,
  Button,
  Text,
  H1,
  H2,
  H3,
  View,
  Thumbnail,
  Left,
  Right,
  Body,
  Icon,
  Title
} from "native-base";
import KeepAwake from 'react-native-keep-awake';
import { RTCView, MediaStreamTrack, getUserMedia } from "react-native-webrtc";
import Sound from 'react-native-sound';
import ScreenName from '../../../../commons/ScreenName';
import styles from "./VideoCallStyle";
import { isEmptyObject } from "../../../../utils/Utils";
import Constants from "../../../../commons/Constants";
import DialogVideoCallIncoming from "../../../../components/DialogVideoCallIncoming";

var {height, width} = Dimensions.get('window');
const STEP_TIMEOUT = 1000;
var initTimer = 0;
const DURATION = 10000;
const PATTERN = [1000, 2000, 3000];
const USER_TYPE = 1;

import { RNNotificationBanner } from 'react-native-notification-banner';
//import Icon from 'react-native-vector-icons/FontAwesome'

export default class VideoCall extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowBgImage: true,
      isShowControl: true,
      patientId: '',
      dataUser: {},
      isVideo: true,
      isAudio: false,
  
      calling: false,
      makeCall: false,
      isVideoIncoming: false,
      hasNewCall: false,
      
      isOnCamera: true,
      isFrontCamera: true,
      isOnMic: true,
      isOnSound: true,

      streamURLLocal: null,
      streamURLServer: null,
      streamURL: "",
      localStream: null,
      isMeetingStarted: true,
      timerCounter: "00:00",
      timerCounterMilli: 0,
      timer: null,
      ringSound: null,

    };
    this.tick = this.tick.bind(this);
   
  }

  componentWillMount = () => {
    
  };
  

  componentDidMount() {
    this.initIncomingVideocall();
  };


  testShowNotify(title, message) {
    //TYPE Normal, Info, Success, Warn, Error, 
    RNNotificationBanner.Info({ title: 'Message', subTitle: "Sub Message", duration: 1 });
  }

  componentWillReceiveProps(props) {
    this.loadUrlVideoLocal(props.urlVideoLocal);
    this.loadUrlVideoServer(props.urlVideoServer);
    this.handleActionCallback(props.actionCallback, props);
  
}
  tick() {
    let countTime = (this.state.timerCounterMilli + STEP_TIMEOUT);
    //this.millisToMinutesAndSeconds(initTimer);
    var minutes = Math.floor(countTime / 60000);
    var seconds = ((countTime % 60000) / 1000).toFixed(0);
    let timer = minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    this.setState({timerCounter: timer, timerCounterMilli: countTime});
    console.log("nvTien - Timer counter..." + countTime + " timer: " + timer);
  }

  startTimer() {
  //   console.log("nvTien - startTimer....");
  //   //let timer = setInterval(this.tick, 1000);
  //   this.setState({timer: timer});
  }

  clearTimer() {
    clearInterval(this.state.timer);
  }

  playVibration() {
    Vibration.vibrate(PATTERN, true)
  }

  cancelVibration() {
    Vibration.cancel();
  }

  playRingStone() {
    const sound = new Sound('https://8cdxlx00-a.akamaihd.net/downloads/ringtones/files/mp3/7120-download-iphone-6-original-ringtone-42676.mp3', null, (error) => {
      if (error) {
        // do something
        console.log("nvTien - VideoCall playRingStone error: " + error);
      }
      console.log("nvTien - VideoCall playRingStone success: ");
      // play when loaded
      this.setState({ringSound: sound});
     // sound.play();
      // Play the sound with an onEnd callback
      sound.play((success) => {
        if (success) {
          console.log('successfully finished playing');
        } else {
          sound.reset();
        }
      });
    });
  }

  cancelRingStone() {
    if(this.state.ringSound) {
      this.state.ringSound.release();
    }
  }

  resetTimer() {
    this.setState({timerCounter: "00:00", timerCounterMilli: 0});
  }

  componentWillUnmount() {
    //this.clearTimer();
    
  }

  loadUrlVideoLocal(urlLocal) {
    console.log( "nvTien - VideoCall from componentWillReceiveProps loadUrlVideoLocal urlLocal:   " + urlLocal );
    console.log( "nvTien - VideoCall from componentWillReceiveProps loadUrlVideoLocal urlLocal SET STATE...   " );
    this.setState({streamURLLocal: urlLocal})
  }

  loadUrlVideoServer(urlServer) {
    console.log( "nvTien - VideoCall from componentWillReceiveProps loadUrlVideoLocal urlServer:   " + urlServer );
    console.log( "nvTien - VideoCall from componentWillReceiveProps loadUrlVideoLocal urlServer SET STATE...   " );
    this.setState({streamURLServer: urlServer})
    if(urlServer != null && urlServer != undefined && urlServer != "") {
      this.setState({calling: true});
    }
  }

  handleActionCallback(callbackType, props) {
    console.log("nvTien - VideoCall handleActionCallback: " + callbackType );
    if(callbackType === Constants.VIDEOCALL_LISTENER_START_CALL_SUCCESS) {
      console.log("nvTien - VideoCall handleActionCallback change state call success ");
        //this.startTimer();
        this.cancelVibration();
        this.cancelRingStone();
        this.setState({calling: true, isVideoIncoming: false});
    } else if(callbackType === Constants.VIDEOCALL_LISTENER_DISCONNECT_FRIEND) {

    } else if(callbackType === Constants.VIDEOCALL_LISTENER_ENDCALL_CB) {
      console.log("nvTien - VideoCall handleActionCallback change state end call cb ");
      //this.clearTimer();
      this.cancelVibration();
      this.cancelRingStone();
      this.setState({calling: false, isVideoIncoming: false});
      this.props.navigation.pop();
    } else if(callbackType === Constants.VIDEOCALL_LISTENER_NEW_CALL_CB) {
      console.log("nvTien - VideoCall handleActionCallback change state new call cb ");
      //this.resetTimer();
      
    } else if(callbackType === Constants.VIDEOCALL_LISTENER_NEW_MESSAGE_CB) {
      console.log("nvTien - loadData new message... ");
      this.loadNewMessage(props.newMessage);
    } else if(callbackType === Constants.VIDEOCALL_LISTENER_BUSY_CB) {
      this.cancelRingStone();
      this.cancelVibration();
    } else {

    }
  }

  initIncomingVideocall() {
    this.playRingStone();
    this.playVibration();
    this.setState({calling: false, isVideoIncoming: true});
  }

  loadNewMessage(newMessage) {
    console.log(`nvTien - newMessage: ${JSON.stringify(newMessage)}`);
  }

  getImageAcceptCall() {
    return (require("../../../../../assets/videocall/icon_video_call.png"));
  }

  getImageDeclineCall() {
    return (require("../../../../../assets/videocall/icon_decline_call.png"));
  }

  getImageOnCamera() {
    if(this.state.isOnCamera) {
      return (require("../../../../../assets/videocall/icon_camera_on.png"));
    } else
    return (require("../../../../../assets/videocall/icon_camera_off.png"));
  }

  getImageOnMic() {
    if(this.state.isOnMic) {
      return (require("../../../../../assets/videocall/icon_microphone_on.png"));
    } else
    return (require("../../../../../assets/videocall/icon_microphone_off.png"));
  }

  getImageEndCall() {
    return (require("../../../../../assets/videocall/icon_end_call.png"));
  }

  onPressBackCall() {
    if(this.state.calling || this.state.isVideoIncoming) {
      return;
    }
    this.props.navigation.pop();
  }

  onPressOnCamera() {
    if(this.state.calling) {
      this.props.onCamControl(!this.state.isOnCamera);
      this.setState({isOnCamera: !this.state.isOnCamera});
    } 
  }

  onPressSwitchCamera () {
    if(this.state.calling) {
      console.log("nvTien - Videocall onPressSwitchCamera " + (!this.state.isFrontCamera))
      this.props.onSwitchCamera(!this.state.isFrontCamera, this.state.isOnMic);
      this.setState({isFrontCamera: !this.state.isFrontCamera});
    }

  }

  onPressMic () {
    if(this.state.calling) {
      this.props.onMicControl(!this.state.isOnMic, this.state.isFrontCamera);
      this.setState({isOnMic: !this.state.isOnMic});
    }
    
  }

  onPressEndCall() {
    let userFriendCall = this.props.newCallFriend;
    var userPartner = { userId: userFriendCall.userId, userType: userFriendCall.userType };
    console.log(`nvTien - onPressEndCall...: ${JSON.stringify(userFriendCall)}`)
    this.clearTimer();
    this.props.onFinishCall(userPartner);
    this.setState({calling: false, isVideoIncoming: false});
    this.cancelVibration();
    this.cancelRingStone();
    this.props.navigation.pop();
  }

  //xử lí nhấn nút start call
  onPressStartCall () {
  //var userCallFriend = { userId: "d1", userType: 0 };
  console.log(`nvTien - onPressStartCall... userFriend = ${JSON.stringify(userCallFriend)} `);
  this.props.onMakeCall(userCallFriend);
  }

  onPressDeclineCall() {
    console.log(`nvTien - onPressDeclineCall...`);
    let userFriendCall = this.props.newCallFriend;
    var userPartner = { userId: userFriendCall.userId, userType: userFriendCall.userType };
    this.props.onFinishCall(userPartner);
    this.setState({calling: false, isVideoIncoming: false});
    this.cancelVibration();
    this.cancelRingStone();
    this.props.navigation.pop();
  }

  onPressAcceptCall() {
    let userFriendCall = this.props.newCallFriend;
    var userPartner = { userId: userFriendCall.userId, userType: userFriendCall.userType };
    console.log(`nvTien - onPressAcceptCall...: ${JSON.stringify(userFriendCall)}`)
    this.props.onReceiverCall(userPartner);

  }


onTouchShowControl() {
  this.setState({isShowControl: !this.state.isShowControl})
}

  render() {
    console.log("nvTien - VideoCall render() video local... " + this.state.streamURLLocal + " video server... " + this.state.streamURLServer);
    return <SafeAreaView style={styles.wrap_content}>
        <Container style={styles.wrap_content}>
          <ImageBackground source={require("../../../../../assets/bg_outgoing.jpg")} style={styles.container_image}>
            <TouchableWithoutFeedback style={styles.wrap_video_call} onPress={() => {
                this.onTouchShowControl();
              }}>
              <View style={styles.wrap_video_call}>
                {/* video view, hiển thị hình ảnh bệnh nhân */}
                <RTCView style={styles.videoview_partner} streamURL={this.state.streamURLServer} />
                {/* video view, hiển thị hình ảnh local của bác sĩ*/}
                <RTCView style={styles.layout_video_local} streamURL={this.state.streamURLLocal} />
              </View>
            </TouchableWithoutFeedback>
            {/* layout header video call */}
            <View style={styles.layout_header_video_call}>
              {/* left icon back */}
              <Left>
                <Button iconLeft transparent light onPress={() => {
                    this.onPressBackCall();
                  }}>
                  <Icon name="arrow-back" />
                  <Text>Back</Text>
                </Button>
              </Left>
              <Body>
              <Text style={styles.style_text}>{this.state.timerCounter}</Text>
              </Body>
              {/* right icon switch camera */}
              <Right>
                <Button transparent onPress={() => {
                   this.onPressSwitchCamera();
                  }}>
                  <Thumbnail square small source={require("../../../../../assets/icon_switch_camera.png")} style={styles.icon_switch_camera} />
                </Button>
              </Right>
            </View>

            {/* layout button footer videocall */}
            <View style={this.state.calling ? styles.layout_footer_video_call : styles.hideView}>
              <View style={styles.layout_controller_01}>
                <Button style={styles.icon_control_video} transparent onPress={() => {
                    this.onPressOnCamera();
                    //this.onPressStartCall();
                  }}>
                  <Image source={this.getImageOnCamera()} style={styles.icon_control_video} />
                </Button>
              </View>
              <View style={styles.layout_controller_02}>
                <Button style={styles.icon_control_video} transparent onPress={() => {
                    this.onPressMic();
                  }}>
                  <Image source={this.getImageOnMic()} style={styles.icon_control_video} />
                </Button>
              </View>
              <View style={styles.layout_controller_03}>
                <Button style={styles.icon_control_video} transparent light onPress={() => {
                    this.onPressEndCall();
                  }}>
                  <Image source={this.getImageEndCall()} style={styles.icon_control_video} />
                </Button>
              </View>
            </View>

              {/* layout hiển thị nút đồng ý hoặc huỷ cuộc gọi, khi có cuộc gọi đến     */}
            <View style={this.state.isVideoIncoming ? styles.layout_footer_video_call_incoming : styles.hideView}>
              <View style={styles.layout_controller_01}>
                <Button style={styles.icon_control_video} transparent onPress={() => {
                    //this.onPressOnCamera();
                    this.onPressDeclineCall();
                  }}>
                  <Image source={this.getImageDeclineCall()} style={styles.icon_control_video} />
                </Button>
              </View>
              <View style={styles.layout_controller_02}>
                <Button style={styles.icon_control_video} transparent onPress={() => {
                    this.onPressAcceptCall();
                  }}>
                  <Image source={this.getImageAcceptCall()} style={styles.icon_control_video} />
                </Button>
              </View>
              
            </View>

            <View style={this.state.isVideoIncoming ? styles.layout_infomation : styles.hideView}>
              <Thumbnail style={styles.avata_patient} large source={require("../../../../../assets/icon_app.png")} />
              <H1 style={{ marginTop: 20, color: "white" }}>
                {this.props.newCallFriend.name}
              </H1>
              <H3 style={{ marginTop: 10, color: "white" }}>
                Đang gọi...
              </H3>
            </View>
          </ImageBackground>
          <KeepAwake />
        </Container>
      </SafeAreaView>;
  }
}

