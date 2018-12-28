import React, { Component } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import Styles from "./DialogConfirmStyle";
import { Translate } from "../utils/Language";
import DefineKey from "../config/language/DefineKey";
import Modal from "react-native-modalbox";
import Constants from "../commons/Constants";

export default class DialogConfirm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        typeConfirm: -1
    };
  }
  

  showModal(typeConfirm) {
    this.refs.myWarning.open();
    this.setState({typeConfirm: typeConfirm})
  }

  onCancel() {
    this.props.onUpdateCancel(this.state.typeConfirm);
    this.dismissModal();
  }

  dismissModal() {
    this.refs.myWarning.close();
  }

  onConfirmOk() {
    this.props.onUpdateConfirm(this.state.typeConfirm);
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
                  this.onCancel();
                }}
                style={Styles.layoutButton}
              >
                <Text style={Styles.textOk}>
                  {Translate(DefineKey.DialogWarning_text_cancel)}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.onConfirmOk();
                }}
                style={Styles.layoutButtonRight}
              >
                <Text style={Styles.textOk}>
                  {Translate(DefineKey.DialogWarning_text_ok)}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}
