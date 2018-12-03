import React, { Component } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import styles from "./ItemScheduleManagerStyle";
import { Translate } from "../../utils/Language";
import DefineKey from "../../config/language/DefineKey";
import {convertMillisecondToDate, convertMilliToTime} from "../../utils/Utils";

const TYPE_VIDEO_CALL = 0;
const TYPE_VOICE_CALL = 1;
const STATUS_PENDING = 0;
const STATUS_ACCEPT = 1;
const STATUS_DECLINE = 2;
const STATUS_USER_CANCEL = 3;


export default class ItemScheduleManager extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount = () => {
    console.log("nvTien - ScheduleComponent componentWillMount");
  };

  componentDidMount = () => {
    console.log("nvTien - ScheduleComponent componentDidMount");
  };

  loadDate(duration) {
    let dataDate = convertMillisecondToDate(Number.parseInt(duration));
    console.log('nvTien - Convert date: ' + dataDate + " duration: " + duration);
    return dataDate;
  }

  loadTime(duration) {
    let dataTime = convertMilliToTime(Number.parseInt(duration));
    return dataTime;
  }

  loadTypeCall(typecall) {
      let result = DefineKey.Schedule_manager_title_video_call;
      if(typecall == TYPE_VIDEO_CALL) {
        result = DefineKey.Schedule_manager_title_video_call;
      } else if (typecall == TYPE_VOICE_CALL) {
        result = DefineKey.Schedule_manager_title_voice_call;
      }
      return result;
  }
  //hiển thị trạng thái của lịch hẹn
  loadStatusAppoint(status) {
    let result = DefineKey.Schedule_manager_confirm_pending;
    if (status == STATUS_PENDING) {
        result = DefineKey.Schedule_manager_confirm_pending;
    } else if (status == STATUS_ACCEPT) {
        result = DefineKey.Schedule_manager_confirm_accepted;
    } else if (status == STATUS_DECLINE) {
        result = DefineKey.Schedule_manager_confirm_decline;
    }
    return result;
  }
  //kiểm tra nếu status = 3, tức user đã huỷ cuộc hẹn đó, thì không hiển thị dữ liệu
  hideItemView(status) {
    return (status == STATUS_USER_CANCEL);
  }


  styleLayoutConfirm(status) {
      let result = styles.layout_confirm_accepted;
    if (status == STATUS_PENDING) {
        result = styles.layout_confirm_pending;
    } else if (status == STATUS_ACCEPT) {
        result = styles.layout_confirm_accepted;
    } else if (status == STATUS_DECLINE) {
        result = styles.layout_confirm_decline;
    }
    return result;
  }

  styleTextConfirm(status) {
    let result = styles.text_confirm_accepted;
    if (status == STATUS_PENDING) {
        result = styles.text_confirm_pending;
    } else if (status == STATUS_ACCEPT) {
        result = styles.text_confirm_accepted;
    } else if (status == STATUS_DECLINE) {
        result = styles.text_confirm_decline;
    }
    return result;
   }

   loadDataDisease(idDisease) {
     let result = "";
     for(let i = 0 ; i < arrDiseases.length ; i++) {
       let objectDisease = arrDiseases[i];
       if(idDisease == objectDisease.id) {
        result = objectDisease.name;
        break;
       }
     }
     return result;
   }

  onclickInfoDoctor(item) {

  }
  //delete appointment for pending
  onclickDelConfirm(item) {
    this.props.showDialogConfirm(item);
  }

  render() {
    return (
      <View style={this.hideItemView(this.props.item.dataAppoint.status) ? styles.hide_view : styles.container}>
        {/* define layout content */}
        <View style={styles.layout_wrap_content}>
          <View style={styles.layout_wrap_left}>
            <TouchableOpacity onPress ={() => {
                this.onclickInfoDoctor(this.props.item);
            }}>
            <Image
              style={styles.img_left}
              source={require("../../../assets/icon_app.png")}
            />
            </TouchableOpacity>
          </View>
          <View style={styles.layout_wrap_right}>
          <TouchableOpacity onPress ={() => {
                this.onclickInfoDoctor(this.props.item);
            }}>
            <Text style={styles.text_info_name}>{Translate(DefineKey.Schedule_manager_text_doctor)} {this.props.item.dataDoctor.name}</Text>
            </TouchableOpacity>
            <Text style={styles.text_info_education}>
               {this.props.item.dataDoctor.education} , {Translate(DefineKey.Schedule_manager_text_speciality)} Tai-mũi-họng
            </Text>

            {/* layout date and time appointment */}
            <View style={styles.layout_wrap_date}>
            <View style={styles.layout_time}>
                <Image
                  style={styles.img_appoint_time}
                  source={require("../../../assets/icon_time_blue.png")}
                />
                <Text style={styles.txt_appoint_time}>{this.loadTime(this.props.item.dataAppoint.hours)}</Text>
              </View>
              <View style={styles.layout_date}>
                <Image
                  style={styles.img_appoint_date}
                  source={require("../../../assets/icon_date_blue.png")}
                />
                <Text style={styles.txt_appoint_date}>{this.loadDate(this.props.item.dataAppoint.date)}</Text>
              </View>
            </View>
            {/* layout description appointment */}
            <View style = {styles.layout_wrap_description}>
                <Text style = {styles.text_type_call}>{Translate(DefineKey.Schedule_manager_text_select_examination)}  {Translate(this.loadTypeCall(this.props.item.dataAppoint.service_type))}</Text>
                <Text style = {styles.text_disease}>{Translate(DefineKey.Schedule_manager_text_selected_disease)} {this.loadDataDisease(this.props.item.dataAppoint.disease_id)}</Text>
            </View>

          </View>
            {/* layout waiting confirm from doctor */}
            <View style ={this.styleLayoutConfirm(this.props.item.dataAppoint.status)}>
                <Text style ={this.styleTextConfirm(this.props.item.dataAppoint.status)}>{Translate(this.loadStatusAppoint(this.props.item.dataAppoint.status))}</Text>
            </View>
            <TouchableOpacity style={this.props.item.dataAppoint.status == STATUS_PENDING ? styles.layout_delete_appoint : styles.hide_view} onPress ={() => {
                this.onclickDelConfirm(this.props.item);
            }}>
            <Image style={styles.icon_delete_appoint}
                  source={require("../../../assets/icon_del.png")}/>
            </TouchableOpacity>      
        </View>
        <View style={styles.view_line} />
      </View>
    );
  }
}

var arrDiseases = [
  { id: 1, name: "Đái tháo đường", status: false },
  { id: 2, name: "Suy tuyến giáp", status: false },
  { id: 3, name: "Suy tuyến yên", status: false },
  { id: 4, name: "Suy tim", status: false },
  { id: 5, name: "Bệnh thiếu máu cục bộ suy tim", status: false },
  {
    id: 6,
    name: "Bệnh tim (có can thiệp, sau phẫu thuật van tim, đặt máy tạo nhịp)",
    status: false
  },
  { id: 7, name: "Bệnh phổi tắc nghẽn mạn tính", status: false },
  { id: 8, name: "Thiếu máu bất sản tủy", status: false },
  { id: 9, name: "Bệnh tan máu bẩm sinh (Thalassemia)", status: false },
  { id: 10, name: "Xuất huyết giảm tiểu cầu miễn dịch", status: false },
  { id: 11, name: "Đái huyết sắc tố kịch phát ban đêm", status: false }
];
