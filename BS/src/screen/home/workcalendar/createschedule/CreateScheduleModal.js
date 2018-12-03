import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
  ScrollView,
  AsyncStorage,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { CheckBox } from "react-native-elements";
import Modal from "react-native-modalbox";
import ItemTimeSchedule from "./ItemTimeSchedule";
import styles from "./CreateScheduleModalStyle";
import { Translate } from "../../../../utils/Language";
import DefineKey from "../../../../config/language/DefineKey";
import Constants from "../../../../commons/Constants";
import DialogLoading from "../../../../components/DialogLoading";
import DatePicker from "../../../../components/DatePicker";
// import DialogWarning from "../../../../components/DialogWarning";
import WarningDialog from '../../../../components/WarningDialog';
import DiseaseModalContainter from "../../../../containers/DiseaseModalContainer"
import Colors from "../../../../commons/Colors";
import {convertDateToMillisecond, convertTimeToMillisecond,isEmptyObject} from "../../../../utils/Utils";

export default class CreateScheduleModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      warningdialogvisible: false,
      txtTitle: "",
      txtMorningStartTime: "08:00",
      txtMorningEndTime: "12:00",
      txtAfternoonStartTime: "14:00",
      txtAfternoonEndTime: "17:00",
      txtMinuteExamination: "15",
      txtComment: "",
      selectDate: "",

      txtLocationName: "",
      txtLocationSubName: "",
      dataTimes: [],
      isSelectLocation: false,
      switchAllDate: false,
      checked: false,
      clickTypeTime: 0,
      isShowListTime: false,
      isGeneratedTime: false,
      textShowListTime: Translate(DefineKey.Create_schedule_show_list_time),

      errTitle: "",
      errContent: "",
      dataSelectedDisease : [],
      numberSelectedDisease: 0,
    };
    this._onShowDatePicker = this._onShowDatePicker.bind(this);
    this.onOpenDialogWarning = this.onOpenDialogWarning.bind(this);
    this.onWarningOk = this.onWarningOk.bind(this);
    this._onPressShowDiseaseModal = this._onPressShowDiseaseModal.bind(this);
    this.onUpdateDataSelected = this.onUpdateDataSelected.bind(this);
  }

  componentDidMount = () => {
      
  };

  componentWillReceiveProps(props) {
    if(props.dataSchedule != null && !isEmptyObject(props.dataSchedule) ) {
        this.dismissDialogCreateSchedule();
      }
  }

  showCreateScheduleModal(inputDate) {
    this.clearOldData();
    this.setState({selectDate: inputDate});
    this.refs.myModal.open();
  }

  clearOldData() {
    this.setState({
      txtTitle: "",
      dataTimes: [],
      dataSelectedDisease: [],
      numberSelectedDisease: 0,
      txtMorningStartTime: "08:00",
      txtMorningEndTime: "12:00",
      txtAfternoonStartTime: "14:00",
      txtAfternoonEndTime: "17:00",
      txtMinuteExamination: "15",
      txtComment: "",
      txtLocationName: "",

      isSelectLocation: false,
      switchAllDate: false,
      checked: false,
      clickTypeTime: 0,
      isShowListTime: false,
      textShowListTime: Translate(DefineKey.Create_schedule_show_list_time),
      
    });
  }

  onCloseModal(data) {
    //this.props.onUpdateCreateSchedule(data);
    this.dismissDialogCreateSchedule();
    console.log("nvTien - dismissDialogCreateSchedule.....");
  }

  dismissDialogCreateSchedule() {
    this.refs.myModal.close();
  }

  onSaveData() {
    let errTitle = Translate(DefineKey.DialogWarning_text_title);
    var dataSchedule = [];
    let dataTimesGen = [];
    let title = this.state.txtTitle;
    //kiểm tra thời gian đã được gen mới hay chưa, nếu chưa thì thực hiện gen trước khi 
    console.log("nvTien-GEN TIME...IS " + this.state.isGeneratedTime)
    if(!this.state.isGeneratedTime) {
      var morningStartTime = this.state.txtMorningStartTime;
      var morningEndTime = this.state.txtMorningEndTime;
      var afternoonStartTime = this.state.txtAfternoonStartTime;
      var afternoonEndTime = this.state.txtAfternoonEndTime;
      var minuteGen = this.state.txtMinuteExamination;
      if (minuteGen === "") {
        let contentError = Translate(DefineKey.Create_schedule_content_time_notify);
        this.onOpenDialogWarning(errTitle,contentError);
        return;
      }
       dataTimesGen = this.generatorDataTimes(morningStartTime, morningEndTime, afternoonStartTime, afternoonEndTime, minuteGen);
      this.setState({isGeneratedTime: true})
    } else {
      dataTimesGen = this.state.dataTimes;
    }

    if(title === "") {
        let contentError = Translate(DefineKey.Create_schedule_content_title_notify);
        this.onOpenDialogWarning(errTitle,contentError);
        return;
    }
      let schedule_name = this.state.txtTitle;
      let start_time_am = convertTimeToMillisecond(this.state.txtMorningStartTime);
      let end_time_am = convertTimeToMillisecond(this.state.txtMorningEndTime);
      let start_time_pm = convertTimeToMillisecond(this.state.txtAfternoonStartTime);
      let end_time_pm = convertTimeToMillisecond(this.state.txtAfternoonEndTime);
      let date = convertDateToMillisecond(this.state.selectDate);
      let minute = this.state.txtMinuteExamination;
      if(this.validateInputTime(start_time_am, end_time_am, start_time_pm, end_time_pm)) {
      let time_available = this.loadTimeAvailable(dataTimesGen);
      let is_available = 0;
      let location = this.state.txtLocationName;
      let description = this.state.txtComment;
      let disease = this.loadDiseaseSelected(this.state.dataSelectedDisease);

      let objectRequest = {
        schedule_name: schedule_name,
        start_time_am: start_time_am,
        end_time_am: end_time_am,
        start_time_pm: start_time_pm,
        end_time_pm: end_time_pm,
        date: date,
        minute: minute,
        time_available: time_available,
        is_available: is_available,
        location: location,
        description: description,
        disease: disease,
        isGeneratedTime: false
      }

      this.props.saveDataSchedule(objectRequest);
    }
  }

  validateInputTime(start_time_am, end_time_am, start_time_pm, end_time_pm) {
    let errTitle = Translate(DefineKey.DialogWarning_text_title);
    if(start_time_am >= end_time_am) {
      let contentError = Translate(DefineKey.Create_schedule_content_time_error_1);
      this.onOpenDialogWarning(errTitle,contentError);
      return false;
    }
    if(start_time_pm >= end_time_pm) {
      let contentError = Translate(DefineKey.Create_schedule_content_time_error_2);
      this.onOpenDialogWarning(errTitle,contentError);
      return false;
    }

    if(start_time_pm <= end_time_am) {
      let contentError = Translate(DefineKey.Create_schedule_content_time_error_3);
      this.onOpenDialogWarning(errTitle,contentError);
      return false;
    }
    return true;


  }

  loadTimeAvailable(dataTimes) {
    var result = "";
    let split = ";";
    if(dataTimes != null && dataTimes != undefined && dataTimes.length != 0) {
      for(let i = 0 ; i < dataTimes.length ; i++) {
        let objectTime = dataTimes[i];
        if(objectTime.display) {
          let time = convertTimeToMillisecond(objectTime.time);
          if(result === "") {
            result = time;
          } else {
            result = result + split + time;
          }
        }
      }
    }

    return result;
  }

  loadDiseaseSelected(dataDisease) {
    var resultDisease = [];
    if(dataDisease != null && dataDisease != undefined && dataDisease.length != 0) {
      for(let i = 0 ; i < dataDisease.length ; i++) {
          let objectDisease = dataDisease[i];
        if(objectDisease.status) {
          let output = {disease_id: objectDisease.id, disease_name: objectDisease.name};
          resultDisease.push(output);
        }
      }
    }
    return resultDisease;
  }

  _onShowDatePicker() {
    this.refs.datePicker.onPressDate();
  }

  _onPressShowDiseaseModal() {
    this.refs.diseaseModal.getWrappedInstance().showSelectConsultantModal(this.state.dataSelectedDisease);

  }

