import React, { Component } from "react";
import {
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Image
} from "react-native";
import ImagePicker from "react-native-image-picker";
import { SafeAreaView } from "react-navigation";
import styles from "./UserProfileStyle";
import { Translate } from "../../utils/Language";
import DefineKey from "../../config/language/DefineKey";
import ScreenName from "../../commons/ScreenName";
import { StackActions, NavigationActions } from "react-navigation";
import DialogLoading from "../../components/DialogLoading";
import { isEmptyObject } from "../../utils/Utils";

export default class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      image: ""
    };
  }
  //finish màn hình profile chuyển về màn hình trước đó
  onPressFinish() {
    this.props.navigation.pop();
  }

  //logout ứng dụng, chuyển về màn hình start
  onPressLogout() {
    this.props.doLogoutApp();
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: ScreenName.Screen_StartScreen })
      ]
    });
    this.props.navigation.dispatch(resetAction);
  }
  //đi đến màn hình đổi mật khẩu
  onPressChangePassword() {
    this.props.navigation.navigate(ScreenName.Screen_ChangePassword);
  }
  // đi đến màn hình cài đặt thông báo
  onPressSettingNotification() {
    this.props.navigation.navigate(ScreenName.Screen_SettingNotification);
  }
  // đi đến màn hình xem thông tin tài khoản
  onPressUserManager() {
    this.props.navigation.navigate( ScreenName.Screen_UserManager);
  }
  // đi đến màn hình quản lý thành viên gia đình
  onPressFamilyManger(){
    this.props.navigation.navigate( ScreenName.Screen_FamilyManager);
  }

  componentDidMount = () => {

  };

  componentWillReceiveProps(props) {
    this.handleResultUserProfile(props.userProfile);
  }

  //xử lí lấy tên user
  handleResultUserProfile(userProfile) {
    console.log(`Userprofile handleResultUserProfile ${JSON.stringify(userProfile)}`)
    if (userProfile != null && !isEmptyObject(userProfile)) {
      this.setState({ userName: userProfile.full_name })
    }
  }

  getImage() {
    const base64Icon = "data:image/png;base64," + this.state.image;
    return this.state.image === ""
      ? require("../../../assets/icon_app.png")
      : { uri: base64Icon };
  }

  onChangeAvata() {
    console.log("nvTien - select avata");
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <View style={styles.layoutWrapContent}>
            {/* layout hiển thị ảnh đại diện */}
            <View style={styles.layoutTopIcon}>
              <TouchableOpacity
                style={styles.avataContainer}
                onPress={() => this.onChangeAvata()}
              >
                <Image style={styles.avata} source={this.getImage()} />
              </TouchableOpacity>
              <View style={styles.userNameContainer}>
                <Text style={styles.textUserName}>{this.props.userProfile.full_name} </Text>
              </View>
            </View>

            {/* layout Item thong tin ca nhan */}
            <TouchableOpacity
              onPress={() => this.onPressUserManager() }
            >
              <View style={styles.layoutItem}>
                <Image
                  style={styles.itemImage}
                  source={require("../../../assets/icon_user.png")}
                />
                <Text style={styles.itemText}>
                  {Translate(DefineKey.Profile_personal)}
                </Text>
              </View>
            </TouchableOpacity>

            {/* item text thành viên gia đình */}
            <TouchableOpacity
              onPress={() =>
                this.onPressFamilyManger()
              }
            >
              <View style={styles.layoutItem}>
                <Image
                  style={styles.itemImage}
                  source={require("../../../assets/icon_family.png")}
                />
                <Text style={styles.itemText}>
                  {Translate(DefineKey.Profile_family)}
                </Text>
              </View>
            </TouchableOpacity>

            {/* item text change password */}
            <TouchableOpacity onPress={() => this.onPressChangePassword()}>
              <View style={styles.layoutItem}>
                <Image
                  style={styles.itemImage}
                  source={require("../../../assets/icon_password.png")}
                />
                <Text style={styles.itemText}>
                  {Translate(DefineKey.Profile_change_password)}
                </Text>
              </View>
            </TouchableOpacity>

            {/* layout setting notify */}
            <TouchableOpacity
                onPress={() =>
                  this.onPressSettingNotification()
                }
              >
                <View style={styles.layoutItem}>
                  <Image
                    style={styles.itemImage}
                    source={require("../../../assets/icon_password.png")}
                  />
                  <Text style={styles.itemText}>
                    {Translate(DefineKey.SETTING_NOTIFICATION_HEADER_TITLE)}
                  </Text>
                </View>
              </TouchableOpacity>

            {/* layout Item Privacy */}
            <TouchableOpacity>
              <View style={styles.layoutItem}>
                <Image
                  style={styles.itemImage}
                  source={require("../../../assets/icon_privacy.png")}
                />
                <Text style={styles.itemText}>
                  {Translate(DefineKey.Profile_privacy)}
                </Text>
              </View>
            </TouchableOpacity>

            {/* layout Item Term Of Use */}
            <TouchableOpacity>
              <View style={styles.layoutItem}>
                <Image
                  style={styles.itemImage}
                  source={require("../../../assets/icon_term.png")}
                />
                <Text style={styles.itemText}>
                  {Translate(DefineKey.Profile_term_of_use)}
                </Text>
              </View>
            </TouchableOpacity>

            {/* layout item logout */}
            <TouchableOpacity onPress={() => this.onPressLogout()}>
              <View style={styles.layoutItem}>
                <Image
                  style={styles.itemImage}
                  source={require("../../../assets/icon_logout.png")}
                />
                <Text style={styles.itemText}>
                  {Translate(DefineKey.Profile_logout)}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.layoutFooter}>
            <TouchableOpacity
              style={styles.layoutButton}
              onPress={() => this.onPressFinish()}
            >
              <Text style={styles.textButton}>
                {Translate(DefineKey.Profile_text_exit)}
              </Text>
            </TouchableOpacity>
          </View>

        </View>
      </SafeAreaView>
    );
  }
}

export var options = {
  title: "Select Avatar",
  customButtons: [{ name: "fb", title: "Choose Photo from Facebook" }],
  storageOptions: {
    skipBackup: true,
    path: "images"
  }
};
