import React, { Component } from "react";
import {
  View,
  Text,
  TouchableHighlight,
  Image,
  TouchableOpacity
} from "react-native";
import { CheckBox } from "native-base";
import styles from "./ItemTimeScheduleStyle";
import { Translate } from "../../../../utils/Language";
import DefineKey from "../../../../config/language/DefineKey";
import Constant from "../../../../commons/Constants";

export default class ItemDoctor extends Component {
  constructor() {
    super();
    this.state = {
      textHead: "Ca Sáng",
      isShowHeader: false
    };
    this.updateIndex = this.updateIndex.bind(this);
  }

  componentWillMount = () => {
   
  };

  setTexHeader() {
    let textMorning = Translate(DefineKey.Item_time_schedule_morning);
    let textAfternoon = Translate(DefineKey.Item_time_schedule_afternoon);
    if (this.props.item.headTypeMorning) {
      return textMorning;
    }
    return textAfternoon;
  }
  
  updateIndex(time_id) {
    this.props.onclickItem(time_id);
  }

  render() {
    
    return (
      <View style={styles.container}>
        <View
          style={
            this.props.item.showHeader
              ? styles.layout_text_head
              : styles.hideView
          }
        >
          {/* hiển thị header ca sáng, ca chiều */}
          <Text
            style={this.props.item.showHeader ? styles.text_header : styles.hideView}>
            {this.setTexHeader()}
          </Text>
        </View>
        <View style={this.props.item.id % 2 ? styles.wrap_content_white : styles.wrap_content_blue}>
          {/* hiển thị thời gian và checkbox chọn thời gian, huỷ thời gian khám bệnh */}
          <Text style={styles.text_time_schedule}>{this.props.item.time}</Text>
          <View style = {this.props.isHideCheckDate ? styles.hideView : styles.layout_wrap_checkbox}>
            <CheckBox
              style={styles.layout_select_status}
              checked={this.props.item.display}
              onPress={() => this.updateIndex(this.props.item.id)}
              color="green"
            />
          </View>
        </View>
      </View>
    );
  }
}