onUpdateDataSelected(dataSelected) {
  let count = 0;
  if(dataSelected != undefined && dataSelected.length != 0) {
    count = dataSelected.length;
  }
  console.log(`nvTien - onUpdateDataSelected set state...`);
  this.setState({dataSelectedDisease: dataSelected, numberSelectedDisease: count});
}

_onUpdateStatusTime(timeId) {
    let dataTimesInput = this.state.dataTimes;
    if (
      dataTimesInput != null &&
      dataTimesInput != undefined &&
      dataTimesInput.length != 0
    ) {
      for (let i = 0; i < dataTimesInput.length; i++) {
        let objectTime = dataTimesInput[i];
        if (objectTime.id == timeId) {
          dataTimesInput[i].display = !objectTime.display;
          break;
        }
      }
      console.log(`nvTien-update time 01  = ${JSON.stringify(dataTimesInput)}`);
      this.setState({ dataTimes: dataTimesInput });
    }
  }

  _onShowListTimeSchedule() {
    let errTitle = Translate(DefineKey.DialogWarning_text_title);
    var morningStartTime = this.state.txtMorningStartTime;
    var morningEndTime = this.state.txtMorningEndTime;
    var afternoonStartTime = this.state.txtAfternoonStartTime;
    var afternoonEndTime = this.state.txtAfternoonEndTime;
    var minute = this.state.txtMinuteExamination;
    if (minute === "") {
      let contentError = Translate(DefineKey.Create_schedule_content_time_error_4);
      this.onOpenDialogWarning(errTitle,contentError);
    } else {
      let isShowing = !this.state.isShowListTime;
      let text = "";
      //Caculate and return data
      if(isShowing) {
        text = Translate(DefineKey.Create_schedule_hidden_list_time);
        if(!this.state.isGeneratedTime) {
          this.generatorDataTimes(morningStartTime, morningEndTime, afternoonStartTime, afternoonEndTime, minute);
        }
        
      } else {
        text = Translate(DefineKey.Create_schedule_show_list_time);
      }
      
      this.setState({isShowListTime: isShowing, textShowListTime: text});
    }
  }

  //hàm tính toán và gen dữ liệu thời gian theo phút
  generatorDataTimes(morningStartTime, morningEndTime, afternoonStartTime, afternoonEndTime,  minute) {
    this.setState({dataTimes: []});
    const getMorningDataTimes = this.caculateListTimeSchedule(Constants.TYPE_HEAD_MORNING, morningStartTime, morningEndTime, minute);
    const getAfternoonDataTimes = this.caculateListTimeSchedule(Constants.TYPE_HEAD_AFTERNOON,afternoonStartTime, 
      afternoonEndTime, minute);
    const grDataTimes = this.onGroupDataTimes(getMorningDataTimes, getAfternoonDataTimes);
    this.setState({dataTimes: grDataTimes, isGeneratedTime: true});
    return grDataTimes;
  }


  onGroupDataTimes(morningDataTimes, afternoonDataTime) {
    console.log(`nvTien-onGroupDataTimes BEFORE MERGE data time morningDataTimes  = ${JSON.stringify(morningDataTimes)} 
    afternoonDataTime ${JSON.stringify(afternoonDataTime)}...`);
      for(let i = 0 ; i < afternoonDataTime.length ; i++) {
        morningDataTimes.push(afternoonDataTime[i]);
      }
    console.log(`nvTien-onGroupDataTimes data time morningDataTimes AFTER MERGE  = ${JSON.stringify(morningDataTimes)}`);
    return morningDataTimes;
  }

  onOpenDialogWarning(errTitle, errContent) {
    this.setState({ warningdialogvisible: true, errTitle: errTitle, errContent: errContent });
    // this.refs.dialogWarning.showModal();
  }
  onWarningOk() {
    this.setState({ warningdialogvisible: false });
  }

  caculateListTimeSchedule(headType,startTime, endTime, minuteExamination) {
    let startHours = (startTime.split(':'))[0];
    let startMinute = (startTime.split(':'))[1];
    let endHours = (endTime.split(':'))[0];
    let endMinute = (endTime.split(':'))[1];
    let dataTimes = [];

    var startDate = new Date();
    startDate.setUTCHours(parseInt(startHours, 10));
    startDate.setUTCMinutes(parseInt(startMinute, 10));
    console.log("nvTien - caculateListTimeSchedule startTime: " + startTime + " endTime: " + endTime + " minute: " + minuteExamination);
    //init loop
    var index = 1;
    let step = parseInt(minuteExamination, 10);
    var stepHours = startHours;
    var stepMinute = startMinute;
    let typeMorning = true;
    if(headType == Constants.TYPE_HEAD_MORNING) {
      typeMorning = true;
    } else {
      typeMorning = false;
    }

    let initTime = {
      id: index,
      time: startTime,
      display: true,
      headTypeMorning: typeMorning,
      showHeader: true 
    };
    dataTimes.push(initTime);
    while ((stepHours <= endHours)) {
      startDate.setUTCMinutes(startDate.getUTCMinutes() + step);
      index ++;
      stepHours = startDate.getUTCHours();
      stepMinute = startDate.getUTCMinutes(); 
      if (stepHours == endHours && stepMinute >= endMinute) {
        console.log("nvTien - caculateListTimeSchedule stepHours: " + stepHours + " endHours: " + endHours 
      + " stepMinute: " + stepMinute + " endMinute: " + endMinute);
        break;
      } else if (stepHours > endHours) {
        console.log("nvTien - caculateListTimeSchedule stepHours > endHours stepHours:  " + stepHours + " endHours: " + endHours);
        break;
      }
      let objectTime = {
        id: index,
        time: (this.formatValue(stepHours) + ":" + this.formatValue(stepMinute)),
        display: true ,
        showHeader: false
      }
      dataTimes.push(objectTime);
      
    }
    console.log(`nvTien-caculateListTimeSchedule data time  = ${JSON.stringify(dataTimes)}`);
    return dataTimes;
    
  }

  formatValue(input) {
    var result = (input < 10 ? "0" : "") + input;
    return result;
  }

  onChangeSelectDate(date) {
    this.setState({isGeneratedTime: false});
    text = Translate(DefineKey.Create_schedule_show_list_time);
    this.setState({isShowListTime: false, textShowListTime: text});
    switch (this.state.clickTypeTime) {
      case Constants.TYPE_CLICK_MORNING_START:
      this.setState({ txtMorningStartTime: date });
        break;
      case Constants.TYPE_CLICK_MORNING_END:
      this.setState({ txtMorningEndTime: date });
        break;
      case Constants.TYPE_CLICK_AFTERNOON_START:
      this.setState({ txtAfternoonStartTime: date });
        break;
      case Constants.TYPE_CLICK_AFTERNOON_END:
      this.setState({ txtAfternoonEndTime: date });
        break;
    }
  }

  onChangeInputMinue(input) {
    this.setState({isGeneratedTime: false});
    let text = Translate(DefineKey.Create_schedule_show_list_time);
    this.setState({isShowListTime: false, textShowListTime: text});
    this.setState({ txtMinuteExamination: input });
  }

  render() {
    return (
      <Modal
      style={styles.container}
      position="center"
      backdrop={true}
      backdropOpacity={0.5}
      onClosed={() => console.log("close modal")}
      swipeToClose= {false}
      ref={"myModal"}
    >
    <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.layout_top}>
          <View style={styles.layout_header}>
            <TouchableOpacity onPress={() => {
              this.onCloseModal([]);
            }}>
              <Image
                source={require("../../../../../assets/icon_delete_black.png")}
                style={styles.image_header_delete}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.layout_button_save} onPress = {() => {
              this.onSaveData();
            }}>
              <Text style={styles.txt_save}>Lưu</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.layout_head_title}>
            <TextInput
              style={styles.text_title}
              placeholder= {Translate(DefineKey.Create_schedule_placeholder_title)}
              placeholderTextColor={"#9f9fa0"}
              multiline={true}
              numberOfLines={4}
              editable={true}
              onChangeText={text => this.setState({ txtTitle: text })}
            />
          </View>
        </View>
        <View style={styles.viewLine} />

        {/* define layout setting schedule times */}
        <ScrollView>
          <View style={styles.layout_wrap_content}>
            <View style={styles.layout_wrap_input_time}>
              <View style={styles.layout_wrap_choose_date}>
                <View style={styles.layout_select_all_date}>
                  <View style={styles.layout_text_all_date}>
                    <Image
                      source={require("../../../../../assets/icon_all_date.png")}
                      style={styles.image_select_all_date}
                    />
                    <Text style={styles.text_select_all_date}>
                      {Translate(DefineKey.Create_schedule_select_all_current_date)}
                    </Text>
                  </View>
                  <View style={styles.layout_switch_all_date}>
                    <CheckBox
                      iconRight
                      checked={this.state.checked}
                      onPress={() =>
                        this.setState({ checked: !this.state.checked })
                      }
                      size={25}
                      containerStyle={styles.check_all_date}
                    />
                  </View>
                </View>
              </View>

              {/* choose start-time, end-time */}
              <View style = {styles.layout_wrapper_choose_time}>
              {/* schedule morning */}
              {/* start-time */}
              <Text style = {styles.text_title_schedule}>Lịch ca sáng</Text>
              <View style = {styles.layout_wrapper_time_morning}>
              <View style={styles.wrap_start_time}>       
                <Text style={styles.txt_title_start_time}>
                  {Translate(DefineKey.Create_schedule_start_time)}:
                </Text>
                <TouchableOpacity
                  style={styles.layout_button_start_time}
                  onPress={() => {
                    this.setState({ clickTypeTime: Constants.TYPE_CLICK_MORNING_START });
                    this._onShowDatePicker();
                  }}
                >
                  <View style={styles.layout_input_start_time}>
                    <Text style={styles.txt_start_time}>
                      {this.state.txtMorningStartTime}
                    </Text>
                  </View>
                </TouchableOpacity>
                {/* display dialog select date and time */}
                <DatePicker
                  ref={"datePicker"}
                  style={{ width: 0, height: 0 }}
                  mode="time"
                  locale="vi"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  onDateChange={date => {
                    this.onChangeSelectDate(date)
                    
                  }}
                />
              </View>
              
              {/* end-time */}
              <View style={styles.wrap_end_time}>
                <Text style={styles.txt_title_start_time}>
                {Translate(DefineKey.Create_schedule_end_time)}:
                </Text>
                <TouchableOpacity
                  style={styles.layout_button_start_time}
                  onPress={() => {
                    this.setState({ clickTypeTime: Constants.TYPE_CLICK_MORNING_END });
                    this._onShowDatePicker();
                  }}
                >
                <View style={styles.layout_input_start_time}>
                    <Text style={styles.txt_start_time}>
                      {this.state.txtMorningEndTime}
                    </Text>
                </View>
                </TouchableOpacity>
              </View>
              </View>

              {/* schedule time afternoon */}
              {/* start-time */}
              <Text style = {styles.text_title_schedule}>{Translate(DefineKey.Create_schedule_afternoon_working_time)}</Text>
              <View style = {styles.layout_wrapper_time_morning}>
              <View style={styles.wrap_start_time}>       
              <Text style={styles.txt_title_start_time}>
              {Translate(DefineKey.Create_schedule_start_time)}
              </Text>
              <TouchableOpacity
                style={styles.layout_button_start_time}
                onPress={() => {
                  this.setState({ clickTypeTime: Constants.TYPE_CLICK_AFTERNOON_START });
                  this._onShowDatePicker();
                }}
              >
                <View style={styles.layout_input_start_time}>
                  <Text style={styles.txt_start_time}>
                    {this.state.txtAfternoonStartTime}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

              {/* end-time */}
              <View style={styles.wrap_end_time}>
                <Text style={styles.txt_title_start_time}>
                {Translate(DefineKey.Create_schedule_end_time)}
                </Text>
                <TouchableOpacity
                  style={styles.layout_button_start_time}
                  onPress={() => {
                    this.setState({ clickTypeTime: Constants.TYPE_CLICK_AFTERNOON_END });
                    this._onShowDatePicker();
                  }}
                >
                <View style={styles.layout_input_start_time}>
                    <Text style={styles.txt_start_time}>
                      {this.state.txtAfternoonEndTime}
                    </Text>
                </View>
                </TouchableOpacity>
              </View>
              </View>
              <View style={styles.layout_wrap_minueExamination}>
                <Text style={styles.txt_title_start_time}>
                  {Translate(DefineKey.Create_schedule_length_examination_input_title)}:
                </Text>
                <View style={styles.layout_button_start_time}>
                  <TextInput
                    style={styles.txt_start_time}
                    editable={true}
                    onChangeText={text => {
                      this.onChangeInputMinue(text)
                    }}
                    value={this.state.txtMinuteExamination}
                  />
                </View>
              </View>
              </View>

              {/* minutes per examination  */}
              {/* <View style = {styles.wrap_minueExam}>
              
              </View> */}
              {/* text check result input start-time, end-time, minute per examination */}
              <TouchableOpacity
                  style={styles.button_check_time}
                  onPress={() => {
                    this._onShowListTimeSchedule();
                  }}
                >
                <Text style={styles.txt_check_time}>{this.state.textShowListTime}</Text>
              </TouchableOpacity>
            </View>
             
            {/* define layout list time setting schedule */}
            <View style={this.state.isShowListTime ? styles.viewLine: styles.hide_view} />
            <View style={this.state.isShowListTime ? styles.layout_list_chedule: styles.hide_view}>
              <Text style={styles.title_list_schedule}>
                {Translate(DefineKey.Create_schedule_examination_time_list)}
              </Text>
              <FlatList
                style={styles.layout_list_time_schedule}
                data={this.state.dataTimes}
                renderItem={({ item, index }) => {
                  return (
                    <ItemTimeSchedule
                      item={item}
                      index={index}
                      onclickItem={this._onUpdateStatusTime.bind(this)}
                    />
                  );
                }}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>

            {/* define layout optional */}
            <View style={styles.viewLine} />
            <View style={styles.layout_wrap_optional}>
              <Text style={styles.text_title_optional}>{Translate(DefineKey.Create_schedule_other_option)}</Text>
              <View style={styles.layout_wrap_disease}>
                <View style={styles.layout_disease}>
                  <Text style={styles.text_number_disease}>
                    {Translate(DefineKey.Create_schedule_display_selected_benh_count_1)} {this.state.numberSelectedDisease} {Translate(DefineKey.Create_schedule_display_selected_benh_count_2)}
                  </Text>
                  <TouchableOpacity
                    style={styles.button_select_disease}
                    onPress={() => {
                      this._onPressShowDiseaseModal();
                    }}
                  >
                    <Image
                      style={styles.image_add_disease}
                      source={require("../../../../../assets/icon_add.png")}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* set location name */}
              <View style={styles.layout_add_location}>
                <Image
                  style={styles.image_add_location}
                  source={require("../../../../../assets/icon_location.png")}
                />
                <TouchableOpacity
                  style={styles.button_add_location}
                  onPress={() => {}}
                >
                  <View style={styles.layout_wrap_text_location}>
                    <TextInput
                      style={styles.txt_input_add_location}
                      placeholder="Thêm vị trí của bạn..."
                      placeholderTextColor={Colors.gray}
                      multiline={true}
                      numberOfLines={4}
                      editable={true}
                      maxLength={600}
                      onChangeText={text => this.setState({ txtLocationName: text })}
                    />
                  </View>
                </TouchableOpacity>
              </View>

              {/* layout add note, comment of doctor        */}
              <Text style={styles.txt_title_add_note}>{Translate(DefineKey.Create_schedule_note_title)}</Text>
              <View style={styles.layout_wrap_add_note}>
                <TextInput
                  style={styles.txt_input_add_note}
                  placeholder={Translate(DefineKey.Create_schedule_note_palaceholder)}
                  placeholderTextColor={Colors.gray}
                  multiline={true}
                  numberOfLines={4}
                  editable={true}
                  maxLength={600}
                  onChangeText={text => this.setState({ txtComment: text })}
                />
              </View>
            </View>
          </View>
        </ScrollView>
        <DialogLoading loading={this.props.isLoadingDialog}/>
        {/* <DialogWarning
          ref={"dialogWarning"}
          title={this.state.errTitle}
          content={this.state.errContent}
        /> */}
        <WarningDialog
          titleDialog={this.state.errTitle}
          contentDialog={this.state.errContent}
          onOk={this.onWarningOk.bind()}
          textOk={Translate(DefineKey.DialogWarning_text_ok)}
          visible={this.state.warningdialogvisible}
                        />        
        <DiseaseModalContainter ref={"diseaseModal"} onUpdateDataSelected = {this.onUpdateDataSelected.bind()}/>
      </View>
      </TouchableWithoutFeedback>
      </Modal>
    );
  }
}
