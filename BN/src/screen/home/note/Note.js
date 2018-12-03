import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-navigation";
import styles from "./NoteStyle";
import HeaderComponent from "../../main/HeaderComponent";
import {Translate} from "../../../utils/Language"
import DefineKey from "../../../config/language/DefineKey";

export default class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _gotoProfile() {
    alert("Screen Profile");
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <View style={styles.layoutWrapContent}>
            <HeaderComponent {...this.props}  title={Translate(DefineKey.Note_title)}/>

            <View style={styles.wrapperButton}>
              {/* define layout button history video */}
              <TouchableOpacity
                style={styles.layoutButton}
                onPress={() => alert("History video")}
              >
                <Text style={styles.textButton}>
                  {Translate(DefineKey.Note_history_video)}
                </Text>
              </TouchableOpacity>

              {/* define layout button history phone */}
              <TouchableOpacity
                style={styles.layoutButton}
                onPress={() => alert("History phone")}
              >
                <Text style={styles.textButton}>
                  {Translate(DefineKey.Note_history_phone)}
                </Text>
              </TouchableOpacity>

              {/* define layout button note */}
              <TouchableOpacity
                style={styles.layoutButton}
                onPress={() => alert("Ghi chú cá nhân")}
              >
                <Text style={styles.textButton}>
                  {Translate(DefineKey.Note_individual)}
                </Text>
              </TouchableOpacity>

              {/* define layout button history prescription */}
              <TouchableOpacity
                style={styles.layoutButton}
                onPress={() => alert("Đơn thuốc bác sĩ")}
              >
                <Text style={styles.textButton}>
                  {Translate(DefineKey.Note_prescription)}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
