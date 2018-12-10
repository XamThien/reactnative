import { AsyncStorage } from "react-native";
import Constants from "../commons/Constants";
import {convertDateToMillisecond, convertTimeToMillisecond} from "../utils/Utils";
//import {getDataStorage} from "../utils/Utils";
const urlRegister = "http://35.238.126.42:443/register";
const urlLogin = "http://35.238.126.42:443/login";
const urlSpeciality = "http://35.238.126.42:443/api/v1/speciality/getAll";
const urlDoctor = "http://35.238.126.42:443/api/v1/doctor/getDoctorBusiness/";
const urlDoctorImmediately = "http://35.238.126.42:443/api/v1/schedule/getDoctorAvailableByDateAndTime/";
const urlListFamily = "http://35.238.126.42:443/api/v1/user/getFamilyMembers/";
const urlSearchScheduleByDate = "http://35.238.126.42:443/api/v1/appointment/getScheduleByDate/";
const urlSaveAppointment = "http://35.238.126.42:443/api/v1/appointments/user";
const urlAddNewMemberFamily = "http://35.238.126.42:443/api/v1/user/addFamilyMembers";
const urlGetAppointmentSchedule = "http://35.238.126.42:443/api/v1/appointments/user/getAllAppointmentByUserID/";
const urlGetDoctorSchedule = "http://35.238.126.42:443/api/v1/schedule/getDoctorSchedule/";
const urlGetDoctorAppointSchedule = "http://35.238.126.42:443/api/v1/doctor/getDoctorInfoByUserID/";
const urlResetPassword = "";
const urlChangePassword = "";

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

function* doRegisterApi(input) {
    let token = "";
    let xKey = "";  
    let headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token" : token,
        "x-key" : xKey
    };
  var dataBody = JSON.stringify({
    first_name: input.firstName,
    last_name: input.lastName,
    email: input.email,
    phone: input.phoneNumber,
    password: input.passWord
  });
 
  return yield fetch(urlRegister, {
    method: "POST",
    headers: headers,
    body: dataBody
  }).then((response) => response.json())
    .then((responseJson) => {
        return responseJson;
    })
    .catch((error) => {
        console.error("error..." + error);
    });

//   return yield JSON.parse(JSON.stringify(response));
}

function* doGetSpecialityApi() {
    let token = yield getDataStorage(Constants.KEY_STORE_TOKEN);
   // console.log(`doGetSpecialityApi...data = ${JSON.stringify(token)} token...` + token);
    let xKey = "";  
    let headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token" : token,
        "x-key" : xKey
    };
    return yield fetch(urlSpeciality, {
        method: "GET",
        headers: headers,
        body: ""
      }).then((response) => response.json())
        .then((responseJson) => {
            return responseJson;
        })
        .catch((error) => {
            console.error("error..." + error);
        });
}

function* doGetDataDoctorApi(input) {
    let token = yield getDataStorage(Constants.KEY_STORE_TOKEN);
    let getDate = yield convertDateToMillisecond(input.date);
    let xKey = "";  
    let headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token" : token,
        "x-key" : xKey
    };
    var url = urlDoctor + input.specID + "/" + input.typeSearch + "/" + getDate;
    console.log(`nvTien - doGetDataDoctorApi get by date header = ${JSON.stringify(headers)} url = ` + url)
    return yield fetch(url, {
        method: "GET",
        headers: headers,
        body: ""
    }).then((response) => response.json())
        .then((responseJson) => {
           // console.log(`doGetDataDoctorApi response = ${JSON.stringify(responseJson)}`)
            return responseJson;
        })
        .catch((error) => {
            console.error("error..." + error);
        });
}

