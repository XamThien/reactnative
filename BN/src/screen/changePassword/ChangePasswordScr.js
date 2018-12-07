import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  Button
} from "react-native";
import styles from "./ChangePasswordStyle";
import ScreenName from "../../commons/ScreenName";
import { Translate } from "../../utils/Language";
import DefineKey from "../../config/language/DefineKey";
import DialogLoading from "../../components/DialogLoading";
// import DialogWarning from "../../components/DialogWarning";
import WarningDialog from "../../components/WarningDialog";
import BackgroundImage from '../../components/BackgroundImage';

export default class ResetPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      warningdialogvisible: false,

      errTitle: "",
      errContent: "",
      old_password: "",
      new_password: "",
      confirm_password: ""
    };
    this.onOpenDialogWarning = this.onOpenDialogWarning.bind(this);
    this.onWarningOk = this.onWarningOk.bind(this);
  }

  onPressReset() {
    Keyboard.dismiss();
    let old_password = this.state.old_password;
    let new_password = this.state.new_password;
    let confirm_password = this.state.confirm_password;
    if (confirm_password.trim() === "" || new_password.trim() === "" || old_password.trim() === "") {
      this.onOpenDialogWarning('Warning', 'Entry all.');
    } else if (confirm_password.trim() !== new_password.trim()){
      this.onOpenDialogWarning('Warning', 'Mat khau khong khop.');
    }  else {
      alert('Request reset password.');
    }

    // alert('Request Reset Password');
    // let errTitle = Translate(DefineKey.DialogWarning_text_title);
    // var userData = {};
    // if (this.state.username === '' || this.state.password === '') {
    //     let errorLogin = Translate(DefineKey.Login_text_valid_empty);
    //     this.onOpenDialogWarning(errTitle, errorLogin);
    // } else {
    //    var userName = this.state.username;
    //    var password = this.state.password;
    //     if (this.isEmail(userName)) {
    //         userData = {email: userName, password: password, phone: ""};
    //     } else if (this.isPhoneNumber(userName)) {
    //         userData = {email: "", password: password, phone: userName};
    //     } else {
    //         let errorUsername = Translate(DefineKey.Login_text_valid_username);
    //         this.onOpenDialogWarning(errTitle, errorUsername);
    //         return;
    //     }

    // this.props.doResetPassword(userID, userMail);
    // }
  }

  onOpenDialogWarning(errTitle, errContent) {
    this.setState({
      warningdialogvisible: true,
      errTitle: errTitle,
      errContent: errContent
    });
    // this.refs.dialogWarning.showModal();
  }
  onWarningOk() {
    this.setState({ warningdialogvisible: false });
  }

  isEmail(userName) {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return reg.test(userName) === true;
  }

  componentWillReceiveProps(props) {
    let hasError = props.hasError;
    let errorReset = props.lastError;
    if (!hasError && errorReset === "") {
      // this.props.navigation.navigate(ScreenName.Screen_Main,{
      //     intent_userID: props.userProfile.user_id,
      //   })
    } else {
      if (errorReset != null && errorReset !== "") {
        let errTitle = Translate(DefineKey.DialogWarning_text_title);
        this.onOpenDialogWarning(errTitle, errorReset);
      }
    }
  }

  render() {
    return (
      <BackgroundImage image={'http://www.bellweightloss.com/wp-content/uploads/revslider/Weight/slide2_blur2.jpg'}>
        <TouchableWithoutFeedback
          style={styles.container}
          onPress={Keyboard.dismiss}
        >
          <View style={styles.container}>
            <View style={styles.maincontain}>
              <View>
                <Text style={styles.title}>
                  {'Create New Password'}
                </Text>
              </View>

              <Text style={styles.textTitleInput}>{'Old password:'}</Text>
              <View>
                <TextInput
                  style={styles.textInput}
                  placeholder="Old password..."
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoFocus={true}
                  returnKeyType="next"
                  keyboardType="default"
                  onSubmitEditing={() => this.refs.newPassword.focus()}
                  onChangeText={text => this.setState({ old_password: text })}
                  value={this.state.emailinput}
                />
              </View>

              <Text style={styles.textTitleInput}>{'New password:'}</Text>
              <View>
                <TextInput
                  style={styles.textInput}
                  placeholder="New password..."
                  ref="newPassword"
                  autoCapitalize="none"
                  autoCorrect={false}
                  
                  returnKeyType="next"
                  keyboardType="default"
                  onSubmitEditing={() => this.refs.confirmPassword.focus()}
                  onChangeText={text => this.setState({ new_password: text })}
                  value={this.state.emailinput}
                />
              </View>

              <Text style={styles.textTitleInput}>{'Confirm password:'}</Text>
              <View>
                <TextInput
                  style={styles.textInput}
                  placeholder="Confirm new password..."
                  ref="confirmPassword"
                  onChangeText={text => this.setState({ confirm_password: text })}
                  value={this.state.emailinput}
                />
              </View>

              <TouchableOpacity style={styles.button} onPress={() => this.onPressReset()}>
                <Text style={styles.textButton}>{"Request Reset Password"}</Text>
              </TouchableOpacity>
            </View>
            <DialogLoading loading={this.props.showLoading}/>
            <WarningDialog
              titleDialog={this.state.errTitle}
              contentDialog={this.state.errContent}
              onOk={this.onWarningOk.bind()}
              textOk={Translate(DefineKey.DialogWarning_text_ok)}
              visible={this.state.warningdialogvisible}
            />
          </View>
        </TouchableWithoutFeedback>
      </BackgroundImage>
    );
  }
}
