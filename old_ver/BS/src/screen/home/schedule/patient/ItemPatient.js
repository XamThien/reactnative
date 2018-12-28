import React, { Component } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { CheckBox } from "react-native-elements";
import styles from "./ItemPatientStyle";
import {Translate} from "../../../../utils/Language"
import DefineKey from "../../../../config/language/DefineKey";

const TYPE_CONFIRM = 0;
const TYPE_CALL_NOW = 1;
const TYPE_DECLINE = 2;


export default class ItemPatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
        
    };
   
  }

  componentDidMount = () => {

    console.log(`nvTien - ItemPatient componentDidMount() data item : ${JSON.stringify(this.props.item)}`)
  };

  componentDidUpdate(prevProps: Props<ItemT>) {
    console.log(`nvTien - componentDidUpdate item disease dataSelected `)
  }

  onClickItemPatient(itemPatient) {
    this.props.onClickItemPatient(itemPatient)
    
  }

  onConfirmStatus(pId, itemPatient) {
   this.props.onConfirmStatus(pId,itemPatient);
  }


  setTextStatus() {
    let textConfirm = Translate(DefineKey.Status_request_comfirm);
    let textDecline = Translate(DefineKey.Status_request_decline);
    let textCallNow = Translate(DefineKey.Status_request_callnow);
    
    switch(this.props.item.status) {
        case TYPE_CONFIRM: 
            return textConfirm;
        case TYPE_DECLINE:
            return textDecline;
        case TYPE_CALL_NOW:
            return textCallNow;        
    }
  }

  setBgStatus() {
    let styleConfirm = styles.button_status_confirm;
    let styleDecline = styles.button_status_decline;
    let styleCallNow = styles.button_status_call_now;
    
    switch(this.props.item.status) {
        case TYPE_CONFIRM: 
            return styleConfirm;
        case TYPE_DECLINE:
            return styleDecline;
        case TYPE_CALL_NOW:
            return styleCallNow;        
    }
  }

  render() {
    console.log(`nvTien - ItemPatient render() data item : ${JSON.stringify(this.props.item)}`);
    return (
      <View style={styles.wrapContent}>
        <TouchableOpacity style = {styles.layout_wrap_name} onPress ={() => {
            this.onClickItemPatient(this.props.item);
        }}>
        <View style = {styles.layout_wrap_name}>
            <Text style = {styles.text_time}>{this.props.item.time}</Text>
            <Text style = {styles.text_name}>{this.props.item.name}</Text>
        </View>   
        </TouchableOpacity>
      
        <TouchableOpacity style={this.setBgStatus()} onPress={() => this.onConfirmStatus(this.props.item.status, this.props.item)}>
         <Text style={styles.text_btn_status}>{this.setTextStatus()}</Text>
         </TouchableOpacity>
                                       
      </View>
    );
  }
}
