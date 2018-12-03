/**
 * author: nv HuyTV

param: Warning dialog
  titleDialog, contentDialog, // title and content dialog
  onOk,textOk,               // event, text 'OK' button
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


export default class WarningDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    // console.log('will mount');
    // alert('will mout');
  }

  // onCancel() {
  //   this.props.onCancel();
  // }

  onConfirmOk() {
    this.props.onOk();
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
                textAlign: "center",
              }}
              hasTitleBar={false}
              align="center"
            />
          }
          actions={[
            // <DialogButton
            //   text={this.props.textCancel}
            //   onPress={() => {
            //     this.onCancel();
            //   }}
            //   key="button-1"
            // />,
            <DialogButton
              text={this.props.textOk}
              onPress={() => {
                this.onConfirmOk();
              }}
              key="button-2"
            />
          ]}
        >
          <DialogContent style={{ backgroundColor: "#F7F7F8",justifyContent: 'center' }}>
            <Text style={{textAlign: "center" }}>{this.props.contentDialog}</Text>
          </DialogContent>
        </Dialog>
      </View>
    );
  }
}
