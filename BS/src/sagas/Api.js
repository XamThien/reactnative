import { AsyncStorage } from "react-native";
import Constants from "../commons/Constants";
import {convertDateToMillisecond} from "../utils/Utils";
//import {getDataStorage} from "../utils/Utils";
const urlLogin = "http://35.238.126.42:443/doctor/login";
const urlListAppoint = "http://35.238.126.42:443/api/v1/appointments/doctor/getAllAppointmentByDoctorIDDate/";
const urlListUserAppoint = "http://35.238.126.42:443/api/v1/appointments/doctor/getUserAndDoctorSchedule/";
const urlCreateSchedule = "http://35.238.126.42:443/api/v1/schedule";
const urlUpdateStatusAppoint = "http://35.238.126.42:443/api/v1/appointments/doctor/updateStatus";
const urlGetDoctorSchedule = "http://35.238.126.42:443/api/v1/schedule/getDoctorSchedule/";
const urlGetAllPatients = "http://35.238.126.42:443/api/v1/appointments/doctor/getUserAppointmentByDoctorID/"; 
const urlResetPassword = "http://35.238.126.42:443/doctor/resetPassword";
const urlChangePassword = "http://35.238.126.42:443/api/v2/doctor/changePassword";



function* doLoginApi(input) {
    let xKey = "";
    let headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-key" : xKey
      };
  let dataBody = JSON.stringify({
    email: input.email,
    password: input.password,
    phone: input.phone
  });
   return yield fetch(urlLogin , {
        method: "POST",
        headers: headers,
        body: dataBody
      })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(`doLoginApi...data = ${JSON.stringify(responseJson)} `);
        return responseJson;
      })
      .catch((error) => {
        console.error("error..." + error);
      });
}


function* doGetListAppointApi(date) {
    let token = yield getDataStorage(Constants.KEY_STORE_TOKEN);
    let doctorId = yield getDataStorage(Constants.KEY_DOCTOR_ID);
    let getDate = yield convertDateToMillisecond(date);
    console.log(`doGetListAppointApi... DATE CONVERT...... ` + getDate);
    let xKey = "";  
    let headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token" : token,
        "x-key" : xKey
    };
    
    var url = urlListAppoint + doctorId + "/" + getDate;
    console.log("doGetListAppointApi url...: " + url + ` Header ${JSON.stringify(headers)}` );
    return yield fetch(url, {
        method: "GET",
        headers: headers,
        body: ""
      }).then((response) => response.json())
        .then((responseJson) => {
            console.log(`doGetListAppointApi...data response = ${JSON.stringify(responseJson)} `);
            return responseJson;
        })
        .catch((error) => {
            console.error("error..." + error);
        });
}


function* doGetListUserAppointApi(date) {
    let token = yield getDataStorage(Constants.KEY_STORE_TOKEN);
    let doctorId = yield getDataStorage(Constants.KEY_DOCTOR_ID);
    let getDate = yield convertDateToMillisecond(date);
   // console.log(`doGetSpecialityApi...data = ${JSON.stringify(token)} token...` + token);
    let xKey = "";  
    let headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token" : token,
        "x-key" : xKey
    };
    var url = urlListUserAppoint.concat(doctorId,"/", getDate);
    console.log("doGetListUserAppointApi url...: " + url + ` Header ${JSON.stringify(headers)}` );
    return yield fetch(url, {
        method: "GET",
        headers: headers,
        body: ""
      }).then((response) => response.json())
        .then((responseJson) => {
            console.log(`doGetListUserAppointApi...data response = ${JSON.stringify(responseJson)} `);
            return responseJson;
        })
        .catch((error) => {
            console.error("error..." + error);
        });
}

function* doCreateScheduleApi(input) {
    let token = yield getDataStorage(Constants.KEY_STORE_TOKEN);
    let doctorId = yield getDataStorage(Constants.KEY_DOCTOR_ID);
   
    let xKey = "";  
    let headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token" : token,
        "x-key" : xKey
    };
    let dataBody = {...input, doctor_id: doctorId};
    let parseBody = JSON.stringify(dataBody);

   return yield fetch(urlCreateSchedule , {
        method: "POST",
        headers: headers,
        body: parseBody
      })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(`doCreateScheduleApi...data response = ${JSON.stringify(responseJson)} `);
        return responseJson;
      })
      .catch((error) => {
        console.error("error..." + error);
      });
}

