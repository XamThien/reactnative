import React, { Component } from "react";
import {
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView,
  FlatList
} from "react-native";
import { SafeAreaView } from "react-navigation";
import styles from "./UpdateDoctorInfoStyle";
import { Translate } from "../../../../utils/Language";
import DefineKey from "../../../../config/language/DefineKey";
import ScreenName from "../../../../commons/ScreenName";
import DoctorInfoItem from "../../../../components/DoctorInfoItem";
import { StackActions, NavigationActions } from "react-navigation";
import DialogLoading from "../../../../components/DialogLoading";

export default class UpdateDoctorInfoScr extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userProfile:{}
    };
  }
  // onPressFinish() {
  //   this.props.navigation.pop();
  // }

  // onPressLogout() {
  //   this.props.doLogoutApp();
  //   const resetAction = StackActions.reset({
  //     index: 0,
  //     actions: [NavigationActions.navigate({ routeName: ScreenName.Screen_Login })],
  //   });
  //   this.props.navigation.dispatch(resetAction);
  // }

  componentDidMount = () => {
    this.props.doGetDoctorProfile();
  };

  getImage() {
    // const base64Icon = "data:image/png;base64," + this.props.image;
    // return this.props.image === ""
    // ? require("../../../assets/icon_app.png")
    // : {uri:base64Icon};
  }
  componentWillReceiveProps(props) {
    let hasError = props.hasError;
    let errorLogin = props.lastError;
    // let userProfile = props.userProfile;
    // this.setState({userProfile: userProfile});
    // alert("From doctor SCR: "+JSON.stringify(this.state.userProfile));
    if (!hasError && errorLogin === "") {
      // this.props.navigation.navigate(ScreenName.Screen_Main, {
      //   intent_userID: props.userProfile.doctor_id,
      //   intent_userName: props.userProfile.name
      // });
    } else {
      if (errorLogin != null && errorLogin !== "") {
        // let errTitle = Translate(DefineKey.DialogWarning_text_title);
        // this.onOpenDialogWarning(errTitle, errorLogin);
      }
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <View style={styles.layoutWrapContent}>
            <ScrollView>
              <View style={styles.banner}>
                <ImageBackground
                  source={{
                    uri:
                      "https://dwbxi9io9o7ce.cloudfront.net/build/72e582948494501bbab89a19ee739402.jpg"
                  }}
                  style={{ width: "100%", height: "100%" }}
                >
                  <View style={styles.btn_edit}>
                    <Image
                      style={styles.icon_edit}
                      source={require("../../../../../assets/edit-btn.png")}
                    />
                    <Text
                      style={styles.text_btn_edit}
                      onPress={() => {
                        alert("Hello w");
                      }}
                    >
                      {"Sửa Profile"}
                    </Text>
                  </View>
                  <View style={styles.main_banner}>
                    <View style={styles.avatar_container}>
                      <Image
                        style={styles.avatar}
                        source={require("../../../../../assets/profiles/user.png")}
                      />
                      <Text style={styles.textUserName}>{this.props.userProfile.name}</Text>
                    </View>
                    <View style={styles.rating_container}>
                      <Image
                        style={styles.rating}
                        source={require("../../../../../assets/rating.jpg")}
                      />
                    </View>
                  </View>
                </ImageBackground>
              </View>
              <View style={styles.content}>
                <View style={styles.interactive}>
                  <View style={styles.left}>
                    <Text style={styles.number}>{"100"}</Text>
                    <Text style={styles.interactive_item}>{"Tu van"}</Text>
                  </View>
                  <View style={styles.right}>
                    <Text style={styles.number}>{"624"}</Text>
                    <Text style={styles.interactive_item}>{"Cam on"}</Text>
                  </View>
                </View>
                <View style={styles.info}>
                    <FlatList
                      data={this.props.doctorData}
                      renderItem={({ item }) => (
                        <DoctorInfoItem title={Translate(item.key)} content={item.value} />
                      )}
                    />
                  <DialogLoading loading={this.props.showLoading} />
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
