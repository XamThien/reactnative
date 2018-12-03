import React, {Component} from "react";
import {View, Text, TouchableHighlight, Image, TouchableOpacity} from "react-native";
import styles from "./ItemDoctorStyle";
import {convertDateToMillisecond, getCurrentDate, getTime} from "../../../utils/Utils";
import {Translate} from "../../../utils/Language"
import DefineKey from "../../../config/language/DefineKey";


export default class ItemDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    onPressItemDoctor(doctorID) {
        this.props.onclick(doctorID);
    }
    

    _getTextAvailable(arrSchedule, curDate, curTime) {
        var textResult = Translate(DefineKey.Schedule_item_doctor_available);
        const curDateMili = convertDateToMillisecond(curDate);
        //case doctor is offline now
        if (this.props.item.isOnline === false) {
            textResult = this._getTextHoursNextOnline(curDateMili, curDate, curTime, arrSchedule);
            return textResult;
        } else {
        //case doctor is online now
        if (arrSchedule != null && arrSchedule.length !== 0) {
            for (let i = 0; i < arrSchedule.length; i++) {
                let scheduleDate = arrSchedule[i].date;
                let dateMili = convertDateToMillisecond(scheduleDate);

                if (curDateMili === dateMili) {
                    let schedule = arrSchedule[i];
                    if (schedule.isAvailable) {
                        textResult = Translate(DefineKey.Schedule_item_doctor_available);
                    } else {
                        textResult = Translate(DefineKey.Schedule_item_doctor_unavailable);
                    }

                    break;
                }
            }
        }
        }
        return textResult;
    }

    //get text next online of doctor with case doctor is offline
    _getTextHoursNextOnline(curDateMili, curDate, curTime, arrSchedule) {
        var textResult = "";
        if (arrSchedule != null && arrSchedule.length !== 0) {
            for (let i = 0; i < arrSchedule.length; i++) {
                var schedule = arrSchedule[i];
                let scheduleDateMili = convertDateToMillisecond(schedule.date);
                if (scheduleDateMili === curDateMili) {
                    let nextTime = this._getHoursFromTo(curDate, curTime, schedule.date, schedule.startTime);
                    if (nextTime > 0) {
                        textResult = Translate(DefineKey.Schedule_item_doctor_time_online) + nextTime +" "+ Translate(DefineKey.Schedule_item_doctor_time_online_2);
                    }

                } else if (scheduleDateMili > curDateMili) {
                    if (textResult !== "") {
                        break;
                    }
                    //get next time online
                    let nextTime = this._getHoursFromTo(getCurrentDate(), getTime(), schedule.date, schedule.startTime);
                    textResult = Translate(DefineKey.Schedule_item_doctor_time_online) + nextTime +" "+ Translate(DefineKey.Schedule_item_doctor_time_online_2);
                    break;
                } else {

                }
            }
        }
        return textResult;
    }

    _getHoursFromTo(curDate, curTime, inputDate, inputTime) {
        let arrCurDate = curDate.split("-");
        let arrCurTime = curTime.split(":");
        let newCurDate = new Date(arrCurDate[0], arrCurDate[1], arrCurDate[2], arrCurTime[0], arrCurTime[1], 0, 0);
        let arrScheduleDate = inputDate.split("-");
        let arrScheduleTime = inputTime.split(":");
        let scheduleDate = new Date(arrScheduleDate[0], arrScheduleDate[1], arrScheduleDate[2], arrScheduleTime[0], arrScheduleTime[1], 0, 0);

        let nextTime = Math.round((scheduleDate.getTime() - newCurDate.getTime()) / 3600000);
        return nextTime;
    }

    _getIconOnline(isOnline) {
        if (isOnline) {
            return (require("../../../../assets/icon_dot_online.png"));
        } else {
            return (require("../../../../assets/icon_dot_offline.png"))
        }
    }

    render() {
        console.log(`render() data item... = ${JSON.stringify(this.props.item)}`)
        return (
            <TouchableOpacity onPress={() => {
                this.onPressItemDoctor(this.props.item.doctor_id)
            }}>
                <View style={!this.props.item.selected ? styles.container : styles.containerClick}>
                    <View style={styles.layoutTitle}>
                        <Text style={styles.titleItem}> {this.props.item.speciality.name.toUpperCase()} </Text>
                    </View>
                    <View style={styles.lineEmpty}/>
                    <View style={styles.itemContent}>
                        <TouchableHighlight style={styles.avataContainer}>
                            {/*<Image*/}
                                {/*source={{*/}
                                    {/*uri: 'https://facebook.github.io/react/logo-og.png',*/}
                                    {/*cache: 'only-if-cached',*/}
                                {/*}}*/}
                                {/*style={styles.avata}*/}
                            {/*/>*/}
                            <Image style={styles.avata} source={require("../../../../assets/icon_app.png")}/>
                        </TouchableHighlight>
                        <View style={styles.contentInfo}>
                            <Text style={styles.name}>{this.props.item.name}</Text>
                            <Text style={styles.education}>{this.props.item.education}</Text>
                            <View style={styles.viewOnline}>
                                <Image style={styles.iconOnline}
                                       source={this._getIconOnline(this.props.item.isonline)}/>
                                <Text style={styles.timeOnline}>{this._getTextAvailable(this.props.item.schedule,this.props.curDate,this.props.curTime)}</Text>
                            </View>
                        </View>
                        <View style={styles.arrowDetail}>
                            <TouchableOpacity style={styles.arrowBtn} onPress={() =>
                                alert("info detail")
                            }>
                                <Image style={styles.imageArrow}
                                       source={require("../../../../assets/icon_arrow_right_white.png")}/>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </TouchableOpacity>
            // <View style={this.props.showEmptyView ? styles.viewEmpty : styles.hideViewEmpty} />
        );
    }
}
