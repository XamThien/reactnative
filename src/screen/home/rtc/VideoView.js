/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React,{Component} from 'react';
import {StyleSheet, Text, View,Button,ScrollView} from 'react-native';
import FullScreenVideo from './FullScreenVideo';
import Thumbnails from './Thumbnails';

export default class VideoView extends Component{

  constructor () {
    super()
    this.state = {activeStreamIndex:0,activeStreamId:null};
  }

  handleSetActive(streamId) {
    this.setState({
      activeStreamId: streamId
    });
  }

  componentDidMount(){
    // let {screenProps} = this.props;
    // alert(screenProps.name);
  }

  _changeActiveStream(){

    let streams = this.props.screenProps;
    let {activeStreamIndex,activeStreamId} = this.state;
    console.log('activeStreamIndex:'+activeStreamIndex + "|streams.length:"+streams.length);

    if(activeStreamIndex + 1 < streams.length){
      activeStreamIndex += 1;
      activeStreamId = streams[activeStreamIndex].id;
      console.log('change active to:',activeStreamId);
    }else{
      activeStreamIndex = 0;
      console.log('index:',streams.length);
    }
    activeStreamId = streams[activeStreamIndex].id;
    this.setState({activeStreamIndex,activeStreamId});
  }
  render() {
    let streams = this.props.screenProps;

    let activeStreamResult = streams.filter(stream => stream.id == this.state.activeStreamId);
    console.log("render active:" + this.state.activeStreamId);
    streams.forEach((stream)=> {console.log("ID in stream:"+stream.id)});
    if(activeStreamResult != undefined && activeStreamResult != null){
      console.log('activeStreamResult url:',activeStreamResult);
    }else{
      console.log('Not found active streams');
    }

    let urlActive = null;
    if(activeStreamResult != null && activeStreamResult.length > 0){
      urlActive= activeStreamResult[0].url;
    }

    console.log('urlActive:'+urlActive);

    return (

      <View style={styles.container}>
          <Button style={{width:100,height:100}} onPress={()=>this._changeActiveStream()} title="Change Active Stream"></Button>
          <FullScreenVideo style={{flex:1}} streamURL={urlActive} />
          <Thumbnails style={{width:300,height:200}} streams={streams}
            setActive={this.handleSetActive.bind(this)}
            activeStreamId={this.state.activeStreamId}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
