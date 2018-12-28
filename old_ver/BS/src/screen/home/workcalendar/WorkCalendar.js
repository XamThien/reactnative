import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  TouchableHighlight,
  BackHandler,
  ScrollView,
  Platform, 
  PixelRatio ,
  AsyncStorage
} from "react-native";
import { SafeAreaView, NavigationEvents } from "react-navigation";
import styles from "./WorkCalendarStyle";
import CustomHeader from "../header/CustomHeader";
import CalendarStrip from "../../../components/calendar/CalendarStrip";
import Timeline from "../../../components/calendar/TimeLine";

import { Translate } from "../../../utils/Language";
import DefineKey from "../../../config/language/DefineKey";
import DialogLoading from "../../../components/DialogLoading";
import CreateScheduleModalContainer from "../../../containers/CreateScheduleModalContainer";
import ScreenName from "../../../commons/ScreenName";
import Constants from "../../../commons/Constants";
import { getCurrentDate, getTime, convertMillisecondToDate, convertMilliToTime, isEmptyObject, getDataStorage } from "../../../utils/Utils";
import HeaderComponent from "../../main/HeaderComponent";
import CustomDetails from "./CustomDetails";
const USER_TYPE = 0;

export default class WorkCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isInitFirtDate: false,
      isShowTime: false,
      isShowDetailsSchedule: false,
      dataTimes: [], 
      selectDate: "",
      detailsSchedule: {},
      doctorId: "",

      defaultUserType: USER_TYPE,
    

    };
    this._onPressShowCreateScheduleModal = this._onPressShowCreateScheduleModal.bind(this);
    this.onUpdateCreateSchedule = this.onUpdateCreateSchedule.bind(this);
    this.onClickDate = this.onClickDate.bind(this);
  }

  componentWillMount = () => {
    console.log("nvTien - WorkCalendar componentWillMount");
  };

  componentDidMount = () => {
    //let doctorId = yield getDataStorage(Constants.KEY_DOCTOR_ID);
    const userID = this.props.navigation.getParam(Constants.KEY_INTENT_USER_ID, "");
    this.setState({doctorId: userID}); 
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
    //this.props.onFetchUserProfile();
    //fake init
    console.log("nvTien - WorkCalendar componentDidMount");
    //this.getLocalStream();
    //let dataFriends = this.getUserFriends();
    let dataUser = {
      userId: userID,
      userType: USER_TYPE,
      userFriends: []
    };
    console.log(`nvTien - componentDidMount dataUser... ${JSON.stringify(dataUser)} onCreateSocketRTC`)
    this.props.onCreateSocketRTC(dataUser, []);
    this.props.onLoadAllPatients();
    //console.log(`nvTien - componentDidMount onCreateSocketRTC data user... ${JSON.stringify(dataUser)} 
  //  dataFriends = ${JSON.stringify(dataFriends)}`);
  };
  
  componentWillReceiveProps(props) {
    //console.log(`nvTien - componentWillReceiveProps get data Saved... ${JSON.stringify(props.dataSchedule)}`);
    if(props.dataNewSchedule != null && !isEmptyObject(props.dataNewSchedule)) {
      this.setState({isShowTime : true});
      this.onUpdateCreateSchedule(props.dataNewSchedule);
    } else if(props.dataWorkSchedule != null && !isEmptyObject(props.dataWorkSchedule)) {
      this.setState({isShowTime : true});
      this.onUpdateCreateSchedule(props.dataWorkSchedule);
    } else {
      this.setState({isShowTime : false});
    }
    this.handleVideocallCallback(props.actionCallback);
    this.handleCallbackPatient(props.callbackPatient);
  }

  handleVideocallCallback(callbackType) {
    let result = (callbackType === Constants.VIDEOCALL_LISTENER_NEW_CALL_CB);
    console.log("nvTien - WorkCalendar handleActionCallback: " + callbackType + " result: " + result);
    if(callbackType === Constants.VIDEOCALL_LISTENER_START_CALL_SUCCESS) {
        //this.startTimer();
        this.setState({calling: true, isVideoIncoming: false});
    } else if(callbackType === Constants.VIDEOCALL_LISTENER_DISCONNECT_FRIEND) {

    } else if(callbackType === Constants.VIDEOCALL_LISTENER_ENDCALL_CB) {
      this.setState({calling: false, isVideoIncoming: false});
    } else if(callbackType === Constants.VIDEOCALL_LISTENER_NEW_CALL_CB) {
      this.setState({calling: false, isVideoIncoming: true});
    } else if(callbackType === Constants.VIDEOCALL_LISTENER_NEW_MESSAGE_CB) {
      
    } else if(callbackType === Constants.VIDEOCALL_LISTENER_BUSY_CB) {
      
    } else {

    }
  }

  handleCallbackPatient(callbackType) {
    console.log("nvTien - WorkCalendar handleCallbackPatient: " + callbackType);
    if(callbackType === Constants.WORK_SCHEDULE_MESSAGE_UPDATE_PATIENTS) {
      console.log(`nvTien - WorkCalendar handleCallbackPatient data Patients: ${JSON.stringify(this.props.dataPatients)}`);
        let dataPatients = this.props.dataPatients;
        if(dataPatients != null && dataPatients.length != 0) {
          this.props.onAddNewPatients(dataPatients);
        }
        
    } else {
  
    }
  }

  _onPressShowCreateScheduleModal() {
    this.refs.createScheduleModal.getWrappedInstance().showCreateScheduleModal(this.state.selectDate);
  }

 

  componentWillAnimateOut() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }

  handleBackPress = () => {
    // this.goBack(); // works best when the goBack is async
    // return true;
  };

  onClickDate(inputDate) {
    console.log("nvTien -WorkCalendar select date CLICK DATE...: " + inputDate + " isInitFirstDate: " 
    + this.state.isInitFirtDate + " selectDate: " + this.state.selectDate);
    this.setState({isShowDetailsSchedule: false});
    var isoFormat = convertMillisecondToDate(inputDate);
    if(this.state.selectDate != isoFormat) {
      console.log("nvTien - WorkCalendar LOAD DATA WORD SCHEDULE : " + isoFormat);
      this.props.loadDataWorkSchedule(isoFormat);    
    } 
    this.setState({selectDate: isoFormat});
    console.log("nvTien - WorkCalendar onClickDate SET STATE : " + this.state.selectDate);
  }

  onUpdateCreateSchedule(dataSchedule) {
      this.setState({isShowDetailsSchedule: true});
      console.log(`nvTien - onUpdateCreateSchedule data response create = ${JSON.stringify(dataSchedule)}`);
      let startTimeMorning = convertMilliToTime(dataSchedule.start_time_am);
      let endTimeMorning = convertMilliToTime(dataSchedule.end_time_am);
      let startTimeAfternoon = convertMilliToTime(dataSchedule.start_time_pm);
      let endTimeAfternoon = convertMilliToTime(dataSchedule.end_time_pm);

      // let startTimeMorning = "08:00";
      // let endTimeMorning = "12:00";
      // let startTimeAfternoon = "13:00";
      // let endTimeAfternoon = "17:15";

      const getMorningDataTimes = this.onParserTime(Constants.TYPE_HEAD_MORNING,startTimeMorning, endTimeMorning);
      const getAfternoonDataTimes = this.onParserTime(Constants.TYPE_HEAD_AFTERNOON,startTimeAfternoon, endTimeAfternoon);
      const dataTimes = this.onGroupDataTimes(getMorningDataTimes, getAfternoonDataTimes);
      console.log(`nvTien - onUpdateCreateSchedule data = ${JSON.stringify(dataTimes)}`);
      this.setState({dataTimes: dataTimes, isShowTime: true});
      this.setState({detailsSchedule: dataSchedule})

  }

  onGroupDataTimes(morningDataTimes, afternoonDataTime) {
    for(let i = 0 ; i < afternoonDataTime.length ; i++) {
      morningDataTimes.push(afternoonDataTime[i]);
    }
  return morningDataTimes;
}

  onParserTime(headType, startTime, endTime) {
    // console.log("nvTien - workCalendar onParserTime startTime: " + startTime + " endTime: " + endTime);
    let dataTimes = [];
    let startHours = (startTime.split(':'))[0];
    let startMinute = (startTime.split(':'))[1];
    let endHours = (endTime.split(':'))[0];
    let endMinute = (endTime.split(':'))[1];
    var startDate = new Date();
    startDate.setUTCHours(parseInt(startHours, 10));
    startDate.setUTCMinutes(parseInt(startMinute, 10));

    //init loop
    var index = 1;
    const step = 1;
    var stepHours = startHours;
    var stepMinute = startMinute;
    let texUnit = "A.M";
    if(headType == Constants.TYPE_HEAD_MORNING) {
      texUnit = "A.M";
    } else {
      texUnit = "P.M";
    }

    let initStartTime = {
      id: index,
      time: startHours + " " + texUnit, 
      title: "", 
      description: ""
    };
    dataTimes.push(initStartTime);

    while ((stepHours <= endHours)) {
      startDate.setUTCHours(startDate.getUTCHours() + step);
      index ++;
      stepHours = startDate.getUTCHours();
      stepMinute = startDate.getUTCMinutes();
      if (stepHours == endHours && stepMinute >= endMinute) {
        break;
      } else if (stepHours > endHours) {
        break;
      }
      let objectTime = {
        id: index,
        time: stepHours + " " + texUnit, 
        title: "", 
        description: ""
      }
      dataTimes.push(objectTime);
    }

    let initEndTime = {
      id: index,
      time: endHours + " " + texUnit, 
      title: "", 
      description: ""
    };
    dataTimes.push(initEndTime);
    return dataTimes;

  }

  onWillFocus() {
    console.log("nvTien - WorkCalendar will focus date: " + this.state.selectDate);
    // if(!this.state.isInitFirtDate) {
    //   this.setState({isInitFirtDate: true});
    //  // this.props.loadDataWorkSchedule(this.state.selectDate);
    // } 
  }

  onDidFocus() {
    console.log("nvTien - WorkCalendar did focus");
  }

  onWillBlur() {
    console.log("nvTien - WorkCalendar will blur");
  }

  onDidBlur() {
    console.log("nvTien - WorkCalendar did blur");
  }

  getUserFriends(){
    var lst = [];
    friendAllList.forEach(friend =>{
       if(friend.userId != this.state.defaultUserId && friend.userType != this.state.defaultUserType){
         lst.push(friend);
       }
     });
     return lst;
   }


  render() {
    console.log("nvTien - onRender()...");
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <NavigationEvents
            onWillFocus={payload => {
              this.onWillFocus();
            }}
            onDidFocus={payload => {
              this.onDidFocus();
            }}
            onWillBlur={payload => {
              this.onWillBlur();
            }}
            onDidBlur={payload => {
              this.onDidBlur();
            }}
          />
          <View style={styles.layoutWrapContent}>
          <HeaderComponent {...this.props}  title={Translate(DefineKey.WorkCalendar_titleHead)}/>

            {/* define layout head calendar */}
            <View style={styles.wrap_head_calendar}>
              <CalendarStrip
                calendarAnimation={{ type: "sequence", duration: 30 }}
                daySelectionAnimation={{
                  type: "background",
                  duration: 300,
                  highlightColor: "#9265DC"
                }}
                style={styles.head_calendar}
                calendarHeaderStyle={{ color: "white" }}
                calendarColor={"#7743CE"}
                dateNumberStyle={{ color: "white" }}
                dateNameStyle={{ color: "white" }}
                iconLeft={require("../../../components/calendar/img/left-arrow.png")}
                iconRight={require("../../../components/calendar/img/right-arrow.png")}
                iconContainer={{ flex: 0.1 }}
                onSelectDate={this.onClickDate.bind()}
              />
            </View>

            {/* start define layout time schedule */}
            <View
              style={
                this.state.isShowTime
                  ? styles.wrap_time_schedule
                  : styles.hideLayout
              }
            >
              <ScrollView>
                <View style={styles.wrap_time_schedule}>
                  <Timeline
                    style={styles.list_time_schedule}
                    data={this.state.dataTimes}
                    circleSize={normalize(13)}
                    hideLine={true}
                    circleColor="rgb(45,156,219)"
                    lineColor="rgb(45,156,219)"
                    timeContainerStyle={styles.timeContainerStyle}
                    timeStyle={{ textAlign: "center", color: "black" }}
                    descriptionStyle={{ color: "gray" }}
                    options={{
                      style: { paddingTop: 5 }
                    }}
                    innerCircle={"dot"}
                  />
                  <View style={styles.right_content_schedule}>
                    <View style={styles.wrap_box}>
                      <View style={styles.top_box}>
                        <Text style={styles.top_box_text}>
                          Chi tiết lịch làm việc
                        </Text>
                      </View>
                      <View style={styles.content_box} >
                        <CustomDetails detailsSchedule = {this.state.detailsSchedule} 
                        isShowDetails = {this.state.isShowDetailsSchedule}/>
                      </View>
                    </View>
                  </View>
                </View>
              </ScrollView>
            </View>
            {/* end layout time schedule */}
            <View style={this.state.isShowTime? styles.hideLayout: styles.layout_create_schedule}>
              <TouchableOpacity
                style={styles.layout_button_create}
                onPress={() => {
                  this._onPressShowCreateScheduleModal();
                }}
              >
                <Text style={styles.txt_button_create}>+ Tạo lịch khám</Text>
              </TouchableOpacity>
            </View>
          </View>
           <DialogLoading loading={this.props.isLoading}/> 
          <CreateScheduleModalContainer ref={"createScheduleModal"} onUpdateCreateSchedule = {this.onUpdateCreateSchedule.bind()}/>
        </View>
      </SafeAreaView>
    );
  }
}

export function normalize(size) {
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(size));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(size)) - 2;
  }
}

var friendAllList = [
  {userId:'d1',active:false,userType:0},
  {userId:'d2',active:false,userType:0},
  {userId:'d3',active:false,userType:0},
  {userId:'p1',active:false,userType:1},
  {userId:'p2',active:false,userType:1},
  {userId:'p3',active:false,userType:1},
];
