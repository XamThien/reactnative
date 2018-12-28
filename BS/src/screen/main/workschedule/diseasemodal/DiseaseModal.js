import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
  ScrollView
} from "react-native";
import styles from "./DiseaseModalStyle";
import { Translate } from "../../../../utils/Language";
import DefineKey from "../../../../config/language/DefineKey";
import Constant from "../../../../commons/Constants";
import Colors from "../../../../commons/Colors";
import ItemDisease from "./ItemDisease";
import Modal from "react-native-modalbox";

export default class DiseaseModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowModal: this.props.showModal,
      dataDiseases: [],
    };
  }

  componentDidMount = () => {
    this.setState({dataDiseases : dataDiseases})
  };
  //xử lí hiện dialog chọn bệnh
  showSelectConsultantModal(dataSelecteds) {
    this.setState({dataSelected: dataSelecteds});
    console.log(`nvTien - showSelectConsultantModal = ${JSON.stringify(this.state.dataSelected)}`)
    this.refs.myModal.open();
  }
  //xử lí ẩn dialog chọn bệnh
  dismissDialogConsultantName() {
    this.refs.myModal.close();
  }

  //xử lí click chọn bệnh, huỷ chọn bệnh
  onItemCheck(dId, checked) {
    var dataDiseases = this.state.dataDiseases;
    for(let i = 0; i < dataDiseases.length; i++) {
       var objectDisease = dataDiseases[i];
       if(dId == objectDisease.id) {
          objectDisease = {...objectDisease, status: checked};
          dataDiseases[i] = objectDisease;
          break;
       }
    }
    this.setState({dataDiseases: dataDiseases});

  }

  getDataSelected() {
    var dataSelected = [];
    let dataDiseases = this.state.dataDiseases;
    for(let i = 0 ; i < dataDiseases.length ; i ++) {
        let object = dataDiseases[i];
        if(object.status) {
          dataSelected.push(object);
        }
    }
    return dataSelected;
  }

  //đóng màn hình chọn bệnh
  onCloseModal() {
    let dataDiseases = this.getDataSelected();
    this.props.onUpdateDataSelected(dataDiseases);
    this.dismissDialogConsultantName();
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
        <View style={styles.container}>
          <View style={styles.layout_top}>
            <View style={styles.layout_header}>
              <TouchableOpacity
                onPress={() => {
                  this.onCloseModal();
                }}
              >
                <Image
                  source={require("../../../../../assets/icon_delete_black.png")}
                  style={styles.image_header_delete}
                />
              </TouchableOpacity>
              <View style={styles.layout_head_title}>
                <Text style={styles.text_title}> {Translate(DefineKey.Disease_modal_title_list)}</Text>
              </View>
              
            </View>
          </View>
          <View style={styles.viewLine} />
          <FlatList
            style={styles.flatlist}
            data={this.state.dataDiseases}
            renderItem={({ item, index }) => {
              return (
                <ItemDisease
                  key={index}
                  dataSelected= {this.state.dataSelected}
                  item={item}
                  index={index}
                  parentFlatList={this}
                  onItemCheck={this.onItemCheck.bind(this)}
                />
              );
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </Modal>
    );
  }
}

var dataDiseases = [
  { id: 1, name: "Đái tháo đường", status: false },
  { id: 2, name: "Suy tuyến giáp", status: false },
  { id: 3, name: "Suy tuyến yên", status: false },
  { id: 4, name: "Suy tim", status: false },
  { id: 5, name: "Bệnh thiếu máu cục bộ suy tim", status: false },
  {id: 6,name: "Bệnh tim (có can thiệp, sau phẫu thuật van tim, đặt máy tạo nhịp)",status: false},
  { id: 7, name: "Bệnh phổi tắc nghẽn mạn tính", status: false },
  { id: 8, name: "Thiếu máu bất sản tủy", status: false },
  { id: 9, name: "Bệnh tan máu bẩm sinh (Thalassemia)", status: false },
  { id: 10, name: "Xuất huyết giảm tiểu cầu miễn dịch", status: false },
  { id: 11, name: "Đái huyết sắc tố kịch phát ban đêm", status: false }
];
