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
  ScrollView
} from "react-native";
import { NavigationEvents } from "react-navigation";
import { SafeAreaView } from "react-navigation";
import styles from "./ExaminationScheduleStyle";
import CustomHeader from "../header/CustomHeader";
import CalendarStrip from "../../../components/calendar/CalendarStrip";
import Timeline from "../../../components/calendar/TimeLine";
import ItemPatient from "./patient/ItemPatient";

import { Translate } from "../../../utils/Language";
import DefineKey from "../../../config/language/DefineKey";
import DialogLoading from "../../../components/DialogLoading";
import CreateScheduleModalContainer from "../../../containers/CreateScheduleModalContainer";
import ScreenName from "../../../commons/ScreenName";
import Constant from "../../../commons/Constants";
import { getCurrentDate, getTime, convertMillisecondToDate, 
  convertMilliToTime, convertTimeToMillisecond, isEmptyObject } from "../../../utils/Utils";
import HeaderComponent from "../../main/HeaderComponent";

// import DialogWarning from "../../../components/DialogWarning";
// import DialogConfirm from "../../../components/DialogConfirm";
import WarningDialog from '../../../components/WarningDialog';
import ConfirmDialog from '../../../components/ConfirmDialog';

export default class ExaminationSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      warningdialogvisible: false,
      confirmdialogvisible: false,
      userName: "",
      userId: "",
      isInitFirtDate: false,
      selectDate: "",
      isShowTime: false,
      dataTimes: [],
      dataPatients: [],
      itemPatient: {},
      dataAppoint: {}
    };
    this.onUpdateScheduleToView = this.onUpdateScheduleToView.bind(this);
    this.onUpdateCancel = this.onUpdateCancel.bind(this);
    this.onUpdateConfirm = this.onUpdateConfirm.bind(this);
    this.onClickTime = this.onClickTime.bind(this);
    this.onConfirmStatus = this.onConfirmStatus.bind(this);
    this.onClickItemPatient = this.onClickItemPatient.bind(this);
    this.onClickDate = this.onClickDate.bind(this);

    this.onWarningOk = this.onWarningOk.bind(this);
  }

  componentWillReceiveProps(props) {
    if(props.dataAppoint != null && !isEmptyObject(props.dataAppoint)) {
      console.log(`nvTien-componentWillReceiveProps dataAppoint = ${JSON.stringify(props.dataAppoint)} `)
      let dataAppoint = props.dataAppoint;
      // this.setState({dataAppoint: dataAppoint});
      this.onUpdateScheduleToView(dataAppoint);
    } else {
      this.setState({dataTimes: [], isShowTime: false, dataAppoint: {}});
    }
  }

  componentWillMount = () => {
    console.log("nvTien - Schedule componentWillMount");
  };

  componentDidMount = () => {
    const userid = this.props.navigation.getParam(Constant.KEY_INTENT_USER_ID, "");
    const username = this.props.navigation.getParam(Constant.KEY_INTENT_USER_NAME, "");
    this.setState({userId: userid, userName: username}); 
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
    console.log("nvTien - Schedule componentDidMount");
  };

  componentWillAnimateOut() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }

  handleBackPress = () => {
    // this.goBack(); // works best when the goBack is async
    // return true;
  };

  //lấy ra danh sách bệnh nhân đặt hẹn theo ngày
  onClickDate(inputDate) {
    console.log("nvTien - Examination select date: " + inputDate + " isInitFirstDate: " 
    + this.state.isInitFirtDate + " selectDate: " + this.state.selectDate);
    var isoFormat = convertMillisecondToDate(inputDate);
    if(this.state.isInitFirtDate && this.state.selectDate != isoFormat) {
      this.props.onLoadListDataAppoint(isoFormat, "");    
    } 
    this.setState({selectDate: isoFormat});
    console.log("nvTien - Examination Schedule onClickDate SET STATE : " + this.state.selectDate);
  }

  onClickItemPatient(dataPatient) {
    this.setState({itemPatient: dataPatient});
    this.props.navigation.navigate(ScreenName.Screen_PatientProfile, {intent_data_patient: dataPatient})
    console.log(`nvTien - onClickItemPatient data: ${JSON.stringify(dataPatient)}` );
  }

  //Xử lí nút reload lại dữ liệu trong một ngày
  _onPressRefreshData() {
    console.log("nvTien - Examination _onPressRefreshData DATE: " + this.state.selectDate);
    this.props.onLoadListDataAppoint(this.state.selectDate, Constant.TYPE_REFRESH_DATA_APPOINT);
  }

  onClickTime(itemTime) {
    let dataTimes = this.state.dataTimes;
    let dataResults = [];
    let curPosition = 0;
    if (dataTimes != null && dataTimes != undefined && dataTimes.length != 0) {
      for(let index = 0 ;index < dataTimes.length; index++) {
        var objectTime = dataTimes[index];
        if (itemTime.id == objectTime.id) {
          curPosition = index;
          objectTime = {...objectTime, clicked: true};
        } else {
          objectTime = {...objectTime, clicked: false};
        }
        dataResults.push(objectTime);
      }
      this.loadDataAppointClickTime(curPosition, dataTimes);
    }
    this.setState({dataTimes: dataResults});
  }

  loadDataAppointClickTime(curPos, dataTimes) {
    let fromTime = 0;
    let toTime = 0;
    if(curPos == (dataTimes.length - 1)) {
       fromTime = dataTimes[curPos].originTime;
       toTime = 0;
    } else {
       fromTime = dataTimes[curPos].originTime;
       toTime = dataTimes[curPos+1].originTime;
    }
    this.loadDataPatient(fromTime, toTime, this.state.dataAppoint.dataAppoint);

  }

  onUpdateScheduleToView(dataAppoint) {
      let startTimeMorning = convertMilliToTime(dataAppoint.start_time_am);
      let endTimeMorning = convertMilliToTime(dataAppoint.end_time_am);
      let startTimeAfternoon = convertMilliToTime(dataAppoint.start_time_pm);
      let endTimeAfternoon = convertMilliToTime(dataAppoint.end_time_pm);

      const getMorningDataTimes = this.onParserTime(Constant.TYPE_HEAD_MORNING,startTimeMorning, endTimeMorning, 0);
      const getAfternoonDataTimes = this.onParserTime(Constant.TYPE_HEAD_AFTERNOON,startTimeAfternoon, endTimeAfternoon, getMorningDataTimes.length);
      const dataTimes = this.onGroupDataTimes(getMorningDataTimes, getAfternoonDataTimes);
      this.setState({dataTimes: dataTimes, isShowTime: true, dataAppoint: dataAppoint});

      // lấy ra dữ liệu của mốc thời gian bắt đầu trong list
      let fromTime = dataTimes[0].originTime;
      let toTime = dataTimes[1].originTime;
      console.log(`nvTien - onUpdateScheduleToView Firt position from time: ` + fromTime + " toTime: " + toTime);
      this.loadDataPatient(fromTime, toTime, dataAppoint.dataAppoint);
  }

  //lấy ra danh sách bệnh nhân từ khoảng thời gian hours đến hours
  loadDataPatient(fromTime, toTime, dataAppoint) {
    console.log("nvTien - loadDataPatient fromTime: " + fromTime + " toTime: " + toTime);
    let fromTimeMilli = convertTimeToMillisecond(fromTime);
    let toTimeMilli = 0;
    if(toTime != 0) {
      toTimeMilli = convertTimeToMillisecond(toTime);
    }
    console.log("nvTien - toTime: " + toTime + " toTimeMilli: " + toTimeMilli);
    //reset data patients in list
    this.setState({dataPatients: []});
    let arrPatients = [];
    if(dataAppoint != null && dataAppoint != undefined && dataAppoint.length != 0) {
      for(let i = 0 ; i < dataAppoint.length ; i++) {
        let objectAppoint = dataAppoint[i];
        if(toTimeMilli == 0) {
          if(Number(objectAppoint.hours) >= fromTimeMilli) {
            let dataPatient = {
              id: objectAppoint.user_id,
              time: convertMilliToTime(objectAppoint.hours),
              name: objectAppoint.dataUser.full_name,
              status: objectAppoint.status,
              appointment_id: objectAppoint.appointment_id,
              date: convertMillisecondToDate(objectAppoint.date)
            }
            console.log(`nvTien - ExaminationSchedule loadDataPatient DATA TO TIME = 0  ${JSON.stringify(dataPatient)} 
            DATA APPOINT: ${JSON.stringify(objectAppoint)} toTimeMilli: ` + toTimeMilli);
              arrPatients.push(dataPatient);
          }
        } else {

        if(Number(objectAppoint.hours) >= fromTimeMilli && Number(objectAppoint.hours) < toTimeMilli) {
          let dataPatient = {
            id: objectAppoint.user_id,
            time: convertMilliToTime(objectAppoint.hours),
            name: objectAppoint.dataUser.full_name,
            status: objectAppoint.status,
            appointment_id: objectAppoint.appointment_id,
            date: convertMillisecondToDate(objectAppoint.date)
          }
          console.log(`nvTien - ExaminationSchedule loadDataPatient DATA = ${JSON.stringify(dataPatient)} 
          DATA APPOINT: ${JSON.stringify(objectAppoint)} toTimeMilli: ` + toTimeMilli);
            arrPatients.push(dataPatient);
        }
      }
    }
  }
    this.setState({dataPatients: arrPatients});
  }

  onGroupDataTimes(morningDataTimes, afternoonDataTime) {
    for(let i = 0 ; i < afternoonDataTime.length ; i++) {
      morningDataTimes.push(afternoonDataTime[i]);
    }
    console.log(`nvTien - ExaminationSchedule onGroupDataTimes AFTER MERGE DATA = ${JSON.stringify(morningDataTimes)}`);
  return morningDataTimes;
}

