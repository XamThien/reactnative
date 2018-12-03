/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React,{Component} from 'react';
import {StyleSheet, Text, View,Button,TextInput,Dimensions,ScrollView} from 'react-native';

export default class VideoView extends Component<Props> {

  constructor () {
    super()
    this.state = {text:'',lstMessage:[]}
  }

  _sendText(){
    let {text,lstMessage} = this.state;
    if(text != ''){
      lstMessage.push(text);
      this.setState({'text':'',lstMessage});
    }
  }

  _keyPress(evt){
    // alert(evt.nativeEvent.key);
  }

  render() {

    let {message} = this.props;

    return (
      <View style={{borderColor:'green',marginTop:12}}>
          <Text>{message.from}, {message.time}</Text>
          <Text style={{backgroundColor:'blue',color:'white',marginLeft:30}}>{message.content}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
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
