import React, { Component } from 'react'
import { Text, View } from 'react-native'
import styles from './VideoCallStyle'

export default class VideoCall extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>VideoCall</Text>
      </View>
    )
  }
}
