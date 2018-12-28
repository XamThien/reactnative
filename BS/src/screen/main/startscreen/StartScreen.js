import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView
} from "react-native";
import CustomHeader from "../../main/header/CustomHeader";
import ScreenName from "../../../commons/ScreenName";
import styles from "./StartScreenStyle";
import {Translate} from "../../../utils/Language"
import DefineKey from "../../../config/language/DefineKey";

export class StartScreen extends Component {
  static navigationOptions = {
    header: null
  };

  componentWillMount() {
    
  }

  doHomePage() {
   
  }

  componentWillReceiveProps(props) {
      console.log("nvTien - componentWillReceiveProps login social...");
    
  }

  onPressLoginScreen() {
   
  }

  onPressRegisterScreen() {
    
  }

  onPressTermScreen() {
   
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <View style={styles.layoutWrapContent}>
            {/* layout top header, hiển thị tên màn hình, và các cài đặt khác */}
            <CustomHeader
              isShowBack={false}
              navigation={this.props.navigation}
              titleHead={Translate(DefineKey.Work_schedule_titleHead)}
            /> 
            
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default StartScreen;
