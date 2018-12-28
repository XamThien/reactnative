/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React,{Component} from 'react';
import {StyleSheet, Text, View,Button,TextInput,Dimensions,ScrollView,KeyboardAvoidingView} from 'react-native';
import MessageItem from './MessageItem';

export default class MessageView extends Component<Props> {

  constructor () {
    super()
    this.state = {text:'',lstMessage:[]}
  }

  componentDidMount(){
    // let {screenProps} = this.props;
    // alert(screenProps.name);
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
    let deviceWidth = Dimensions.get('window').width;
    let {lstMessage} = this.state;
    let messages = [];
    for(var i=0;i < lstMessage.length;i++){
      messages.push(<MessageItem message={{time:'21:34',from:'Long',content:lstMessage[i]}}></MessageItem>);
    }
  // alert(deviceWidth);
    return (
      <View style={styles.container}>
          <View style={{}} behavior='padding'>
              <ScrollView ref={ref => this.scrollView = ref}
                onContentSizeChange={(contentWidth, contentHeight)=>{
                        this.scrollView.scrollToEnd({animated: true});}}>
                  {messages}
              </ScrollView>
          </View>
          <View style={{backgroundColor:'green',height:80,bottom:0,position:'absolute',width:deviceWidth}}>
            <TextInput style={{flex:1,height:40}}
              onChangeText={(text) => this.setState({text})}
              value={this.state.text}
              onKeyPress={(evt) => this._keyPress(evt)}
            ></TextInput>
            <Button style={{flex:1,position:'absolute',bottom:0,left:0,right:0,width:deviceWidth,height:40}} title="Send" onPress={() => this._sendText()}/>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
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
