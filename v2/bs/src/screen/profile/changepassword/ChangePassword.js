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
  Button,
  ImageBackground
} from "react-native";
import styles from "./ChangePasswordStyle";
import ScreenName from "../../../commons/ScreenName";
import { Translate } from "../../../utils/Language";
import DefineKey from "../../../config/language/DefineKey";
import DialogLoading from "../../../components/DialogLoading";
import Constants from "../../../commons/Constants";
// import DialogWarning from "../../../components/DialogWarning";
import WarningDialog from "../../../components/WarningDialog";


export default class ChangePassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      warningdialogvisible: false,
      redirect:false,
      errTitle: "",
      errContent: "",
      old_password: "",
      new_password: "",
      confirm_password: ""
    };
    this.onOpenDialogWarning = this.onOpenDialogWarning.bind(this);
    this.onWarningOk = this.onWarningOk.bind(this);
  }


  onPressChange() {
    Keyboard.dismiss();
    let old_password = this.state.old_password;
    let new_password = this.state.new_password;
    let confirm_password = this.state.confirm_password;
    let errTitle = Translate(DefineKey.DialogWarning_text_title);
    
    if (confirm_password.trim() === "" || new_password.trim() === "" || old_password.trim() === "") {
      this.onOpenDialogWarning(errTitle, Translate(DefineKey.CHANGE_PASSWORD_FORM_ERROR_ENTRY_ALL));
    } else if (confirm_password.trim() !== new_password.trim()){
      this.onOpenDialogWarning(errTitle, Translate(DefineKey.CHANGE_PASSWORD_ERROR_NOT_MATCHES_CONFIRM_PASSWORD));
    }  else {
      // alert('Request change password.');
      this.props.doChangePassWord(new_password,old_password);
    }

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
    this.setState({ warningdialogvisible: false, redirect: false });
    if(this.state.redirect === true){
      this.props.navigation.navigate(ScreenName.Screen_LoginScreen);
    }
  }

  // isEmail(userName) {
  //   const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  //   return reg.test(userName) === true;
  // }

  componentWillReceiveProps(props) {
    let hasError = props.hasError;
    let errorReset = props.lastError;
    let messageSuccess = props.messageSuccess;
    if (!hasError && errorReset === "") {
      let dialogTitle = Translate(DefineKey.DialogWarning_text_title);
      this.onOpenDialogWarning(dialogTitle, messageSuccess);
      this.setState({redirect: true});
    } else {
      if (errorReset != null && errorReset !== "") {
        let errTitle = Translate(DefineKey.DialogWarning_text_title);
        this.onOpenDialogWarning(errTitle, errorReset);
      }
    }
  }

  render() {
    return (
      <ImageBackground  source={{ uri: 'http://www.bellweightloss.com/wp-content/uploads/revslider/Weight/slide2_blur2.jpg' }} style={{width: '100%', height: '100%'}}>
        <TouchableWithoutFeedback
          style={styles.container}
          onPress={Keyboard.dismiss}
        >
          <View style={styles.container}>
            <View style={styles.maincontain}>
              <View>
                <Text style={styles.title}>
                  {Translate(DefineKey.CHANGE_PASSWORD_FORM_TITLE)}
                </Text>
              </View>

              <Text style={styles.textTitleInput}>{Translate(DefineKey.CHANGE_PASSWORD_FORM_TITLE_OLD_PASSWORD)+":"}</Text>
              <View>
                <TextInput
                  style={styles.textInput}
                  placeholder={Translate(DefineKey.CHANGE_PASSWORD_FORM_TITLE_OLD_PASSWORD)+"..."}
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoFocus={true}
                  returnKeyType="next"
                  keyboardType="default"
                  onSubmitEditing={() => this.refs.newPassword.focus()}
                  onChangeText={text => this.setState({ old_password: text.trim() })}
                  value={this.state.emailinput}
                />
              </View>

              <Text style={styles.textTitleInput}>{Translate(DefineKey.CHANGE_PASSWORD_FORM_TITLE_NEW_PASSWORD)+":"}</Text>
              <View>
                <TextInput
                  style={styles.textInput}
                  placeholder={Translate(DefineKey.CHANGE_PASSWORD_FORM_TITLE_NEW_PASSWORD)+"..."}
                  ref="newPassword"
                  autoCapitalize="none"
                  autoCorrect={false}
                  
                  returnKeyType="next"
                  keyboardType="default"
                  onSubmitEditing={() => this.refs.confirmPassword.focus()}
                  onChangeText={text => this.setState({ new_password: text.trim() })}
                  value={this.state.emailinput}
                />
              </View>

              <Text style={styles.textTitleInput}>{Translate(DefineKey.CHANGE_PASSWORD_FORM_TITLE_CONFIRM_PASSWORD)+":"}</Text>
              <View>
                <TextInput
                  style={styles.textInput}
                  placeholder={Translate(DefineKey.CHANGE_PASSWORD_FORM_TITLE_CONFIRM_PASSWORD)+"..."}
                  ref="confirmPassword"
                  onChangeText={text => this.setState({ confirm_password: text.trim() })}
                  value={this.state.emailinput}
                />
              </View>

              <TouchableOpacity style={styles.button} onPress={() => this.onPressChange()}>
                <Text style={styles.textButton}>{Translate(DefineKey.CHANGE_PASSWORD_FORM_BUTTON)}</Text>
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
      </ImageBackground>
    );
  }
}