function* doUpdateStatusAppointApi(input) {
    let token = yield getDataStorage(Constants.KEY_STORE_TOKEN);
    let xKey = "";  
    let headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token" : token,
        "x-key" : xKey
    };
  let dataBody = JSON.stringify({
    appointment_id: input.appointment_id,
    action: input.status
  });
  console.log("doUpdateStatusAppointApi url...: " + urlUpdateStatusAppoint + ` Header ${JSON.stringify(headers)}` 
+ ` dataBody: ` + dataBody );
   return yield fetch(urlUpdateStatusAppoint , {
        method: "POST",
        headers: headers,
        body: dataBody
      })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(`doUpdateStatusAppointApi...data = ${JSON.stringify(responseJson)} `);
        return responseJson;
      })
      .catch((error) => {
        console.error("error..." + error);
      });
}

function* doWorkScheduleApi(date) {
  let token = yield getDataStorage(Constants.KEY_STORE_TOKEN);
  let doctorId = yield getDataStorage(Constants.KEY_DOCTOR_ID);
  let getDate = yield convertDateToMillisecond(date);

  let xKey = "";  
  let headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-access-token" : token,
      "x-key" : xKey
  };
  let url = urlGetDoctorSchedule + doctorId + "/" + getDate;
  console.log(`doDoctorScheduleApi...data url = ` + url + ` Header: ${JSON.stringify(headers)}`);
  
 return yield fetch(url , {
      method: "GET",
      headers: headers,
      body: ""
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(`doDoctorScheduleApi...data response = ${JSON.stringify(responseJson)} `);
      return responseJson;
    })
    .catch((error) => {
      console.error("error..." + error);
    });
}

function* doGetAllPatientApi() {
  let token = yield getDataStorage(Constants.KEY_STORE_TOKEN);
  let doctorId = yield getDataStorage(Constants.KEY_DOCTOR_ID);

  let xKey = "";  
  let headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-access-token" : token,
      "x-key" : xKey
  };
  let url = urlGetAllPatients + doctorId;
  console.log(`doGetAppPatientApi...data url = ` + url + ` Header: ${JSON.stringify(headers)}`);
  
 return yield fetch(url , {
      method: "GET",
      headers: headers,
      body: ""
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(`doGetAppPatientApi...data response = ${JSON.stringify(responseJson)} `);
      return responseJson;
    })
    .catch((error) => {
      console.error("error..." + error);
    });
}

const getDataStorage = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value;
    } catch (error) {
      // Error retrieving data
      console.log("error... " + error.message);
      return null;
    }
}
function* doResetPasswordApi(email) {
  let xKey = "";
  let headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-key" : xKey
    };
let dataBody = JSON.stringify({
  email: email
});
 return yield fetch(urlResetPassword , {
      method: "POST",
      headers: headers,
      body: dataBody
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(`doResetPasswordApi...data = ${JSON.stringify(responseJson)} `);
      return responseJson;
    })
    .catch((error) => {
      console.error("error..." + error);
    });
}
function* doChangePasswordApi(newPassword,old_password) {
  let token = yield getDataStorage(Constants.KEY_STORE_TOKEN);
  let doctor_id = yield getDataStorage(Constants.KEY_DOCTOR_ID);
  // alert(userID);
  let xKey = "";
  let headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-access-token" : token,
      "x-key" : xKey
    };
let dataBody = JSON.stringify({
  doctor_id: doctor_id, old_password:old_password,new_password: newPassword
});
 return yield fetch(urlChangePassword , {
      method: "POST",
      headers: headers,
      body: dataBody
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(`doChangePasswordApi...data = ${JSON.stringify(responseJson)} `);
      return responseJson;
    })
    .catch((error) => {
      console.error("error..." + error);
    });
}

export const Api = {
  doLoginApi,
  doGetListAppointApi,
  doGetListUserAppointApi,
  doCreateScheduleApi,
  doUpdateStatusAppointApi,
  doWorkScheduleApi,
  doGetAllPatientApi,
  doResetPasswordApi,
  doChangePasswordApi
};
