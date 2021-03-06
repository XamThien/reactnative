import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity
} from "react-native";
import styles from './ItemTimeAvailableStyle'

export default class ItemTimeAvailable extends Component {
    constructor(props) {
        super(props);
        this.state = {
          
        };
      }

    render() {
        return (
            <TouchableOpacity
                style={!this.props.item.selected ? styles.wrapContent : styles.wrapContentClick}
                onPress={() =>
                    this.props.onclick(this.props.item.id, this.props.item.time)}
            >
            <View
                style={!this.props.item.selected ? styles.wrapContent : styles.wrapContentClick}>

                <Text style= {!this.props.item.selected ? styles.textTime : styles.textTimeClick}>{this.props.item.time}</Text>

            </View>
            </TouchableOpacity>
        );
    }
}