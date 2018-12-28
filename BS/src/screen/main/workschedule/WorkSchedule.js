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
  PixelRatio,
  AsyncStorage
} from "react-native";
import { SafeAreaView, NavigationEvents } from "react-navigation";
import styles from "./WorkScheduleStyle";
import CustomHeader from "../../main/header/CustomHeader";
import CustomDetails from "./CustomDetails";
import CalendarStrip from "../../../components/calendar/CalendarStrip";

import { Translate } from "../../../utils/Language";
import DefineKey from "../../../config/language/DefineKey";
import DialogLoading from "../../../components/DialogLoading";
import CreateScheduleContainer from "../../../containers/CreateScheduleContainer";
import ScreenName from "../../../commons/ScreenName";
import Constants from "../../../commons/Constants";
import {convertMillisecondToDate, isEmptyObject, getTimeMillisecond, convertDateToMillisecond } from "../../../utils/Utils";

export default class WorkSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowTime: false,
      isVisibleHeader: false,
      isVisibleButtonCreate: false,
      isShowDetailsSchedule: false,
      selectDate: "",
      detailsSchedule: {},
    };

    this.onPressShowCreateScheduleModal = this.onPressShowCreateScheduleModal.bind(this);
    this.onUpdateView = this.onUpdateView.bind(this);
    this.onClickDate = this.onClickDate.bind(this);
  }

  componentDidMount = () => {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  };

  componentWillReceiveProps(props) {
    if (props.dataNewSchedule != null && !isEmptyObject(props.dataNewSchedule)) {
      this.updateDetailToView(props.dataNewSchedule);
    } else if (props.dataWorkSchedule != null && !isEmptyObject(props.dataWorkSchedule)) {
      this.updateDetailToView(props.dataWorkSchedule);
    } else {
      this.handleShowHeader();
    }
    //xử lí tạo lịch làm việc thành công, đóng màn hình tạo lịch làm việc và reload data
    if(props.isReloadSchedule) {
      this.dissmissCreateScheduleModal();
      this.props.loadDataWorkSchedule(this.state.selectDate);
    }
  }

  //xử lí ẩn hiện view
  handleShowHeader() {
    var curTime = parseInt(getTimeMillisecond())
    var selectDateInt = parseInt(convertDateToMillisecond(this.state.selectDate));
    //nếu ngày chọn nhỏ hơn ngày hiện tại, thì hiển thị header để chọn ngày khác và ẩn nút tạo lịch đi vì là quá khứ
    //nếu = ngày hiện tại thì hiện nút tạo lịch và ẩn header đi
    //nếu > ngày hiện tại thì hiển thị header để chọn ngày khác, và hiện nút tạo lịch làm việc
    if(selectDateInt < curTime) {
      this.setState({ isShowTime: false, isVisibleHeader: true, isVisibleButtonCreate: false });
    } else if(selectDateInt == curTime) {
      this.setState({ isShowTime: false, isVisibleHeader: false, isVisibleButtonCreate: true });
    } else {
      this.setState({ isShowTime: false, isVisibleHeader: true, isVisibleButtonCreate: true });
    }
  }

  //hiển thị dữ liệu lên view
  updateDetailToView(dataWorkSchedule) {
    this.setState({ isVisibleHeader: true, isShowTime: true, isVisibleButtonCreate: false, detailsSchedule:  dataWorkSchedule});
  }

  //Hiển thị màn hình tạo lịch khám bệnh
  onPressShowCreateScheduleModal() {
    this.showCreateScheduleModal( Constants.TYPE_SCHEDULE_CREATE_WEEK, this.state.selectDate, {});
  }

  //Sửa lịch khám bệnh
  onPressEditSchedule() {
    this.showCreateScheduleModal(Constants.TYPE_SCHEDULE_EDIT, this.state.selectDate, this.state.detailsSchedule);
  }

  //Xử lí hiển thị dialog tạo lịch khám theo type, create, edit
  showCreateScheduleModal(actionType, selectDate, detailsSchedule) {
    this.refs.createScheduleModal.getWrappedInstance()
    .showCreateScheduleModal(actionType, this.state.selectDate,  detailsSchedule);
  }

  dissmissCreateScheduleModal() {
    this.refs.createScheduleModal.getWrappedInstance().dismissCreateSchedule();
  }

  componentWillAnimateOut() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }

  //xử lí khi nhấn nút back trên device, hiện tại để rỗng, tức không xử lí gì, không cho back
  handleBackPress = () => {
    
  };

  //Xử lí click chọn ngày khác để xem lịch làm việc
  onClickDate(inputDate) {
    this.setState({ isShowDetailsSchedule: false });
    var isoFormat = convertMillisecondToDate(inputDate);
    if (this.state.selectDate != isoFormat) {
      this.props.loadDataWorkSchedule(isoFormat);
    }
    this.setState({ selectDate: isoFormat });
  }

  //cập nhật view sau khi tạo lịch khám thành công
  onUpdateView(dataSchedule) {
    this.setState({ isShowDetailsSchedule: true });
    this.setState({ detailsSchedule: dataSchedule });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <View style={styles.layoutWrapContent}>
            <CustomHeader
              isShowBack={false}
              navigation={this.props.navigation}
              titleHead={Translate(DefineKey.Work_schedule_titleHead)}
            />

            {/* layout hiển thị calendar cho phép người dùng chọn ngày */}
            <View style={this.state.isVisibleHeader ? styles.wrap_head_calendar : styles.hideLayout}>
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

            {/* layout hiển thị chi tiêt lịch khám của bác sĩ đã tạo, nếu có */}
            <View style={this.state.isShowTime ? styles.wrap_time_schedule : styles.hideLayout}>
              <ScrollView>
                <View style={styles.wrap_time_schedule}>
                  <View style={styles.right_content_schedule}>
                    <View style={styles.wrap_box}>
                      <View style={styles.top_box}>
                        <Text style={styles.top_box_text}>
                          {Translate(DefineKey.Work_schedule_details_work_schedule)}
                        </Text>
                      </View>
                      <View style={styles.content_box}>
                        <CustomDetails
                          detailsSchedule={this.state.detailsSchedule}
                          isShowDetails={this.state.isShowDetailsSchedule}
                        />
                        <TouchableOpacity style={styles.top_box_button_edit} onPress={() => {
                          this.onPressEditSchedule();
                        }}>
                        <Text style={styles.top_box_text_edit}>
                          {Translate(DefineKey.Custom_detail_edit_schedule)}
                        </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </ScrollView>
            </View>
           
            <View style={this.state.isVisibleButtonCreate ? styles.layout_create_schedule : styles.hideLayout}>
              <TouchableOpacity
                style={this.state.isVisibleButtonCreate ? styles.layout_button_create : styles.hideLayout}
                onPress={() => {
                  this.onPressShowCreateScheduleModal();
                }}
              >
                <Text style={styles.txt_button_create}>{Translate(DefineKey.Work_schedule_create_work_schedule)}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <DialogLoading loading={this.props.isLoading} />
          <CreateScheduleContainer ref={"createScheduleModal"} onUpdateCreateSchedule={this.onUpdateView.bind()}/>
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
