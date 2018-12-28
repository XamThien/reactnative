import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView,
  TextInput,
  Keyboard
} from "react-native";
import { SafeAreaView } from "react-navigation";
import styles from "./UpdateDoctorInfoStyle";
import { Translate } from "../../../../utils/Language";
import DefineKey from "../../../../config/language/DefineKey";
import ScreenName from "../../../../commons/ScreenName";
import DatePicker from "../../../../components/DatePicker";
import Constant from "../../../../commons/Constants";
import DoctorInfoUpdateItem from "../../../../components/DoctorInfoUpdateItem";
import { StackActions, NavigationActions } from "react-navigation";
import DialogLoading from "../../../../components/DialogLoading";
import WarningDialog from "../../../../components/WarningDialog";
import {
  convertMillisecondToDate,
  convertDateToMillisecond
} from "../../../../utils/Utils";

export default class UpdateDoctorInfoScr extends Component {
  constructor(props) {
    super(props);
    this.state = {
      warningdialogvisible: false,
      // ...props,
      last_name: props.userProfile.last_name,
      first_name: props.userProfile.first_name,
      description: props.doctorData[0].value,
      birthday: props.doctorData[1].value,
      birthplace: props.doctorData[2].value,
      home_town: props.doctorData[3].value,
      phone: props.doctorData[4].value,
      email: props.doctorData[5].value,
      avata: props.userProfile.image,
      speciality_name: props.doctorData[6].value,
      place: props.doctorData[7].value,
      department_name: props.doctorData[8].value,
      position_name: props.doctorData[9].value,
      disease_name: props.doctorData[10].value,
      degree_name: props.doctorData[11].value,
      academic_rank_name: props.doctorData[12].value,
      experience: props.doctorData[13].value,
      language_name: props.doctorData[14].value,
      working_process: props.doctorData[15].value,
      training_process: props.doctorData[16].value,
      research_work: props.doctorData[17].value,
      certificate: props.doctorData[18].value,
      organization: props.doctorData[19].value,
      day_off: props.doctorData[20].value,

      valid: true,
      error_last_name: false,
      error_first_name: false,
      // error_description: false,
      error_birthday: false,
      // error_birthplace: false,
      error_home_town: false,
      error_phone: false,
      // error_email: false,
      // error_avata: false,
      error_speciality_name: false,
      error_place: false,
      error_department_name: false,
      error_position_name: false,
      error_disease_name: false

    };
    this._onShowDatePicker = this._onShowDatePicker.bind(this);
    this.onOpenDialogWarning = this.onOpenDialogWarning.bind(this);
    this.onWarningOk = this.onWarningOk.bind(this);

    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeBirthday = this.onChangeBirthday.bind(this);
    this.onChangeBirthPlace = this.onChangeBirthPlace.bind(this);
    this.onChangeHomeTown = this.onChangeHomeTown.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangeAvata = this.onChangeAvata.bind(this);
    this.onChangeSpecialityName = this.onChangeSpecialityName.bind(this);
    this.onChangePlace = this.onChangePlace.bind(this);
    this.onChangeDepartmentName = this.onChangeDepartmentName.bind(this);
    this.onChangePositionName = this.onChangePositionName.bind(this);
    this.onChangeDiseaseName = this.onChangeDiseaseName.bind(this);
    this.onChangeDegreeName = this.onChangeDegreeName.bind(this);
    this.onChangeAcademicRankName = this.onChangeAcademicRankName.bind(this);
    this.onChangeExperience = this.onChangeExperience.bind(this);
    this.onChangeLanguageName = this.onChangeLanguageName.bind(this);
    this.onChangeWorkingProcess = this.onChangeWorkingProcess.bind(this);
    this.onChangeTrainingProcess = this.onChangeTrainingProcess.bind(this);
    this.onChangeResearchWork = this.onChangeResearchWork.bind(this);
    this.onChangeCertificate = this.onChangeCertificate.bind(this);
    this.onChangeOrganization = this.onChangeOrganization.bind(this);
    this.onChangeDayOff = this.onChangeDayOff.bind(this);
  }

  onOpenDialogWarning(errTitle, errContent) {
    this.setState({
      warningdialogvisible: true,
      errTitle: errTitle,
      errContent: errContent
    });
  }

