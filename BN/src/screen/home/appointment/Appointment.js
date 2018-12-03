import React, {Component} from "react";
import {
    Text,
    View,
    TouchableOpacity,
    Image,
    TextInput,
    FlatList,
    ScrollView,
    TouchableHighlight
} from "react-native";

import {SafeAreaView} from "react-navigation";
import styles from "./AppointmentStyle";
import CustomHeader from "../header/CustomHeader";
import ImagePicker from "react-native-image-picker";
import DatePicker from "../../../components/DatePicker";
import HorizontalFlatListItem from "../appointment/HorizontalFlatListItem";
import HorizontalItemImage from "../appointment/HorizontalItemImage";
import {Translate} from "../../../utils/Language"
import DefineKey from "../../../config/language/DefineKey";
import Colors from "../../../commons/Colors";
import ModalNameContainer from "../../../containers/ModalNameContainer";
import ConsultantModalContainer from "../../../containers/ConsultantContainer";
import AddNewMemberContainer from "../../../containers/AddNewMemberContainer";
import DialogLoading from "../../../components/DialogLoading";
import ScreenName from "../../../commons/ScreenName";
import Constant from  "../../../commons/Constants";
import {getCurrentDate, convertDateToMillisecond, convertMilliToTime,
    convertTimeToMillisecond, isEmptyObject} from "../../../utils/Utils"
// import DialogWarning from "../../../components/DialogWarning";
import WarningDialog from '../../../components/WarningDialog';
import { RNNotificationBanner } from 'react-native-notification-banner';

