import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableHighlight
} from "react-native";
import RadioForm, { RadioButton } from "react-native-simple-radio-button";
import Modal from "react-native-modalbox";
import styles from "./AddNewMemberStyle";
import { Translate } from "../../../../utils/Language";
import DefineKey from "../../../../config/language/DefineKey";
import Colors from "../../../../commons/Colors";
import DialogLoading from "../../../../components/DialogLoading";
import DatePicker from "../../../../components/DatePicker";
import Constant from  "../../../../commons/Constants";

const MAX_DATE_SELECTOR = 7;
export default class AddNewMemberModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      firstName: "",
      lastName: "",
      email: "",
      relationship: "",
      birthDate: "",
      valueIndex: 0,
      valueSex: "0",

      textErrorEmail: "",
      showErrorFirstName: false,
      showErrorLastName: false,
      showErrorEmail: false,
      showErrorRelationship: false,
      showErrorBirthDate: false
    };
    this._onShowDatePicker = this._onShowDatePicker.bind(this);
  }

  componentWillReceiveProps(props) {
    var isDissmissDialog = props.isDissmissDialog;
    if (isDissmissDialog) {
      this.dismissAddNewMemberName();
    }
  }

  showAddNewMemberModal(userId) {
    this.setState({ userId: userId });
    this.resetOldData();
    this.refs.myModal.open();
  }
  onChangeDate(date) {
    // if(date === this.state.txtDateTime) {
    //     return;
    // }
    this.setState({birthDate: date});
    // this.props.onGetDataAppointmentSchedule(this.state.doctorId, date);
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
  dismissAddNewMemberName() {
    this.refs.myModal.close();
  }

  resetOldData() {
    this.setState({
      firstName: "",
      lastName: "",
      email: "",
      birthDate: "",
      relationship: ""
    });
  }

  validateEmail(email) {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return reg.test(email) === true;
  }
  isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  validateBirthDate() {
    var birthDate = this.state.birthDate;
    birthDate = birthDate.replace("/", "").replace("/", "");
    if (this.isNumeric(birthDate) === false) {
      return false;
    } else {
      return true;
    }
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

    if (birthDate === "" && this.validateBirthDate(birthDate) === true) {
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

  render() {
    //console.log("render props", this.props)
    return (
      <Modal
        style={styles.wrapContent}
        position="center"
        backdrop={true}
        coverScreen={true}
        backdropOpacity={0.5}
        onClosed={() => console.log("close modal")}
        ref={"myModal"}
      >
        <KeyboardAvoidingView behavior="padding" style={styles.wrapContent}>
          <TouchableWithoutFeedback
            style={styles.wrapContent}
            onPress={Keyboard.dismiss}
          >
            <View style={styles.wrapContent}>
              <View style={styles.header}>
                <TouchableOpacity
                  onPress={() => this.dismissAddNewMemberName()}
                >
                  <Image
                    style={styles.imgClose}
                    source={require("../../../../../assets/icon_close_white.png")}
                  />
                </TouchableOpacity>
                <Text style={styles.txtTitleHead}>
                  {Translate(DefineKey.AppointNameModal_text_add)}
                </Text>
              </View>
              <View style={styles.layoutTopIcon}>
                <Image
                  style={styles.iconAddUser}
                  source={require("../../../../../assets/icon_add_user.png")}
                />
              </View>
              <View style={styles.layoutContent}>
                <ScrollView>
                  {/* define layout input firstName */}
                  <View style={styles.layoutWrapInput}>
                    <View style={styles.layoutIconInput}>
                      <Image
                        style={styles.iconInput}
                        source={require("../../../../../assets/icon_username.png")}
                      />
                    </View>
                    <View style={styles.layoutInput}>
                      <Text style={styles.textTitleInput}>
                        {Translate(DefineKey.AddNewMemberModal_text_first_name)}
                      </Text>
                      <TextInput
                        style={styles.input}
                        placeholder={
                          Translate(
                            DefineKey.AddNewMemberModal_text_first_name
                          ) + "..."
                        }
                        autoCapitalize="none"
                        autoCorrect={false}
                        autoFocus={true}
                        returnKeyType="next"
                        keyboardType="default"
                        value={this.state.firstName}
                        placeholderTextColor="gray"
                        ref="firstName"
                        onSubmitEditing={() => this.refs.lastName.focus()}
                        onChangeText={text =>
                          this.setState({
                            firstName: text,
                            showErrorFirstName: false
                          })
                        }
                      />

                      {/* show error imput firstName */}
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
                    </View>
                  </View>

                  {/* define layout input lastName */}
                  <View style={[styles.layoutWrapInput]}>
                    <View style={styles.layoutIconInput}>
                      <Image
                        style={styles.iconInput}
                        source={require("../../../../../assets/icon_username.png")}
                      />
                    </View>
                    <View style={styles.layoutInput}>
                      <Text style={styles.textTitleInput}>
                        {Translate(DefineKey.AddNewMemberModal_text_last_name)}
                      </Text>
                      <TextInput
                        style={styles.input}
                        placeholder={
                          Translate(
                            DefineKey.AddNewMemberModal_text_last_name
                          ) + "..."
                        }
                        autoCapitalize="none"
                        autoCorrect={false}
                        autoFocus={true}
                        returnKeyType="next"
                        keyboardType="default"
                        value={this.state.lastName}
                        placeholderTextColor="gray"
                        ref="lastName"
                        onSubmitEditing={() => this.refs.relationship.focus()}
                        onChangeText={text =>
                          this.setState({
                            lastName: text,
                            showErrorLastName: false
                          })
                        }
                      />
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
                    </View>
                  </View>

                  {/* define layout input relationship */}
                  <View style={[styles.layoutWrapInput]}>
                    <View style={styles.layoutIconInput}>
                      <Image
                        style={styles.iconInput}
                        source={require("../../../../../assets/icon_family.png")}
                      />
                    </View>
                    <View style={styles.layoutInput}>
                      <Text style={styles.textTitleInput}>
                        {Translate(
                          DefineKey.AddNewMemberModal_text_relationship
                        )}
                      </Text>
                      <TextInput
                        style={styles.input}
                        placeholder={
                          Translate(
                            DefineKey.AddNewMemberModal_text_relationship
                          ) + "..."
                        }
                        autoCapitalize="none"
                        autoCorrect={false}
                        autoFocus={true}
                        returnKeyType="next"
                        keyboardType="default"
                        value={this.state.relationship}
                        placeholderTextColor="gray"
                        ref="relationship"
                        onSubmitEditing={() => this.refs.email.focus()}
                        onChangeText={text =>
                          this.setState({
                            relationship: text,
                            showErrorRelationship: false
                          })
                        }
                      />
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
                    </View>
                  </View>

                  {/* define layout input Email */}
                  <View style={[styles.layoutWrapInput]}>
                    <View style={styles.layoutIconInput}>
                      <Image
                        style={styles.iconInput}
                        source={require("../../../../../assets/icon_email.png")}
                      />
                    </View>
                    <View style={styles.layoutInput}>
                      <Text style={styles.textTitleInput}>
                        {Translate(DefineKey.AddNewMemberModal_text_email)}
                      </Text>
                      <TextInput
                        style={styles.input}
                        placeholder={
                          Translate(DefineKey.AddNewMemberModal_text_email) +
                          "..."
                        }
                        autoCapitalize="none"
                        autoCorrect={false}
                        autoFocus={true}
                        returnKeyType="next"
                        keyboardType="email-address"
                        value={this.state.email}
                        placeholderTextColor="gray"
                        ref="email"
                        onSubmitEditing={() => this.refs.birthdate.focus()}
                        onChangeText={text =>
                          this.setState({ email: text, showErrorEmail: false })
                        }
                      />
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
                    </View>
                  </View>

                  {/* define layout input date of birth */}
                  <View style={[styles.layoutWrapInput]}
                    onPress={()=>{
                          Keyboard.dismiss();
                          this._onShowDatePicker();
                        }}
                  >
                    <View style={styles.layoutIconInput}>
                      <Image
                        style={styles.iconInput}
                        source={require("../../../../../assets/icon_birthday.png")}
                      />
                    </View>
                    <View style={styles.layoutInput} >
                      <Text style={styles.textTitleInput}>
                        {Translate(
                          DefineKey.AddNewMemberModal_text_date_of_birth
                        )}
                      </Text>
                      <TextInput
                        style={styles.input}
                        placeholder="--/--/----"
                        autoCapitalize="none"
                        autoCorrect={false}
                        autoFocus={true}
                        returnKeyType="next"
                        keyboardType="default"
                        value={this.state.birthDate}
                        placeholderTextColor="gray"
                        ref="birthdate"
                        onFocus={()=>{
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
                      {/* show error imput birth date */}
                      <View
                        style={
                          !this.state.showErrorBirthDate
                            ? styles.hideViewError
                            : styles.viewError
                        }
                      >
                        <Text style={styles.textError}>
                          {Translate(DefineKey.Register_error_birthdate)}
                        </Text>
                      </View>
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
                  </View>

                  <RadioForm
                    style={styles.layoutRadio}
                    formHorizontal={true}
                    animation={true}
                  >
                    {arrSex.map((obj, i) => {
                      var is_selected = this.state.valueIndex == i;
                      return (
                        <View
                          key={i}
                          style={
                            i == 0
                              ? styles.radioButtonWrapLeft
                              : styles.radioButtonWrapRight
                          }
                        >
                          <RadioButton
                            isSelected={is_selected}
                            obj={obj}
                            index={i}
                            labelHorizontal={true}
                            labelStyle={styles.radioLabel}
                            buttonColor={Colors.defaultHeader}
                            style={styles.radioStyle}
                            onPress={(value, index) => {
                              this.setState({
                                valueSex: value,
                                valueIndex: index
                              });
                            }}
                          />
                        </View>
                      );
                    })}
                  </RadioForm>
                  <View style={styles.viewEmpty} />
                </ScrollView>
              </View>
              <TouchableHighlight
                style={styles.layoutFooter}
                onPress={() => {this.onPressAddNewMember()}}
              >
                <View>
                  <Text style={styles.txtSave}>
                    {Translate(DefineKey.AddNewMemberModal_text_save)}
                  </Text>
                </View>
              </TouchableHighlight>
              <DialogLoading loading={this.props.isLoading} />
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Modal>
    );
  }
}

export var arrSex = [
  { label: Translate(DefineKey.AddNewMemberModal_text_male), value: 0 },
  { label: Translate(DefineKey.AddNewMemberModal_text_female), value: 1 }
];