function* doGetDataDoctorImmediatelyApi(input) {
    let token = yield getDataStorage(Constants.KEY_STORE_TOKEN);
    let getDate = yield convertDateToMillisecond(input.date);
    let getTime = yield convertTimeToMillisecond(input.time);

    let xKey = "";  
    let headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token" : token,
        "x-key" : xKey
    };
    var url = urlDoctorImmediately + getDate + "/" + getTime;
    console.log(`nvTien - doGetDataDoctorApi get by date header = ${JSON.stringify(headers)} url = ` 
    + url + " Date: " +input.date + " Time: " + input.time)
    return yield fetch(url, {
        method: "GET",
        headers: headers,
        body: ""
    }).then((response) => response.json())
        .then((responseJson) => {
            console.log(`doGetDataDoctorApi response = ${JSON.stringify(responseJson)}`)
            return responseJson;
        })
        .catch((error) => {
            console.error("error..." + error);
        });
}

//service lấy tất cả bác sĩ với type search = 0, specId = 1, date = null
function* doGetAllDoctorApi(input) {
    let token = yield getDataStorage(Constants.KEY_STORE_TOKEN);
    let getDate = "null";
    let xKey = "";  
    let headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token" : token,
        "x-key" : xKey
    };
    var url = urlDoctor + input.specID + "/" + input.typeSearch + "/" + getDate;
    console.log(`nvTien - doGetAllDoctorApi get by date header = ${JSON.stringify(headers)} url = ` + url)
    return yield fetch(url, {
        method: "GET",
        headers: headers,
        body: ""
    }).then((response) => response.json())
        .then((responseJson) => {
           // console.log(`doGetAllDoctorApi response = ${JSON.stringify(responseJson)}`)
            return responseJson;
        })
        .catch((error) => {
            console.error("error..." + error);
        });
}

function* doGetListFamilyApi(userId) {
    let token = yield getDataStorage(Constants.KEY_STORE_TOKEN);
    let xKey = "";  
    let headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token" : token,
        "x-key" : xKey
    };
    const url = urlListFamily.concat(userId);

    return yield fetch(url, {
        method: "GET",
        headers: headers,
        body: ""
      }).then((response) => response.json())
        .then((responseJson) => {
            return responseJson;
        })
        .catch((error) => {
            console.error("error..." + error);
        });
}

function* doAddNewMemberFamilyApi(input) {
    let token = yield getDataStorage(Constants.KEY_STORE_TOKEN);
    let xKey = "";  
    let headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token" : token,
        "x-key" : xKey
    };
  let dataBody = JSON.stringify({
    email: input.email,
    phone: "",
    password: "",
    first_name: input.firstName,
    last_name: input.lastName,
    date_birth: input.birthDate,
    sex: input.sex,
    parent_id: input.parentId
    
  });

   return yield fetch(urlAddNewMemberFamily , {
        method: "POST",
        headers: headers,
        body: dataBody
      })
      .then((response) => response.json())
      .then((responseJson) => {
   
        return responseJson;
      })
      .catch((error) => {
        console.error("error..." + error);
      });
}

function* doSaveDataAppointmentApi(input) {
    let token = yield getDataStorage(Constants.KEY_STORE_TOKEN);
    let xKey = "";  
    let headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token" : token,
        "x-key" : xKey
    };
    let dataBody = JSON.stringify({
        user_id: input.id,
        doctor_id: input.id_doctor,
        disease_id: input.id_disease,
        date: input.date,
        hours: input.hours,
        type_call: input.type_call,
        note_text: input.note_text,
        note_images: input.note_images

    });
    console.log("data save body...: " + dataBody + ` Header ${JSON.stringify(headers)}` );
    return yield fetch(urlSaveAppointment, {
        method: "POST",
        headers: headers,
        body: dataBody
    }).then((response) => response.json())
        .then((responseJson) => {
            return responseJson;
        })
        .catch((error) => {
            console.error("error..." + error);
     });
}

