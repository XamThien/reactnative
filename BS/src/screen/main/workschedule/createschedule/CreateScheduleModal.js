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
import { CheckBox } from "native-base";
import Modal from "react-native-modalbox";
import ItemTimeSchedule from "./ItemTimeSchedule";
import styles from "./CreateScheduleModalStyle";
import { Translate } from "../../../../utils/Language";
import DefineKey from "../../../../config/language/DefineKey";
import Constants from "../../../../commons/Constants";
import DialogLoading from "../../../../components/DialogLoading";
import DatePicker from "../../../../components/DatePicker";
import WarningDialog from '../../../../components/WarningDialog';
import DiseaseModalContainer from "../../../../containers/DiseaseModalContainer"
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
      actionType: "",

      txtLocationName: "",
      txtLocationSubName: "",
      dataTimes: [],
      oldDataSchedule: {},
      isSelectLocation: false,
      switchAllDate: false,
      checked: true,
      clickTypeTime: 0,
      isShowListTime: false,
      isGeneratedTime: false,
      textShowListTime: Translate(DefineKey.Create_schedule_show_list_time),

      errTitle: "",
      errContent: "",
      dataSelectedDisease : [],
      numberSelectedDisease: 0,
    };
    this.onShowDatePicker = this.onShowDatePicker.bind(this);
    this.onOpenDialogWarning = this.onOpenDialogWarning.bind(this);
    this.onWarningOk = this.onWarningOk.bind(this);
    this.onPressShowDiseaseModal = this.onPressShowDiseaseModal.bind(this);
    this.onUpdateDiseaseSelected = this.onUpdateDiseaseSelected.bind(this);
  }

  componentDidMount = () => {
      
  };

  componentWillReceiveProps(props) {
    if(props.dataSchedule != null && !isEmptyObject(props.dataSchedule) ) {
        this.dismissCreateSchedule();
      }
  }

  //check tuỳ chọn apply lịch khám cho tất cả thứ với thứ của ngày hiện tại hay không
  onPressCheckAllDate() {
    console.log('onPressCheckAllDate isChecked: ' + this.state.checked )
    this.setState({ checked: !this.state.checked })
  }

  //hiển thị dialog tạo lịch làm việc, sửa lịch làm việc
  showCreateScheduleModal(actionType, inputDate, dataSchedule) {
    console.log('showCreateScheduleModal actionType: ' + actionType )
    this.clearOldData();
    this.setState({selectDate: inputDate, actionType: actionType});
    if(actionType === Constants.TYPE_SCHEDULE_CREATE_WEEK) {
      this.handleCreateWeeklySchedule();
    } else if(actionType === Constants.TYPE_SCHEDULE_EDIT) {
      this.handleEditSchedule(dataSchedule)
    }
    
    this.refs.myModal.open();
  }

  //xử lí sửa lịch khám bác sĩ, đẩy dữ liệu lên view và hiển thị tuỳ chọn trong màn hình sửa
  handleEditSchedule(dataSchedule) {
    this.setState({oldDataSchedule: dataSchedule});
    this.updateDataToView(dataSchedule);
  }

  //Hiển thị dữ liệu cũ lên view để sửa
  updateDataToView(dataSchedule) {
    this.setState({
      txtTitle: dataSchedule.schedule_name
    })
  }

  //xử lí tạo lịch làm việc theo tuần của bác sĩ, khi bác sĩ chưa có lịch làm việc
  handleCreateWeeklySchedule() {

  }

  //xoá dữ liệu cũ khi vào lại để tạo lịch làm việc hoặc update lịch làm việc
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

  //Đóng màn hình tạo lịch khám bệnh
  dismissCreateSchedule() {
    this.refs.myModal.close();
  }

  //Lưu lịch làm việc của bác sĩ, sau khi đã hoàn thành bước nhập dữ liệu
  onPressSaveData() {
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
        time_available: "",
        is_available: is_available,
        location: location,
        description: description,
        disease: disease,
        isGeneratedTime: false
      }

      this.props.saveDataSchedule(objectRequest);
    }
  }

  //validate dữ liệu nhập vào của start time, endtime, với điệu kiện start-time không được vượt quá end-time
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
    //ca sáng nhập không được vượt quá hoặc trùng với ca chiều
    if(start_time_pm <= end_time_am) {
      let contentError = Translate(DefineKey.Create_schedule_content_time_error_3);
      this.onOpenDialogWarning(errTitle,contentError);
      return false;
    }
    return true;
  }

  //lấy danh sách các bệnh mà bác sĩ đã chọn cho lịch khám
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

  //hiển thị time picker, chọn thời gian khám bệnh
  onShowDatePicker() {
    this.refs.datePicker.onPressDate();
  }

  //hiển thị dialog chọn loại bệnh mà bác sĩ có thể khám ngày hôm đó 
  onPressShowDiseaseModal() {
    this.refs.diseaseModal.getWrappedInstance().showSelectConsultantModal(this.state.dataSelectedDisease);

  }

  //cập nhật dữ liệu
  onUpdateDiseaseSelected(dataSelected) {
    let count = 0;
    if(dataSelected != undefined && dataSelected.length != 0) {
      count = dataSelected.length;
    }
    this.setState({dataSelectedDisease: dataSelected, numberSelectedDisease: count});
  }

  //cập nhật trạng thái chọn thời gian làm việc, bỏ chọn thời gian làm việc
  onUpdateStatusTime(timeId) {
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
        this.setState({ dataTimes: dataTimesInput });
      }
    }

  //hiển thị danh sách thời gian làm việc, thời gian này sẽ được gen tự động
  onShowListTimeSchedule() {
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
           // this.generatorDataTimes(morningStartTime, morningEndTime, afternoonStartTime, afternoonEndTime, minute);
          }
          
        } else {
          text = Translate(DefineKey.Create_schedule_show_list_time);
        }
        this.setState({isShowListTime: isShowing, textShowListTime: text});
      }
  }
  //mở dialog cảnh báo
  onOpenDialogWarning(errTitle, errContent) {
    this.setState({ warningdialogvisible: true, errTitle: errTitle, errContent: errContent });
    // this.refs.dialogWarning.showModal();
  }
  onWarningOk() {
    this.setState({ warningdialogvisible: false });
  }

  //hàm lấy ngày được bác sĩ chọn từ dialog, sau đó update vào giá trị tương ứng
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

  //sự kiện lấy giá trị khi bác sĩ nhập vào số phút
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
    {/* layout hiển thị nội dung tạo lịch */}
      <View style={styles.container}>
        <View style={styles.layout_top}>

          {/* layout header, hiển thị nút lưu, nút thoát */}
          <View style={styles.layout_header}>
            <TouchableOpacity onPress={() => {
              this.dismissCreateSchedule();
            }}>
              <Image
                source={require("../../../../../assets/icon_delete_black.png")}
                style={styles.image_header_delete}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.layout_button_save} onPress = {() => {
              this.onPressSaveData();
            }}>
              <Text style={styles.txt_save}>{Translate(DefineKey.Common_text_save)}</Text>
            </TouchableOpacity>
          </View>

          {/* layout hiển thị ô nhập tiêu đề */}
          <View style={styles.layout_head_title}>
            <TextInput
              style={styles.text_title}
              placeholder= {Translate(DefineKey.Create_schedule_placeholder_title)}
              placeholderTextColor={"#9f9fa0"}
              multiline={true}
              numberOfLines={4}
              editable={true}
              value = {this.state.txtTitle}
              onChangeText={text => this.setState({ txtTitle: text })}
            />
          </View>
        </View>
        <View style={styles.viewLine} />

        {/* scrollview, hiển thị phần nội dung nhập */}
        <ScrollView>
          <View style={styles.layout_wrap_content}>
            <View style={styles.layout_wrap_input_time}>
              <View style={styles.layout_wrap_choose_date}>
              {/* layout hiển thị nút chọn áp dụng cho các thứ cùng với thứ hiện tại, 2 tháng */}
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

                  {/* hiển thị checkbox chọn apply cho tất cả các ngày cùng thứ với ngày hiện tại hay không */}
                  <CheckBox
                    style={styles.check_all_date}
                    checked={this.state.checked}
                    onPress={() => this.onPressCheckAllDate()}
                    color="green"
                  />
                </View>
              </View>

              {/* layout nhập vào thời gian bắt đầu khám, kết thúc khám của mỗi buổi */}
              <View style = {styles.layout_wrapper_choose_time}>
              {/* ca sáng*/}
              {/* thời gian bắt đầu */}
              <Text style = {styles.text_title_schedule}>{Translate(DefineKey.Create_schedule_text_chedule_morning)}</Text>
              <View style = {styles.layout_wrapper_time_morning}>
              <View style={styles.wrap_start_time}>       
                <Text style={styles.txt_title_start_time}>
                  {Translate(DefineKey.Create_schedule_start_time)}
                </Text>
                <TouchableOpacity
                  style={styles.layout_button_start_time}
                  onPress={() => {
                    this.setState({ clickTypeTime: Constants.TYPE_CLICK_MORNING_START });
                    this.onShowDatePicker();
                  }}
                >
                  <View style={styles.layout_input_start_time}>
                    <Text style={styles.txt_start_time}>
                      {this.state.txtMorningStartTime}
                    </Text>
                  </View>
                </TouchableOpacity>

                {/* layout hiển thị dialog chọn giờ */}
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
              
              {/* thời gian kết thúc ca sáng */}
              <View style={styles.wrap_end_time}>
                <Text style={styles.txt_title_start_time}>
                {Translate(DefineKey.Create_schedule_end_time)}
                </Text>
                <TouchableOpacity
                  style={styles.layout_button_start_time}
                  onPress={() => {
                    this.setState({ clickTypeTime: Constants.TYPE_CLICK_MORNING_END });
                    this.onShowDatePicker();
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

              {/* ca chiều */}
              {/* bắt đầu ca chiều */}
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
                  this.onShowDatePicker();
                }}
              >
                <View style={styles.layout_input_start_time}>
                  <Text style={styles.txt_start_time}>
                    {this.state.txtAfternoonStartTime}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

              {/* kết thúc ca chiều */}
              <View style={styles.wrap_end_time}>
                <Text style={styles.txt_title_start_time}>
                {Translate(DefineKey.Create_schedule_end_time)}
                </Text>
                <TouchableOpacity
                  style={styles.layout_button_start_time}
                  onPress={() => {
                    this.setState({ clickTypeTime: Constants.TYPE_CLICK_AFTERNOON_END });
                    this.onShowDatePicker();
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

              {/* text hiển thị, ẩn tuỳ chọn thời gian làm việc của bác sĩ */}
              <TouchableOpacity
                  style={styles.button_check_time}
                  onPress={() => {
                    this.onShowListTimeSchedule();
                  }}
                >
                <Text style={styles.txt_check_time}>{this.state.textShowListTime}</Text>
              </TouchableOpacity>
            </View>
             
            {/* layout hiển thị danh sách thời gian làm việc được gen ra từ ca sáng, ca chiều bên trên*/}
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
                      onclickItem={this.onUpdateStatusTime.bind(this)}
                    />
                  );
                }}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>

            {/* layout nhập tuỳ chọn khác */}
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
                      this.onPressShowDiseaseModal();
                    }}
                  >
                    <Image
                      style={styles.image_add_disease}
                      source={require("../../../../../assets/icon_add.png")}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* nhập nơi làm việc, địa chỉ cơ quan, phòng khám */}
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

              {/* layout note*/}
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
        <WarningDialog
          titleDialog={this.state.errTitle}
          contentDialog={this.state.errContent}
          onOk={this.onWarningOk.bind()}
          textOk={Translate(DefineKey.DialogWarning_text_ok)}
          visible={this.state.warningdialogvisible}/>        
        <DiseaseModalContainer ref={"diseaseModal"} onUpdateDataSelected = {this.onUpdateDiseaseSelected.bind()}/>
      </View>
      </Modal>
    );
  }
}