  onWarningOk() {
    this.setState({ warningdialogvisible: false });
  }
  // function : luu thong tin cap nhat
  onPressSave() {
    var valid = true;
    if (
      this.state.last_name === null ||
      this.state.last_name === undefined ||
      this.state.last_name === ""
    ) {
      this.setState({ error_last_name: true });
      valid = false;
    }

    if (
      this.state.first_name === null ||
      this.state.first_name === undefined ||
      this.state.first_name === ""
    ) {
      this.setState({ error_first_name: true });
      valid = false;
    }

    if (
      this.state.birthday === null ||
      this.state.birthday === undefined ||
      this.state.birthday === ""
    ) {
      this.setState({ error_birthday: true });
      valid = false;
    }

    if (
      this.state.home_town === null ||
      this.state.home_town === undefined ||
      this.state.home_town === ""
    ) {
      this.setState({ error_home_town: true });
      valid = false;
    }

    if (
      this.state.phone === null ||
      this.state.phone === undefined ||
      this.state.phone === ""
    ) {
      this.setState({ error_phone: true });
      valid = false;
    }

    if (
      this.state.speciality_name === null ||
      this.state.speciality_name === undefined ||
      this.state.speciality_name === ""
    ) {
      this.setState({ error_speciality_name: true });
      valid = false;
    }

    if (
      this.state.place === null ||
      this.state.place === undefined ||
      this.state.place === ""
    ) {
      this.setState({ error_place: true });
      valid = false;
    }

    if (
      this.state.department_name === null ||
      this.state.department_name === undefined ||
      this.state.department_name === ""
    ) {
      this.setState({ error_department_name: true });
      valid = false;
    }
    // error_position_name: false,
    if (
      this.state.position_name === null ||
      this.state.position_name === undefined ||
      this.state.position_name === ""
    ) {
      this.setState({ error_position_name: true });
      valid = false;
    }
    // error_disease_name: false,
    if (
      this.state.disease_name === null ||
      this.state.disease_name === undefined ||
      this.state.disease_name === ""
    ) {
      this.setState({ error_disease_name: true });
      valid = false;
    }
    if (valid === true) {
      var doctorInfo = {
        last_name: this.state.last_name,
        first_name: this.state.first_name,
        description: this.state.description,
        birthday: this.state.birthday,
        birthplace: this.state.birthplace,
        home_town: this.state.home_town,
        phone: this.state.phone,
        email: this.state.email,
        avata: "",
        speciality_name: this.state.speciality_name,
        place: this.state.place,
        department_name: this.state.department_name,
        position_name: this.state.position_name,
        disease_name: this.state.disease_name,
        degree_name: this.state.degree_name,
        academic_rank_name: this.state.academic_rank_name,
        experience: this.state.experience,
        language_name: this.state.language_name,
        working_process: this.state.working_process,
        training_process: this.state.training_process,
        research_work: this.state.research_work,
        certificate: this.state.certificate,
        organization: this.state.organization,
        day_off: this.state.day_off
      };
      // alert("From update scr : " + JSON.stringify(doctorInfo));
      this.props.doUpdateDoctorProfile(doctorInfo);
    } else {
      let errTitle = Translate(DefineKey.DialogWarning_text_title);
      this.onOpenDialogWarning(
        errTitle,
        Translate(DefineKey.Doctor_Info_Manager_Update_Input_Require_Error_Text)
      );
    }
  }
  // ==================== date picker ==========================
  showBirthday(text) {
    var birthday = "";
    birthday = convertMillisecondToDate(text);
    return birthday;
  }
  onChangeDate(date) {
    this.setState({ birthday: convertDateToMillisecond(date) });
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
    var curDate = "01/01/1900";
    return curDate;
  }
  // ==================== end date picker ==========================

  // ========= list function update state for doctor items =========

