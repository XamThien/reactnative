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
import styles from "./BookingStyle";
import CustomHeader from "../header/CustomHeader";
import ImagePicker from "react-native-image-picker";
import DatePicker from "../../../components/DatePicker";
import ItemTimeAvailable from "../booking/ItemTimeAvailable";
import ItemNoteImage from "../booking/ItemNoteImage";
import {Translate} from "../../../utils/Language"
import DefineKey from "../../../config/language/DefineKey";
import Colors from "../../../commons/Colors";
import SelectNameContainer from "../../../containers/SelectNameContainer";
import SelectDiseaseContainer from "../../../containers/SelectDiseaseContainer";
import AddMemberFamilyContainer from "../../../containers/AddMemberFamilyContainer";
import DialogLoading from "../../../components/DialogLoading";
import ScreenName from "../../../commons/ScreenName";
import Constant from  "../../../commons/Constants";
import {getCurrentDate, convertDateToMillisecond, convertMilliToTime,
    convertTimeToMillisecond, isEmptyObject} from "../../../utils/Utils";
import WarningDialog from '../../../components/WarningDialog';
import { RNNotificationBanner } from 'react-native-notification-banner';

const MAX_DATE_SELECTOR = 7;
export default class Booking extends Component {
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
        this.onPressSelectNameModal = this.onPressSelectNameModal.bind(this);
        this.onPressShowConsultantModal = this.onPressShowConsultantModal.bind(this);
        this.onShowDatePicker = this.onShowDatePicker.bind(this);
        this.onPressShowAddNewMemberModal = this.onPressShowAddNewMemberModal.bind(this);
        this.onOpenDialogWarning = this.onOpenDialogWarning.bind(this);
        this.onWarningOk = this.onWarningOk.bind(this);

    }

    componentDidMount = () => {
        this.props.onResetInitAppointment();

        const dataDoctor = this.props.navigation.getParam(Constant.KEY_INTENT_DATA_DOCTOR, "");
        const selectDate = this.props.navigation.getParam(Constant.KEY_INTENT_SELECT_DATE, "");
	    let doctorId = dataDoctor.doctor_id;	

        this.setState({ dataDoctor: dataDoctor, doctorId: doctorId, txtDateTime: selectDate});
        this.props.onGetDataAppointmentSchedule(doctorId, selectDate);
    }

    componentWillReceiveProps(props) {
        this.handleResultUserProfile(props.userProfile);
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
    //xử lí lấy tên user
    handleResultUserProfile(userProfile) {
        if(userProfile != null && !isEmptyObject(userProfile)) {
            const userName = userProfile.full_name;
            const userId = userProfile.user_id;
    
            this.setState({ defaultName: userName, userId: userId, userName: userName});
        }
      }

    //hiển thị dữ liệu lên view, sau khi call service lấy dữ liệu lịch khám bác sĩ thành công
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

    //format lại thời gian từ server để hiển thị và xử lí dưới app
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

    //gửi message thông báo lưu cuộc hẹn thành công
    onSendMessage(userFriend, typeSend, content) {
        // let message = {
        //   typeMsg: typeSend,
        //   content: content
        // }
         this.showMessageSuccess();
        // this.props.onSendMessage(userFriend, message);
    }

    //hiển thị thông báo phía app, đặt hẹn thành công
    showMessageSuccess() {
       let title = Translate(DefineKey.DialogWarning_text_title);
       let content = Translate(DefineKey.Booking_req_appoint_success);
       RNNotificationBanner.Info({ title: title, subTitle: content, duration: 1 });
    }

    //khi chọn ngày khác, thực hiện lấy dữ liệu lịch khám của bác sĩ theo ngày đó
    onChangeDate(date) {
        if(date === this.state.txtDateTime) {
            return;
        }
        this.setState({txtDateTime: date, isUpdateView: true});
        this.props.onGetDataAppointmentSchedule(this.state.doctorId, date);
        
    }
    //hiển thị icon select videocall hoặc select voicecall
    getImageVideo() {
        return this.state.isSelectVideo
            ? require("../../../../assets/icon_video_white.png")
            : require("../../../../assets/icon_video_black.png");
    }
    //hiển thị icon select videocall hoặc select voicecall
    getImagePhone() {
        return !this.state.isSelectVideo
            ? require("../../../../assets/icon_voice_white.png")
            : require("../../../../assets/icon_voice_black.png");
    }

    //click chọn thời gian khám
    onClickItemSuggestTime(itemId, timeAvailable) {
        this.setState({timeAvailable: timeAvailable});
        this.props.onClickTimeAvailable(itemId, this.state.dataTimes);
    }

    //xoá ảnh ghi chú theo position
    onDeleteImage(imageId) {
        var newArray = horizontalFlatListImage.filter(function(item) {
          return item.id !== imageId;
        });
        horizontalFlatListImage = newArray;

        var newArrayBase64 = horizontalFlatListImageBase64.filter(
          function(item) {
            return item.id !== imageId;
          }
        );
        horizontalFlatListImageBase64 = newArrayBase64;

        if (newArray.length === 0) {
          this.setState({
            dataImages: newArray,
            dataImagesBase64: newArrayBase64,
            isHideLayoutImage: true
          });
        } else {
          this.setState({
            dataImages: newArray,
            dataImagesBase64: newArrayBase64,
            isHideLayoutImage: false
          });
        }
    }
    //click nút chọn ảnh note
    onPressOpenSelectImage() {
        ImagePicker.showImagePicker(options, response => {
          if (response.didCancel) {
          } else if (response.error) {
          } else if (response.customButton) {
          } else {
            let sourceURI = { uri: response.uri };
            indexDSImage++;
            if (sourceURI != null) {
              this.setState({ dataImages: [] });
              let objectImage = { id: indexDSImage, image: sourceURI, selected: false };
              horizontalFlatListImage.push(objectImage);
              this.setState({
                dataImages: horizontalFlatListImage,
                isHideLayoutImage: false
              });
            }

            let source = response.data;
            console.log(`nvTien - select image data base 64... = ` + source);
            if (source != null) {
              let objectImage = { id: indexDSImage, image: source, selected: false };
              horizontalFlatListImageBase64.push(objectImage);
              this.setState({
                dataImagesBase64: horizontalFlatListImageBase64,
                isHideLayoutImage: false
              });
            }
          }
        });
    }

    //onclick chọn tên, khám cho bản thân hay khám cho người thân
    onPressSelectNameModal() {
        this.refs.selectNameModal.getWrappedInstance().showSelectNameModal(this.state.userId, this.state.userName);
    }
    //onclick chọn loại bệnh muốn khám
    onPressShowConsultantModal() {
        let dataAppointment = this.state.dataAppointment;
        let objectDisease = {};
        if(dataAppointment != null && !isEmptyObject(dataAppointment)) {
            objectDisease = dataAppointment.disease;
        }
        this.refs.consultantModal.getWrappedInstance().showSelectConsultantModal(objectDisease);

    }
    //onclick chọn thêm mới thành viên gia đình 
    onPressShowAddNewMemberModal() {
        let userId = this.state.userId;
        this.refs.addNewMemberModal.getWrappedInstance().showAddNewFamilyModal(userId);
    }
    //hiển thị date picker
    onShowDatePicker() {
        this.refs.datePicker.onPressDate();
    }
    //lấy ra ngày min date cho datepicker
    getDefaultMinDate() {
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        var curDate = year + "-" + month + "-" + date;
        return curDate;
    }

    getImage() {
        return require("../../../../assets/icon_app.png");
    }

    onPressSaveDataBooking() {
        console.log('save data onPressSaveDataBooking')
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
       
        let objectContent = {
            patientName: this.state.defaultName,
            userId: userId,
            time: hours,
            date: date
        }
        this.setState({msgSend: objectContent})
        this.props.onSaveData(appointment);
    }
    //hiển thị dialog cảnh báo lỗi
    onOpenDialogWarning(errTitle, errContent) {
        this.setState({warningdialogvisible: true, errTitle: errTitle, errContent: errContent});
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
                            titleHead={Translate(DefineKey.Booking_titleHead)}
                        />           
                        <View style={styles.wrapContent}>
                            <View style={styles.layoutContent}>
                                <ScrollView>
                                    <TouchableOpacity
                                        onPress={() => this.onPressSelectNameModal()}
                                    >
                                        {/* giao diện hiển thị chọn khám cho người bệnh, là bản thân hay gia đình */}
                                        <View style={styles.itemSelect}>
                                            <TouchableHighlight style={styles.avataContainer}>
                                                <Image
                                                    style={styles.avata}
                                                    source={this.getImage()}
                                                />
                                            </TouchableHighlight>
                                            <View style={styles.itemContent}>
                                                <Text style={styles.textTitleAppoint}>
                                                    {Translate(DefineKey.Booking_textAppoitment)}
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

                                    {/* giao diện chọn loại bệnh*/}
                                    <TouchableOpacity
                                        onPress={() =>
                                            this.onPressShowConsultantModal()
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
                                                    {Translate(DefineKey.Booking_textConsultant)}
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

                                    {/* giao diện chọn và tìm kiếm cuộc hẹn trong ngày khác*/}
                                    <TouchableOpacity onPress={() => this.onShowDatePicker()}>
                                        <View style={styles.itemSelect}>
                                            <TouchableHighlight style={styles.imageContainer}>
                                                <Image
                                                    style={styles.image}
                                                    source={require("../../../../assets/icon_watch.png")}
                                                />
                                            </TouchableHighlight>
                                            <View style={styles.itemContent}>
                                                <Text style={styles.textTitleAppoint}>
                                                    {Translate(DefineKey.Booking_textAppoitment)}
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

                                            {/* dialog chọn ngày muốn khám, sau đó gọi service lấy lịch khám của ngày đã chọn */}
                                            <DatePicker
                                                ref={"datePicker"}
                                                style={{width: 0, height: 0}}
                                                mode="date"
                                                locale="vi"
                                                format= {Constant.DEFAULT_SYMPLE_DATE}
                                                minDate={this.getDefaultMinDate()}
                                                confirmBtnText="Confirm"
                                                cancelBtnText="Cancel"
                                                onDateChange={date => {
                                                    this.onChangeDate(date);    
                                                    
                                                }}
                                            />

                                        </View>
                                    </TouchableOpacity>

                                    {/* giao diện hiển thị tất cả thời gian bác sĩ sẵn sàng khám */}
                                    <View style={styles.layoutSuggestTime}>
                                        <Text style={styles.textErrorSelectTime}>
                                            {Translate(DefineKey.Booking_textErrorSelectTime)}
                                        </Text>
                                        <View style={styles.layoutFlatlistTime}>
                                            <FlatList
                                                horizontal={true}
                                                data={this.state.dataTimes}
                                                renderItem={({item, index}) => {
                                                    return (
                                                        <ItemTimeAvailable
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

                                        {/* giao diện hiển thị nút chọn videocall hay voice call */}
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
                                                        {Translate(DefineKey.Booking_text_video)}
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                             {/* chọn nút voicecall */}
                                            <TouchableOpacity
                                                style={styles.buttonPhone}
                                                onPress={() => {
                                                    this.setState({isSelectVideo: false});
                                                }}
                                            >
                                                <View style={!this.state.isSelectVideo ? styles.viewCallVideo : styles.viewPhone}>
                                                    <Image style={styles.imageVideo} source={this.getImagePhone()}/>
                                                    <Text style={!this.state.isSelectVideo ? styles.textVideo : styles.textPhone}>
                                                        {Translate(DefineKey.Booking_text_phone)}
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={styles.viewLine}/>

                                    {/* giao diện hiển thị ghi chức năng thêm chú, comment */}
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
                                                            <ItemNoteImage
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

                                        {/* giao diện nút chọn ảnh ghi chú*/}
                                        <TouchableOpacity
                                            style={styles.iconAdd}
                                            onPress={() => this.onPressOpenSelectImage()}
                                        >
                                            <Image
                                                style={styles.iconAdd}
                                                source={require("../../../../assets/icon_camera.png")}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    <Text style={styles.textErrorSelectTime}>
                                        {Translate(DefineKey.Booking_add_note_attach)}
                                    </Text>
                                </ScrollView>
                            </View>
                            <TouchableOpacity
                                style={styles.layoutButtonFooter}
                                onPress={() => this.onPressSaveDataBooking()}
                            >
                                <View style={styles.layoutButtonFooter}>
                                    <Text style={styles.textBtnSave}>
                                        {Translate(DefineKey.Booking_text_btn_save)}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <SelectNameContainer ref={"selectNameModal"} onOpenAddNew={this.onPressShowAddNewMemberModal}/>
                    <SelectDiseaseContainer ref={"consultantModal"}/>
                    <AddMemberFamilyContainer ref={"addNewMemberModal"}/>
                    <DialogLoading loading={this.props.isLoading}/>
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
