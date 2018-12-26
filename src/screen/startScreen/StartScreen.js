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
import { Translate } from "../../utils/Language";
import DefineKey from "../../config/language/DefineKey";

export class StartScreen extends Component {
  static navigationOptions = {
    header: null
  };

  componentWillMount() {}

  doHomePage() {}

  componentWillReceiveProps(props) {
    console.log("nvTien - componentWillReceiveProps login social...");
  }

  onPressLoginScreen() {
    this.props.navigation.navigate(ScreenName.Screen_LoginScreen)
  }

  onPressRegisterScreen() {
    this.props.navigation.navigate(ScreenName.Screen_RegisterScreen)
  }

  onPressTermScreen() {
    this.props.navigation.navigate(ScreenName.Screen_TermOfServiceScreen)
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.layoutContent}>
            <Text style={styles.textHeader}>
              {Translate(DefineKey.StartScreen_title_welcome)}
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Image
                resizeMode="contain"
                source={require("../../../assets/icon_start.png")}
                style={styles.image}
              />
            </View>
            <Text style={styles.txtContent}>
              {Translate(DefineKey.StartScreen_text_content)}
            </Text>
            
            {/* layout login và register */}
            <View style={styles.layoutButton}>
              <TouchableOpacity
                style={styles.btnRegister}
                onPress={() => this.onPressLoginScreen()}
              >
                <Text style={styles.textButton}>
                  {Translate(DefineKey.StartScreen_text_btn_login)}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnRegister}
                onPress={() => this.onPressRegisterScreen()}
              >
                <Text style={styles.textButton}>
                  {Translate(DefineKey.StartScreen_text_btn_register)}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

           {/* layout footer*/}
          <View style={styles.layoutFooter}>
            <TouchableOpacity onPress={() => this.onPressTermScreen()}>
              <Text style={styles.textFooter}>
                {Translate(DefineKey.StartScreen_text_footer)}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default StartScreen;