  // last_name: "",
  onChangeLastName(text) {
    this.setState({ last_name: text });
  }
  // first_name: "",
  onChangeFirstName(text) {
    this.setState({ first_name: text });
  }
  // description: "",
  onChangeDescription(text) {
    this.setState({ description: text });
  }
  // birthday: "",
  onChangeBirthday(text) {
    this.setState({ birthday: convertDateToMillisecond(text) });
  }
  // birthplace: "",
  onChangeBirthPlace(text) {
    this.setState({ birthplace: text });
  }
  // home_town: "",
  onChangeHomeTown(text) {
    this.setState({ home_town: text });
  }
  // phone: "",
  onChangePhone(text) {
    this.setState({ phone: text });
  }
  // // email: "",
  // onChangeLastName(text){
  //   this.setState({last_name: text});
  // }
  // avata: "",
  onChangeAvata(link) {
    this.setState({ avata: link });
  }
  // speciality_name: "",
  onChangeSpecialityName(text) {
    this.setState({ speciality_name: text });
  }
  // place: "",
  onChangePlace(text) {
    this.setState({ place: text });
  }
  // department_name: "",
  onChangeDepartmentName(text) {
    this.setState({ department_name: text });
  }
  // position_name: "",
  onChangePositionName(text) {
    this.setState({ position_name: text });
  }
  // disease_name: "",
  onChangeDiseaseName(text) {
    this.setState({ disease_name: text });
  }
  // degree_name: "",
  onChangeDegreeName(text) {
    this.setState({ degree_name: text });
  }
  // academic_rank_name: "",
  onChangeAcademicRankName(text) {
    this.setState({ academic_rank_name: text });
  }
  // experience: "",
  onChangeExperience(text) {
    this.setState({ experience: text });
  }
  // language_name: "",
  onChangeLanguageName(text) {
    this.setState({ language_name: text });
  }
  // working_process: "",
  onChangeWorkingProcess(text) {
    this.setState({ working_process: text });
  }
  // training_process: "",
  onChangeTrainingProcess(text) {
    this.setState({ training_process: text });
  }
  // research_work: "",
  onChangeResearchWork(text) {
    this.setState({ research_work: text });
  }
  // certificate: "",
  onChangeCertificate(text) {
    this.setState({ certificate: text });
  }
  // organization: "",
  onChangeOrganization(text) {
    this.setState({ organization: text });
  }
  // day_off: ""
  onChangeDayOff(text) {
    this.setState({ day_off: text });
  }

  // ========= end list function update state for doctor items =========

  componentDidMount = () => {
    let loginResponse = this.props.userProfile;
    let profile = this.props.doctorData;

  };

