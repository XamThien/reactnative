import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView
} from "react-native";
import styles from "./familyManagerStyle";
import { Translate } from "../../../utils/Language";
import { AsyncStorage } from "react-native";
import DefineKey from "../../../config/language/DefineKey";
import Constants from "../../../commons/Constants";
import FamilyCardView from "../../../components/FamilyCardView";
import Modal from "react-native-modalbox";
import Constant from "../../../commons/Constants";
import DialogLoading from "../../../components/DialogLoading";
import WarningDialog from "../../../components/WarningDialog";
import ConfirmDialog from "../../../components/ConfirmDialog";

import AddNewMemberContainer from "../../../containers/AddNewMemberContainer";
import ScreenName from "../../../commons/ScreenName";

export default class FamilyManagerScr extends Component {
  constructor(props) {
    super(props);
    this.state = {
      warningdialogvisible: false,
      confirmdialogvisible: false,
      dataMember: [],
      errTitle: "",
      errContent: "",
      newMember: "",
      userID: ""
    };
    this.onOpenDialogWarning = this.onOpenDialogWarning.bind(this);
    this._onPressShowAddNewMemberModal = this._onPressShowAddNewMemberModal.bind(
      this
    );
    // this._onPressEdit = this._onPressEdit.bind(this);
    this._onPressDelete = this._onPressDelete.bind(this);
    this.onWarningOk = this.onWarningOk.bind(this);
    this.onCancelConfirm = this.onCancelConfirm.bind(this);
    this.onDeleteConfirm = this.onDeleteConfirm.bind(this);
  }

  componentDidMount = () => {
    AsyncStorage.getItem(Constants.KEY_USER_ID).then(userId =>
      this.initComponent(userId)
    );
    // alert(userId);
    // this.showListMember(userId);
  };
  initComponent(userId) {
    this.showListMember(userId);
    this.setState({ userID: userId });
  }
  _onPressShowAddNewMemberModal() {
    let userId = this.state.userID;
    this.refs.addNewMemberModal
      .getWrappedInstance()
      .showAddNewMemberModal(userId);
  }
  _onPressEdit(item) {
    this.props.navigation.navigate(ScreenName.Screen_EditFamilyMember, {
      member: item
    });
  }
  _onPressDelete(userID) {
    this.onOpenDialogConfirm(userID);
  }
  componentWillReceiveProps(props) {
    let dataUsers = props.dataNames;
    this.setState({ dataMember: dataUsers });
    let newUser = props.dataNewMember;

    let dataNewUsers = this.addUserIntoList(dataUsers, newUser);
    this.setState({ dataMember: dataNewUsers });

    // if (dataUsers == undefined || dataUsers.length == 0) {
    //   this.setState({ dataMember: dataUsers });
    // }
    // this.setState({ dataMember: dataUsers });
    let userProfile = this.formatDataProfile(props.userProfile);
    // let outPut = this.addUserIntoList(dataUsers, userProfile);

    let hasErrorDelete = props.hasErrorDelete;
    let lastErrorDelete = props.lastErrorDelete;
    let messageSuccessDelete = props.messageSuccessDelete;
    if (!hasErrorDelete && lastErrorDelete === "") {
      let dialogTitle = Translate(DefineKey.DialogWarning_text_title);
      if (
        props.showLoadingDelete === undefined ||
        props.showLoadingDelete === null
      ) {
        this.onOpenDialogWarning(dialogTitle, messageSuccessDelete);
      }
    } else {
      if (lastErrorDelete != null && lastErrorDelete !== "") {
        let errTitle = Translate(DefineKey.DialogWarning_text_title);
        if (
          props.showLoadingDelete === undefined ||
          props.showLoadingDelete === null
        ) {
          this.onOpenDialogWarning(errTitle, lastErrorDelete);
        }
      }
    }
  }

  onOpenDialogWarning(errTitle, errContent) {
    this.setState({
      warningdialogvisible: true,
      errTitle: errTitle,
      errContent: errContent
    });
  }
  onWarningOk() {
    this.setState({ warningdialogvisible: false });
  }
  onOpenDialogConfirm(userID) {
    this.setState({ confirmdialogvisible: true });
    this.refs.dialogConfirm.showModal(userID);
  }
  onCancelConfirm(userID) {
    this.setState({ confirmdialogvisible: false });
  }
  onDeleteConfirm(userID) {
    this.setState({ confirmdialogvisible: false });
    this.props.onDeleteMember(userID);
    this.componentDidMount();
  }

  formatDataProfile(userProfile) {
    if (
      userProfile != null &&
      userProfile.id != null &&
      userProfile.id !== ""
    ) {
      let formatData = {
        email: userProfile.email,
        phone: userProfile.phoneNumber,
        password: userProfile.password,
        full_name: userProfile.userName,
        image: userProfile.image,
        id: userProfile.id,
        parentId: userProfile.id
      };
      return formatData;
    }
    return userProfile;
  }

