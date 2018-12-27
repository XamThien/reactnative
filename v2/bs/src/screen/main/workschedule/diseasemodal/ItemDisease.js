import React, { Component } from "react";
import { Text, View, TouchableOpacity, Image, Platform, PixelRatio } from "react-native";
import { CheckBox } from "native-base";
import styles from "./ItemDiseaseStyle";

export default class ItemDisease extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      dataSelected: []
    };
  }

  componentDidMount = () => {
    let dataSelected = this.props.dataSelected;
    this.setState({dataSelected: this.props.dataSelected});
    let status = this.initStatus(this.props.item.id,this.props.dataSelected);
    this.setState({checked: status});
  };
  
  //khởi tạo trạng thái check item bệnh
  initStatus(dId,dataSelected) {
    var status = false;
    const curID = dId;
    if(dataSelected!= null && dataSelected != undefined && dataSelected.length != 0) {
      for (let i = 0 ; i < dataSelected.length ; i++) {
        if(curID == dataSelected[i].id) {
          status = true;
          break;
        }
      }
    }
    return status;
  }

  //xử lí xự kiện click check item
  onPressItemCheck(dId) {
    this.props.onItemCheck(dId, !this.state.checked);
    this.setState({ checked: !this.state.checked });
  }

  render() {
    return (
      <View style={styles.wrapContent}>
        <View style={styles.layout_name}>
          <Text style={styles.name}>{this.props.item.name}</Text>
        </View>
        <View style={styles.layout_check}>
          <CheckBox
            style={styles.check_type}
            checked={this.state.checked}
            onPress={() => this.onPressItemCheck(this.props.item.id)}
            color="green"
          />
        </View>
      </View>
    );
  }
}

export function normalize(size) {
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(size));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(size)) - 2;
  }
}
