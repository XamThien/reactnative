import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView
} from "react-native";
import ScreenName from "../../commons/ScreenName";
import styles from "./StartScreenStyle";
import {Translate} from "../../utils/Language"
import DefineKey from "../../config/language/DefineKey";
import {CachedImage} from "react-native-img-cache";

export class StartScreen extends Component {
  static navigationOptions = {
    header: null
  };

  componentWillMount() {
    this.props.configLoginGoogle();

  }

  doHomePage() {
    this.props.navigation.navigate(ScreenName.Screen_HomePages);
  }
  componentWillReceiveProps(props) {
      console.log("nvTien - componentWillReceiveProps login social...");
    if (props.facebookProfile != null) {
      this.doHomePage();
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.layoutContent}>
          <Text style={styles.textHeader}>
            { Translate(DefineKey.StartScreen_title_welcome) }
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center"
            }}>
              {/*<CachedImage*/}
                  {/*source={{*/}
                      {/*uri: 'https://i.ytimg.com/vi/yaqe1qesQ8c/maxresdefault.jpg'*/}
                  {/*}}*/}
                      {/*style={styles.image}*/}
              {/*/>*/}
            <Image
              resizeMode="contain"
              source={require("../../../assets/icon_start.png")}
              style={styles.image}
            />
          </View>
          <Text style={styles.txtContent}>
            {Translate(DefineKey.StartScreen_text_content)}
          </Text>
          <View style={styles.layoutButton}>
            <TouchableOpacity
              style={styles.btnRegister}
              onPress={() =>
                this.props.navigation.navigate(ScreenName.Screen_Login)
              }
            >
              <Text style={styles.textButton}>
                {Translate(DefineKey.StartScreen_text_btn_login)}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnRegister}
              onPress={() =>
                this.props.navigation.navigate(ScreenName.Screen_Register)
              }
            >
              <Text style={styles.textButton}>
                {Translate(DefineKey.StartScreen_text_btn_register)}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.layoutOr}>
              <View style ={styles.leftOr}/>
              <View style ={styles.centerOr}>
              <Text style = {styles.textOr}>{Translate(DefineKey.StartScreen_text_or)}</Text>
              </View>
              <View style ={styles.rightOr}/>

          </View>

          <TouchableOpacity
            style={styles.layoutFacebook}
            onPress={() =>
             // this.props.navigation.navigate(ScreenName.Screen_HomePages)
             this.props.doLoginFacebook()
            }
          >
          <View style={styles.viewSocial}>
            <Image style={styles.iconSocial} source={require("../../../assets/icon_facebook.png")}/>
            <Text style={styles.textSocial}>
              {Translate(DefineKey.StartScreen_text_btn_login_face)}
            </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.layoutGoogle}
            onPress={() =>
              this.props.doLoginGoogle()
            }
          >
          <View style={styles.viewSocial}>
            <Image style={styles.iconSocial} source={require("../../../assets/icon_google.png")}/>
            <Text style={styles.textSocial}>
              {Translate(DefineKey.StartScreen_text_btn_login_google)}
            </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.layoutFooter}>
          <Text
            style={styles.textFooter}
            onPress={() =>
              this.props.navigation.navigate(ScreenName.Screen_TermOfService)
            }
          >
            {Translate(DefineKey.StartScreen_text_footer)}
          </Text>
        </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default StartScreen;
