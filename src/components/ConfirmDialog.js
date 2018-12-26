/**
 * author: nv HuyTV

param: Confirm Dialog
  titleDialog, contentDialog, // title and content dialog
  onCancel, textCancel,       // event and text 'Cancel' button
  onOk, textOk,               // event and text 'OK' button
  visible                     // show-hidden dialog
 */

import React, { Component } from "react";
import { Text, View, StyleSheet, Button, Keyboard } from "react-native";

import Dialog, {
  DialogTitle,
  DialogContent,
  DialogButton,
  SlideAnimation,
  ScaleAnimation
} from "react-native-popup-dialog";

export default class ConfirmDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typeConfirm: -1
    };
  }

  componentDidMount() {
    // console.log('will mount');
    // alert('will mout');
  }
  showModal(typeConfirm) {
    this.setState({ typeConfirm: typeConfirm });
  }
  onCancel() {
    this.props.onCancel(this.state.typeConfirm);
  }

  onConfirmOk() {
    this.props.onOk(this.state.typeConfirm);
  }

  render() {
    return (
      <View>
        <Dialog
          width={0.9}
          visible={this.props.visible}
          rounded
          dialogTitle={
            <DialogTitle
              title={this.props.titleDialog}
              style={{
                backgroundColor: "#F7F7F8",
                textAlign: "center"
              }}
              hasTitleBar={false}
              align="center"
            />
          }
          actions={[
            <DialogButton
              text={this.props.textCancel}
              onPress={() => {
                this.onCancel();
              }}
              key="button-1"
            />,
            <DialogButton
              text={this.props.textOk}
              onPress={() => {
                this.onConfirmOk();
              }}
              key="button-2"
            />
          ]}
        >
          <DialogContent
            style={{ backgroundColor: "#F7F7F8", justifyContent: "center" }}
          >
            <Text style={{ textAlign: "center" }}>
              {this.props.contentDialog}
            </Text>
          </DialogContent>
        </Dialog>
      </View>
    );
  }
}