const MAX_DATE_SELECTOR = 7;
export default class Appointment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            warningdialogvisible: false,
            errTitle: "",
            errContent: "",
            dataTimes: [],
            dataDoctor: {},
            dataAppointment: {},
            txtDateTime: "",
            txtDisease: "",
            isSelectVideo: true,
            isHideLayoutImage: true,
            idClickItem: "-1",
            txtComment: "",
            dataImages: [],
            dataImagesBase64: [],
            showModal: true,
            defaultName: "",
            userId: "",
            userName: "",
            doctorId:"",
            diseaseId: "",
            timeAvailable: "",
            isUpdateView: true,
            msgSend: {}

        };
        this._onPressSelectNameModal = this._onPressSelectNameModal.bind(this);
        this._onPressShowConsultantModal = this._onPressShowConsultantModal.bind(this);
        this._onShowDatePicker = this._onShowDatePicker.bind(this);
        this._onPressShowAddNewMemberModal = this._onPressShowAddNewMemberModal.bind(this);
        this.onOpenDialogWarning = this.onOpenDialogWarning.bind(this);
        this.onWarningOk = this.onWarningOk.bind(this);
    }

    componentDidMount = () => {
        this.props.onResetInitAppointment();
        this.props.loadDataProfile();
        
        const userName = this.props.navigation.getParam(Constant.KEY_INTENT_USER_NAME, "");
        const userId = this.props.navigation.getParam(Constant.KEY_INTENT_USER_ID, "");
        const dataDoctor = this.props.navigation.getParam(Constant.KEY_INTENT_DATA_DOCTOR, "");
        const selectDate = this.props.navigation.getParam(Constant.KEY_INTENT_SELECT_DATE, "");
	    let doctorId = dataDoctor.doctor_id;	

        this.setState({ dataDoctor: dataDoctor, defaultName: userName, userId: userId, userName: userName, 
            doctorId: doctorId, txtDateTime: selectDate});
        this.props.onGetDataAppointmentSchedule(doctorId, selectDate);

    }

    loadDataToView(dataAppointment) {
        let timeAvailable = dataAppointment.time_available_enable;
        let dataTimes = this.parserDataTime(timeAvailable);

         let defaultDisease = "";
         let defaultDiseaseId = "";
        if(dataAppointment.disease != null && dataAppointment.disease != undefined 
            && dataAppointment.disease.length != 0) {
         defaultDisease = dataAppointment.disease[0].disease_name;
         defaultDiseaseId = dataAppointment.disease[0].disease_id;
        }

        this.setState({ dataAppointment: dataAppointment,
            dataTimes: dataTimes, txtDisease: defaultDisease, diseaseId: defaultDiseaseId});

    }

    parserDataTime(timeAvailable) {
        let arrTimes = [];
        if (timeAvailable != null && timeAvailable !== "") {
            let valueTimes = timeAvailable.split(";");
            for(let i = 0 ; i < valueTimes.length; i++) {
                let time = convertMilliToTime(valueTimes[i]);
                let objectTime = {
                        id: i,
                        time: time,
                        selected: false
                    }
                    arrTimes.push(objectTime);
            }
        }
        return arrTimes;
    }


    componentWillReceiveProps(props) {
        const selectNameModal = props.selectName;
        const isSaveSuccess = props.isSaveSuccess;
        //lay du lieu lich kham cua bac si
        let dataAppoints = props.dataAppoints;
        if(dataAppoints != null && !isEmptyObject(dataAppoints) && this.state.isUpdateView) {
            this.loadDataToView(dataAppoints);
            this.setState({isUpdateView: false});
        } else if(dataAppoints == null || isEmptyObject(dataAppoints)){
            this.setState({ dataAppointment: {},
                dataTimes: [], txtDisease: "", diseaseId: ""});
        }

        if (selectNameModal !== "") {
            this.setState({defaultName: selectNameModal});
        }
        let dataTimes = props.dataTimes;
        if (dataTimes != null && dataTimes[0] != null && dataTimes[0].id !== "") {
            this.setState({dataTimes: dataTimes});
        }
        if (props.dataType != null && props.dataType.typeName !== "") {
            this.setState({txtDisease: props.dataType.typeName, diseaseId: props.dataType.typeId});
        }
        if(isSaveSuccess) {
            //gửi thông báo đến bác sĩ
            let userFriend = {
                userId: this.state.doctorId,
                userType: Constant.TYPE_DOCTOR
            };
            let typeSend = Constant.VIDEOCALL_SEND_MSG_REQ_APPOINT; 
            let content = this.state.msgSend;
            this.onSendMessage(userFriend, typeSend, content);
            this.props.navigation.pop();
        }
        
    }

    onSendMessage(userFriend, typeSend, content) {
        let message = {
          typeMsg: typeSend,
          content: content
        }
        this.showMessageSuccess();
        this.props.onSendMessage(userFriend, message);
    }

    showMessageSuccess() {
       let title = Translate(DefineKey.DialogWarning_text_title);
       let content = Translate(DefineKey.Appointment_req_appoint_success);
       RNNotificationBanner.Info({ title: title, subTitle: content, duration: 1 });
    }

    onChangeDate(date) {
        if(date === this.state.txtDateTime) {
            return;
        }
        this.setState({txtDateTime: date, isUpdateView: true});
        this.props.onGetDataAppointmentSchedule(this.state.doctorId, date);
        
    }

    getImageVideo() {
        return this.state.isSelectVideo
            ? require("../../../../assets/icon_video_white.png")
            : require("../../../../assets/icon_video_black.png");
    }

    getImagePhone() {
        return !this.state.isSelectVideo
            ? require("../../../../assets/icon_phone_white.png")
            : require("../../../../assets/icon_phone_black.png");
    }

    onClickItemSuggestTime(itemId, timeAvailable) {
        this.setState({timeAvailable: timeAvailable});
        this.props.onClickTimeAvailable(itemId, this.state.dataTimes);
    }

    onDeleteImage(imageId) {
        var newArray = horizontalFlatListImage.filter(function (item) {
            return item.id !== imageId;
        });
        horizontalFlatListImage = newArray;

        var newArrayBase64 = horizontalFlatListImageBase64.filter(function (item) {
            return item.id !== imageId;
        });
        horizontalFlatListImageBase64 = newArrayBase64;

        if (newArray.length === 0) {
            this.setState({dataImages: newArray, dataImagesBase64: newArrayBase64, isHideLayoutImage: true});
        } else {
            this.setState({dataImages: newArray, dataImagesBase64: newArrayBase64, isHideLayoutImage: false});
        }
    }

    _onPressOpenSelectImage() {
        ImagePicker.showImagePicker(options, response => {
            if (response.didCancel) {
            } else if (response.error) {
            } else if (response.customButton) {
            } else {
                let sourceURI = {uri: response.uri};
                //console.log("nvTien - _onPressOpenSelectImage image uri: " + sourceURI);
                indexDSImage++;
                if (sourceURI != null) {
                    this.setState({
                        dataImages: []
                    });
                    let objectImage = {
                        id: indexDSImage,
                        image: sourceURI,
                        selected: false
                    };
                    horizontalFlatListImage.push(objectImage);
                    this.setState({
                        dataImages: horizontalFlatListImage,
                        isHideLayoutImage: false
                    });
                }

                let source = response.data;
                console.log(`nvTien - select image data base 64... = ` + source);
                if (source != null) {
                    let objectImage = {
                        id: indexDSImage,
                        image: source,
                        selected: false
                    };
                    horizontalFlatListImageBase64.push(objectImage);
                    this.setState({
                        dataImagesBase64: horizontalFlatListImageBase64,
                        isHideLayoutImage: false
                    });
                }

            }
        });
    }


    _onPressSelectNameModal() {
        this.refs.appointNameModal.getWrappedInstance().showSelectNameModal(this.state.userId, this.state.userName);
    }

    _onPressShowConsultantModal() {
        let dataAppointment = this.state.dataAppointment;
        console.log(`nvTien - _onPressShowConsultantModal data dataAppointment...${JSON.stringify(dataAppointment)}`);
        let objectDisease = {};
        if(dataAppointment != null && !isEmptyObject(dataAppointment)) {
            objectDisease = dataAppointment.disease;
        }
        console.log(`nvTien - _onPressShowConsultantModal data objectDisease...${JSON.stringify(objectDisease)}`);
        this.refs.consultantModal.getWrappedInstance().showSelectConsultantModal(objectDisease);

    }

    _onPressShowAddNewMemberModal() {
        let userId = this.state.userId;
        this.refs.addNewMemberModal.getWrappedInstance().showAddNewMemberModal(userId);
    }

    _onShowDatePicker() {
        this.refs.datePicker.onPressDate();
    }

    _getDefaultMinDate() {
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        var curDate = year + "-" + month + "-" + date;
        return curDate;
    }

    _getDefaultMaxDate() {
        var day = new Date();
        var nextDay = new Date(day);
        nextDay.setDate(day.getDate()+ MAX_DATE_SELECTOR);

        var date = nextDay.getDate();
        var month = nextDay.getMonth() + 1;
        var year = nextDay.getFullYear();
        var curDate = year + "-" + month + "-" + date;
        return curDate;
    }

    getImage() {
        let base64Icon = "data:image/png;base64," + this.props.image;
        return this.props.image === ""
            ? require("../../../../assets/icon_app.png")
            : {uri: base64Icon};
    }

    _saveDataAppointment() {
        let errTitle = Translate(DefineKey.DialogWarning_text_title);
        let typeCall = this.state.isSelectVideo ? 0 : 1;
        let note_images = [];
        let userId = this.state.userId;
        let doctorId = this.state.doctorId;
        let diseaseId = this.state.diseaseId;
        let date = this.state.txtDateTime;
        let hours = this.state.timeAvailable;
        let textComment = this.state.txtComment;

        if (hours == null || hours === "") {
            let errorContent = Translate(DefineKey.Deepcare_error_select_time);
            this.onOpenDialogWarning(errTitle, errorContent);
            return;
        }

        if (horizontalFlatListImageBase64 != null && horizontalFlatListImageBase64.length !== 0) {
            for (let i = 0 ; i < horizontalFlatListImageBase64.length ;i ++) {
                let image = horizontalFlatListImageBase64[i].image;
                console.log("nvTien - _saveDataAppointment image: " + image);
                note_images.push(image);
            }
        }

        let appointment = {
            id: userId,
            id_doctor: doctorId,
            id_disease: diseaseId,
            date: convertDateToMillisecond(date),
            hours: convertTimeToMillisecond(hours),
            type_call: typeCall,
            note_text: textComment,
            note_images: note_images
        };
        console.log(`nvTien - save data... = ${JSON.stringify(appointment)}` + " date: " + date);
        //let typeSend = Constant.VIDEOCALL_SEND_MSG_REQ_APPOINT;
        let objectContent = {
            patientName: this.state.defaultName,
            userId: userId,
            time: hours,
            date: date
        }
        this.setState({msgSend: objectContent})
        this.props.onSaveData(appointment);
    }

    onOpenDialogWarning(errTitle, errContent) {
        this.setState({warningdialogvisible: true, errTitle: errTitle, errContent: errContent});
        // this.refs.dialogWarning.showModal();
    }
    onWarningOk() {
        this.setState({ warningdialogvisible: false });
    }

    render() {

        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.container}>
                    <View style={styles.layoutWrapContent}>
                        <CustomHeader
                            isShowBack={true}
                            navigation={this.props.navigation}
                            titleHead={Translate(DefineKey.Appointment_titleHead)}
                        />           
                        <View style={styles.wrapContent}>
                            <View style={styles.layoutContent}>
                                <ScrollView>
                                    <TouchableOpacity
                                        onPress={() => this._onPressSelectNameModal()}
                                    >
                                        {/* define layout select appointment for name */}
                                        <View style={styles.itemSelect}>
                                            <TouchableHighlight style={styles.avataContainer}>
                                                <Image
                                                    style={styles.avata}
                                                    source={this.getImage()}
                                                />
                                            </TouchableHighlight>
                                            <View style={styles.itemContent}>
                                                <Text style={styles.textTitleAppoint}>
                                                    {Translate(DefineKey.Appointment_textAppoitment)}
                                                </Text>
                                                <Text style={styles.textUserName}>
                                                    {this.state.defaultName}
                                                </Text>
                                            </View>
                                            <View style={styles.itemArrow}>
                                                <View style={styles.arrowBtn}>
                                                    <Image
                                                        style={styles.itemArrow}
                                                        source={require("../../../../assets/icon_arrow_down_black.png")}
                                                    />
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                    <View style={styles.viewLine}/>

                                    {/* define layout select Consultant type */}
                                    <TouchableOpacity
                                        onPress={() =>
                                            this._onPressShowConsultantModal()
                                        }>
                                        <View style={styles.itemSelect}>
                                            <TouchableHighlight style={styles.imageContainer}>
                                                <Image
                                                    style={styles.image}
                                                    source={require("../../../../assets/icon_medical_study.png")}
                                                />
                                            </TouchableHighlight>
                                            <View style={styles.itemContent}>
                                                <Text style={styles.textTitleAppoint}>
                                                    {Translate(DefineKey.Appointment_textConsultant)}
                                                </Text>
                                                <Text style={styles.textUserName}>
                                                    {this.state.txtDisease}
                                                </Text>
                                            </View>
                                            <View style={styles.itemArrow}>
                                                <View style={styles.arrowBtn}>
                                                    <Image
                                                        style={styles.itemArrow}
                                                        source={require("../../../../assets/icon_arrow_down_black.png")}
                                                    />
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                    <View style={styles.viewLine}/>

                                    {/* define layout select Date time */}
                                    <TouchableOpacity onPress={() => this._onShowDatePicker()}>
                                        <View style={styles.itemSelect}>
                                            <TouchableHighlight style={styles.imageContainer}>
                                                <Image
                                                    style={styles.image}
                                                    source={require("../../../../assets/icon_watch.png")}
                                                />
                                            </TouchableHighlight>
                                            <View style={styles.itemContent}>
                                                <Text style={styles.textTitleAppoint}>
                                                    {Translate(DefineKey.Appointment_textAppoitment)}
                                                </Text>
                                                <Text style={styles.textUserName}>
                                                    {this.state.txtDateTime}
                                                </Text>
                                            </View>
                                            <View style={styles.itemArrow}>
                                                <View style={styles.arrowBtn}>
                                                    <Image
                                                        style={styles.itemArrow}
                                                        source={require("../../../../assets/icon_arrow_down_black.png")}
                                                    />
                                                </View>
                                            </View>

                                            {/* display dialog select date and time */}
                                            <DatePicker
                                                ref={"datePicker"}
                                                style={{width: 0, height: 0}}
                                                mode="date"
                                                locale="vi"
                                                // date={this.state.date}
                                                format= {Constant.DEFAULT_SYMPLE_DATE}
                                                minDate={this._getDefaultMinDate()}
                                                maxDate={this._getDefaultMaxDate()}
                                                confirmBtnText="Confirm"
                                                cancelBtnText="Cancel"
                                                onDateChange={date => {
                                                    this.onChangeDate(date);    
                                                    
                                                }}
                                            />

                                        </View>
                                    </TouchableOpacity>

                                    {/* define display suggest time appointment */}
                                    <View style={styles.layoutSuggestTime}>
                                        <Text style={styles.textErrorSelectTime}>
                                            {Translate(DefineKey.Appointment_textErrorSelectTime)}
                                        </Text>
                                        <View style={styles.layoutFlatlistTime}>
                                            <FlatList
                                                horizontal={true}
                                                data={this.state.dataTimes}
                                                renderItem={({item, index}) => {
                                                    return (
                                                        <HorizontalFlatListItem
                                                            key={item.id}
                                                            item={item}
                                                            index={index}
                                                            parentFlatList={this}
                                                            onclick={this.onClickItemSuggestTime.bind(this)}
                                                        />
                                                    );
                                                }}
                                                keyExtractor = { (item, index) => index.toString() }
                                            />
                                        </View>
                                        <View style={styles.viewLine}/>

                                        {/* define select button video call and phone */}
                                        <View style={styles.layoutSelectVideo}>
                                            {/*button videocall*/}
                                            <TouchableOpacity
                                                style={styles.buttonVideo}
                                                onPress={() => {
                                                    this.setState({isSelectVideo: true});
                                                }}
                                            >
                                                <View
                                                    style={this.state.isSelectVideo ? styles.viewCallVideo : styles.viewPhone}>
                                                    <Image
                                                        style={styles.imageVideo}
                                                        source={this.getImageVideo()}
                                                    />
                                                    <Text
                                                        style={this.state.isSelectVideo ? styles.textVideo : styles.textPhone}>
                                                        {Translate(DefineKey.Appointment_text_video)}
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>

                                            <TouchableOpacity
                                                style={styles.buttonPhone}
                                                onPress={() => {
                                                    this.setState({isSelectVideo: false});
                                                }}
                                            >
                                                <View style={!this.state.isSelectVideo ? styles.viewCallVideo : styles.viewPhone}>
                                                    <Image style={styles.imageVideo} source={this.getImagePhone()}/>
                                                    <Text style={!this.state.isSelectVideo ? styles.textVideo : styles.textPhone}>
                                                        {Translate(DefineKey.Appointment_text_phone)}
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={styles.viewLine}/>

                                    {/* define layout add Note */}
                                    <View style={styles.layoutAddNote}>
                                        <Image
                                            style={styles.iconAdd}
                                            source={require("../../../../assets/icon_add_note.png")}
                                        />
                                        <View style={styles.layoutAddContent}>
                                            <View
                                                style={this.state.isHideLayoutImage ? styles.hideLayoutListImageNote : styles.layoutListImageNote}>
                                                <FlatList
                                                    horizontal={true}
                                                    data={this.state.dataImages}
                                                    renderItem={({item, index}) => {
                                                        return (
                                                            <HorizontalItemImage
                                                                item={item}
                                                                index={index}
                                                                parentFlatList={this}
                                                                onclick={this.onDeleteImage.bind(this)}
                                                            />
                                                        );
                                                    }}
                                                    keyExtractor = { (item, index) => index.toString() }
                                                />
                                            </View>

                                            <TextInput
                                                placeholder="Add Note"
                                                placeholderTextColor={Colors.gray}
                                                multiline = {true}
                                                numberOfLines = {4}
                                                editable = {true}
                                                maxLength = {500}
                                                placeholder="Note"
                                                onChangeText={(text) => this.setState({txtComment: text})}
                                            />
                                        </View>

                                        {/* button select Image from gallery */}
                                        <TouchableOpacity
                                            style={styles.iconAdd}
                                            onPress={() => this._onPressOpenSelectImage()}
                                        >
                                            <Image
                                                style={styles.iconAdd}
                                                source={require("../../../../assets/icon_camera.png")}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    <Text style={styles.textErrorSelectTime}>
                                        {Translate(DefineKey.Appointment_add_note_attach)}
                                    </Text>
                                </ScrollView>
                            </View>
                            <TouchableOpacity
                                style={styles.layoutButtonFooter}
                                onPress={() => this._saveDataAppointment()}
                            >
                                <View style={styles.layoutButtonFooter}>
                                    <Text style={styles.textBtnSave}>
                                        {Translate(DefineKey.Appointment_text_btn_save)}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <ModalNameContainer ref={"appointNameModal"} onOpenAddNew={this._onPressShowAddNewMemberModal}/>
                    <ConsultantModalContainer ref={"consultantModal"}/>
                    <AddNewMemberContainer ref={"addNewMemberModal"}/>
                    <DialogLoading loading={this.props.isLoading}/>
                    {/* <DialogWarning ref={"dialogWarning"} title={this.state.errTitle}
                                   content={this.state.errContent}/> */}
                    <WarningDialog
                            titleDialog={this.state.errTitle}
                            contentDialog={this.state.errContent}
                            onOk={this.onWarningOk.bind()}
                            textOk={Translate(DefineKey.DialogWarning_text_ok)}
                            visible={this.state.warningdialogvisible}
                        />    

                </View>
            </SafeAreaView>
        );
    }
}
export var indexDSImage = 0;
export var options = {
    title: "Select Avatar",
    customButtons: [{name: "fb", title: "Choose Photo from Facebook"}],
    storageOptions: {
        skipBackup: true,
        path: "images"
    }
};


export var horizontalFlatListImage = [];
export var horizontalFlatListImageBase64 = [];
