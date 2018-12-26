import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  Keyboard,
  Button,
} from "react-native";
import { CheckBox } from "native-base";
import styles from "./SettingNotificationStyle";
import { Translate } from "../../../utils/Language";
import DefineKey from "../../../config/language/DefineKey";
import WarningDialog from "../../../components/WarningDialog";

export default class SettingNotificationSrc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      warningdialogvisible: false,
      time_setting: "",
      checkbox_status: true,
      errTitle: "",
      errContent: ""
    };
    this.onOpenDialogWarning = this.onOpenDialogWarning.bind(this);
    this.onWarningOk = this.onWarningOk.bind(this);
  }

  componentDidMount() {
    this.props.doGetTimeSetting();
  }

  // open dialog
  onOpenDialogWarning(errTitle, errContent) {
    this.setState({
      warningdialogvisible: true,
      errTitle: errTitle,
      errContent: errContent
    });
  }

  // button 'OK' on dialog
  onWarningOk() {
    this.setState({ warningdialogvisible: false });
  }

  componentWillReceiveProps(props) {
    let setting_notify = props.setting_notify;
    let status_notifyx = setting_notify.status;
    let timex = "" + setting_notify.time;
    // alert("From scr1:"+status_notifyx+" ,"+timex);
    this.setState({
      checkbox_status: status_notifyx,
      time_setting: timex
    });
    // var time2 = this.state.time_setting;
    // alert("From scr: "+time2);
    let hasError = props.hasError;
    let errorReset = props.lastError;
    let messageSuccess = props.messageSuccess;
    if (!hasError && messageSuccess !== "" && messageSuccess !== undefined) {
      let dialogTitle = Translate(DefineKey.DialogWarning_text_title);
      this.onOpenDialogWarning(dialogTitle, messageSuccess);
    } else {
      if (hasError === true && errorReset !== "") {
        let errTitle = Translate(DefineKey.DialogWarning_text_title);
        this.onOpenDialogWarning(errTitle, errorReset);
      }
    }

  }

  // action when touch check box enable/disable notification
  disableNotification() {
    this.setState({ checkbox_status: !this.state.checkbox_status });
    if (this.state.checkbox_status === true) {
      var title = Translate(DefineKey.DialogWarning_text_title);
      var content = Translate(DefineKey.SETTING_NOTIFICATION_DISABLE_MESSAGE);
      this.onOpenDialogWarning(title, content);
    }
  }

  // check setting time entry
  checkTimeSetting() {
    Keyboard.dismiss();
    var time = this.state.time_setting;
    var valid = true;
    if (this.state.time_setting === "" || time < 0 || time > 30) {
      this.refs.time.focus();
      valid = false;
      var title = Translate(DefineKey.DialogWarning_text_title);
      var content = Translate(DefineKey.SETTING_NOTIFICATION_WARNING_MESSAGE);
      this.onOpenDialogWarning(title, content);
    }
    return valid;
  }

  // save to database
  saveSettingNotification() {
    var valid = this.checkTimeSetting();
    if (valid === true) {
      var time = this.state.time_setting;
      var checked = this.state.checkbox_status;
      this.props.doUpdateTimeSetting(time, checked);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.maincontain}>
          <View>
            <Text style={styles.title}>
              {Translate(DefineKey.SETTING_NOTIFICATION_HEADER_TITLE)}
            </Text>
          </View>
          <View style={styles.row}>
            <View style={styles.label}>
              <Text
                onPress={() => this.disableNotification()}>
                {Translate(DefineKey.SETTING_NOTIFICATION_CHECKBOX_TITLE)}
              </Text>
            </View>
            <View style={styles.value}>
              <CheckBox
                style={styles.checkbox}
                checked={this.state.checkbox_status}
                onPress={() => this.disableNotification()}
                color="green"
              />
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.label}>
              <Text>
                {Translate(DefineKey.SETTING_NOTIFICATION_TIME_TITLE)}
              </Text>
            </View>
            <View style={styles.value}>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                autoCorrect={false}
                autoFocus={true}
                keyboardType="numeric"
                value={this.state.time_setting}
                ref="time"
                placeholderTextColor="gray"
                onSubmitEditing={() => this.checkTimeSetting()}
                onChangeText={text => this.setState({ time_setting: text.substring(0, 2) })}
              />
            </View>
          </View>
          <Button
            title={Translate(DefineKey.SETTING_NOTIFICATION_BUTTON_SAVE)}
            onPress={() => this.saveSettingNotification()}
          />
          <WarningDialog
            titleDialog={this.state.errTitle}
            contentDialog={this.state.errContent}
            onOk={this.onWarningOk.bind()}
            textOk={Translate(DefineKey.DialogWarning_text_ok)}
            visible={this.state.warningdialogvisible}
          />
        </View>
      </View>
    );
  }
}
