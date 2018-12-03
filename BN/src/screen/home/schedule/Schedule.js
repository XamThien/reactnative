import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  TouchableHighlight,
  BackHandler
} from "react-native";
import { SafeAreaView } from "react-navigation";
import styles from "./ScheduleStyle";
import HeaderComponent from "../../main/HeaderComponent";
import ModalDropdown from "../../../components/ModalDropdown";
import ItemDoctor from "./ItemDoctor";
import DatePicker from "../../../components/DatePicker";
import { Translate } from "../../../utils/Language";
import DefineKey from "../../../config/language/DefineKey";
import DialogLoading from "../../../components/DialogLoading";
import ScreenName from "../../../commons/ScreenName";
import { getCurrentDate, getTime, getCurrentTime } from "../../../utils/Utils";
import Constants from "../../../commons/Constants";

const MAX_DATE_SELECTOR = 7;
const USER_TYPE = 1;

export default class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueSpeciality: "TẤT CẢ CHUYÊN NGÀNH",
      curIdSpeciality: "1",
      valueDoctor: "",
      selectDate: "",
      arrDoctors: this.props.doctors,
      isFindDoctorByDate: false,
      dataDoctors: [],

    };
    this._onShowDatePicker = this._onShowDatePicker.bind(this);
    this._onPressItemDoctor = this._onPressItemDoctor.bind(this);
  }

  componentWillMount = () => {
    console.log("nvTien - Schedule componentWillMount");
  };

  componentDidMount = () => {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
    const userID = this.props.navigation.getParam(Constants.KEY_INTENT_USER_ID, "");
    this.setState({patientId: userID});
    let dataUser = {
      userId: userID,
      userType: USER_TYPE,
      userFriends: []
    };
    console.log(`nvTien - componentDidMount dataUser... ${JSON.stringify(dataUser)} onCreateSocketRTC`)
    this.props.onCreateSocketRTC(dataUser, []);

    this.props.onFetchAllSpecialized();
    //set date tại thời điểm hiện tại, vì đang lấy ds bác sĩ thời điểm hiện tại
    const curDate = getCurrentDate();
    this.setState({ selectDate: curDate });
    //this.props.onFetchDoctor(this.state.curIdSpeciality);
    this.props.onFetchUserProfile();
    //this.testShowNotify();
  };

  // testShowNotify() {
  //   let facebook = <Icon family={'FontAwesome'} name={'facebook'} color={'#000000'} size={30} />
  //   RNNotificationBanner.Success({ title: "Message", subTitle: "Message", withIcon: true, icon: facebook})
  // }

  componentWillAnimateIn() {
    console.log("nvTien - Schedule componentWillAnimateIn");
  }

  componentWillAnimateOut() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
    console.log("nvTien - Schedule componentWillAnimateOut");
  }

  componentWillReceiveProps(props) {
    this.handleCallbackNewDoctors(props.actionCallbackDoctor);
    this.handleActionCallback(props.actionCallback);
    this.setState({dataDoctors: props.doctors});
  }

  doConnectServerRTC(dataAllDoctors) {
    if(dataAllDoctors != null && dataAllDoctors.length != 0) {
      let dataFriends = this.getUserFriends();
      let dataUser = {
        userId:this.state.defaultUserId,
        userType:this.state.defaultUserType,
        userFriends: dataFriends
      };
      this.props.onCreateSocketRTC(dataUser, dataFriends);
    }

  }

  handleCallbackNewDoctors(callbackType) {
    console.log("nvTien - Schedule handleCallbackNewDoctors type: " + callbackType);
  if(callbackType === Constants.SCHEDULE_EVENT_LOAD_DOCTORS_SUCCESS) {
      let dataDoctors = this.props.doctors;
      if(dataDoctors != null && dataDoctors.length != 0) {
        this.props.onAddNewDoctors(dataDoctors);
      }
      
  } else {

  }
}

  handleActionCallback(callbackType) {
    console.log("nvTien - Schedule handleActionCallback: " + callbackType);
    if (callbackType === Constants.VIDEOCALL_LISTENER_START_CALL_SUCCESS) {
      console.log("nvTien - Schedule handleActionCallback change state call success ");
      //this.startTimer();
      this.setState({ calling: true, isVideoIncoming: false });
    } else if (
      callbackType === Constants.VIDEOCALL_LISTENER_DISCONNECT_FRIEND
    ) {
    } else if (callbackType === Constants.VIDEOCALL_LISTENER_ENDCALL_CB) {
      console.log("nvTien - Schedule handleActionCallback change state end call cb ");
      //this.clearTimer();
      this.setState({ calling: false, isVideoIncoming: false });
    } else if (callbackType === Constants.VIDEOCALL_LISTENER_NEW_CALL_CB) {
      console.log("nvTien - Schedule handleActionCallback change state new call cb ");
      //this.resetTimer();
      this.setState({ calling: false, isVideoIncoming: true });
    } else if (callbackType === Constants.VIDEOCALL_LISTENER_NEW_MESSAGE_CB) {
    } else if (callbackType === Constants.VIDEOCALL_LISTENER_BUSY_CB) {
    } else {
    }
  }

  handleBackPress = () => {
    // this.goBack(); // works best when the goBack is async
    // return true;
  };

  _onPressItemDoctor(doctorID) {
    const userName = this.props.userProfile.userName;
    const userID = this.props.userProfile.id;
    let objectDoctor = this.findDataDoctorByID(doctorID, this.props.doctors);
    if (objectDoctor !== null) {
      if(this.state.isFindDoctorByDate) {
        this.props.navigation.navigate(ScreenName.Screen_Appointment, {
          intent_userName: userName,
          intent_userID: userID,
          intent_dataDoctor: objectDoctor,
          selectDate: this.state.selectDate
        });
      } else {

      }     
    }
  }

  findDataDoctorByID(doctorID, arrDoctors) {
    if (arrDoctors != null && arrDoctors.length !== 0) {
      for (let i = 0; i < arrDoctors.length; i++) {
        if (arrDoctors[i].doctor_id === doctorID) {
          return arrDoctors[i];
        }
      }
    }
    return null;
  }

  _onShowDatePicker() {
    this.refs.datePicker.onPressDate();
  }

  _onPressSelectDate(txtDate) {
    this.setState({ selectDate: txtDate, isFindDoctorByDate: true });
    this.props.onclickGetdoctorByDate(this.state.curIdSpeciality, txtDate);
  }

  _onPressSelectImmediately() {
    const curDate = getCurrentDate();
    const curTime = getCurrentTime();
    this.setState({ selectDate: curDate, isFindDoctorByDate: false });
    this.props.onclickGetdoctorImmediately(this.state.curIdSpeciality, curDate, curTime);
  }

  _getDefaultMaxDate() {
    var day = new Date();
    var nextDay = new Date(day);
    nextDay.setDate(day.getDate() + MAX_DATE_SELECTOR);

    var date = nextDay.getDate();
    var month = nextDay.getMonth() + 1;
    var year = nextDay.getFullYear();
    var curDate = year + "-" + month + "-" + date;
    return curDate;
  }

  getUserFriends() {
    var lst = [];
    friendAllList.forEach(friend => {
      if (
        friend.userId != this.state.defaultUserId &&
        friend.userType != this.state.defaultUserType
      ) {
        lst.push(friend);
      }
    });
    return lst;
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <View style={styles.layoutWrapContent}>
            {/* <CustomHeader
              isShowBack={false}
              navigation={this.props.navigation}
              titleHead={Translate(DefineKey.Schedule_titleHead)}
            /> */}
            <HeaderComponent
              {...this.props}
              title={Translate(DefineKey.Schedule_titleHead)}
            />
            <View style={styles.layoutTopTitle}>
              <Text style={styles.textWelcome}>
                {Translate(DefineKey.Schedule_textWelcome)}
                {this.props.userProfile.userName}
              </Text>
              <Text style={styles.textInfoOnline} numberOfLines={3}>
                {Translate(DefineKey.Schedule_textOnline01)}
                {this.props.userProfile.userName}
                {Translate(DefineKey.Schedule_textOnline02)}
              </Text>

              {/*Define layout button*/}
              <View style={styles.layoutButton}>
                <TouchableOpacity
                  style = {this.state.isFindDoctorByDate ? styles.btnFindDoctorDefault : styles.btnFindDoctorSelected}
                  onPress={() => this._onPressSelectImmediately()}
                >
                  <Text style={styles.textButton}>
                    {Translate(DefineKey.Schedule_textBtnImmediate)}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style = {this.state.isFindDoctorByDate ? styles.btnFindDoctorSelected : styles.btnFindDoctorDefault}
                  onPress={() => this._onShowDatePicker()}
                >
                  {/* display dialog select date and time */}
                  <DatePicker
                    ref={"datePicker"}
                    style={{ width: 0, height: 0 }}
                    mode="date"
                    locale="vi"
                    // date={this.state.date}
                    format={Constants.DEFAULT_SYMPLE_DATE}
                    minDate={getCurrentDate()}
                    maxDate={this._getDefaultMaxDate()}
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    onDateChange={date => {
                      this._onPressSelectDate(date);
                    }}
                  />
                  <Text style={styles.textButton}>
                    {Translate(DefineKey.Schedule_textBtnSchedule)}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/*define layout list specialize doctor*/}
            <View style={styles.layoutList}>
              <View style={styles.layoutTitleDropdown}>
                <Text style={styles.textSelect}>
                  {Translate(DefineKey.Schedule_textSelect)}
                </Text>
                <View style={styles.layoutInput}>
                  <TextInput
                    style={styles.input}
                    placeholder=""
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoFocus={false}
                    editable={false}
                    selectTextOnFocus={false}
                    returnKeyType="next"
                    keyboardType="email-address"
                    value={this.state.valueSpeciality}
                    ref="value_doctor"
                  />

                  {/* define layout dropdown select speciality */}
                  <ModalDropdown
                    ref="dropdown"
                    style={styles.dropdown_2}
                    textStyle={styles.dropdown_2_text}
                    dropdownStyle={styles.dropdown_2_dropdown}
                    options={this.props.dataSpeciality}
                    renderButtonText={rowData =>
                      this.setState({
                        valueSpeciality: this._renderSelectItemSpecialized(
                          rowData
                        ),
                        curIdSpeciality: rowData.id
                      })
                    }
                    renderRow={this._dropdown_2_renderRow.bind(this)}
                  >
                    <Image
                      source={require("../../../../assets/icon_arrow_white.png")}
                      style={styles.imageInput}
                    />
                  </ModalDropdown>
                </View>
                <View style={styles.lineStyle} />
              </View>

              <View style={styles.layoutListDoctor}>
                <FlatList
                  data={this.state.dataDoctors}
                  extraData={this.state}
                  renderItem={({ item, index }) => {
                    return (
                      <ItemDoctor
                        item={item}
                        index={index}
                        parentFlatList={this}
                        onclick={this._onPressItemDoctor.bind()}
                        curDate={getCurrentDate()}
                        curTime={getTime()}
                      />
                    );
                  }}
                  //keyExtractor={(item, index) => item.id}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
            </View>
          </View>
          <DialogLoading
            loading={
              this.props.isLoading === undefined ? false : this.props.isLoading
            }
          />
        </View>
      </SafeAreaView>
    );
  }

  _renderSelectItemSpecialized(rowData) {
    const { name, id } = rowData;
    console.log(
      "nvTien - _renderSelectItemSpecialized sID: " + id + " name: " + name
    );
    this.props.onFindDoctorByID(id);
    return `${name} `;
  }

  _dropdown_2_renderRow(rowData, rowID, highlighted) {
    return (
      <TouchableHighlight underlayColor="cornflowerblue">
        <View style={[styles.dropdown_2_row, { backgroundColor: "white" }]}>
          <Text
            style={[
              styles.dropdown_2_row_text,
              highlighted && { color: "mediumaquamarine" }
            ]}
          >
            {`${rowData.name}`}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
}

var friendAllList = [
  { userId: "d1", active: false, userType: 0 },
  { userId: "d2", active: false, userType: 0 },
  { userId: "d3", active: false, userType: 0 },
  { userId: "p1", active: false, userType: 1 },
  { userId: "p2", active: false, userType: 1 },
  { userId: "p3", active: false, userType: 1 }
];
