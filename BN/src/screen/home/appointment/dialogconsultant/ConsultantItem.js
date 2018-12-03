import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,

} from "react-native";
import styles from "./ConsultantItemStyle";


export default class ConsultantItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
    
    };
  }

  onItemClick(consId, typeName) {
    this.props.onclickItem(consId, typeName);
  }

  render() {
    return (
      <View style={styles.wrapContent}>
        <TouchableOpacity
          style={styles.wrapContent}
          onPress={() => 
          this.onItemClick(this.props.item.id, this.props.item.name)
        }
        >
          <Text style={this.props.item.selected ? styles.txtNameSelected : styles.txtName} >{this.props.item.name}</Text>
          <Image
            style={this.props.item.selected ? styles.imgChecked : styles.hideImgChecked}
            source={require("../../../../../assets/icon_checked.png")}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
