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

import Modal from "react-native-modalbox";
import styles from "./EditUserInfoModalStyle";
import { Translate } from "../../../../utils/Language";
import DefineKey from "../../../../config/language/DefineKey";
import DialogLoading from "../../../../components/DialogLoading";
import DatePicker from "../../../../components/DatePicker";
import Constant from "../../../../commons/Constants";
import {
  convertMillisecondToDate,
  convertDateToMillisecond
} from "../../../../utils/Utils";
import WarningDialog from "../../../../components/WarningDialog";

// const MAX_DATE_SELECTOR = 7;
export default class EditUserInfoModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      warningdialogvisible: false,

      userInfo: {},
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      // password: "",
      // confirm_password: "",
      image: "",
      // relationship: "",
      date_birth: "",
      // valueIndex: 0,
      // valueSex: "0",

      showErrorFirstName: false,
      showErrorLastName: false,
      showErrorPhone: false,
      showErrorBirthDate: false,

      errTitle: "",
      errContent: ""
    };
    this._onShowDatePicker = this._onShowDatePicker.bind(this);
    this.onOpenDialogWarning = this.onOpenDialogWarning.bind(this);
    this.onWarningOk = this.onWarningOk.bind(this);
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
    this.dismissEditFormEdit();
  }
  componentWillReceiveProps(props) {
    var isDissmissDialog = props.isDissmissDialog;
    if (isDissmissDialog) {
      this.dismissEditFormEdit();
      alert(props.messageSuccess);
    }
    // if (isDissmissDialog) {
    //   let errTitle = Translate(DefineKey.DialogWarning_text_title);
    //   this.onOpenDialogWarning(errTitle, props.messageSuccess);
    // }
  }

  showFormEdit(userInfo) {

    this.setState({
      userInfo: userInfo,
      first_name: userInfo.first_name,
      last_name: userInfo.last_name,
      email: userInfo.email,
      phone: userInfo.phoneNumber,
      date_birth: userInfo.date_birth,
      image: userInfo.image,
      date_birth: userInfo.date_birth
    });
    if (this.state.date_birth === null) {
      this.setState({
        date_birth: ""
      });
    }
    this.refs.myModal.open();
  }
  showBirthday() {
    var birthday = "";
    if (this.state.date_birth !== "" || this.state.date_birth !== null) {
      birthday = convertMillisecondToDate(this.state.date_birth);
    }
    return birthday;
  }
  onChangeDate(date) {
    this.setState({ date_birth: convertDateToMillisecond(date) });
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
  dismissEditFormEdit() {
    this.refs.myModal.close();
  }

  changeAvatar() {
    alert("Event change avatar");
  }
  validateEmail(email) {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return reg.test(email) === true;
  }
  isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  onPressEditUserInfo() {
    var userOldInfo = this.state.userInfo;
    var first_name = this.state.first_name;
    var last_name = this.state.last_name;
    // var email = this.state.email;
    var phone = this.state.phoneNumber;
    // var password = this.state.password;
    // var confirm_password = this.state.confirm_password;
    var isValid = true;

    if (first_name === "") {
      this.setState({ showErrorFirstName: true });
      isValid = false;
    }
    if (last_name === "") {
      this.setState({ showErrorLastName: true });
      isValid = false;
    }

    if (phone === "") {
      this.setState({ showErrorPhone: true });
      isValid = false;
    }


    if (isValid) {
      var dataNewUser = {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        phone: this.state.phone,
        sex: 1,
        date_birth: this.state.date_birth,
        avata: this.state.image
      };
      this.props.editUserInfo(dataNewUser,userOldInfo);
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
                <TouchableOpacity onPress={() => this.dismissEditFormEdit()}>
                  <Image
                    style={styles.imgClose}
                    source={require("../../../../../assets/icon_close_white.png")}
                  />
                </TouchableOpacity>
                <Text style={styles.txtTitleHead}>
                  {Translate(DefineKey.USER_MANAGER_EDIT_HEADER_TITLE)}
                </Text>
              </View>
              <View style={styles.layoutWrapInput}>
                <View style={styles.layoutIconInput}>
                  <Image
                    style={styles.iconInput}
                    source={require("../../../../../assets/icon_membership.png")}
                  />
                </View>
                <View style={styles.layoutInput}>
                  <Text
                    style={
                      (styles.textTitleInput,
                      { textDecorationLine: "underline" })
                    }
                    onPress={() => this.changeAvatar()}
                  >
                    {"Change avatar"}
                  </Text>
                </View>
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
                        value={this.state.first_name}
                        placeholderTextColor="gray"
                        ref="first_name"
                        onSubmitEditing={() => this.refs.last_name.focus()}
                        onChangeText={text =>
                          this.setState({
                            first_name: text,
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
                        {Translate(DefineKey.Register_last_name)}
                      </Text>
                      <TextInput
                        style={styles.input}
                        placeholder={
                          Translate(DefineKey.Register_last_name) + "..."
                        }
                        autoCapitalize="none"
                        autoCorrect={false}
                        returnKeyType="next"
                        keyboardType="default"
                        value={this.state.last_name}
                        placeholderTextColor="gray"
                        ref="last_name"
                        onSubmitEditing={() => this.refs.phone.focus()}
                        onChangeText={text =>
                          this.setState({
                            last_name: text,
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

                  {/* define layout input email */}
                  <View style={[styles.layoutWrapInput]}>
                    <View style={styles.layoutIconInput}>
                      <Image
                        style={styles.iconInput}
                        source={require("../../../../../assets/icon_email.png")}
                      />
                    </View>
                    <View style={styles.layoutInput}>
                      <Text style={styles.textTitleInput}>
                        {Translate(DefineKey.Register_email)}
                      </Text>
                      <TextInput
                        style={styles.input}
                        placeholder={
                          Translate(DefineKey.Register_email) + "..."
                        }
                        autoCapitalize="none"
                        editable={false} 
                        selectTextOnFocus={false}
                        autoCorrect={false}
                        value={this.state.email}
                        placeholderTextColor="gray"
                      />
                    </View>
                  </View>

                  {/* define layout input phone */}
                  <View style={[styles.layoutWrapInput]}>
                    <View style={styles.layoutIconInput}>
                      <Image
                        style={styles.iconInput}
                        source={require("../../../../../assets/icon_email.png")}
                      />
                    </View>
                    <View style={styles.layoutInput}>
                      <Text style={styles.textTitleInput}>
                        {Translate(DefineKey.Register_phone)}
                      </Text>
                      <TextInput
                        style={styles.input}
                        placeholder={
                          Translate(DefineKey.Register_phone) + "..."
                        }
                        autoCapitalize="none"
                        autoCorrect={false}
                        returnKeyType="next"
                        keyboardType="numeric"
                        value={this.state.phone}
                        placeholderTextColor="gray"
                        ref="phone"
                        onSubmitEditing={() => this.refs.date.focus()}
                        onChangeText={text =>
                          this.setState({ phone: text, showErrorPhone: false })
                        }
                      />
                      {/* show error imput phone */}
                      <View
                        style={
                          !this.state.showErrorPhone
                            ? styles.hideViewError
                            : styles.viewError
                        }
                      >
                        <Text style={styles.textError}>
                          {Translate(DefineKey.Register_error_phone)}
                        </Text>
                      </View>
                    </View>
                  </View>

                  {/* define layout input birth day */}
                  <View style={[styles.layoutWrapInput]}>
                    <View style={styles.layoutIconInput}>
                      <Image
                        style={styles.iconInput}
                        source={require("../../../../../assets/icon_birthday.png")}
                      />
                    </View>
                    <View style={styles.layoutInput}>
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
                        value={this.showBirthday()}
                        placeholderTextColor="gray"
                        ref="date"
                        onFocus={() => {
                          Keyboard.dismiss();
                          this._onShowDatePicker();
                        }}
                        onSubmitEditing={() => Keyboard.dismiss}
                        onChangeText={text =>
                          this.setState({
                            date_birth: text.substring(0, 10).trim(),
                            showErrorBirthDate: false
                          })
                        }
                      />
                      {/* show error imput birth */}
                      <View
                        style={
                          !this.state.showErrorBirthday
                            ? styles.hideViewError
                            : styles.viewError
                        }
                      >
                        <Text style={styles.textError}>{"not null"}</Text>
                      </View>
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
                  </View>
                  <WarningDialog
                    titleDialog={this.state.errTitle}
                    contentDialog={this.state.errContent}
                    onOk={this.onWarningOk.bind()}
                    textOk={Translate(DefineKey.DialogWarning_text_ok)}
                    visible={this.state.warningdialogvisible}
                  />

                  <View style={styles.viewEmpty} />
                </ScrollView>
              </View>
              <TouchableHighlight
                style={styles.layoutFooter}
                onPress={() => {
                  this.onPressEditUserInfo();
                }}
              >
                <View>
                  <Text style={styles.txtSave}>
                    {Translate(DefineKey.EditMemberModal_text_save)}
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

// export var arrSex = [
//   { label: Translate(DefineKey.AddNewMemberModal_text_male), value: 0 },
//   { label: Translate(DefineKey.AddNewMemberModal_text_female), value: 1 }
// ];
