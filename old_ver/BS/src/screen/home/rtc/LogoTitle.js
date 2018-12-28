import React,{Component} from 'react';
import {Image} from 'react-native';

export default class LogoTitle extends React.Component {
  render() {
    return (
      <Image
        source={require('./../asset/img/logo.png')}
        style={{ width: 50, height: 50 }}
      />
    );
  }
}