  getImage() {
    // const base64Icon = "data:image/png;base64," + this.props.image;
    // return this.props.image === ""
    // ? require("../../../assets/icon_app.png")
    // : {uri:base64Icon};
  }
  componentWillReceiveProps(props) {
    let hasError = props.hasError;
    let error = props.lastError;
    let messageSuccess = props.messageSuccess;
    if (!hasError && error === "") {
      let errTitle = Translate(DefineKey.DialogWarning_text_title);
      this.onOpenDialogWarning(errTitle, messageSuccess);
      // alert(messageSuccess,errTitle);
      
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
        <View style={styles.container}>
          <View style={styles.layoutWrapContent}>
            <ScrollView>
              <View style={styles.banner}>
                <ImageBackground
                  source={{
                    uri:
                      "https://dwbxi9io9o7ce.cloudfront.net/build/72e582948494501bbab89a19ee739402.jpg"
                  }}
                  style={{ width: "100%", height: "100%" }}
                >
                  <View style={styles.main_banner}>
                    <View style={styles.avatar_container}>
                      <Image
                        style={styles.avatar}
                        source={require("../../../../../assets/profiles/user.png")}
                      />
                      <Text style={styles.textUserName}>
                        {this.props.userProfile.name}
                      </Text>
                    </View>
                    {/* <View style={styles.rating_container}>
                      <Image
                        style={styles.rating}
                        source={require("../../../../../assets/rating.jpg")}
                      />
                    </View> */}
                  </View>
                </ImageBackground>
              </View>
              <View style={styles.content}>
                {/*========================= doctor info item======================*/}
                <View style={styles.info}>
                  {/* last_name: "",  */}
                  <DoctorInfoUpdateItem
                    editable={true}
                    title={Translate(DefineKey.Doctor_Info_Manager_Last_Name)}
                    content={this.state.last_name}
                    onChange={this.onChangeLastName.bind()}
                    hasRequire={true}
                    //this.props.userProfile.last_name
                  />
                  {/* first_name: "",  */}
                  <DoctorInfoUpdateItem
                    editable={true}
                    title={Translate(DefineKey.Doctor_Info_Manager_First_Name)}
                    content={this.state.first_name}
                    onChange={this.onChangeFirstName.bind()}
                    hasRequire={true}
                    //this.props.userProfile.first_name
                  />
                  {/* description: "",  */}
                  <DoctorInfoUpdateItem
                    editable={true}
                    title={Translate(DefineKey.Doctor_Info_Manager_Description)}
                    content={this.state.description}
                    onChange={this.onChangeDescription.bind()}
                    hasRequire={false}
                    //this.props.doctorData[0].value
                  />
                  {/* birthday: "", */}
                  <View style={styles.row_container}>
                    <View style={styles.title}>
                      <Text style={styles.text_title}>
                        {Translate(DefineKey.Doctor_Info_Manager_Birthday) +
                          ":"}
                      </Text>
                    </View>
                    <View style={styles.row_content}>
                      <TextInput
                        style={styles.textInput}
                        placeholder={
                          Translate(DefineKey.Doctor_Info_Manager_Birthday) +
                          "..."
                        }
                        autoCapitalize="none"
                        autoCorrect={false}
                        onFocus={() => {
                          Keyboard.dismiss();
                          this._onShowDatePicker();
                        }}
                        keyboardType="default"
                        value={this.showBirthday(this.state.birthday)}
                        //this.props.doctorData[1].value
                      />
                    </View>
                  </View>

                  {/* birthplace: "",  */}
                  <DoctorInfoUpdateItem
                    editable={true}
                    title={Translate(DefineKey.Doctor_Info_Manager_Birth_Place)}
                    content={this.state.birthplace}
                    onChange={this.onChangeBirthPlace.bind()}
                    // this.props.doctorData[2].value
                  />
                  {/* home_town: "",  */}
                  <DoctorInfoUpdateItem
                    editable={true}
                    title={Translate(DefineKey.Doctor_Info_Manager_Home_Town)}
                    content={this.state.home_town}
                    onChange={this.onChangeHomeTown.bind()}
                    hasRequire={false}
                    //this.props.doctorData[3].value
                  />
                  {/* phone: "",  */}
                  <DoctorInfoUpdateItem
                    editable={true}
                    title={Translate(DefineKey.Doctor_Info_Manager_Phone)}
                    content={this.state.phone}
                    onChange={this.onChangePhone.bind()}
                    hasRequire={true}
                    //this.props.doctorData[4].value
                  />
                  {/* email: "",  */}
                  <DoctorInfoUpdateItem
                    editable={false}
                    title={Translate(DefineKey.Doctor_Info_Manager_Email)}
                    content={this.state.email}
                    onChange={() => {}}
                    hasRequire={true}
                    //this.props.doctorData[5].value
                  />

                  {/* speciality_name: "" */}
                  <DoctorInfoUpdateItem
                    editable={true}
                    title={Translate(DefineKey.Doctor_Info_Manager_Speciality)}
                    content={this.state.speciality_name}
                    onChange={this.onChangeSpecialityName.bind()}
                    hasRequire={true}
                    //this.props.doctorData[6].value
                  />
                  {/* place: "",  */}
                  <DoctorInfoUpdateItem
                    editable={true}
                    title={Translate(DefineKey.Doctor_Info_Manager_Place)}
                    content={this.state.place}
                    onChange={this.onChangePlace.bind()}
                    hasRequire={true}
                    // this.props.doctorData[7].value
                  />
                  {/* department_name: "",  */}
                  <DoctorInfoUpdateItem
                    editable={true}
                    title={Translate(
                      DefineKey.Doctor_Info_Manager_Department_Name
                    )}
                    content={this.state.department_name}
                    onChange={this.onChangeDepartmentName.bind()}
                    hasRequire={true}
                    //this.props.doctorData[8].value
                  />
                  {/* position_name: "",  */}
                  <DoctorInfoUpdateItem
                    editable={true}
                    title={Translate(
                      DefineKey.Doctor_Info_Manager_Position_Name
                    )}
                    content={this.state.position_name}
                    onChange={this.onChangePositionName.bind()}
                    hasRequire={true}
                    //this.props.doctorData[9].value
                  />
                  {/* disease_name: "",  */}
                  <DoctorInfoUpdateItem
                    editable={true}
                    title={Translate(
                      DefineKey.Doctor_Info_Manager_Disease_Name
                    )}
                    content={this.state.disease_name}
                    onChange={this.onChangeDiseaseName.bind()}
                    hasRequire={true}
                    //this.props.doctorData[10].value
                  />
                  {/* degree_name: "",  */}
                  <DoctorInfoUpdateItem
                    editable={true}
                    title={Translate(DefineKey.Doctor_Info_Manager_Degree_Name)}
                    content={this.state.degree_name}
                    onChange={this.onChangeDegreeName.bind()}
                    hasRequire={false}
                    //this.props.doctorData[11].value
                  />
                  {/* academic_rank_name: "", */}
                  <DoctorInfoUpdateItem
                    editable={true}
                    title={Translate(
                      DefineKey.Doctor_Info_Manager_Academic_Rank_Name
                    )}
                    content={this.state.academic_rank_name}
                    onChange={this.onChangeAcademicRankName.bind()}
                    hasRequire={false}
                    //this.props.doctorData[12].value
                  />
                  {/* experience: "",  */}
                  <DoctorInfoUpdateItem
                    editable={true}
                    title={Translate(DefineKey.Doctor_Info_Manager_Experience)}
                    content={this.state.experience}
                    onChange={this.onChangeExperience.bind()}
                    hasRequire={false}
                    //this.props.doctorData[13].value
                  />
                  {/* language_name: "",  */}
                  <DoctorInfoUpdateItem
                    editable={true}
                    title={Translate(
                      DefineKey.Doctor_Info_Manager_Language_Name
                    )}
                    content={this.state.language_name}
                    onChange={this.onChangeLanguageName.bind()}
                    hasRequire={false}
                    //this.props.doctorData[14].value
                  />
                  {/* working_process: "", */}
                  <DoctorInfoUpdateItem
                    editable={true}
                    title={Translate(
                      DefineKey.Doctor_Info_Manager_Working_Process
                    )}
                    content={this.state.working_process}
                    onChange={this.onChangeWorkingProcess.bind()}
                    hasRequire={false}
                    //this.props.doctorData[15].value
                  />
                  {/* training_process: "",  */}
                  <DoctorInfoUpdateItem
                    editable={true}
                    title={Translate(
                      DefineKey.Doctor_Info_Manager_Training_Process
                    )}
                    content={this.state.training_process}
                    onChange={this.onChangeTrainingProcess.bind()}
                    hasRequire={false}
                    //this.props.doctorData[16].value
                  />
                  {/* research_work: "",  */}
                  <DoctorInfoUpdateItem
                    editable={true}
                    title={Translate(
                      DefineKey.Doctor_Info_Manager_Reseach_Work
                    )}
                    content={this.state.research_work}
                    onChange={this.onChangeResearchWork.bind()}
                    hasRequire={false}
                    //this.props.doctorData[17].value
                  />
                  {/* certificate: "", */}
                  <DoctorInfoUpdateItem
                    editable={true}
                    title={Translate(DefineKey.Doctor_Info_Manager_Certificate)}
                    content={this.state.certificate}
                    onChange={this.onChangeCertificate.bind()}
                    hasRequire={false}
                    //this.props.doctorData[18].value
                  />
                  {/* organization: "",  */}
                  <DoctorInfoUpdateItem
                    editable={true}
                    title={Translate(
                      DefineKey.Doctor_Info_Manager_Organization
                    )}
                    content={this.state.organization}
                    onChange={this.onChangeOrganization.bind()}
                    hasRequire={false}
                    //this.state.organization
                  />
                  {/* day_off: "" */}
                  <DoctorInfoUpdateItem
                    editable={true}
                    title={Translate(DefineKey.Doctor_Info_Manager_Day_Off)}
                    content={this.state.day_off}
                    onChange={this.onChangeDayOff.bind()}
                    hasRequire={false}
                  />
                </View>
                {/*========================= doctor info item======================*/}
              </View>

              <DialogLoading loading={this.props.showLoading} />
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
              <WarningDialog
                titleDialog={this.state.errTitle}
                contentDialog={this.state.errContent}
                onOk={this.onWarningOk.bind()}
                textOk={Translate(DefineKey.DialogWarning_text_ok)}
                visible={this.state.warningdialogvisible}
              />
            </ScrollView>
            <View style={styles.layoutFooter}>
              <TouchableOpacity
                style={styles.layoutButton}
                onPress={() => this.onPressSave()}
              >
                <Text style={styles.textButton}>{Translate(DefineKey.Doctor_Info_Manager_Update_Save_Button)}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
