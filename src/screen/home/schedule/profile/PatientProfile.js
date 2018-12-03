import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  TouchableHighlight,
  BackHandler,
  ScrollView
} from "react-native";
import { NavigationEvents } from "react-navigation";
import { SafeAreaView } from "react-navigation";
import styles from "./PatientProfileStyle";

import { Translate } from "../../../../utils/Language";
import DefineKey from "../../../../config/language/DefineKey";
import DialogLoading from "../../../../components/DialogLoading";
import ScreenName from "../../../../commons/ScreenName";
import Constant from "../../../../commons/Constants";

export default class ExaminationSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
     dataPatient: {},
     patientName: "",
     patientTime: ""
    };
  
  }

  componentWillReceiveProps(props) {
  
    
  }

  componentWillMount = () => {
    console.log("nvTien - Schedule componentWillMount");

  };

  componentDidMount = () => {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
    let dataPatient =  this.props.navigation.getParam(Constant.KEY_INTENT_DATA_PATIENT, "");
    if(dataPatient != null && dataPatient != undefined) {
      let userName = dataPatient.name;
      let time = dataPatient.time;
      this.setState({dataPatient: dataPatient, patientName: userName, patientTime: time})
    }

  };

  componentWillAnimateOut() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }

  handleBackPress = () => {
    
  };

  onPressBack() {
    this.props.navigation.pop()
  }

  render() {
    return <SafeAreaView style={styles.container}>
        <View style={styles.container}>
            {/* define header profile screen */}
          <View style={styles.layout_wrap_header}>
            <View style={styles.layout_title}>
              <Text style={styles.txt_title}>{Translate(DefineKey.Profile_patient_records)}</Text>
            </View>
            <TouchableOpacity style={styles.button_nav} onPress={() => {
               this.onPressBack();
              }}>
              <Image style={styles.image_nav} 
                source={require("../../../../../assets/icon_back_white.png")} />
            </TouchableOpacity>
          </View>
              {/* define layout content patient profile screen */}
          <View style = {styles.layout_wrap_content}>
              <View style ={styles.layout_top_profile}>
                    <View style = {styles.layout_avata}>
                    <TouchableHighlight style={styles.avataContainer}>
                        <Image
                        style={styles.avata}
                        source={require('../../../../../assets/icon_app.png')}
                        />
                    </TouchableHighlight>
                    <View style={styles.userNameContainer}>
                        <Text style={styles.textUserName}>{this.state.patientName}</Text>
                        <Text style={styles.textUser_time}>{this.state.patientTime} </Text>
                    </View>
                    </View>
                    
              </View>
                    {/* define layout list option select */}
              <View style ={styles.layout_list_selection}>
                    {/* first layout selection */}
                    <View style = {styles.layout_list_first}>
                    <View style = {styles.layout_list_wrap_item}>
                        <TouchableOpacity style = {styles.layout_item}>
                        <Image style = {styles.img_list_selection} source ={require('../../../../../assets/profiles/user.png')}/>
                        </TouchableOpacity>
                        <Text style ={styles.title_list_selection}>{Translate(DefineKey.Profile_information)}</Text>
                    </View>
                    <View style = {styles.layout_list_wrap_item}>
                        <TouchableOpacity style = {styles.layout_item}>
                        <Image style = {styles.img_list_selection} source ={require('../../../../../assets/profiles/details.png')}/>
                        </TouchableOpacity>
                        <Text style ={styles.title_list_selection}>{Translate(DefineKey.Profile_medical_examination_detail)}</Text>
                    </View>
                    <View style = {styles.layout_list_wrap_item}>
                        <TouchableOpacity style = {styles.layout_item}>
                        <Image style = {styles.img_list_selection} source ={require('../../../../../assets/profiles/report.png')}/>
                        </TouchableOpacity>
                        <Text style ={styles.title_list_selection}>{Translate(DefineKey.Profile_disease_profile)}</Text>
                    </View> 
                    </View>
                    {/* second layout selection */}
                    <View style = {styles.layout_list_second}>
                    <View style = {styles.layout_list_wrap_item}>
                        <TouchableOpacity style = {styles.layout_item}>
                        <Image style = {styles.img_list_selection} source ={require('../../../../../assets/profiles/medical_insurance.png')}/>
                        </TouchableOpacity>
                        <Text style ={styles.title_list_selection}>{Translate(DefineKey.Profile_insurrance)}</Text>
                    </View>
                    <View style = {styles.layout_list_wrap_item}>
                        <TouchableOpacity style = {styles.layout_item}>
                        <Image style = {styles.img_list_selection} source ={require('../../../../../assets/profiles/prescription.png')}/>
                        </TouchableOpacity>
                        <Text style ={styles.title_list_selection}>{Translate(DefineKey.Profile_prescription)}</Text>
                    </View>
                    <View style = {styles.layout_list_wrap_item}>
                        <TouchableOpacity style = {styles.layout_item}>
                        <Image style = {styles.img_list_selection} source ={require('../../../../../assets/profiles/history.png')}/>
                        </TouchableOpacity>
                        <Text style ={styles.title_list_selection}>{Translate(DefineKey.Profile_medical_examination_history)}</Text>
                    </View>
                    </View>
              </View>
          </View>
          
        </View>
      </SafeAreaView>;
  }
}



