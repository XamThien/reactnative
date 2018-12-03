import React, { Component } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import styles from "../term/TermServiceStyle";
import {Translate} from "../../utils/Language"
import DefineKey from "../../config/language/DefineKey";


export class TermOfService extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.layoutTop}>
          <Image
            resizeMode="contain"
            source={require("../../../assets/icon_start.png")}
            style={styles.imageTop}
          />
          <Text style={styles.textTop}>{Translate(DefineKey.TermOfService_textTitle)}</Text>
        </View>
        <View style={styles.layoutContent} />
        <View style={styles.layoutFooter}>
          <TouchableOpacity onPress={() =>(
            alert('Luu dieu khoan thanh cong')
          )}>
            <View style={styles.layoutBtnFooter}>
            <Text style={styles.textBtnSave}>{Translate(DefineKey.TermOfService_BtnSave)}</Text>
              <Image
                source={require("../../../assets/icon_share.png")}
                style={styles.imgShare}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}


export default TermOfService;
