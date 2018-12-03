import React, { Component } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import Styles from "./VideoCallIncomingStyle";
import { Translate } from "../utils/Language";
import DefineKey from "../config/language/DefineKey";
import Modal from "react-native-modalbox";

export default class DialogVideoCallIncoming extends Component {
  constructor(props) {
    super(props);
    this.state = {
        title: "",
        content: "",
        textCancel: "",
        textAccept: ""
    };
  }
  

  showModal() {
    this.refs.myWarning.open();
    
  }

  dismissModal() {
    this.refs.myWarning.close();
  }

  onConfirmOk() {
    this.dismissModal();
  }

  render() {
    //console.log("render props", this.props)
    return (
      <Modal
        style={Styles.container}
        position="center"
        ref={"myWarning"}
        transparent={true}
        animationType={"none"}
        backdrop={true}
        backdropOpacity={0.5}
      >
        <View style={Styles.container}>
          <View style={Styles.layoutContent}>
            <Text style={Styles.textTitle}>{this.props.title}</Text>
            <Text style={Styles.textContent}>{this.props.content}</Text>
          </View>

          <View style={Styles.layoutFooter}>
            <View style={Styles.viewLine} />
            <View style={Styles.layout_button_confirm}>
              <TouchableOpacity
                onPress={() => {
                  this.dismissModal();
                }}
                style={Styles.layoutButton}
              >
                <Text style={Styles.textOk}>
                {this.props.textCancel}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.onConfirmOk();
                }}
                style={Styles.layoutButtonRight}
              >
                <Text style={Styles.textOk}>
                {this.props.textAccept}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}
