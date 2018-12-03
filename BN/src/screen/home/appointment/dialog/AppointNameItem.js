import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  TouchableHighlight
} from "react-native";
import styles from "./AppointNameItemStyle";

export default class AppointNameItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
    
    };
  }

  onItemClick(itemID, userName) {
    this.props.onclickItem(itemID, userName);
  }

  render() {
    return (
      <View style={styles.wrapContent}>
        <TouchableOpacity
          style={styles.wrapContent}
          onPress={() => 
          this.onItemClick(this.props.item.id, this.props.item.full_name)
        }
        >
          <TouchableHighlight style={styles.avataContainer}>
            <Image
              style={styles.avata}
              source={require("../../../../../assets/icon_hanh.jpg")}
            />
          </TouchableHighlight>
          <Text style={this.props.item.selected ? styles.txtNameSelected : styles.txtName} >{this.props.item.full_name}</Text>
          <Image
            style={this.props.item.selected ? styles.imgChecked : styles.hideImgChecked}
            source={require("../../../../../assets/icon_checked.png")}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
