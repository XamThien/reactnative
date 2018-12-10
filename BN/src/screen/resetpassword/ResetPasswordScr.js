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
import styles from "./ResetPasswordStyle";
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
      email_input: "",
      redirect:false
    };
    this.onOpenDialogWarning = this.onOpenDialogWarning.bind(this);
    this.onWarningOk = this.onWarningOk.bind(this);
  }

  onPressReset() {
    Keyboard.dismiss();
    let email = this.state.email_input;
    if (this.isEmail(email)) {
      // alert('Request reset password.')
      this.props.doResetPassword(email);
    } else{
      let title = Translate(DefineKey.DialogWarning_text_title)
      let errorContent = Translate(DefineKey.RESET_PASSWORD_EMAIL_ERROR);
      this.onOpenDialogWarning(title, errorContent);
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
      this.props.navigation.navigate(ScreenName.Screen_Login);
    }
  }

  isEmail(userName) {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return reg.test(userName) === true;
  }

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
      <ImageBackground source={{ uri: 'http://www.bellweightloss.com/wp-content/uploads/revslider/Weight/slide2_blur2.jpg' }} style={{width: '100%', height: '100%'}}>
        <TouchableWithoutFeedback
          style={styles.container}
          onPress={Keyboard.dismiss}
        >
          <View style={styles.container}>
            <View style={styles.maincontain}>
              <View>
                <Text style={styles.title}>
                  {Translate(DefineKey.RESET_PASSWORD_FORM_TITLE)}
                </Text>
              </View>
              <View>
                <Text style={styles.content}>
                  {Translate(DefineKey.RESET_PASSWORD_FORM_CONTENT)}
                </Text>
              </View>
              <View>
                <TextInput
                  style={styles.textInput}
                  placeholder="Email..."
                  onChangeText={text => this.setState({ email_input: text.trim() })}
                  value={this.state.email_input}
                />
              </View>

              <TouchableOpacity style={styles.button} onPress={() => this.onPressReset()}>
                <Text style={styles.textButton}>{Translate(DefineKey.RESET_PASSWORD_FORM_BUTTON)}</Text>
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
