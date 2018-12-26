import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView
} from "react-native";
import styles from "./FamilyManagerStyle";
import { Translate } from "../../../utils/Language";
import { AsyncStorage } from "react-native";
import DefineKey from "../../../config/language/DefineKey";
import Constants from "../../../commons/Constants";
import FamilyCardView from "../../../components/FamilyCardView";
import DialogLoading from "../../../components/DialogLoading";
import WarningDialog from "../../../components/WarningDialog";
import ConfirmDialog from "../../../components/ConfirmDialog";

import AddMemberFamilyContainer from "../../../containers/AddMemberFamilyContainer";
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
    this.onPressShowAddMemberFamily = this.onPressShowAddMemberFamily.bind(this);
    this._onPressDelete = this._onPressDelete.bind(this);
    this.onWarningOk = this.onWarningOk.bind(this);
    this.onCancelConfirm = this.onCancelConfirm.bind(this);
    this.onDeleteConfirm = this.onDeleteConfirm.bind(this);
  }

  componentDidMount = () => {
    AsyncStorage.getItem(Constants.KEY_USER_ID).then(userId =>
      this.initComponent(userId)
    );
  };

  // init data
  initComponent(userId) {
    this.showListMember(userId);
    this.setState({ userID: userId });
  }

  // function open modal: add new member
  onPressShowAddMemberFamily() {
    let userId = this.state.userID;
    this.refs.addNewMemberModal
      .getWrappedInstance()
      .showAddNewFamilyModal(userId);
  }

  // redirect to update family info screen
  _onPressEdit(item) {
    this.props.navigation.navigate(ScreenName.Screen_EditFamilyMember, {
      member: item
    });
  }

  // function show confirm delete member dialog
  _onPressDelete(userID) {
    this.onOpenDialogConfirm(userID);
  }
  componentWillReceiveProps(props) {
    let dataUsers = props.dataNames;
    this.setState({ dataMember: dataUsers });

    let userProfile = this.formatDataProfile(props.userProfile);
    let outPut = this.addUserIntoList(dataUsers, userProfile);
    this.setState({ dataMember: outPut });

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

  // function display warning dialog
  onOpenDialogWarning(errTitle, errContent) {
    this.setState({
      warningdialogvisible: true,
      errTitle: errTitle,
      errContent: errContent
    });
  }

  // function close dialog warning
  onWarningOk() {
    this.setState({ warningdialogvisible: false });
  }

  // function open confirm dialog 
  onOpenDialogConfirm(userID) {
    this.setState({ confirmdialogvisible: true });
    this.refs.dialogConfirm.showModal(userID);
  }

  // button cancel on confirm dialog
  onCancelConfirm(userID) {
    this.setState({ confirmdialogvisible: false });
  }

  // button ok on confirm dialog
  onDeleteConfirm(userID) {
    this.setState({ confirmdialogvisible: false });
    this.props.onDeleteMember(userID);
    this.componentDidMount();
  }


  // structure profile data
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
        user_id: userProfile.id,
        parentId: userProfile.id
      };
      return formatData;
    }
    return userProfile;
  }

  // function new member to list member
  addUserIntoList(dataUsers, newUser) {
    if (newUser != null && newUser.user_id != null && newUser.user_id !== "") {
      if (!this.isExistedUser(dataUsers, newUser)) {
        // this.setState({ dataMember: [] });
        dataUsers.unshift(newUser);
      }
    }
    return dataUsers;
  }

  isExistedUser(dataUsers, newUser) {
    var result = false;
    for (let i = 0; i < dataUsers.length; i++) {
      if (dataUsers[i].user_id == newUser.user_id) {
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

  render() {
    return (
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
              {Translate(DefineKey.Select_name_text_add)}
            </Text>
          </TouchableOpacity>
        </View>
        <DialogLoading
          loading={this.props.showLoadingDelete || this.props.showLoading}
        />
        <AddMemberFamilyContainer ref={"addNewMemberModal"} />
        <WarningDialog
          titleDialog={this.state.errTitle}
          contentDialog={this.state.errContent}
          onOk={this.onWarningOk.bind()}
          textOk={Translate(DefineKey.DialogWarning_text_ok)}
          visible={this.state.warningdialogvisible}
        />

        <ConfirmDialog
          ref={"dialogConfirm"}
          titleDialog={Translate(DefineKey.Family_Manager_Delete_Member_Title)}
          contentDialog={Translate(DefineKey.Family_Manager_Delete_Member_Content)}
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
