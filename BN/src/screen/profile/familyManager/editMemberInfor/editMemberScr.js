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
  ScrollView
} from "react-native";
import styles from "./editMemberStyle";
import ScreenName from "../../../../commons/ScreenName";
import { Translate } from "../../../../utils/Language";
import DefineKey from "../../../../config/language/DefineKey";
import DialogLoading from "../../../../components/DialogLoading";
// import DialogWarning from "../../../../components/DialogWarning";
import WarningDialog from "../../../../components/WarningDialog";
import ConfirmDialog from '../../../../components/ConfirmDialog';
import { convertMillisecondToDate } from "../../../../utils/Utils";

export default class EditMemberScr extends Component {
  constructor(props) {
    super(props);

    this.state = {
      warningdialogvisible: false,
      confirmdialogvisible: false,
      errTitle: "",
      errContent: "",
      show_pass: false,

      firstName: "",
      lastName: "",
      email: "",
      relationship: "",
      birthDate: "",
      valueSex: "0"
    };
    this.onOpenDialogWarning = this.onOpenDialogWarning.bind(this);
    this.onWarningOk = this.onWarningOk.bind(this);
    this.onUpdateCancel = this.onUpdateCancel.bind(this);
    this.onUpdateConfirm = this.onUpdateConfirm.bind(this);
  }

  componentDidMount = () => {
    let member = this.props.navigation.getParam("member");
    // alert(JSON.stringify(member));
    this.setState({
      firstName: member.first_name,
      lastName: member.last_name,
      email: member.email,
      relationship: member.relation,
      birthDate: convertMillisecondToDate(member.date_birth),
      valueSex: member.sex
    });
  };

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
  onUpdateCancel(typeConfirm) {
    this.setState({ confirmdialogvisible: false });
  }
  onUpdateConfirm(typeConfirm) {
    this.setState({ confirmdialogvisible: false });
  }

  onPressAddNewMember() {
    var firstName = this.state.firstName;
    var lastName = this.state.lastName;
    var email = this.state.email;
    var birthDate = this.state.birthDate;
    var relationship = this.state.relationship;
    var isValid = true;

    if (firstName === "") {
      this.setState({ showErrorFirstName: true });
      isValid = false;
    }
    if (lastName === "") {
      this.setState({ showErrorLastName: true });
      isValid = false;
    }
    //if email is empty
    if (email === "") {
      let errorEmail = Translate(DefineKey.Register_error_email_empty);
      this.setState({ textErrorEmail: errorEmail, showErrorEmail: true });
      isValid = false;
      //email not empty
    } else {
      //validate input email
      let result = this.validateEmail(email);
      //email invalid
      if (!result) {
        let errorEmail = Translate(DefineKey.Register_error_email);
        this.setState({ textErrorEmail: errorEmail, showErrorEmail: true });
        isValid = false;
      }
    }
    if (relationship === "") {
      this.setState({ showErrorRelationship: true });
      isValid = false;
    }

    if (birthDate === "") {
      this.setState({ showErrorBirthDate: true });
      isValid = false;
    }

    if (isValid) {
      var dataUser = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        birthDate: this.state.birthDate,
        relationship: this.state.relationship,
        sex: this.state.valueSex,
        parent_id: this.state.userId
      };
      this.props.addNewMember(dataUser);
    }
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

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <TouchableWithoutFeedback
          style={styles.container}
          onPress={Keyboard.dismiss}
        >
          <ScrollView style={styles.container}>
            <View style={styles.layoutTop}>
              <Image
                resizeMode="contain"
                source={require("../../../../../assets/icon_add_user.png")}
                style={styles.imageTop}
              />
              {/* <Text style={styles.textTop}>
                {Translate(DefineKey.Login_title)}
              </Text> */}
            </View>

            <View style={styles.layoutContent}>
              <Text style={styles.textTitleInput}>
                {Translate(DefineKey.AddNewMemberModal_text_first_name)}
              </Text>
              <View style={styles.layoutInput}>
                <TextInput
                  style={styles.input}
                  placeholder={
                    Translate(DefineKey.AddNewMemberModal_text_first_name) +
                    "..."
                  }
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoFocus={true}
                  returnKeyType="next"
                  value={this.state.firstName}
                  placeholderTextColor="gray"
                  ref="firstName"
                  onSubmitEditing={() => this.refs.lastName.focus()}
                  onChangeText={text => this.setState({ firstName: text })}
                />
                <Image
                  source={require("../../../../../assets/icon_username.png")}
                  style={styles.imageInput}
                />
              </View>

