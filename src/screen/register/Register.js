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
  ScrollView,
} from "react-native";
import PasswordStrength from '../../components/PasswordStrengthChecker';
import styles from "./RegisterStyle";
import ScreenName from '../../commons/ScreenName';
import {Translate} from "../../utils/Language";
import DefineKey from "../../config/language/DefineKey";
import DialogLoading from "../../components/DialogLoading";
import WarningDialog from '../../components/WarningDialog';

export default class Register extends Component {
  _focusNextField() {
    alert("Submit register");
  }
  constructor(props) {
    super(props);

    this.state = {
      warningdialogvisible: false,
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      textErrorEmail: "",
      showErrorFirstName: false,
      showErrorLastName: false,
      showErrorEmail: false,
      showErrorPhone: false,
      showErrorPassword: false,

      errTitle:"",
      errContent:""
      
    };
    this.onOpenDialogWarning = this.onOpenDialogWarning.bind(this);
    this.onWarningOk = this.onWarningOk.bind(this);
  }

  onOpenDialogWarning(errTitle, errContent) {
    this.setState({warningdialogvisible: false, errTitle: errTitle, errContent: errContent});
    // this.refs.dialogWarning.showModal(); 
  }
  onWarningOk() {
    this.setState({ warningdialogvisible: false });
  }

  onPressHelpScreen() {
    //this.props.navigation.navigate(ScreenName.Screen_Help);
  }

  onPressLoginScreen() {
    this.props.navigation.pop();
    this.props.navigation.navigate(ScreenName.Screen_LoginScreen);
   
  }

  componentWillReceiveProps(props) {
    var hasError = props.hasError;
    var errorRegister = props.lastError;
    console.log("componentWillReceiveProps: " + hasError);
    if(!hasError && errorRegister === "") {
      this.onPressLoginScreen();
    } else {
      if(errorRegister != null && errorRegister !== '') {
       let errTitle = Translate(DefineKey.DialogWarning_text_title);
        this.onOpenDialogWarning(errTitle, errorRegister);
      }
    }
  }

  validateEmail(email) {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return (reg.test(email) === true);
  }

  _onChangePassword(value) {
    this.setState({ password: value})
  }

