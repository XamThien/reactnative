import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  TouchableHighlight,
  Button
} from "react-native";
import styles from "./userManagerStyle";
import { Translate } from "../../../utils/Language";
import { AsyncStorage } from "react-native";
import DefineKey from "../../../config/language/DefineKey";
import Constants from "../../../commons/Constants";
import Constant from "../../../commons/Constants";
import DialogLoading from "../../../components/DialogLoading";
import WarningDialog from "../../../components/WarningDialog";

import EditUserInfoContainer from "../../../containers/EditUserInfoContainer";
import ScreenName from "../../../commons/ScreenName";

export default class UserManagerScr extends Component {
  constructor(props) {
    super(props);
    this.state = {
      warningdialogvisible: false,
      confirmdialogvisible: false,
      dataMember: [],
      errTitle: "",
      errContent: "",
      user_profile: {}
    };
    this._onPressShowFormEdit = this._onPressShowFormEdit.bind(this);
  }
  getImage() {
    // const base64Icon = "data:image/png;base64," + this.props.image;
    // return this.props.image === ""
    //   ? require("../../../../assets/icon_app.png")
    //   : { uri: base64Icon };
    return require("../../../../assets/icon_app.png");
  }
  secureText(pass){
    // let len = JSON.stringify(pass).length;
    let secure = '**********';
    // for (let i = 0; i < len; i++) {
    //   secure = secure.concat('*');
    // }
    return secure;
  }
  componentDidMount(){
    AsyncStorage.getItem(Constants.KEY_STORE_USER_PROFILE).then(userInfo =>
      {
        this.setState({ user_profile: JSON.parse(userInfo) });
        // alert(userInfo);
      }
    );
  }
  _onPressShowFormEdit() {
    let userInfo = this.state.user_profile;
    this.refs.editUserInfoModal.getWrappedInstance().showFormEdit(userInfo);
  }


  componentWillReceiveProps(props) {
  }


  render() {
    return (
      <ScrollView>
        <View style={styles.container}>

          {/* layout top image */}
          <View style={styles.btn_edit}>
              <Image style={styles.icon_edit} source={require("../../../../assets/edit-btn.png")} />
              <Text style={styles.btn_edit} onPress={()=>this._onPressShowFormEdit()}>{"Sửa"}</Text>
            </View>

          <View style={styles.layoutTopIcon}>
            <View style={styles.avataContainer}>
              <Image style={styles.avata} source={this.getImage()} />
            </View>
            <View style={styles.userNameContainer}>
                  <Text style={styles.textUserName}>
                    {this.state.user_profile.userName}
                  </Text>
            </View>
            
          </View>

          {/* layout top first name */}
          <View style={styles.field_row}>
            <View style={styles.label}>
              <Text style={styles.label_text}>{Translate(DefineKey.Register_fist_name)}</Text>
            </View>
            <View style={styles.value}>
              <Text style={styles.text_value}>{this.state.user_profile.first_name}</Text>
            </View>
          </View>

          {/* layout top last name */}
          <View style={styles.field_row}>
            <View style={styles.label}>
              <Text style={styles.label_text}>{Translate(DefineKey.Register_last_name)}</Text>
            </View>
            <View style={styles.value}>
              <Text style={styles.text_value}>{this.state.user_profile.last_name}</Text>
            </View>
          </View>

          {/* layout top email */}
          <View style={styles.field_row}>
            <View style={styles.label}>
              <Text style={styles.label_text}>{Translate(DefineKey.Register_email)}</Text>
            </View>
            <View style={styles.value}>
              <Text numberOfLines={1} style={styles.text_value}>{this.state.user_profile.email}</Text>
            </View>
          </View>

          {/* layout top phone */}
          <View style={styles.field_row}>
            <View style={styles.label}>
              <Text style={styles.label_text}>{Translate(DefineKey.Register_phone)}</Text>
            </View>
            <View style={styles.value}>
              <Text style={styles.text_value}>{this.state.user_profile.phoneNumber}</Text>
            </View>
          </View>

          {/* layout top password*/}
          <View style={styles.field_row}>
            <View style={styles.label}>
              <Text style={styles.label_text}>{Translate(DefineKey.Login_password)}</Text>
            </View>
            <View style={styles.value}>
              <Text  style={styles.text_value}>{this.secureText(JSON.stringify(this.state.user_profile.password))}</Text>
            </View>
          </View>

        </View>

        <EditUserInfoContainer ref={"editUserInfoModal"}/>

      </ScrollView>
    );
  }
}
