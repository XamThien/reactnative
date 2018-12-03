/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React,{Component} from 'react';
import {StyleSheet, Text, View,Button} from 'react-native';
import {createMaterialTopTabNavigator} from 'react-navigation';
import { ButtonGroup } from 'react-native-elements';
import VideoView from './../component/VideoView';
import MessageView from './../component/MessageView';
import FullScreenVideo from './../component/FullScreenVideo';
import Thumbnails from './../component/Thumbnails';

const webRTCServices = require("./../lib/services.js");
const VIDEO_CONFERENCE_ROOM ='room_for_all';
const SELF_STREAM_ID = 'self_stream_id';

export default class DetailScreen extends Component<Props> {

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('name', 'Khong co ten'),
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      activeStreamId: null,
      //streamURLs: sampleStreamURLs,
      streams: [], //list of (id, url: friend Stream URL). Id = socketId
      joinState: "ready", //joining, joined
      name: "N D Long"
    }
  }

  componentDidMount() {
    this.setState({joinState:"Getting Camera"});
    webRTCServices.getLocalStream(true, (stream) => {
      this.setState({joinState:"Get Camera success"});
      this.setState({
        activeStreamId: SELF_STREAM_ID,
        streams: [{
          id: SELF_STREAM_ID,
          url: stream.toURL()
        }]
      })

      this.handleJoinClick();
    });

  }

  handleSetActive(streamId) {
      this.setState({
        activeStreamId: streamId
      });
  }

  handleJoinClick() {

    let name = this.props.navigation.getParam('name');
    let room = this.props.navigation.getParam('room',VIDEO_CONFERENCE_ROOM);

    this.setState({
      joinState: "joining"
    });
    let callbacks = {
      joined: this.handleJoined.bind(this),
      friendConnected: this.handleFriendConnected.bind(this),
      friendLeft: this.handleFriendLeft.bind(this),
      dataChannelMessage: this.handleDataChannelMessage.bind(this)
    }

    webRTCServices.join(room, this.state.name, callbacks);
  }

  handleJoined() {
    this.setState({
      joinState: "joined"
    });
  }

  handleFriendLeft(socketId) {
    console.log('friend left:'+socketId);
    let newState = {
      streams: this.state.streams.filter(stream => stream.id != socketId)
    }
    if(this.state.activeStreamId == socketId) {
      newState.activeStreamId = newState.streams[0].id;
    }
    this.setState(newState);
  }

  handleFriendConnected(socketId, stream) {
    console.log('friend connect:'+socketId + "| URL:"+stream.toURL());
    this.setState({
      streams: [
        ...this.state.streams,
        {
          id: socketId,
          url: stream.toURL()
        }
      ]
    })
    console.log('');
    //
  }

  handleDataChannelMessage(message) {

  }



  render() {
    let props = this.props;
    const RTCStack = createMaterialTopTabNavigator(
      {
        video: {screen:props =>  <VideoView {...props}/>},
        message: MessageView
      },
      {
        initialRouteName: 'video',
      }
    );

    const { navigation } = this.props;
    const itemId = navigation.getParam('id');
    const otherParam = navigation.getParam('name', 'Khong co Ten');
    let {index} = this.state;
    let param ={name:'long'}
    let {joinState,streams} = this.state;
    console.log('streams length',streams.length);
    return (

      joinState == 'joined' ? (
          <RTCStack style={styles.container} screenProps={streams}/>
        ):(
          <View><Text>{joinState}</Text></View>
      )



    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  view: {
    flex: 1
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
