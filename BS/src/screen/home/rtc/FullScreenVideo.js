import React, {Component} from 'react';
import {StyleSheet, Text, TouchableHighlight, View, ListView, Image} from 'react-native';
import {RTCView} from 'react-native-webrtc';
import config from '../../../commons/Config';
import styles from './FullScreenVideoStyle';

export default class FullScreenVideo extends Component{

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    let {streamURL} = this.props;
    console.log("Stream Full:"+streamURL);
    return <View style={{flex:1}}>

        <RTCView style={{width:300,height:300}} streamURL={streamURL}/>


    </View>
  }
}