              <Text style={styles.textTitleInput}>
                {Translate(DefineKey.AddNewMemberModal_text_last_name)}
              </Text>
              <View style={styles.layoutInput}>
                <TextInput
                  style={styles.input}
                  placeholder={
                    Translate(DefineKey.AddNewMemberModal_text_last_name) +
                    "..."
                  }
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={this.state.lastName}
                  placeholderTextColor="gray"
                  ref="lastName"
                  onSubmitEditing={() => this.refs.relationship.focus()}
                  onChangeText={text => this.setState({ lastName: text })}
                />

                <Image
                  source={require("../../../../../assets/icon_username.png")}
                  style={styles.imageInput}
                />
              </View>

              <Text style={styles.textTitleInput}>
                {Translate(DefineKey.AddNewMemberModal_text_relationship)}
              </Text>
              <View style={styles.layoutInput}>
                <TextInput
                  style={styles.input}
                  placeholder={
                    Translate(DefineKey.AddNewMemberModal_text_relationship) +
                    "..."
                  }
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={this.state.relationship}
                  placeholderTextColor="gray"
                  ref="relationship"
                  onSubmitEditing={() => this.refs.email.focus()}
                  onChangeText={text => this.setState({ relationship: text })}
                />

                <Image
                  source={require("../../../../../assets/icon_family.png")}
                  style={styles.imageInput}
                />
              </View>

              <Text style={styles.textTitleInput}>
                {Translate(DefineKey.AddNewMemberModal_text_email)}
              </Text>
              <View style={styles.layoutInput}>
                <TextInput
                  style={styles.input}
                  placeholder={
                    Translate(DefineKey.AddNewMemberModal_text_email) + "..."
                  }
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                  value={this.state.email}
                  placeholderTextColor="gray"
                  ref="email"
                  onSubmitEditing={() => this.refs.date.focus()}
                  onChangeText={text => this.setState({ email: text })}
                />

                <Image
                  source={require("../../../../../assets/icon_email.png")}
                  style={styles.imageInput}
                />
              </View>

              <Text style={styles.textTitleInput}>
                {Translate(DefineKey.AddNewMemberModal_text_date_of_birth)}
              </Text>
              <View style={styles.layoutInput}>
                <TextInput
                  style={styles.input}
                  placeholder="--/--/----"
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={this.state.birthDate}
                  placeholderTextColor="gray"
                  ref="date"
                  onChangeText={text => this.setState({ date_birth: text })}
                />

                <Image
                  source={require("../../../../../assets/icon_birthday.png")}
                  style={styles.imageInput}
                />
              </View>

              <View />
              <TouchableOpacity
                style={styles.btnLogin}
                onPress={() => this.onPressLogin()}
              >
                <Text style={styles.textButton}>
                  {Translate(DefineKey.EditMemberModal_text_save)}
                </Text>
              </TouchableOpacity>

              
            </View>

            
            <DialogLoading loading={this.props.showLoading} />
            
            <WarningDialog
              titleDialog={this.state.errTitle}
              contentDialog={this.state.errContent}
              onOk={this.onWarningOk.bind()}
              textOk={Translate(DefineKey.DialogWarning_text_ok)}
              visible={this.state.warningdialogvisible}
            />

            <ConfirmDialog ref={"dialogConfirm"}
            titleDialog={this.state.confirmTitle}
            contentDialog={this.state.confirmContent} 
            onCancel={this.onUpdateCancel.bind()}
            textCancel={Translate(DefineKey.DialogWarning_text_cancel)}
            onOk={this.onUpdateConfirm.bind()}
            textOk={Translate(DefineKey.DialogWarning_text_ok)}
            visible={this.state.confirmdialogvisible}
        />    
          </ScrollView>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    );
  }
}

export var arrSex = [
  { label: Translate(DefineKey.AddNewMemberModal_text_male), value: 0 },
  { label: Translate(DefineKey.AddNewMemberModal_text_female), value: 1 }
];
