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
import styles from "./DoctorListStyle";
import CustomHeader from "../../main/header/CustomHeader";
import ModalDropdown from "../../../components/ModalDropdown";
import ItemDoctor from "./ItemDoctor";
import DatePicker from "../../../components/DatePicker";
import { Translate } from "../../../utils/Language";
import DefineKey from "../../../config/language/DefineKey";
import DialogLoading from "../../../components/DialogLoading";
import ScreenName from "../../../commons/ScreenName";
import { getCurrentDate, getTime, getCurrentTime, isEmptyObject } from "../../../utils/Utils";
import Constants from "../../../commons/Constants";

const MAX_DATE_SELECTOR = 7;
const USER_TYPE = 1;

export default class Doctorlist extends Component {
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
      userName: "",
      numberOnline: 1,

    };
    this.onShowDatePicker = this.onShowDatePicker.bind(this);
    this.onPressItemDoctor = this.onPressItemDoctor.bind(this);
  }

  componentWillMount = () => {
    console.log("nvTien - Doctorlist componentWillMount");
  };

  componentDidMount = () => {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
    const userID = this.props.navigation.getParam(Constants.KEY_INTENT_USER_ID, "");
    this.setState({patientId: userID});
    this.props.onFetchAllSpecialized();
    //set date tại thời điểm hiện tại, vì đang lấy ds bác sĩ thời điểm hiện tại
    const curDate = getCurrentDate();
    this.setState({ selectDate: curDate });
  };

  componentWillAnimateIn() {
    console.log("nvTien - Doctorlist componentWillAnimateIn");
  }

  componentWillAnimateOut() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
    console.log("nvTien - Doctorlist componentWillAnimateOut");
  }

  componentWillReceiveProps(props) {
    this.handleCallbackNewDoctors(props.actionCallbackDoctor);
    this.setState({dataDoctors: props.doctors});
    this.handleResultUserProfile(props.userProfile);
  }
  //xử lí lấy tên user
  handleResultUserProfile(userProfile) {
    if(userProfile != null && !isEmptyObject(userProfile)) {
        this.setState({userName: userProfile.full_name})
    }
  }

  //xử lí khi có bác sĩ mới online
  handleCallbackNewDoctors(callbackType) {
    console.log("nvTien - Doctorlist handleCallbackNewDoctors type: " + callbackType);
    if (callbackType === Constants.DOCTORLIST_EVENT_LOAD_DOCTORS_SUCCESS) {
      let dataDoctors = this.props.doctors;
      if (dataDoctors != null && dataDoctors.length != 0) {
        this.props.onAddNewDoctors(dataDoctors);
      }
    } else {
    }
  }
  //hàm xử lí nút back của device, tức không cho ngừơi dùng back về màn hình trước, mà phải chọn logout
  handleBackPress = () => {
    // this.goBack(); // works best when the goBack is async
    // return true;
  };

  //xử lí click nút tìm bác sĩ khám ngay lập tức
  onPressSelectImmediately() {
    const curDate = getCurrentDate();
    const curTime = getCurrentTime();
    this.setState({ selectDate: curDate, isFindDoctorByDate: false });
    this.props.onFindDoctorImmediately(this.state.curIdSpeciality, curDate, curTime);
  }

  //xử lí khi người dùng chọn 1 bác sĩ sẽ chuyển đến màn hình đặt khám bệnh
  onPressItemDoctor(doctorID) {
    const userID = this.props.userProfile.user_id;
    let objectDoctor = this.findDataDoctorByID(doctorID, this.props.doctors);
    if (objectDoctor !== null) {
      if (this.state.isFindDoctorByDate) {
        this.props.navigation.navigate(ScreenName.Screen_Booking, {
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
  //hiển thị dialog date picker
  onShowDatePicker() {
    this.refs.datePicker.onPressDate();
  }
  //xử lí khi người dùng chọn 1 ngày, khi đó sẽ gọi service tìm kiếm bác sĩ theo ngày 
  onDateChange(txtDate) {
    this.setState({ selectDate: txtDate, isFindDoctorByDate: true });
    this.props.onFindDoctorByDate(this.state.curIdSpeciality, txtDate);
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <View style={styles.layoutWrapContent}>
            {/* layout top header, hiển thị tên màn hình, và các cài đặt khác */}
            <CustomHeader
              isShowBack={false}
              navigation={this.props.navigation}
              titleHead={Translate(DefineKey.DoctorList_titleHead)}
            /> 
            {/* hiển thị thông báo số lượng bác sĩ đang online và lời chào */}
            <View style={styles.layoutTopTitle}>
              <Text style={styles.textWelcome}>
                {Translate(DefineKey.DoctorList_textWelcome)}
                {this.state.userName}
              </Text>
              <Text style={styles.textInfoOnline} numberOfLines={3}>
                {Translate(DefineKey.DoctorList_textOnline01)}
                {this.state.numberOnline}
                {Translate(DefineKey.DoctorList_textOnline02)}
                {this.state.userName}
                {Translate(DefineKey.DoctorList_textOnline03)}
              </Text>

              {/*định nghĩa nút tìm bác sĩ khám ngay lập tức và bác sĩ khám theo ngày*/}
              <View style={styles.layoutButton}>
                <TouchableOpacity
                  style = {this.state.isFindDoctorByDate ? styles.btnFindDoctorDefault : styles.btnFindDoctorSelected}
                  onPress={() => this.onPressSelectImmediately()}
                >
                  <Text style={styles.textButton}>
                    {Translate(DefineKey.DoctorList_textBtnImmediate)}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style = {this.state.isFindDoctorByDate ? styles.btnFindDoctorSelected : styles.btnFindDoctorDefault}
                  onPress={() => this.onShowDatePicker()}
                >
                  {/* hiển thị dialog chọn ngày khám muốn tìm */}
                  <DatePicker
                    ref={"datePicker"}
                    style={{ width: 0, height: 0 }}
                    mode="date"
                    locale="vi"
                    format={Constants.DEFAULT_SYMPLE_DATE}
                    minDate={getCurrentDate()}
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    onDateChange={date => {
                      this.onDateChange(date);
                    }}
                  />
                  <Text style={styles.textButton}>
                    {Translate(DefineKey.DoctorList_textBtnSchedule)}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/*layout chọn chuyên ngành và tìm kiếm bác sĩ theo chuyên ngành*/}
            <View style={styles.layoutList}>
              <View style={styles.layoutTitleDropdown}>
                <Text style={styles.textSelect}>
                  {Translate(DefineKey.DoctorList_textSelect)}
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

                  {/* dropdow chọn chuyên ngành muốn tìm kiếm */}
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

               {/* hiển thị danh sách bác sĩ theo điều kiện tìm kiếm*/}
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
                        onclick={this.onPressItemDoctor.bind()}
                        curDate={getCurrentDate()}
                        curTime={getTime()}
                      />
                    );
                  }}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
            </View>
          </View>
          <DialogLoading loading={this.props.isLoading === undefined ? false : this.props.isLoading}
          />
        </View>
      </SafeAreaView>
    );
  }

  _renderSelectItemSpecialized(rowData) {
    const { name, id } = rowData;
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

