import React, {Component} from "react";
import {View, Text, TouchableHighlight, Image, TouchableOpacity} from "react-native";
import {ButtonGroup} from 'react-native-elements';
import styles from "./ItemTimeScheduleStyle";
import {Translate} from "../../../../utils/Language"
import DefineKey from "../../../../config/language/DefineKey";
import Constant from "../../../../commons/Constants";

export default class ItemDoctor extends Component {
    constructor () {
        super()
        this.state = {
          selectedIndex: 0,
          textHead: "Ca Sáng",
          isShowHeader: false,
        }
        this.updateIndex = this.updateIndex.bind(this)
      }

      componentWillMount = () => {
        let state = this.props.item.display ? 0 : 1;
        this.setState({ selectedIndex: state });
    };

    setTexHeader() {
        let textMorning = Translate(DefineKey.Item_time_schedule_morning);
        let textAfternoon = Translate(DefineKey.Item_time_schedule_afternoon);
        if(this.props.item.headTypeMorning) {
            return textMorning;
        }
        return textAfternoon;
    }
      
    updateIndex (selectedIndex) {
        if(selectedIndex != this.state.selectedIndex) {
            this.props.onclickItem(this.props.item.id);
            this.setState({selectedIndex});
        } 
        console.log("nvTien - ItemTimeSchedule updateIndex: " + selectedIndex + " state selectIndex " + this.state.selectedIndex);
    }

    _onPressItemTime(doctorID) {
        this.props.onclick(doctorID);
    }

    render() {
        //console.log("nvTien - ItemTimeSchedule... isShowHeader: " + this.isShowHeader + " time: " + this.props.item.time);
        const buttons = [Translate(DefineKey.Item_time_schedule_button_ok), Translate(DefineKey.Item_time_schedule_button_cancel)]
        const { selectedIndex } = this.props.item.display ? 0 : 1;
        return (
                <View style={styles.container}>
                    <View style = {this.props.item.showHeader ? styles.layout_text_head : styles.hideView}>
                        <Text style ={this.props.item.showHeader ? styles.text_header : styles.hideView}>{this.setTexHeader()}</Text>
                    </View>
                    <View style ={this.props.item.id % 2 ? styles.wrap_content_white : styles.wrap_content_blue}>
                        <Text style = {styles.text_time_schedule}>{this.props.item.time}</Text>
                        <ButtonGroup
                            onPress={this.updateIndex}
                            selectedIndex={this.props.item.display ? 0 : 1}
                            buttons={buttons}
                            containerStyle={styles.layout_select_status}
                        />
                    </View>
                </View>
        
        );
    }
}

