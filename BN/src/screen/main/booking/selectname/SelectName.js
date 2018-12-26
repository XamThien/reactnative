import React, { Component } from "react";
import { Text, View, TouchableOpacity, Image, FlatList } from "react-native";
import styles from "./SelectNameStyle";
import { Translate } from "../../../../utils/Language";
import DefineKey from "../../../../config/language/DefineKey";
import ItemName from "./ItemName";
import Modal from "react-native-modalbox";
import Constant from "../../../../commons/Constants";
import DialogLoading from "../../../../components/DialogLoading";
import WarningDialog from "../../../../components/WarningDialog";

export default class AppointName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      warningdialogvisible: false,
      dataMember: [],
      errTitle: "",
      errContent: ""
    };
    this.onOpenDialogWarning = this.onOpenDialogWarning.bind(this);
    this.onWarningOk = this.onWarningOk.bind(this);
  }

  componentDidMount = () => {};

  componentWillReceiveProps(props) {
    let dataUsers = props.dataNames;
    let newUser = props.dataNewMember;
    if (dataUsers == undefined || dataUsers.length == 0) {
      this.setState({ dataMember: dataUsers });
    }
    let userProfile = this.formatDataProfile(props.userProfile);
    let outPut = this.addUserIntoList(dataUsers, userProfile);
    let dataNewUsers = this.addUserIntoList(outPut, newUser);
    this.setState({ dataMember: dataNewUsers });
  }

  onOpenDialogWarning(errTitle, errContent) {
    this.setState({
      warningdialogvisible: true,
      errTitle: errTitle,
      errContent: errContent
    });
    // this.refs.dialogWarning.showModal();
  }
  onWarningOk() {
    this.setState({ warningdialogvisible: false });
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
  //thêm thành viên mới tạo vào danh sách gia đình
  addUserIntoList(dataUsers, newUser) {
    if (newUser != null && newUser.user_id != null && newUser.user_id !== "") {
      if (!this.isExistedUser(dataUsers, newUser)) {
        // this.setState({dataMember: []})
        dataUsers.unshift(newUser);
      }
    }
    return dataUsers;
  }
  //kiểm tra thành viên đã được thêm vào trước đó hay chưa
  isExistedUser(dataUsers, newUser) {
    var result = false;
    for (let i = 0; i < dataUsers.length; i++) {
      if (dataUsers[i].id == newUser.user_id) {
        result = true;
        break;
      }
    }
    return result;
  }
  //đẩy dữ liệu tên thành viên và id về cho màn hình booking xử lí dữ liệu
  onclickItem(itemID, userName) {
    this.props.onClickItem(itemID, userName);
    this.dismissDialogSelectName();
  }
  //hiển thị dialog danh sách thành viên, từ màn hìn booking
  showSelectNameModal(userId, userName) {
    this.props.onFetchAllDataNames(userId);
    this.refs.myModal.open();
  }

  //dissmiss dialog danh sách thành viên
  dismissDialogSelectName() {
    this.refs.myModal.close();
  }
  //mở dialog thêm mới thành viên gia đình
  onPressShowAddNewMember() {
    this.props.onOpenAddNew();
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
        {/* hiển thị danh sách thành viên gia đình thời điểm hiện tại */}
        <View style={styles.layoutFlatlist}>
          <FlatList
            style={styles.flatlist}
            data={this.state.dataMember}
            extraData={this.state}
            renderItem={({ item, index }) => {
              return (
                <ItemName
                  key={index}
                  item={item}
                  index={index}
                  parentFlatList={this}
                  onclickItem={this.onclickItem.bind(this)}
                />
              );
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <View style={styles.viewLine} />

        {/* hiển thị nút mở sang màn hình tạo thành viên mới*/}
        <View style={styles.layoutButtonAdd}>
          <TouchableOpacity
            style={styles.layoutButtonAdd}
            onPress={() => this.onPressShowAddNewMember()}
          >
            <View style={styles.avataContainer}>
              <Image
                style={styles.avata}
                source={require("../../../../../assets/icon_add.png")}
              />
            </View>
            <Text style={styles.txtName}>
              {Translate(DefineKey.Select_name_text_add)}
            </Text>
          </TouchableOpacity>
          <DialogLoading loading={this.props.showLoading} />
          <WarningDialog
            titleDialog={this.state.errTitle}
            contentDialog={this.state.errContent}
            onOk={this.onWarningOk.bind()}
            textOk={Translate(DefineKey.DialogWarning_text_ok)}
            visible={this.state.warningdialogvisible}
          />
        </View>
      </Modal>
    );
  }
}