//gen ra các khoảng thời gian theo giờ, hiển thị ở list chiều dọc
onParserTime(headType, startTime, endTime, curIndex) {
    let dataTimes = [];
    let startHours = (startTime.split(':'))[0];
    let startMinute = (startTime.split(':'))[1];
    let endHours = (endTime.split(':'))[0];
    let endMinute = (endTime.split(':'))[1];
    var startDate = new Date();
    startDate.setUTCHours(parseInt(startHours, 10));
    startDate.setUTCMinutes(parseInt(startMinute, 10));

    //init loop
    var index = curIndex;
    const step = 1;
    var stepHours = startHours;
    var stepMinute = startMinute;
    let texUnit = "A.M";
    let initClickTime = false;
    if(headType == Constant.TYPE_HEAD_MORNING) {
      texUnit = "A.M";
      initClickTime = true;
    } else {
      texUnit = "P.M";
      initClickTime = false;
    }

    let initStartTime = {
      id: index,
      time: startHours + " " + texUnit, 
      title: "", 
      description: "",
      originTime: startHours + ":00",
      clicked: initClickTime
    };

    dataTimes.push(initStartTime);

    while ((stepHours <= endHours)) {
      startDate.setUTCHours(startDate.getUTCHours() + step);
      index ++;
      stepHours = startDate.getUTCHours();
      stepMinute = startDate.getUTCMinutes();
      if (stepHours > endHours) {
        break;
      } else if (stepHours > endHours) {
        break;
      }
      let objectTime = {
        id: index,
        time: stepHours + " " + texUnit, 
        title: "", 
        description: "",
        originTime: stepHours + ":00",
        clicked: false
      }
      dataTimes.push(objectTime);
    }
    return dataTimes;

  }

  //Handle dialog click item
  onConfirmStatus(status, patient) {
    this.setState({itemPatient: patient});
    console.log(`nvTien - ExaminationSchedule onConfirmStatus data patient = ${JSON.stringify(this.state.itemPatient)}`);
    switch(status) {
        case Constant.TYPE_CONFIRM: 
            this.handleConfirm();
            break;
        case Constant.TYPE_DECLINE:
            this.handleDecline();
            break;
        case Constant.TYPE_CALL_NOW:
            this.handleCallNow();
            break;       
    }
  }

  handleConfirm() {
    let confirmTitle = Translate(DefineKey.Examination_schedule_confirm_title);
    let confirmContent = Translate(DefineKey.Examination_schedule_confirm_content);  
    this.onOpenDialogConfirm(confirmTitle, confirmContent, Constant.TYPE_CONFIRM);

  }

  handleDecline() {
    let declineTitle = Translate(DefineKey.Examination_schedule_confirm_title);
    let declineContent = Translate(DefineKey.Examination_schedule_decline_content);  
    this.onOpenDialogWarning(declineTitle, declineContent);
  }

  handleCallNow() {
    let confirmTitle = Translate(DefineKey.Examination_schedule_confirm_title);
    let confirmContent = Translate(DefineKey.Examination_schedule_call_now_content)  
    this.onOpenDialogConfirm(confirmTitle, confirmContent, Constant.TYPE_CALL_NOW);
  }

  onOpenDialogConfirm(confirmTitle, confirmContent, typeConfirm) {
    this.setState({confirmdialogvisible: true, confirmTitle: confirmTitle, confirmContent: confirmContent});
    this.refs.dialogConfirm.showModal(typeConfirm);
  }

  onOpenDialogWarning(warnTitle, warnContent) {
    this.setState({warningdialogvisible: true, warnTitle: warnTitle, warnContent: warnContent});
    // this.refs.dialogWarning.showModal();
  }

  //Bắt trường hợp show dialog của chấp nhận cuộc hẹn hoặc là show dialog của trường hợp xác nhận sẽ gọi 
  onUpdateConfirm(typeConfirm) {
    this.setState({ confirmdialogvisible: false });
    console.log(`nvTien - ExaminationSchedule onUpdateConfirm: ` + typeConfirm + ` data patient = ${JSON.stringify(this.state.itemPatient)}`);
      switch(typeConfirm) {
        case Constant.TYPE_CONFIRM:
        let userFriend = {
          userId: this.state.itemPatient.id,
          userType: Constant.TYPE_PATIENT
        };
        let typeSend = Constant.VIDEOCALL_SEND_MSG_CONFIRM_CALL;
        let objectContent = {
          doctorName: this.state.userName,
          id: this.state.itemPatient.id,
          time: this.state.itemPatient.time,
          date: this.state.itemPatient.date
        }
        let appointment_id = this.state.itemPatient.appointment_id;
        this.onSendMessage(userFriend, typeSend, objectContent);
        this.props.onUpdateStatusAppoint(appointment_id, Constant.TYPE_UPDATE_STATUS_ACCEPTED, this.state.selectDate);
        break;
        case Constant.TYPE_CALL_NOW:
        this.props.navigation.navigate(ScreenName.Screen_VideoCall ,{
          intent_friend_id: this.state.itemPatient.id,
        });
        break;
      }
  }

  //Bắt trường hợp show dialog của từ chối cuộc hẹn hoặc là show dialog của trường hợp xác nhận đóng dialog gọi 
  onUpdateCancel(typeConfirm) {
    this.setState({ confirmdialogvisible: false });
    console.log(`nvTien - ExaminationSchedule onUpdateCancel: ` + typeConfirm + ` data patient = ${JSON.stringify(this.state.itemPatient)}`);
    switch(typeConfirm) {
      case Constant.TYPE_CONFIRM:
      let userFriend = {
        userId: this.state.itemPatient.id,
        userType: Constant.TYPE_PATIENT
      };
      let typeSend = Constant.VIDEOCALL_SEND_MSG_DECLINE_CALL;
      let objectContent = {
        doctorName: this.state.userName,
        id: this.state.itemPatient.id,
        time: this.state.itemPatient.time,
        date: this.state.itemPatient.date
      }
      let appointment_id = this.state.itemPatient.appointment_id;
      this.onSendMessage(userFriend, typeSend, JSON.stringify(objectContent));
      this.props.onUpdateStatusAppoint(appointment_id, Constant.TYPE_UPDATE_STATUS_DECLINE, this.state.selectDate);
      break;
      case Constant.TYPE_CALL_NOW:
      
      break;
    }
}

  onSendMessage(userFriend, typeSend, content) {
    let message = {
      typeMsg: typeSend,
      content: content
    }
    this.props.onSendMessage(userFriend, message);
  }

  onWillFocus() {
    console.log("nvTien - ExaminationSchedule will focus date: " + this.state.selectDate);
    if(!this.state.isInitFirtDate) {
      this.setState({isInitFirtDate: true});
      this.props.onLoadListDataAppoint(this.state.selectDate, "");
    } 
  }

  onDidFocus() {
    console.log("nvTien - ExaminationSchedule did focus");
  }

  onWillBlur() {
    console.log("nvTien - ExaminationSchedule will blur");
  }

  onDidBlur() {
    console.log("nvTien - ExaminationSchedule did blur");
  }
  onWarningOk() {
    this.setState({ warningdialogvisible: false });
  }

  render() {
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
          <HeaderComponent {...this.props}  title={Translate(DefineKey.Examination_Schedule_head_title)}/>

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
                    circleSize={20}
                    hideLine={true}
                    circleColor="rgb(45,156,219)"
                    lineColor="rgb(45,156,219)"
                    timeContainerStyle={styles.timeContainerStyle}
                    descriptionStyle={{ color: "gray" }}
                    options={{
                      style: { paddingTop: 1 }
                    }}
                    innerCircle={"dot"}
                    timeClickable = {true}
                    onClickItem = {this.onClickTime.bind()}
                  />
                  <View style={styles.right_content_schedule}>
                    <View style={styles.wrap_box}>
                      <View style={styles.top_box}>
                        <Text style={styles.top_box_text}>
                        {Translate(DefineKey.Examination_schedule_patient_list)}
                        </Text>
                      </View>
                      <View style={styles.content_box} >
                      <FlatList
                        style={styles.flatlist_patient}
                        data={this.state.dataPatients}
                        renderItem={({ item, index }) => {
                          return (
                            <ItemPatient
                              key={index}
                              item={item}
                              index={index}
                              parentFlatList={this}
                              onClickItemPatient ={this.onClickItemPatient.bind()}
                              onConfirmStatus = {this.onConfirmStatus.bind()}
                            />
                          );
                        }}
                        keyExtractor={(item, index) => index.toString()}
                      />
                    </View>
                  </View>
                </View>
                </View>
              </ScrollView>
              <TouchableOpacity style = {styles.btn_refresh_data} onPress ={() => {
                this._onPressRefreshData();
              }}>
              <Image source ={require("../../../../assets/icon_refresh_loading.png")} style ={styles.img_refresh_data}/>
              </TouchableOpacity>
            </View>

          </View>
          <DialogLoading loading={this.props.isLoading}/>
          {/* <DialogWarning ref={"dialogWarning"} title={this.state.warnTitle}
                                       content={this.state.warnContent}/> */}
         {/* <DialogConfirm ref={"dialogConfirm"} title={this.state.confirmTitle}
                                       content={this.state.confirmContent} 
                                       onUpdateConfirm = {this.onUpdateConfirm.bind()}
                                       onUpdateCancel = {this.onUpdateCancel.bind()}/> */}
        <WarningDialog
            titleDialog={this.state.warnTitle}
            contentDialog={this.state.warnContent}
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
       
        </View>
      </SafeAreaView>
    );
  }
}



