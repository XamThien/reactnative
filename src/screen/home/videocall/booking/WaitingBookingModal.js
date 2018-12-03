import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Text
} from "react-native";

import styles from "./WaitingBookingStyle";
import Modal from "react-native-modalbox";

import {Translate} from "../../../../utils/Language"
import DefineKey from "../../../../config/language/DefineKey";


export default class ConsultantModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
       isShowModal : this.props.showModal,
      
    };
  }

  componentDidMount = () => {

  };

  showSelectConsultantModal(consultantType) {

   this.refs.myModal.open();
  }

  dismissDialogConsultantName() {
    this.refs.myModal.close();
  }

  _onPressDeclineExamination() {

  }

  _onPressAcceptExamination() {

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
        <View style = {styles.layout_content}>
            
        </View>
        {/*Define layout button*/}
        <View style={styles.layoutButton}>
          <TouchableOpacity style={styles.btnFindDoctorDefault} onPress={() =>{
              this._onPressDeclineExamination()
              }}>
            <Text style={styles.textButton}>{Translate(DefineKey.Videocall_Booking_button_comfirm)}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnFindDoctorDefault} onPress={() => this._onPressAcceptExamination()}>
            <Text style={styles.textButton}>{Translate(DefineKey.Videocall_Booking_button_cancel)}</Text>
          </TouchableOpacity>
        </View>
        
      </View>
      //   </Modal>
    );
}
}
