import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";

import styles from "./ItemNoteImageStyle";
import {Translate} from "../../../utils/Language"
import DefineKey from "../../../config/language/DefineKey";

export default class HorizontalItemImage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
       console.log("nvTien - render...."),
      <View style={styles.wrapContent}>
        <View style={styles.layoutIconDel}>
          <TouchableOpacity
            onPress={() =>
              Alert.alert(
                Translate(DefineKey.HorizontalItemImage_dialogconfirm_title),
                Translate(DefineKey.HorizontalItemImage_dialogconfirm_content),
                [
                  {
                    text: Translate(
                      DefineKey.HorizontalItemImage_dialogconfirm_cancel
                    ),
                    style: "cancel"
                  },
                  {
                    text: Translate(
                      DefineKey.HorizontalItemImage_dialogconfirm_yes
                    ),
                    onPress: () => this.props.onclick(this.props.item.id)
                  }
                ],
                { cancelable: true }
              )
            }
          >
            <Image
              style={styles.iconDel}
              source={require("../../../../assets/icon_del.png")}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.layoutImage}>
          <Image
            style={styles.image}
            source={this.props.item.image}
          />
        </View>
      </View>
    );
  }
}