  doRegister() {
    var firstName = this.state.firstName;
    var lastName = this.state.lastName;
    var email = this.state.email;
    var phoneNumber = this.state.phoneNumber;
    var passWord = this.state.password;
    var isValid = true;

    if(firstName === "") {
      this.setState({showErrorFirstName:true})
      isValid = false;
    }
    if(lastName === "") {
      this.setState({showErrorLastName:true})
      isValid = false;
    }
    //if email is empty
    if(email === "") {
      let errorEmail = Translate(DefineKey.Register_error_email_empty);
      this.setState({textErrorEmail: errorEmail,showErrorEmail:true})
      isValid = false;
      //email not empty
    } else {
      //validate input email
     let result = this.validateEmail(email);
      //email invalid
      if(!result) {
       let errorEmail = Translate(DefineKey.Register_error_email);
        this.setState({textErrorEmail: errorEmail,showErrorEmail:true})
        isValid = false;
      }

    }
    if(phoneNumber === "") {
      this.setState({showErrorPhone:true})
      isValid = false;
    }
    if(passWord === "") {
      this.setState({showErrorPassword:true})
      isValid = false;
    }
    if(isValid) {
    var userData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
      passWord: passWord

    }

    this.props.doRegister(userData);
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
              <View style={styles.layoutWrapContent}>
                <ScrollView >
                  <View style={styles.layoutTop}>
                    <Image
                    resizeMode="contain"
                      source={require("../../../assets/icon_start.png")}
                      style={styles.imageTop}
                    />
                    <Text style={styles.textTop}>{Translate(DefineKey.Register_title)}</Text>
                  </View>

                  {/* layout hiển thị các ô inputtext để nhập dữ liệu */}
                  <View style={styles.layoutContent}>
                    <Text style={styles.textTitleInput}>{Translate(DefineKey.Register_fist_name)}</Text>
                    <View style={styles.layoutInput}>
                      <TextInput
                        style={styles.input}
                        placeholder="Ho..."
                        autoCapitalize="none"
                        autoCorrect={false}
                        autoFocus={true}
                        returnKeyType="next"
                        keyboardType="default"
                        ref="firstName"
                        value={this.state.firstName}
                        placeholderTextColor="gray"
                        onSubmitEditing={() => this.refs.lastName.focus()}
                        onChangeText={text => this.setState({ firstName: text, showErrorFirstName:false })}
                      />
                    </View>

                    {/* show error imput firstName */}
                    <View style={!this.state.showErrorFirstName ? styles.hideViewError:styles.viewError}>
                      <Text style={styles.textError}>{Translate(DefineKey.Register_error_firstName)}</Text>
                    </View>

                    <Text style={styles.textTitleInput}>{Translate(DefineKey.Register_last_name)}</Text>
                    <View style={styles.layoutInput}>
                      <TextInput
                        style={styles.input}
                        placeholder="Ten..."
                        autoCapitalize="none"
                        autoCorrect={false}
                        ref="lastName"
                        returnKeyType="next"
                        keyboardType="default"
                        value={this.state.lastName}
                        placeholderTextColor="gray"
                        onSubmitEditing={() => this.refs.email.focus()}
                        onChangeText={text => this.setState({ lastName: text, showErrorLastName:false })}
                      />
                    </View>
                    {/* show error imput lastName */}
                    <View style={!this.state.showErrorLastName ? styles.hideViewError:styles.viewError}>
                      <Text style={styles.textError}>{Translate(DefineKey.Register_error_lastName)}</Text>
                    </View>

                    <Text style={styles.textTitleInput}>{Translate(DefineKey.Register_email)}</Text>
                    <View style={styles.layoutInput}>
                      <TextInput
                        style={styles.input}
                        placeholder="Email..."
                        autoCapitalize="none"
                        autoCorrect={false}
                        returnKeyType="next"
                        keyboardType="email-address"
                        value={this.state.email}
                        placeholderTextColor="gray"
                        ref="email"
                        onSubmitEditing={() => this.refs.phoneNumber.focus()}
                        onChangeText={text => this.setState({ email: text, showErrorEmail: false })}
                      />
                    </View>
                    {/* show error imput email */}
                    <View style={!this.state.showErrorEmail ? styles.hideViewError:styles.viewError}>
                      <Text style={styles.textError}>{this.state.textErrorEmail}</Text>
                    </View>

                    <Text style={styles.textTitleInput}>{Translate(DefineKey.Register_phone)}</Text>
                    <View style={styles.layoutInput}>
                      <TextInput
                        style={styles.input}
                        placeholder="So dien thoai..."
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="numeric"
                        value={this.state.phoneNumber}
                        placeholderTextColor="gray"
                        ref="phoneNumber"
                        onChangeText={text =>
                          this.setState({ phoneNumber: text, showErrorPhone:false })
                        }
                      />
                    </View>
                    {/* show error imput phonenumber */}
                    <View style={!this.state.showErrorPhone ? styles.hideViewError:styles.viewError}>
                      <Text style={styles.textError}>{Translate(DefineKey.Register_error_phone)}</Text>
                    </View>

                    <Text style={styles.textTitleInput}>{Translate(DefineKey.Login_password)}</Text>
                      <PasswordStrength
                        secureTextEntry
                        minLength={4}
                        ruleNames="symbols|words"
                        strengthLevels={strengthLevels}
                        tooShort={tooShort}
                        minLevel={0}
                        barWidthPercent={65}
                        showBarOnEmpty={true}
                        barColor="#ccc"
                        onChangeText={(text, isValid) => this._onChangePassword(text)} />
                   
                    {/* show error imput password */}
                    <View style={!this.state.showErrorPassword ? styles.hideViewError:styles.viewError}>
                      <Text style={styles.txtNotiPass}>{Translate(DefineKey.Register_error_pass_empty)}</Text>
                    </View>

                    <View />
                    <View style={styles.viewEmpty} />
                  </View>
                </ScrollView>
              </View>

               {/* layout footer, hiển thị nút đi đến màn hình help*/}
              <View style={styles.layoutFooter}>
                <View style={styles.layoutLeftFooter}>
                  <TouchableOpacity
                    onPress={() => this.onPressHelpScreen()}
                  >
                    <Image
                      source={require("../../../assets/icon_help.png")}
                      style={styles.imageHelp}
                    />
                  </TouchableOpacity>
                  <Text style={styles.textTitleHelp}>{Translate(DefineKey.Login_text_help)}</Text>
                </View>
                <View style={styles.viewFooterButton}>
                  <TouchableOpacity
                    style={styles.btnRegister}
                    onPress={() => this.doRegister()}
                  >
                    <Text style={styles.textButton}>{Translate(DefineKey.Register_btn_finish)}</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.viewRightFooter} />
              </View>
              <DialogLoading loading = {this.props.showLoading}/>
              {/* <DialogWarning ref={"dialogWarning"} title ={this.state.errTitle} content ={this.state.errContent}/> */}
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

export const tooShort = {
  enabled: true,
  label: Translate(DefineKey.Register_safe_00),
  labelColor: 'red'
};

export const strengthLevels = [
  {
    label: Translate(DefineKey.Register_safe_01),
    labelColor: 'red',
    widthPercent: 25,
    innerBarColor: '#fe6c6c'
  },
  {
    label: Translate(DefineKey.Register_safe_01),
    labelColor: 'red',
    widthPercent: 25,
    innerBarColor: '#fe6c6c'
  },
  {
    label: Translate(DefineKey.Register_safe_02),
    labelColor: 'red',
    widthPercent: 50,
    innerBarColor: '#feb466'
  },
  {
    label: Translate(DefineKey.Register_safe_03),
    labelColor: 'red',
    widthPercent: 75,
    innerBarColor: '#81fe2c'
  },
  {
    label: Translate(DefineKey.Register_safe_04),
    labelColor: 'red',
    widthPercent: 100,
    innerBarColor: '#6cfeb5'
  }
];



