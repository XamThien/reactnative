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
import {
  convertMillisecondToDate,
  convertDateToMillisecond
} from "../../../../utils/Utils";

export default class UpdateDoctorInfoScr extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctorProfile: [],
      last_name: "",
      first_name: "",
      description: "",
      birthday: "",
      birthplace: "",
      home_town: "",
      phone: "",
      email: "",
      avata: "",
      speciality_name: "",
      place: "",
      department_name: "",
      position_name: "",
      disease_name: "",
      degree_name: "",
      academic_rank_name: "",
      experience: "",
      language_name: "",
      working_process: "",
      training_process: "",
      research_work: "",
      certificate: "",
      organization: "",
      day_off: ""
    };
    this._onShowDatePicker = this._onShowDatePicker.bind(this);

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
  // function : luu thong tin cap nhat
  onPressSave() {
    var name = this.state.working_process;
    alert("From update Screen: "+JSON.stringify(name));
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
  onChangeLastName(text){
    this.setState({last_name: text});
  }
  // first_name: "",
  onChangeFirstName(text){
    this.setState({first_name: text});
  }
  // description: "",
  onChangeDescription(text){
    this.setState({description: text});
  }
  // birthday: "",
  onChangeBirthday(text){
    this.setState({birthday: convertDateToMillisecond(text)});
  }
  // birthplace: "",
  onChangeBirthPlace(text){
    this.setState({birthplace: text});
  }
  // home_town: "",
  onChangeHomeTown(text){
    this.setState({home_town: text});
  }
  // phone: "",
  onChangePhone(text){
    this.setState({phone: text});
  }
  // // email: "",
  // onChangeLastName(text){
  //   this.setState({last_name: text});
  // }
  // avata: "",
  onChangeAvata(link){
    this.setState({avata: link});
  }
  // speciality_name: "",
  onChangeSpecialityName(text){
    this.setState({speciality_name: text});
  }
  // place: "",
  onChangePlace(text){
    this.setState({place: text});
  }
  // department_name: "",
  onChangeDepartmentName(text){
    this.setState({department_name: text});
  }
  // position_name: "",
  onChangePositionName(text){
    this.setState({position_name: text});
  }
  // disease_name: "",
  onChangeDiseaseName(text){
    this.setState({disease_name: text});
  }
  // degree_name: "",
  onChangeDegreeName(text){
    this.setState({degree_name: text});
  }
  // academic_rank_name: "",
  onChangeAcademicRankName(text){
    this.setState({academic_rank_name: text});
  }
  // experience: "",
  onChangeExperience(text){
    this.setState({experience: text});
  }
  // language_name: "",
  onChangeLanguageName(text){
    this.setState({language_name: text});
  }
  // working_process: "",
  onChangeWorkingProcess(text){
    this.setState({working_process: text});
  }
  // training_process: "",
  onChangeTrainingProcess(text){
    this.setState({training_process: text});
  }
  // research_work: "",
  onChangeResearchWork(text){
    this.setState({research_work: text});
  }
  // certificate: "",
  onChangeCertificate(text){
    this.setState({certificate: text});
  }
  // organization: "",
  onChangeOrganization(text){
    this.setState({organization: text});
  }
  // day_off: ""
  onChangeDayOff(text){
    this.setState({day_off: text});
  }
  // ========= end list function update state for doctor items =========

  componentDidMount = () => {
    
    // alert('from update SCR: '+this.state.home_town);
    // let loginResponse = this.props.userProfile;
    // let profile = this.props.doctorData;
    // alert("from update SCR: "+JSON.stringify(profile));
    // this.setState({
    //   last_name: (loginResponse.last_name),
    //   first_name: (loginResponse.first_name),
    //   description: (profile[0].value),
    //   birthday: (profile[1].value),
    //   birthplace: (profile[2].value), 
    //   home_town: (profile[3].value),
    //   phone: (profile[4].value),
    //   email: (profile[5].value),
    //   avata: (loginResponse.image),
    //   speciality_name: (profile[6].value),
    //   place: (profile[7].value),
    //   department_name: (profile[8].value),
    //   position_name: (profile[9].value),
    //   disease_name: (profile[10].value),
    //   degree_name: (profile[11].value),
    //   academic_rank_name: (profile[12].value),
    //   experience: (profile[13].value),
    //   language_name: (profile[14].value),
    //   working_process: (profile[15].value),
    //   training_process: (profile[16].value),
    //   research_work: (profile[17].value),
    //   certificate: (profile[18].value),
    //   organization: (profile[19].value),
    //   day_off: (profile[20].value)
    // });
  };

  getImage() {
    // const base64Icon = "data:image/png;base64," + this.props.image;
    // return this.props.image === ""
    // ? require("../../../assets/icon_app.png")
    // : {uri:base64Icon};
  }
  componentWillReceiveProps(props) {
    


    let hasError = props.hasError;
    let errorLogin = props.lastError;

    if (!hasError && errorLogin === "") {
      // this.props.navigation.navigate(ScreenName.Screen_Main, {
      //   intent_userID: props.userProfile.doctor_id,
      //   intent_userName: props.userProfile.name
      // });
    } else {
      if (errorLogin != null && errorLogin !== "") {
        // let errTitle = Translate(DefineKey.DialogWarning_text_title);
        // this.onOpenDialogWarning(errTitle, errorLogin);
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
                    content={ this.props.userProfile.last_name}
                    onChange={this.onChangeLastName.bind()}
                  />
                  {/* first_name: "",  */}
                  <DoctorInfoUpdateItem
                    editable={true}
                    title={Translate(DefineKey.Doctor_Info_Manager_First_Name)}
                    content={ this.props.userProfile.first_name}
                    onChange={this.onChangeFirstName.bind()}
                  />
                  {/* description: "",  */}
                  <DoctorInfoUpdateItem
                    editable={true}
                    title={Translate(DefineKey.Doctor_Info_Manager_Description)}
                    content={this.props.doctorData[0].value}
                    onChange={this.onChangeDescription.bind()}
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
                        value={this.showBirthday(this.props.doctorData[1].value)}
                      />
                    </View>
                  </View>

                  {/* birthplace: "",  */}
                  <DoctorInfoUpdateItem
                    editable={true}
                    title={Translate(DefineKey.Doctor_Info_Manager_Birth_Place)}
                    content={this.props.doctorData[2].value}
                    onChange={this.onChangeBirthPlace.bind()}
                  />
                  {/* home_town: "",  */}
                  <DoctorInfoUpdateItem
                    editable={true}
                    title={Translate(DefineKey.Doctor_Info_Manager_Home_Town)}
                    content={this.props.doctorData[3].value}
                    onChange={this.onChangeHomeTown.bind()}
                  />
                  {/* phone: "",  */}
                  <DoctorInfoUpdateItem
                    editable={true}
                    title={Translate(DefineKey.Doctor_Info_Manager_Phone)}
                    content={this.props.doctorData[4].value}
                    onChange={this.onChangePhone.bind()}
                  />
                  {/* email: "",  */}
                  <DoctorInfoUpdateItem
                    editable={false}
                    title={Translate(DefineKey.Doctor_Info_Manager_Email)}
                    content={this.props.doctorData[5].value}
                    onChange={()=>{}}
                  />

                  {/* speciality_name: "" */}
                  <DoctorInfoUpdateItem
                    editable={true}
                    title={Translate(DefineKey.Doctor_Info_Manager_Speciality)}
                    content={this.props.doctorData[6].value}
                    onChange={this.onChangeSpecialityName.bind()}
                  />
                  {/* place: "",  */}
                  <DoctorInfoUpdateItem
                    editable={true}
                    title={Translate(DefineKey.Doctor_Info_Manager_Place)}
                    content={this.props.doctorData[7].value}
                    onChange={this.onChangePlace.bind()}
                  />
                  {/* department_name: "",  */}
                  <DoctorInfoUpdateItem
                    editable={true}
                    title={Translate(
                      DefineKey.Doctor_Info_Manager_Department_Name
                    )}
                    content={this.props.doctorData[8].value}
                    onChange={this.onChangeDepartmentName.bind()}
                  />
                  {/* position_name: "",  */}
                  <DoctorInfoUpdateItem
                    editable={true}
                    title={Translate(
                      DefineKey.Doctor_Info_Manager_Position_Name
                    )}
                    content={this.props.doctorData[9].value}
                    onChange={this.onChangePositionName.bind()}
                  />
                  {/* disease_name: "",  */}
                  <DoctorInfoUpdateItem
                    editable={true}
                    title={Translate(
                      DefineKey.Doctor_Info_Manager_Disease_Name
                    )}
                    content={this.props.doctorData[10].value}
                    onChange={this.onChangeDiseaseName.bind()}
                  />
                  {/* degree_name: "",  */}
                  <DoctorInfoUpdateItem
                    editable={true}
                    title={Translate(DefineKey.Doctor_Info_Manager_Degree_Name)}
                    content={this.props.doctorData[11].value}
                    onChange={this.onChangeDegreeName.bind()}
                  />
                  {/* academic_rank_name: "", */}
                  <DoctorInfoUpdateItem
                    editable={true}
                    title={Translate(
                      DefineKey.Doctor_Info_Manager_Academic_Rank_Name
                    )}
                    content={this.props.doctorData[12].value}
                    onChange={this.onChangeAcademicRankName.bind()}
                  />
                  {/* experience: "",  */}
                  <DoctorInfoUpdateItem
                    editable={true}
                    title={Translate(DefineKey.Doctor_Info_Manager_Experience)}
                    content={this.props.doctorData[13].value}
                    onChange={this.onChangeExperience.bind()}
                  />
                  {/* language_name: "",  */}
                  <DoctorInfoUpdateItem
                    editable={true}
                    title={Translate(
                      DefineKey.Doctor_Info_Manager_Language_Name
                    )}
                    content={this.props.doctorData[14].value}
                    onChange={this.onChangeLanguageName.bind()}
                  />
                  {/* working_process: "", */}
                  <DoctorInfoUpdateItem
                    editable={true}
                    title={Translate(
                      DefineKey.Doctor_Info_Manager_Working_Process
                    )}
                    content={this.props.doctorData[15].value}
                    onChange={this.onChangeWorkingProcess.bind()}
                  />
                  {/* training_process: "",  */}
                  <DoctorInfoUpdateItem
                    editable={true}
                    title={Translate(
                      DefineKey.Doctor_Info_Manager_Training_Process
                    )}
                    content={this.props.doctorData[16].value}
                    onChange={this.onChangeTrainingProcess.bind()}
                  />
                  {/* research_work: "",  */}
                  <DoctorInfoUpdateItem
                    editable={true}
                    title={Translate(
                      DefineKey.Doctor_Info_Manager_Reseach_Work
                    )}
                    content={this.props.doctorData[17].value}
                    onChange={this.onChangeResearchWork.bind()}
                  />
                  {/* certificate: "", */}
                  <DoctorInfoUpdateItem
                    editable={true}
                    title={Translate(DefineKey.Doctor_Info_Manager_Certificate)}
                    content={this.props.doctorData[18].value}
                    onChange={this.onChangeCertificate.bind()}
                  />
                  {/* organization: "",  */}
                  <DoctorInfoUpdateItem
                    editable={true}
                    title={Translate(
                      DefineKey.Doctor_Info_Manager_Organization
                    )}
                    content={this.props.doctorData[19].value}
                    onChange={this.onChangeOrganization.bind()}
                  />
                  {/* day_off: "" */}
                  <DoctorInfoUpdateItem
                    editable={true}
                    title={Translate(DefineKey.Doctor_Info_Manager_Day_Off)}
                    content={this.props.doctorData[20].value}
                    onChange={this.onChangeDayOff.bind()}
                  />
                </View>
                {/*========================= doctor info item======================*/}
              </View>
              <View style={styles.layoutFooter}>
                <TouchableOpacity
                  style={styles.layoutButton}
                  onPress={() => this.onPressSave()}
                >
                  <Text style={styles.textButton}>{"Save"}</Text>
                </TouchableOpacity>
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
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
