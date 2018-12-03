import React, { Component } from "react";
import {
  View,
  FlatList,
} from "react-native";


import styles from "./ConsultantModalStyle";
import ConsultantItem from "./ConsultantItem";
import Modal from "react-native-modalbox";


export default class ConsultantModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
       isShowModal : this.props.showModal,
       dataConsultant: []
    };
  }

  componentDidMount = () => {

  };

  onClickItem =(typeId, typeName) => {
    this.props.onClickItem(typeId, this.state.dataConsultant);
    this.props.setDataConsultantType(typeName, typeId);
    this.dismissDialogConsultantName();
  }

  showSelectConsultantModal(consultantType) {
   this.loadDataConsultant(consultantType);
   this.refs.myModal.open();
  }


  loadDataConsultant(consultantType) {
      if (consultantType != null && consultantType.length != 0) {
          var arrConsultant = [];
          for (let i = 0 ; i < consultantType.length; i++) {
              let consultant = consultantType[i];
              let object = {
                      id: consultant.disease_id,
                      name: consultant.disease_name,
                      selected: false,
                  }
               arrConsultant.push(object);
          }

          this.setState({dataConsultant: arrConsultant});
      } else {
        console.log("nvTien - loadDataConsultant data empty...");
        this.setState({dataConsultant: []});
      }
  }

  dismissDialogConsultantName() {
    this.refs.myModal.close();
  }

  render() {
    return (
      <Modal
        style={styles.wrapContent}
        position="center"
        backdrop={true}
        backdropOpacity={0.5}
        onClosed={() => console.log("close modal")}
        ref={"myModal"}
      >
        <View style={styles.layoutFlatlist}>
          <FlatList
            style={styles.flatlist}
            data={this.state.dataConsultant}
            renderItem={({ item, index }) => {
              return (
                <ConsultantItem
                  key={index}
                  item={item}
                  index={index}
                  parentFlatList={this}
                  onclickItem={this.onClickItem.bind(this)}
                />
              );
            }}
            keyExtractor = { (item, index) => index.toString() }
          />
        </View>
        <View style={styles.viewLine} />
      </Modal>
    );
  }
}
