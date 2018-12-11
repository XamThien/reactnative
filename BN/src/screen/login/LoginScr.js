import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import styles from "./LoginStyle";
import ScreenName from "../../commons/ScreenName";
import { Translate } from "../../utils/Language";
import DefineKey from "../../config/language/DefineKey";
import DialogLoading from "../../components/DialogLoading";
// import DialogWarning from "../../components/DialogWarning";
import WarningDialog from "../../components/WarningDialog";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      warningdialogvisible: false,
      username: "",
      password: "",
      errTitle: "",
      errContent: "",
      show_pass:false

    };
    this.onOpenDialogWarning = this.onOpenDialogWarning.bind(this);
    this.onWarningOk = this.onWarningOk.bind(this);
  }

  onPressLogin() {
    let errTitle = Translate(DefineKey.DialogWarning_text_title);
    var userData = {};
    if (this.state.username === "" || this.state.password === "") {
      let errorLogin = Translate(DefineKey.Login_text_valid_empty);
      this.onOpenDialogWarning(errTitle, errorLogin);
    } else {
      var userName = this.state.username;
      var password = this.state.password;
      if (this.isEmail(userName)) {
        userData = { email: userName, password: password, phone: "" };
      } else if (this.isPhoneNumber(userName)) {
        userData = { email: "", password: password, phone: userName };
      } else {
        let errorUsername = Translate(DefineKey.Login_text_valid_username);
        this.onOpenDialogWarning(errTitle, errorUsername);
        return;
      }

      this.props.doLogin(userData);
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
    this.setState({ warningdialogvisible: false });
  }

  isEmail(userName) {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return reg.test(userName) === true;
  }

  isPhoneNumber(userName) {
    let num = userName.replace(".", "");
    return !isNaN(num);
  }

  componentWillReceiveProps(props) {
    let hasError = props.hasError;
    let errorLogin = props.lastError;
    if (!hasError && errorLogin === "") {
      this.props.navigation.navigate(ScreenName.Screen_Main, {
        intent_userID: props.userProfile.user_id
      });
    } else {
      if (errorLogin != null && errorLogin !== "") {
        let errTitle = Translate(DefineKey.DialogWarning_text_title);
        this.onOpenDialogWarning(errTitle, errorLogin);
      }
    }
  }
  _getIconPassword() {
    if (this.state.show_pass === true) {
        return (require("../../../assets/pass_show.png"));
    } else {
        return (require("../../../assets/pass_hide.png"))
    }
}
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <TouchableWithoutFeedback
          style={styles.container}
          onPress={Keyboard.dismiss}
        >
          <View style={styles.container}>
            <View style={styles.layoutTop}>
              <Image
                resizeMode="contain"
                source={require("../../../assets/icon_start.png")}
                style={styles.imageTop}
              />
              <Text style={styles.textTop}>
                {Translate(DefineKey.Login_title)}
              </Text>
            </View>

            <View style={styles.layoutContent}>
              <Text style={styles.textTitleInput}>
                {Translate(DefineKey.Login_username)}
              </Text>
              <View style={styles.layoutInput}>
                <TextInput
                  style={styles.input}
                  placeholder="Username..."
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoFocus={true}
                  returnKeyType="next"
                  keyboardType="email-address"
                  value={this.state.username}
                  placeholderTextColor="gray"
                  ref="userName"
                  onSubmitEditing={() => this.refs.passWord.focus()}
                  onChangeText={text => this.setState({ username: text })}
                />
                <Image
                  source={require("../../../assets/icon_username.png")}
                  style={styles.imageInput}
                />
              </View>
              <Text style={styles.textTitleInput}>
                {Translate(DefineKey.Login_password)}
              </Text>
              <View style={styles.layoutInput}>
                <TextInput
                  style={styles.input}
                  placeholder="Password..."
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry={!this.state.show_pass}
                  value={this.state.password}
                  placeholderTextColor="gray"
                  ref="passWord"
                  onChangeText={text => this.setState({ password: text })}
                />
                {/* <Image
                                    source={require("../../../assets/icon_password.png")}
                                    style={styles.imageInput}
                                /> */}
                <TouchableOpacity
                    style={styles.imageInput}
                    onPress={() => {
                        if(this.state.show_pass === true)
                        {
                            this.setState({show_pass: false});

                        } else {
                            this.setState({show_pass: true});
                        }
                    }}
                >
                    <Image source={this._getIconPassword()} style={styles.imageInput} />
                </TouchableOpacity>
              </View>
              <View />
              <TouchableOpacity
                style={styles.btnLogin}
                onPress={() => this.onPressLogin()}
              >
                <Text style={styles.textButton}>
                  {Translate(DefineKey.StartScreen_text_btn_login)}
                </Text>
              </TouchableOpacity>

              <Text
                style={styles.textRegister}
                onPress={() =>
                  this.props.navigation.navigate(ScreenName.Screen_Register)
                }
              >
                {Translate(DefineKey.Login_text_register)}
              </Text>
              <Text
                style={styles.textRegister}
                onPress={() =>
                  this.props.navigation.navigate(ScreenName.Screen_ResetPassword)
                }
              >
                {Translate(DefineKey.Login_text_forgotten)}
              </Text>
            </View>

            <View style={styles.layoutFooter}>
              <View style={styles.layoutFooterHelp}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate(ScreenName.Screen_Help)
                  }
                >
                  <Image
                    source={require("../../../assets/icon_help.png")}
                    style={styles.imageHelp}
                  />
                </TouchableOpacity>
                <Text style={styles.textTitleHelp}>
                  {Translate(DefineKey.Login_text_help)}
                </Text>
              </View>
            </View>
            <DialogLoading loading={this.props.showLoading} />
            {/* <DialogWarning ref={"dialogWarning"} title={this.state.errTitle}
                                       content={this.state.errContent}/> */}
            <WarningDialog
              titleDialog={this.state.errTitle}
              contentDialog={this.state.errContent}
              onOk={this.onWarningOk.bind()}
              textOk={Translate(DefineKey.DialogWarning_text_ok)}
              visible={this.state.warningdialogvisible}
            />
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    );
  }
}
