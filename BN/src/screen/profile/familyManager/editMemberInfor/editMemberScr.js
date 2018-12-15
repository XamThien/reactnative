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
// import ConfirmDialog from '../../../../components/ConfirmDialog';
import {
  convertMillisecondToDate,
  convertDateToMillisecond
} from "../../../../utils/Utils";
import DatePicker from "../../../../components/DatePicker";
import Constant from "../../../../commons/Constants";

export default class EditMemberScr extends Component {
  constructor(props) {
    super(props);

    this.state = {
      warningdialogvisible: false,
      errTitle: "",
      errContent: "",

      user_id: "",
      firstName: "",
      lastName: "",
      email: "",
      relationship: "",
      birthDate: "",
      valueSex: "0",

      textErrorEmail: "",
      showErrorFirstName: false,
      showErrorLastName: false,
      showErrorEmail: false,
      showErrorRelationship: false,
      showErrorBirthDate: false
    };
    this.onOpenDialogWarning = this.onOpenDialogWarning.bind(this);
    this.onWarningOk = this.onWarningOk.bind(this);
    this._onShowDatePicker = this._onShowDatePicker.bind(this);
  }

  componentDidMount = () => {
    let member = this.props.navigation.getParam("member");
    // alert("diMoount" + JSON.stringify(member));
    this.setState({
      user_id: member.user_id,
      firstName: member.first_name,
      lastName: member.last_name,
      email: member.email,
      relationship: member.relation,
      birthDate: convertMillisecondToDate(member.date_birth),
      valueSex: member.sex
    });
  };

  validateEmail(email) {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return reg.test(email) === true;
  }
  _onShowDatePicker() {
    this.refs.datePicker.onPressDate();
  }
  _getDefaultMaxDate() {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var curDate = year + "-" + month + "-" + date;
    return curDate;
  }

  _getDefaultMinDate() {
    var curDate = "01/01/1700";
    return curDate;
  }
  onChangeDate(date) {
    this.setState({ birthDate: date });
  }
  onPressUpdate() {
    var firstName = this.state.firstName;
    var lastName = this.state.lastName;
    var email = this.state.email;
    var birthDate = this.state.birthDate;
    var relationship = this.state.relationship;
    var isValid = true;

    if (firstName === "") {
      this.setState({ showErrorFirstName: true });
      isValid = false;
    } else {
      this.setState({ showErrorFirstName: false });
    }

    if (lastName === "") {
      this.setState({ showErrorLastName: true });
      isValid = false;
    } else {
      this.setState({ showErrorLastName: false });
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
      } else {
        this.setState({ showErrorEmail: false });
      }
    }
    if (relationship === "") {
      this.setState({ showErrorRelationship: true });
      isValid = false;
    } else {
      this.setState({ showErrorRelationship: false });
    }

    if (isValid) {
      var dataUser = {
        user_id: this.state.user_id,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        birthDate: convertDateToMillisecond(this.state.birthDate),
        relationship: this.state.relationship,
        sex: this.state.valueSex
      };

      // alert("scr: " + JSON.stringify(dataUser));
      this.props.onUpdateMember(dataUser);
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

  isPhoneNumber(userName) {
    let num = userName.replace(".", "");
    return !isNaN(num);
  }

  componentWillReceiveProps(props) {
    let hasError = props.hasError;
    let error = props.lastError;
    let messageSuccess = props.messageSuccess;
    if (!hasError && error === "") {
      let errTitle = Translate(DefineKey.DialogWarning_text_title);
      this.onOpenDialogWarning(errTitle, messageSuccess);
    } else {
      if (error != null && error !== "") {
        let errTitle = Translate(DefineKey.DialogWarning_text_title);
        this.onOpenDialogWarning(errTitle, error);
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
              <View
                style={
                  !this.state.showErrorFirstName
                    ? styles.hideViewError
                    : styles.viewError
                }
              >
                <Text style={styles.textError}>
                  {Translate(DefineKey.Register_error_firstName)}
                </Text>
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
                  autoFocus={true}
                  returnKeyType="next"
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
              {/* show error imput lastName */}
              <View
                style={
                  !this.state.showErrorLastName
                    ? styles.hideViewError
                    : styles.viewError
                }
              >
                <Text style={styles.textError}>
                  {Translate(DefineKey.Register_error_lastName)}
                </Text>
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
                  autoFocus={true}
                  returnKeyType="next"
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
              {/* show error imput realtionship */}
              <View
                style={
                  !this.state.showErrorRelationship
                    ? styles.hideViewError
                    : styles.viewError
                }
              >
                <Text style={styles.textError}>
                  {Translate(DefineKey.Register_error_relationship)}
                </Text>
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
                  autoFocus={true}
                  returnKeyType="next"
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
              {/* show error imput email */}
              <View
                style={
                  !this.state.showErrorEmail
                    ? styles.hideViewError
                    : styles.viewError
                }
              >
                <Text style={styles.textError}>
                  {this.state.textErrorEmail}
                </Text>
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
                  onFocus={() => {
                    Keyboard.dismiss();
                    this._onShowDatePicker();
                  }}
                 
                  onSubmitEditing={() => Keyboard.dismiss}
                  onChangeText={text =>
                    this.setState({
                      birthDate: text.substring(0, 10).trim(),
                      showErrorBirthDate: false
                    })
                  }
                />

                <Image
                  source={require("../../../../../assets/icon_birthday.png")}
                  style={styles.imageInput}
                />
              </View>
              {/* display dialog select date and time */}
              <DatePicker
                ref={"datePicker"}
                style={{ width: 0, height: 0 }}
                mode="date"
                locale="vi"
                // date={this.state.date}
                format={Constant.DEFAULT_SYMPLE_DATE}
                minDate={this._getDefaultMinDate()}
                maxDate={this._getDefaultMaxDate()}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                onDateChange={date => {
                  this.onChangeDate(date);
                }}
              />

              <View />
              <TouchableOpacity
                style={styles.btnLogin}
                onPress={() => this.onPressUpdate()}
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
