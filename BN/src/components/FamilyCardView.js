import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  TouchableHighlight
} from "react-native";
import styles from "./FamilyCardViewStyle";


export default class FamilyCardView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onItemClick(itemID, userName) {
    // alert('Hello '+ userName);
  }
  onEdit(item){
    this.props.onEdit(item);
  }
  onDelete(memberID){
    this.props.onDelete(memberID);
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.wrapContent}
            onPress={() =>
              this.onItemClick(this.props.item.id, this.props.item.full_name)
            }
        >
          <TouchableHighlight style={styles.avataContainer}>
            <Image
              style={styles.avata}
              source={require("../../assets/icon_app.png")}
            />
          </TouchableHighlight>
          <View style={styles.nameSection}>
            <Text
              style={ this.props.item.selected ? styles.txtNameSelected : styles.txtName }
            >
              {this.props.item.full_name}
            </Text>
            <Text style={ styles.txtRelationship } >
              {this.props.item.relation}
            </Text>
          </View>
          <View style={styles.btn_action}>
            <TouchableOpacity
              
              onPress={() => this.onDelete(this.props.item.user_id)}
            >
              <Image style={styles.btn_del} source={require("../../assets/del-btn.png")} />
            </TouchableOpacity>
            <TouchableOpacity
              
              onPress={() => this.onEdit(this.props.item)}
            >
              <Image style={styles.btn_edit} source={require("../../assets/edit-btn.png")} />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
