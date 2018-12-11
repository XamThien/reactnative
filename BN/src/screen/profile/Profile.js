import React, { Component } from "react";
import {
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Image
} from "react-native";
import { SafeAreaView } from "react-navigation";
import styles from "./ProfileStyle";
import {Translate} from "../../utils/Language"
import DefineKey from "../../config/language/DefineKey";
import ScreenName from '../../commons/ScreenName';
import { StackActions, NavigationActions } from 'react-navigation';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onPressFinish() {
    this.props.navigation.pop();
  }

  onPressLogout() {
    this.props.doLogoutApp();
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: ScreenName.Screen_StartScreen })],
    });
    this.props.navigation.dispatch(resetAction);
  }

  componentDidMount = () => {
    this.props.loadDataProfile();
  }

  getImage() {
    const base64Icon = "data:image/png;base64," + this.props.image;
    return this.props.image === ""
    ? require("../../../assets/icon_app.png")
    : {uri:base64Icon};
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <View style={styles.layoutWrapContent}>

            {/* layout top image */}
            <View style={styles.layoutTopIcon}>
              <TouchableHighlight style={styles.avataContainer}>
              
                <Image
                  style={styles.avata}
                  source={this.getImage()}
                />
              </TouchableHighlight>
              <View style={styles.userNameContainer}>
                <Text style={styles.textUserName}>{this.props.userName} </Text>
              </View>
            </View>

            {/* layout Item family */}
            <TouchableOpacity>
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

            {/* layout Item membership */}
            <TouchableOpacity>
              <View style={styles.layoutItem}>
                <Image
                  style={styles.itemImage}
                  source={require("../../../assets/icon_membership.png")}
                />
                <Text style={styles.itemText}>
                  {Translate(DefineKey.Profile_membership)}
                </Text>
              </View>
            </TouchableOpacity>

            {/* layout change password */}
            <TouchableOpacity onPress={() =>
              this.props.navigation.navigate(ScreenName.Screen_ChangePassword)}>
              <View style={styles.layoutItem}>
                <Image
                  style={styles.itemImage}
                  source={require("../../../assets/icon_password.png")}
                />
                <Text style={styles.itemText}>
                  {Translate(DefineKey.CHANGE_PASSWORD_HEADER_TITLE)}
                </Text>
              </View>
            </TouchableOpacity>

            {/* layout Item Subscription */}
            <TouchableOpacity>
              <View style={styles.layoutItem}>
                <Image
                  style={styles.itemImage}
                  source={require("../../../assets/icon_subscription.png")}
                />
                <Text style={styles.itemText}>
                  {Translate(DefineKey.Profile_subcription)}
                </Text>
              </View>
            </TouchableOpacity>

            {/* layout Item FAQ */}
            <TouchableOpacity>
              <View style={styles.layoutItem}>
                <Image
                  style={styles.itemImage}
                  source={require("../../../assets/icon_faq.png")}
                />
                <Text style={styles.itemText}>
                  {Translate(DefineKey.Profile_faq)}
                </Text>
              </View>
            </TouchableOpacity>

            {/* layout Item Invite */}
            <TouchableOpacity>
              <View style={styles.layoutItem}>
                <Image
                  style={styles.itemImage}
                  source={require("../../../assets/icon_invite.png")}
                />
                <Text style={styles.itemText}>
                  {Translate(DefineKey.Profile_invite)}
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
            <TouchableOpacity onPress={() =>
              this.onPressLogout()}>
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
