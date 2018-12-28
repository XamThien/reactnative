import { AsyncStorage } from "react-native";
import Constants from "../commons/Constants";
import ApiString from "./ApiString";
import {
  convertDateToMillisecond,
  convertTimeToMillisecond
} from "../utils/Utils";
const TIME_OUT_SERVICE = 45 * 1000; //timeout call service 45s

//service login app, trả về user profile của bệnh nhân
function* doLoginApi(input) {
  console.log("nvTien - Api doLoginApi...");
  let xKey = "";
  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "x-key": xKey
  };
  let dataBody = JSON.stringify({
    email: input.email,
    password: input.password,
    phone: input.phone
  });
  return yield handlePostRequest(ApiString.URL_Login, headers, dataBody);
}

//service lấy lịch làm việc của bác sĩ theo ngày
function* doGetWorkScheduleApi(date) {
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
  let url = ApiString.URL_GetDoctorSchedule + doctorId + "/" + getDate;
  return yield handleGetRequest(url, headers);
}

//service tạo mới lịch làm việc của bác sĩ
function* doCreateNewScheduleApi(input) {
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

  return yield handlePostRequest(url, headers, dataBody);
}


// function get doctor info
function* doGetDoctorInfoApi() {
  let token = yield getDataStorage(Constants.KEY_STORE_TOKEN);
  let doctorId = yield getDataStorage(Constants.KEY_DOCTOR_ID);

  let xKey = "";
  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "x-access-token": token,
    "x-key": xKey
  };
  let url = ApiString.URL_GetDoctorInfo.concat(doctorId);

  return yield handleGetRequest(url, headers);
}

// api: update thong tin bac sy
function* doUpdateDoctorInfoApi(doctorData,speciality_id) {
  let token = yield getDataStorage(Constants.KEY_STORE_TOKEN);
  let doctor_id = yield getDataStorage(Constants.KEY_DOCTOR_ID);
  let doctor_profile= yield getDataStorage(Constants.KEY_STORE_USER_PROFILE);
  let xKey = "";
  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "x-access-token": token,
    "x-key": xKey
  };
  // alert("From update doctor api 1: "+JSON.stringify(doctorData));

  let dataBody = {
    ...doctorData, 
    doctor_id:doctor_id,
    speciality: {
      id: speciality_id,
      name: doctorData.speciality_name
    },
    age: 11,
    isonline: false,
    password: doctor_profile.password,
    avata: ""
  };
  let parseBody = JSON.stringify(dataBody);
  // alert("From update doctor api 2: "+parseBody);
   return yield handlePostRequest(ApiString.URL_UpdateDoctorInfo, headers, parseBody);
}

//api lấy thời gian cài đặt notify trên server
function* doGetTimeSettingNotificationApi() {
  let token = yield getDataStorage(Constants.KEY_STORE_TOKEN);
  let userID = yield getDataStorage(Constants.KEY_DOCTOR_ID);

  let xKey = "";
  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "x-access-token": token,
    "x-key": xKey
  };
  let dataBody = JSON.stringify({
    doctor_id: userID
  });
  return yield handlePostRequest(ApiString.URL_Get_TimeSettingNotification, headers, dataBody);
  
}
//api cập nhật thời gian setting notify
function* doUpdateTimeSettingNotificationApi(time) {
  let token = yield getDataStorage(Constants.KEY_STORE_TOKEN);
  let userID = yield getDataStorage(Constants.KEY_DOCTOR_ID);

  let xKey = "";
  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "x-access-token": token,
    "x-key": xKey
  };
  let dataBody = JSON.stringify({
    doctor_id: userID,
    notify: time * 60000
  });
  return yield handlePostRequest(ApiString.URL_Update_TimeSettingNotification, headers, dataBody);
}

// api: reset password
function* doResetPasswordApi(email) {
  let xKey = "";
  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "x-key": xKey
  };
  let dataBody = JSON.stringify({
    email: email
  });
  return yield handlePostRequest(ApiString.URL_Reset_Password, headers, dataBody);
}

// api: change password
function* doChangePasswordApi(newPassword, old_password) {
  let token = yield getDataStorage(Constants.KEY_STORE_TOKEN);
  let doctor_id = yield getDataStorage(Constants.KEY_DOCTOR_ID);
  // alert(userID);
  let xKey = "";
  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "x-access-token": token,
    "x-key": xKey
  };
  let dataBody = JSON.stringify({
    doctor_id: doctor_id,
    old_password: old_password,
    new_password: newPassword
  });
  return yield handlePostRequest(ApiString.URL_Change_Password, headers, dataBody);
}

export const Api = {
  doLoginApi,
  doGetWorkScheduleApi,
  doCreateNewScheduleApi,
  doGetDoctorInfoApi,
  doUpdateDoctorInfoApi,
  doGetTimeSettingNotificationApi,
  doUpdateTimeSettingNotificationApi,
  doChangePasswordApi,
  doResetPasswordApi,
  

};

//function dùng để request lên server theo method POST
function* handlePostRequest(urlApi, headers, dataBody) {
  return yield timeout(
     TIME_OUT_SERVICE,
     fetch(urlApi, {
       method: "POST",
       headers: headers,
       body: dataBody
     })
   )
     .then(response => response.json())
     .then(responseJson => {
       console.log(`handlePostRequest...data response = ${JSON.stringify(responseJson)} `);
       return responseJson;
     })
     .catch(error => {
       console.error("error..." + error);
       return null;
     });
 }
 
 //function dùng để request lên server theo method GET
 function* handleGetRequest(urlApi, headers) {
  console.log(`handleGetRequest...data request urlApi: ` + urlApi + ` header= ${JSON.stringify(headers)}`);
   return yield timeout(
     TIME_OUT_SERVICE,
     fetch(urlApi, {
       method: "GET",
       headers: headers,
       body: ""
     })
   )
     .then(response => response.json())
     .then(responseJson => {
       console.log(`handleGetRequest...data response = ${JSON.stringify(responseJson)} `);
       return responseJson;
     })
     .catch(error => {
       console.error("error..." + error);
       return null;
     });
 }

//xử lí set timeout cho call service, trường hợp server không trả về response
function timeout(ms, promise) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      reject(new Error("timeout"));
    }, ms);
    promise.then(resolve, reject);
  });
}

//lấy dữ liệu trong cache ra
const getDataStorage = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    // Error retrieving data
    console.log("error... " + error.message);
    return null;
  }
};