//lấy ra danh sách các lịch hẹn mà bệnh nhân đã đặt trước đó
// case 'pending':
// status = 0;
// break;
// case 'accept':
// status = 1;
// break;
// case 'doctorcancel':
// status = 2;
// break;
// case 'usercancel': //type update trạng thái của user, khi user huỷ
// status = 3;
// break;
function* doGetAppointScheduleApi() {
    let token = yield getDataStorage(Constants.KEY_STORE_TOKEN);
    let user_id = yield getDataStorage(Constants.KEY_USER_ID);
    let xKey = "";  
    let headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token" : token,
        "x-key" : xKey
    };
    var url = urlGetAppointmentSchedule + user_id;
    console.log(`doGetAppointScheduleApi url ` + url + ` header: ${JSON.stringify(headers)}`);
    return yield fetch(url, {
        method: "GET",
        headers: headers,
        body: ""
    }).then((response) => response.json())
        .then((responseJson) => {
            console.log(`doGetAppointScheduleApi response = ${JSON.stringify(responseJson)}`)
            return responseJson;
        })
        .catch((error) => {
            console.error("error..." + error);
        });
}

function* doGetDoctorAppointScheduleApi() {
    let token = yield getDataStorage(Constants.KEY_STORE_TOKEN);
    let user_id = yield getDataStorage(Constants.KEY_USER_ID);
    let xKey = "";  
    let headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token" : token,
        "x-key" : xKey
    };
    var url = urlGetDoctorAppointSchedule + user_id;
    console.log(`doGetDoctorAppointScheduleApi url ` + url + ` header: ${JSON.stringify(headers)}`);
    return yield fetch(url, {
        method: "GET",
        headers: headers,
        body: ""
    }).then((response) => response.json())
        .then((responseJson) => {
            console.log(`doGetAppointScheduleApi response = ${JSON.stringify(responseJson)}`)
            return responseJson;
        })
        .catch((error) => {
            console.error("error..." + error);
    });
}

//lấy lịch hẹn của bác sĩ theo ngày
function* doGetAppointmentScheduleApi(input) {
    let token = yield getDataStorage(Constants.KEY_STORE_TOKEN);
    let getDate = yield convertDateToMillisecond(input.date);
    console.log("nvTien - doGetAppointmentScheduleApi token: " + token + " dateMilli: " + getDate);
    let xKey = "";  
    let headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token" : token,
        "x-key" : xKey
    };
    let url = urlGetDoctorSchedule + input.doctor_id + "/" + getDate;
    console.log(`doGetAppointmentScheduleApi...data url = ` + url + ` Header: ${JSON.stringify(headers)}`);
    
   return yield fetch(url , {
        method: "GET",
        headers: headers,
        body: ""
      })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(`doGetAppointmentScheduleApi...data response = ${JSON.stringify(responseJson)} `);
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

// async function getDataStorage(key) {
//     try {
//         const value = await AsyncStorage.getItem(key);
//         console.log(`getDataStorage... ` + value);
//         return value;
//     } catch (error) {
//         console.log("Error retrieving data" + error + " key: " + key);
//         return {};
//     }
// }
function* doResetPasswordApi(email) {
    let xKey = "";
    let headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-key" : xKey
      };
  let dataBody = JSON.stringify({
    email: email,
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
function* doChangePasswordApi(newPassword) {
    let token = yield getDataStorage(Constants.KEY_STORE_TOKEN);
    let userID = yield getDataStorage(Constants.KEY_USER_ID);
    let xKey = "";
    let headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token" : token,
        "x-key" : xKey
      };
  let dataBody = JSON.stringify({
    email: email, userID: userID
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
  doRegisterApi,
  doLoginApi,
  doGetSpecialityApi,
  doGetDataDoctorApi,
  doGetDataDoctorImmediatelyApi,
  doGetListFamilyApi,
  doAddNewMemberFamilyApi,
  doSaveDataAppointmentApi,
  doGetAppointScheduleApi,
  doGetDoctorAppointScheduleApi,
  doGetAppointmentScheduleApi,
  doGetAllDoctorApi,
  doResetPasswordApi,
  doChangePasswordApi
};