  addUserIntoList(dataUsers, newUser) {
    if (newUser != null && newUser.id != null && newUser.id !== "") {
      if (!this.isExistedUser(dataUsers, newUser)) {
        this.setState({ dataMember: [] });
        dataUsers.unshift(newUser);
      }
    }
    return dataUsers;
  }

  isExistedUser(dataUsers, newUser) {
    var result = false;
    for (let i = 0; i < dataUsers.length; i++) {
      if (dataUsers[i].id == newUser.id) {
        result = true;
        break;
      }
    }
    return result;
  }

  onclickItem(itemID, userName) {
    this.props.onClickItem(itemID, userName);
    // this.dismissDialogSelectName();
  }

  showListMember(userId) {
    this.props.onFetchAllDataNames(userId);
    // this.refs.myModal.open();
  }

  dismissDialogSelectName() {
    this.refs.myModal.close();
  }

  //   onShowDialogAddNewMember() {
  //     this.props.onOpenAddNew();
  //   }

  render() {
    return (
      //   <Modal
      //     style={styles.wrapContent}
      //     position="center"
      //     backdrop={true}
      //     backdropOpacity={0.5}
      //     onClosed={() => console.log("close modal")}
      //     ref={"myModal"}
      //   >

      //     <View style={styles.layoutFlatlist}>
      //       <FlatList
      //         style={styles.flatlist}
      //         data={this.state.dataMember}
      //         extraData={this.state}
      //         renderItem={({ item, index }) => {
      //           return (
      //             <FamilyCardView
      //               key={index}
      //               item={item}
      //               index={index}
      //               parentFlatList={this}
      //               onclickItem={this.onclickItem.bind(this)}
      //             />
      //           );
      //         }}
      //         keyExtractor = { (item, index) => index.toString() }
      //       />
      //     </View>
      //     <View style={styles.viewLine} />

      //     {/* layout button add */}
      //     <View style={styles.layoutButtonAdd}>
      //       <TouchableOpacity
      //         style={styles.layoutButtonAdd}
      //         onPress={() => this.onShowDialogAddNewMember()}
      //       >
      //         <View style={styles.avataContainer}>
      //           <Image
      //             style={styles.avata}
      //             source={require("../../../assets/icon_add.png")}
      //           />
      //         </View>
      //         <Text style={styles.txtName}>{Translate(DefineKey.AppointNameModal_text_add)}</Text>
      //       </TouchableOpacity>
      //         <DialogLoading loading={this.props.showLoading}/>

      //         <WarningDialog
      //           titleDialog={this.state.errTitle}
      //           contentDialog={this.state.errContent}
      //           onOk={this.onWarningOk.bind()}
      //           textOk={Translate(DefineKey.DialogWarning_text_ok)}
      //           visible={this.state.warningdialogvisible}
      //         />
      //     </View>
      //   </Modal>

      <ScrollView>
        <View style={styles.container}>
          {this.state.dataMember.map((item, index) => (
            <FamilyCardView
              key={index}
              item={item}
              index={index}
              parentFlatList={this}
              // onclickItem={this.onclickItem.bind(this)}
              onEdit={this._onPressEdit.bind(this)}
              onDelete={this._onPressDelete.bind(this)}
            />
          ))}
          <TouchableOpacity
            style={styles.layoutButtonAdd}
            onPress={() => this._onPressShowAddNewMemberModal()}
          >
            <View style={styles.avataContainer}>
              <Image
                style={styles.avata}
                source={require("../../../../assets/icon_add.png")}
              />
            </View>
            <Text style={styles.txtName}>
              {Translate(DefineKey.AppointNameModal_text_add)}
            </Text>
          </TouchableOpacity>
        </View>
        <DialogLoading
          loading={this.props.showLoadingDelete || this.props.showLoading}
        />
        <AddNewMemberContainer ref={"addNewMemberModal"} />
        <WarningDialog
          titleDialog={this.state.errTitle}
          contentDialog={this.state.errContent}
          onOk={this.onWarningOk.bind()}
          textOk={Translate(DefineKey.DialogWarning_text_ok)}
          visible={this.state.warningdialogvisible}
        />

        <ConfirmDialog
          ref={"dialogConfirm"}
          titleDialog={"Xac nhan xoa:"}
          contentDialog={"Ban co muon xoa khong?"}
          onCancel={this.onCancelConfirm.bind()}
          textCancel={Translate(DefineKey.DialogWarning_text_cancel)}
          onOk={this.onDeleteConfirm.bind()}
          textOk={Translate(DefineKey.DialogWarning_text_ok)}
          visible={this.state.confirmdialogvisible}
        />
      </ScrollView>
    );
  }
}
