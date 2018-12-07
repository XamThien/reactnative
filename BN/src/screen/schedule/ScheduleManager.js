import React, { Component } from "react";
import {
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  FlatList
} from "react-native";
import { SafeAreaView } from "react-navigation";
import styles from "./ScheduleManagerStyle";
import HeaderComponent from "../main/HeaderComponent";
import ItemScheduleManager from "./ItemScheduleManager";
// import DialogConfirm from "../../components/DialogConfirm";
import ConfirmDialog from '../../components/ConfirmDialog';
import DialogLoading from "../../components/DialogLoading";
import { Translate } from "../../utils/Language";
import DefineKey from "../../config/language/DefineKey";

export default class ScheduleManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmdialogvisible: false,
      confirmTitle: "",
      confirmContent: "",
      itemDelete: {},
      dataAppoint: [],
      isShowLoading: false
    };
    this.onclickItem = this.onclickItem.bind(this);
    this.showDialogConfirm = this.showDialogConfirm.bind(this);
    this.handleDeleteAppoint = this.handleDeleteAppoint.bind(this);
    this.onCancelDialogConfirm = this.onCancelDialogConfirm.bind(this);
  }

  componentWillMount = () => {
    console.log("nvTien - ScheduleManager componentWillMount");
  };

  componentDidMount = () => {
    console.log("nvTien - ScheduleManager componentDidMount");
    this.props.doGetListDataAppoint();
  };

  componentWillReceiveProps(props) {
    let dataAppointSchedule = props.dataAppointSchedule;
    if(dataAppointSchedule != null && dataAppointSchedule.length != 0) {
      console.log(`nvTien - ScheduleManager componentWillReceiveProps data... ${JSON.stringify(dataAppointSchedule)}`);
        this.onLoadDataToView(dataAppointSchedule);
        
    }
    
  }

  onLoadDataToView(dataAppointSchedule) {
    this.setState({dataAppoint: dataAppointSchedule});

  }

  onclickItem() {

  }

  showDialogConfirm(item) {
   
    let confirmTitle =  Translate(DefineKey.Dialog_title_warning);
    let confirmContent =  Translate(DefineKey.Schedule_manager_confirm_dialog);  
    this.onOpenDialogConfirm(confirmTitle, confirmContent, -1);
    this.setState({itemDelete: item});
  }

  onOpenDialogConfirm(confirmTitle, confirmContent, typeConfirm) {
    this.setState({confirmdialogvisible: false, confirmTitle: confirmTitle, confirmContent: confirmContent});
    this.refs.dialogConfirm.showModal(typeConfirm);
  }
  onCancelDialogConfirm(){
    this.setState({ confirmdialogvisible: false });
  }
  handleDeleteAppoint() {
    this.setState({ confirmdialogvisible: false });
  }


  render() {
    console.log("nvTien - ScheduleComponent render()");
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <View style={styles.layoutWrapContent}>
            <HeaderComponent
              {...this.props}
              title={Translate(DefineKey.Schedule_manager_title)}
            />
            {/* define layout content */}
            <FlatList
              data={this.state.dataAppoint}
              renderItem={({ item, index }) => {
                return (
                  <ItemScheduleManager
                    key={item.id}
                    item={item}
                    index={index}
                    parentFlatList={this}
                    showDialogConfirm={this.showDialogConfirm.bind()}
                    onclick={this.onclickItem.bind()}
                  />
                );
              }}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
          {/* <DialogLoading loading={this.props.isShowLoading}/> */}
          {/* <DialogConfirm ref={"dialogConfirm"} title={this.state.confirmTitle}
                 content={this.state.confirmContent} handleDeleteAppoint = {this.handleDeleteAppoint.bind()}/> */}
          <ConfirmDialog ref={"dialogConfirm"}
            titleDialog={this.state.confirmTitle}
            contentDialog={this.state.confirmContent} 
            onCancel={this.onCancelDialogConfirm.bind()}
            textCancel={Translate(DefineKey.DialogWarning_text_cancel)}
            onOk={this.handleDeleteAppoint.bind()}
            textOk={Translate(DefineKey.DialogWarning_text_ok)}
            visible={this.state.confirmdialogvisible}
        />      
       
        </View>
      </SafeAreaView>
    );
  }
}

// var dataAppoint = [
//   {id: 1, name: 'Nguyen Van A', education: 'Tiến sĩ',speciality: 'Tai-mũi-họng',  date: '1541696400000', time: '29400000'
//   , disease: 'Thận', call_type: 0, status: 0}, 
//   {id: 2, name: 'Nguyen Van B', education: 'Tiến sĩ' ,speciality: 'Tâm thần, Tâm lý', date: '1541696400000', time: '29400000'
//   , disease: 'Tiết niệu', call_type: 1, status: 1},
//   {id: 3, name: 'Nguyen Van C', education: 'Tiến sĩ',speciality: 'Sản phụ khoa, Nam khoa', date: '1541696400000', time: '29400000'
//   , disease: 'Dạ dày', call_type: 1, status: 1}, 
//   {id: 4, name: 'Nguyen Van D', education: 'Tiến sĩ',speciality: 'Hồi sức, Cấp cứu', date: '1541696400000', time: '29400000'
//   , disease: 'Gan', call_type: 0, status: 2}];
