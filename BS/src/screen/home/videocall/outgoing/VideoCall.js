import React, { Component } from "react";
import { StyleSheet, ScrollView, ImageBackground,Image, TouchableWithoutFeedback, TouchableOpacity, Platform, Dimensions } from "react-native";
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
import styles from "./VideoCallStyle";
import { isEmptyObject } from "../../../../utils/Utils";
import Constants from "../../../../commons/Constants";
import {Translate} from "../../../../utils/Language"
import DefineKey from "../../../../config/language/DefineKey";

var {height, width} = Dimensions.get('window');

export default class VideoCall extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowBgImage: true,
      isShowControl: true,
      defaultUserId: 'd1',
      defaultUserType: 0,
      dataUser: {},
      friendName: "",
      isVideo: true,
      isAudio: false,
  
      calling: false,
      isVideoIncoming: false,
      isHideController: false,
      isHideViewName: false,
      makeCall: false,
      hasNewCall: false,

      isOnCamera: true,
      isFrontCamera: true,
      isOnMic: true,
      isOnSound: true,
      
      streamURLLocal: null,
      streamURLServer: null,
      streamURL: "",
      localStream: null,
      ringSound: null

    };
  }

  componentWillMount = () => {
    
  };
  

  componentDidMount() {
    const friendID = this.props.navigation.getParam(Constants.KEY_INTENT_CALL_FRIEND_ID, "");
    const friendName = this.props.navigation.getParam(Constants.KEY_INTENT_CALL_FRIEND_NAME, "");
    const friendType = 1;
    this.onPressStartCall(friendID, friendType);
    this.setState({friendName: friendName});

  }

  componentWillReceiveProps(props) {
      this.updateUserFriends(props.userFriends);
      this.loadUrlVideoLocal(props.urlVideoLocal);
      this.loadUrlVideoServer(props.urlVideoServer);
      this.handleActionCallback(props.actionCallback)
  }

  updateUserFriends(userFriends) {
    //let dataUsers = props.userFriends;
    console.log(`nvTien - VideoCall loadDataUserFriends dataUserFriends... ${JSON.stringify(userFriends)} `);
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
    // if(urlServer != null && urlServer != undefined && urlServer != "") {
    //   this.setState({calling: true});
    // }
  }

  handleActionCallback(callbackType) {
    let result = (callbackType === Constants.VIDEOCALL_LISTENER_NEW_CALL_CB);
    console.log("nvTien - VideoCall handleActionCallback: " + callbackType + " result: " + result);
    if(callbackType === Constants.VIDEOCALL_LISTENER_START_CALL_SUCCESS) {
      console.log("nvTien - VideoCall handleActionCallback change state call success ");
        //this.startTimer();
        if(!this.state.calling) {
        this.cancelRingStone();
        this.setState({calling: true, isVideoIncoming: false, isHideController: false, isHideViewName: true});
      }
    } else if(callbackType === Constants.VIDEOCALL_LISTENER_DISCONNECT_FRIEND) {

    } else if(callbackType === Constants.VIDEOCALL_LISTENER_ENDCALL_CB) {
      console.log("nvTien - VideoCall handleActionCallback change state end call cb ");
      //this.clearTimer();
       this.cancelRingStone();
      this.setState({calling: false, isVideoIncoming: false, isHideController: true, isHideViewName: true});
    } else if(callbackType === Constants.VIDEOCALL_LISTENER_NEW_CALL_CB) {
      console.log("nvTien - VideoCall handleActionCallback change state new call cb ");
      //this.resetTimer();
      this.playRingStone();
      this.setState({calling: false, isVideoIncoming: true, isHideController: false, isHideViewName: false});
    } else if(callbackType === Constants.VIDEOCALL_LISTENER_NEW_MESSAGE_CB) {
      
    } else if(callbackType === Constants.VIDEOCALL_LISTENER_BUSY_CB) {
      this.cancelRingStone();
    } else {

    }
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

  onPressOnOffCamera() {
    console.log("nvTien - onPressOnOffCamera...: ")
  }

  onPressSwitchCamera () {
    if(this.state.calling) {
      console.log("nvTien - Videocall onPressSwitchCamera " + (!this.state.isFrontCamera))
      this.props.onSwitchCamera(!this.state.isFrontCamera, this.state.isOnMic);
      this.setState({isFrontCamera: !this.state.isFrontCamera});
    }

  }

  onPressMic () {
    this.setState({isOnMic: !this.state.isOnMic});
  }

  onPressEndCall() {
    console.log("nvTien - onPressEndCall...: ")
    this.setState({calling: false, isVideoIncoming: false, isHideController: true, isHideViewName: true}); 
    const friendID = this.props.navigation.getParam(Constants.KEY_INTENT_CALL_FRIEND_ID, "");
    const friendType = 1;
    var userPartner = { userId: friendID, userType: friendType };
    this.props.onFinishCall(userPartner);
    this.cancelRingStone();
    
  }

  //xử lí nhấn nút start call
  onPressStartCall (friendID, friendType) {
  console.log(`nvTien - onPressStartCall...`);
  this.playRingStone();
  var userCallFriend = { userId: friendID, userType: friendType};
  this.props.onMakeCall(userCallFriend);
}

onPressBackCall() {
  if(!this.state.calling) {
    this.props.navigation.pop();
  }
 
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

onTouchShowControl() {
  this.setState({isShowControl: !this.state.isShowControl})
}

 playRingStone() {
  const sound = new Sound('https://www.soundjay.com/phone/sounds/phone-calling-1.mp3', null, (error) => {
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

  render() {
    console.log("nvTien - VideoCall render() video local... " + this.state.streamURLLocal + " video server... " + this.state.streamURLServer);
    console.log('nvTien - VideoCall render() isCalling: ' + this.state.calling);
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
                <Text style={styles.style_text}>00:00</Text>
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
            <View style={this.state.isHideController ? styles.hideView : styles.layout_footer_video_call}>
              <View style={styles.layout_controller_01}>
                <Button style={styles.icon_control_video} transparent onPress={() => {
                    this.onPressOnCamera();
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

            <View style={this.state.isHideViewName ? styles.hideView : styles.layout_infomation}>
              <Thumbnail style={styles.avata_patient} large source={require("../../../../../assets/icon_app.png")} />
              <H1 style={{ marginTop: 20, color: "white" }}>
                {this.state.friendName}
              </H1>
              <H3 style={{ marginTop: 10, color: "white" }}>
                {Translate(DefineKey.Videocall_outgoing_waiting_text)}
              </H3>
            </View>
          </ImageBackground>
          <KeepAwake/>
        </Container>
      </SafeAreaView>;
  }
}


