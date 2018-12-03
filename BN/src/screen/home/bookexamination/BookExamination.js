import React, { Component } from "react";
import {
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-navigation";
import styles from "./BookExaminationStyle";
import HeaderComponent from "../../main/HeaderComponent";
import {Translate} from "../../../utils/Language"
import DefineKey from "../../../config/language/DefineKey";

export default class BookExamination extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  _gotoProfile() {
    alert("Screen Profile");
  }

  componentDidMount = () => {
    this.props.loadDataProfile();
  }

  getImage() {
    let base64Icon = "data:image/png;base64," + this.props.image;
    return this.props.image === ""
    ? require("../../../../assets/icon_app.png")
    : {uri:base64Icon};
  }

  render() {
    
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <View style={styles.layoutWrapContent}>
            {/* <CustomHeader
              isShowBack={false}
              gotoProfile={this._gotoProfile}
              navigation={this.props.navigation}
              titleHead={Translate(DefineKey.BookExamination_head_title)}
            /> */}
            <HeaderComponent {...this.props}  title={Translate(DefineKey.BookExamination_head_title)}/>

            {/* layout content top image, buttons content */}
            <View style={styles.layoutContent}>
              {/* layout top image */}
              <View style={styles.layoutTopIcon}>
                <TouchableHighlight style={styles.avataContainer}>
                  <Image
                    style={styles.avata}
                    source={this.getImage()}
                  />
                </TouchableHighlight>
                <View style={styles.userNameContainer}>
                  <Text style={styles.textUserName}> {this.props.userName}</Text>
                  <TouchableOpacity>
                    <Image
                      style={styles.userArrow}
                      source={require("../../../../assets/icon_arrow_down_black.png")}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.wrapperButton}>
                {/* row layout button 01 */}
                <View style={styles.layoutButton}>
                  <TouchableOpacity
                    style={styles.buttonLeft}
                    onPress={() => alert("Thông tin cá nhân")}
                  >
                    <Text style={styles.textButton}>
                      {Translate(DefineKey.BookExamination_text_button_01)}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.buttonRight}
                    onPress={() => alert("Sổ bảo hiểm")}
                  >
                    <Text style={styles.textButton}>
                      {Translate(DefineKey.BookExamination_text_button_02)}
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* row layout button 02 */}
                <View style={styles.layoutButton}>
                  <TouchableOpacity
                    style={styles.buttonLeft}
                    onPress={() => alert("Tiền sử khám bệnh")}
                  >
                    <Text style={styles.textButton}>
                      {Translate(DefineKey.BookExamination_text_button_03)}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.buttonRight}
                    onPress={() => alert("Tiền sử phẫu thuật")}
                  >
                    <Text style={styles.textButton}>
                      {Translate(DefineKey.BookExamination_text_button_04)}
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* row layout button 03 */}
                <View style={styles.layoutButton}>
                  <TouchableOpacity
                    style={styles.buttonLeft}
                    onPress={() => alert("Bệnh điều trị lâu dài")}
                  >
                    <Text style={styles.textButton}>
                      {Translate(DefineKey.BookExamination_text_button_05)}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.buttonRight}
                    onPress={() => alert("Bệnh dị ứng")}
                  >
                    <Text style={styles.textButton}>
                      {Translate(DefineKey.BookExamination_text_button_06)}
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* row layout button 04 */}
                <View style={styles.layoutButton}>
                  <TouchableOpacity
                    style={styles.buttonLeft}
                    onPress={() => alert("Lịch sử tiêm vacxin")}
                  >
                    <Text style={styles.textButton}>
                      {Translate(DefineKey.BookExamination_text_button_07)}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.buttonRight}
                    onPress={() => alert("Thói quen ăn uống")}
                  >
                    <Text style={styles.textButton}>
                      {Translate(DefineKey.BookExamination_text_button_08)}
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* row layout button 05 */}
                <View style={styles.layoutButton}>
                  <TouchableOpacity
                    style={styles.buttonLeft}
                    onPress={() => alert("Thói quen sinh hoạt")}
                  >
                    <Text style={styles.textButton}>
                      {Translate(DefineKey.BookExamination_text_button_09)}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.buttonRight}
                    onPress={() => alert("Hoạt động thể thao")}
                  >
                    <Text style={styles.textButton}>
                      {Translate(DefineKey.BookExamination_text_button_10)}
                    </Text>
                  </TouchableOpacity>
                </View>

              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}


