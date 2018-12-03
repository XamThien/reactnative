import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  TouchableHighlight,
  Image,
  TextInput
} from "react-native";
import {Translate} from "../../../../utils/Language"
import DefineKey from "../../../../config/language/DefineKey";
// import DialogWarning from "../../../../components/DialogWarning";
import WarningDialog from '../../../../components/WarningDialog';
import styles from "./WaitingBookingStyle";
import Modal from "react-native-modalbox";
import Colors from "../../../../commons/Colors";


export default class ConsultantModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
       warningdialogvisible: false,
       isShowModal : this.props.showModal,
       txtComment: "",
       isShowLoading: false,
       isRequestBooking: false,
       isConfirmBooking: false,
    };
    this.onOpenDialogWarning = this.onOpenDialogWarning.bind(this);
    this.onWarningOk = this.onWarningOk.bind(this);
  }

  componentDidMount = () => {

  };

  showSelectConsultantModal(consultantType) {

   this.refs.myModal.open();
  }

  dismissDialogConsultantName() {
    this.refs.myModal.close();
  }

  _onPressCancelBooking() {

  }

  _onPressSaveRequest() {
    let comment = this.state.txtComment;
    let errTitle = Translate(DefineKey.DialogWarning_text_title);
    if(comment === "") {
      let errorContent = Translate(DefineKey.Deepcare_error_select_time);
      this.onOpenDialogWarning(errTitle, errorContent);
      return;
    }

  }

  onOpenDialogWarning(errTitle, errContent) {
      this.setState({warningdialogvisible: true, errTitle: errTitle, errContent: errContent});
      // this.refs.dialogWarning.showModal();
  }
  onWarningOk() {
      this.setState({ warningdialogvisible: false });
  }


getImage() {
  // const base64Icon = "data:image/png;base64," + this.props.image;
  // return this.props.image === ""
  // ? require("../../../../../assets/icon_app.png")
  // : {uri:base64Icon};
  return require("../../../../../assets/icon_app.png");
}

  render() {
    return ( //   <Modal
      //     style={styles.wrapContent}
      //     position="center"
      //     backdrop={true}
      //     backdropOpacity={0.5}
      //     onClosed={() => console.log("close modal")}
      //     ref={"myModal"}
      //   >
      
      <View style={styles.wrapContent}>
        <ActivityIndicator
            style = {styles.hideView}
            size="large"
            color="#0000ff"
            color={Colors.white}
            animating={false} />
            
        {/* define layout nhap mo ta ve benh can kham cho bac si styles layout_input_booking*/}
        <View style = {styles.hideView}>
          <Text style = {styles.text_description}>Mời Bạn Nhập Vào Mô Tả Bệnh</Text>
          <View style={styles.layout_wrap_description}>
          <TextInput 
            style={styles.text_title_des}
            placeholder="Nhập mô tả..." 
            placeholderTextColor={Colors.gray} 
            multiline={true} 
            numberOfLines={4} 
            editable={true} 
            maxLength={500}  
            onChangeText={text => 
            this.setState({ txtComment: text })} /> 
            </View>
          </View> 

        <View style = {styles.layout_wrap_waiting_confirm}>
              {/* layout top image */}
            <View style={styles.layoutTopIcon}>
              <TouchableHighlight style={styles.avataContainer}>
                <Image
                  style={styles.avata}
                  source={this.getImage()}
                />
              </TouchableHighlight>
              <View style={styles.userNameContainer}>
                <Text style={styles.textUserName}>Nguyễn Văn B</Text>
                <Text style={styles.textEducation}>Tiến sĩ</Text>
                <Text style={styles.textEducation}>Khoa tiêu hoá</Text>
              </View>
            </View>
            {/* layout indicator waiting confirm*/}
            <View style = {styles.layout_waiting_confirm}>           
              <ActivityIndicator
                style = {styles.indicator}
                size="large"
                color="#0000ff"
                color={Colors.white}
                animating={true} />
                <Text style={styles.textWaiting_confirm}>Đợi xác nhận của bác sĩ...</Text>
                </View>
        </View>  

        {/*Define layout button cancel search booking, send request booking*/}
        <View style={styles.hideView}>
          <TouchableOpacity style={styles.hideView} onPress={() =>{
              this._onPressCancelBooking()
              }}>
            <Text style={styles.textButton}>Huỷ tìm kiếm</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.layoutButton}>
          <TouchableOpacity style={styles.btnFindDoctorDefault} onPress={() =>{
              this._onPressSaveRequest()
              }}>
            <Text style={styles.textButton}>Gửi yêu cầu</Text>
          </TouchableOpacity>
        </View>
        {/* <DialogWarning ref={"dialogWarning"} title={this.state.errTitle}
            content={this.state.errContent}/> */}
        <WarningDialog
          titleDialog={this.state.errTitle}
          contentDialog={this.state.errContent}
          onOk={this.onWarningOk.bind()}
          textOk={Translate(DefineKey.DialogWarning_text_ok)}
          visible={this.state.warningdialogvisible}
        />     
      </View>
     
      //   </Modal>
    );
}
}
