import { AsyncStorage } from "react-native";
import Constants from "../commons/Constants";
import { convertDateToMillisecond } from "../utils/Utils";
import ApiString from "./ApiString";
//import {getDataStorage} from "../utils/Utils";
const urlLogin = "http://35.238.126.42:443/doctor/login";
const urlListAppoint =
  "http://35.238.126.42:443/api/v1/appointments/doctor/getAllAppointmentByDoctorIDDate/";
const urlListUserAppoint =
  "http://35.238.126.42:443/api/v1/appointments/doctor/getUserAndDoctorSchedule/";
const urlCreateSchedule = "http://35.238.126.42:443/api/v1/schedule";
const urlUpdateStatusAppoint =
  "http://35.238.126.42:443/api/v1/appointments/doctor/updateStatus";
const urlGetDoctorSchedule =
  "http://35.238.126.42:443/api/v1/schedule/getDoctorSchedule/";
const urlGetAllPatients =
  "http://35.238.126.42:443/api/v1/appointments/doctor/getUserAppointmentByDoctorID/";
const urlResetPassword = "http://35.238.126.42:443/doctor/resetPassword";
const urlChangePassword =
  "http://35.238.126.42:443/api/v2/doctor/changePassword";
const urlGetDoctorInfo =
  "http://35.238.126.42:443/api/v1/doctor/getDoctorByID/";
const urlUpdateDoctorInfo =
  "http://35.238.126.42:443/api/v1/doctor/updateDoctor/";
function* doLoginApi(input) {
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
  return yield fetch(urlLogin, {
    method: "POST",
    headers: headers,
    body: dataBody
  })
    .then(response => response.json())
    .then(responseJson => {
      console.log(`doLoginApi...data = ${JSON.stringify(responseJson)} `);
      return responseJson;
    })
    .catch(error => {
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
    "x-access-token": token,
    "x-key": xKey
  };

  var url = urlListAppoint + doctorId + "/" + getDate;
  console.log(
    "doGetListAppointApi url...: " + url + ` Header ${JSON.stringify(headers)}`
  );
  return yield fetch(url, {
    method: "GET",
    headers: headers,
    body: ""
  })
    .then(response => response.json())
    .then(responseJson => {
      console.log(
        `doGetListAppointApi...data response = ${JSON.stringify(responseJson)} `
      );
      return responseJson;
    })
    .catch(error => {
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
    "x-access-token": token,
    "x-key": xKey
  };
  var url = urlListUserAppoint.concat(doctorId, "/", getDate);
  console.log(
    "doGetListUserAppointApi url...: " +
      url +
      ` Header ${JSON.stringify(headers)}`
  );
  return yield fetch(url, {
    method: "GET",
    headers: headers,
    body: ""
  })
    .then(response => response.json())
    .then(responseJson => {
      console.log(
        `doGetListUserAppointApi...data response = ${JSON.stringify(
          responseJson
        )} `
      );
      return responseJson;
    })
    .catch(error => {
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
    "x-access-token": token,
    "x-key": xKey
  };
  let dataBody = { ...input, doctor_id: doctorId };
  let parseBody = JSON.stringify(dataBody);

  return yield fetch(urlCreateSchedule, {
    method: "POST",
    headers: headers,
    body: parseBody
  })
    .then(response => response.json())
    .then(responseJson => {
      console.log(
        `doCreateScheduleApi...data response = ${JSON.stringify(responseJson)} `
      );
      return responseJson;
    })
    .catch(error => {
      console.error("error..." + error);
    });
}

function* doUpdateStatusAppointApi(input) {
  let token = yield getDataStorage(Constants.KEY_STORE_TOKEN);
  let xKey = "";
  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "x-access-token": token,
    "x-key": xKey
  };
  let dataBody = JSON.stringify({
    appointment_id: input.appointment_id,
    action: input.status
  });
  console.log(
    "doUpdateStatusAppointApi url...: " +
      urlUpdateStatusAppoint +
      ` Header ${JSON.stringify(headers)}` +
      ` dataBody: ` +
      dataBody
  );
  return yield fetch(urlUpdateStatusAppoint, {
    method: "POST",
    headers: headers,
    body: dataBody
  })
    .then(response => response.json())
    .then(responseJson => {
      console.log(
        `doUpdateStatusAppointApi...data = ${JSON.stringify(responseJson)} `
      );
      return responseJson;
    })
    .catch(error => {
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
    "x-access-token": token,
    "x-key": xKey
  };
  let url = urlGetDoctorSchedule + doctorId + "/" + getDate;
  console.log(
    `doDoctorScheduleApi...data url = ` +
      url +
      ` Header: ${JSON.stringify(headers)}`
  );

  return yield fetch(url, {
    method: "GET",
    headers: headers,
    body: ""
  })
    .then(response => response.json())
    .then(responseJson => {
      console.log(
        `doDoctorScheduleApi...data response = ${JSON.stringify(responseJson)} `
      );
      return responseJson;
    })
    .catch(error => {
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
    "x-access-token": token,
    "x-key": xKey
  };
  let url = urlGetAllPatients + doctorId;
  console.log(
    `doGetAppPatientApi...data url = ` +
      url +
      ` Header: ${JSON.stringify(headers)}`
  );

  return yield fetch(url, {
    method: "GET",
    headers: headers,
    body: ""
  })
    .then(response => response.json())
    .then(responseJson => {
      console.log(
        `doGetAppPatientApi...data response = ${JSON.stringify(responseJson)} `
      );
      return responseJson;
    })
    .catch(error => {
      console.error("error..." + error);
    });
}

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
  return yield fetch(urlResetPassword, {
    method: "POST",
    headers: headers,
    body: dataBody
  })
    .then(response => response.json())
    .then(responseJson => {
      console.log(
        `doResetPasswordApi...data = ${JSON.stringify(responseJson)} `
      );
      return responseJson;
    })
    .catch(error => {
      console.error("error..." + error);
    });
}
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
  return yield fetch(urlChangePassword, {
    method: "POST",
    headers: headers,
    body: dataBody
  })
    .then(response => response.json())
    .then(responseJson => {
      console.log(
        `doChangePasswordApi...data = ${JSON.stringify(responseJson)} `
      );
      return responseJson;
    })
    .catch(error => {
      console.error("error..." + error);
    });
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
  let url = urlGetDoctorInfo.concat(doctorId);

  return yield fetch(url, {
    method: "GET",
    headers: headers,
    body: ""
  })
    .then(response => response.json())
    .then(responseJson => {
      return responseJson;
    })
    .catch(error => {
      console.error("error..." + error);
    });
}
// api: update thong tin bac sy
function* doUpdateDoctorInfoApi(doctorData,speciality_id) {
  let token = yield getDataStorage(Constants.KEY_STORE_TOKEN);
  let doctor_id = yield getDataStorage(Constants.KEY_DOCTOR_ID);
  let doctor_profile= yield getDataStorage(Constants.KEY_STORE_USER_PROFILE);

  // alert("From update doctor info saga: "+urlUpdateDoctorInfo.concat(doctor_id));

  let xKey = "";
  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "x-access-token": token,
    "x-key": xKey
  };
  let dataBody = JSON.stringify({
    speciality: {
      id: speciality_id,
      name: doctorData.speciality_name
    },
    first_name: doctorData.first_name,
    last_name: doctorData.last_name,
    name: doctorData.last_name + " "+ doctorData.first_name,
    home_town: doctorData.home_town,
    birthplace: doctorData.birthplace,
    age: 11,
    isonline: false,
    description: doctorData.description,
    avata: "",
    email: doctorData.email,
    phone: "4321",
    password: doctor_profile.password,
    birthday: doctorData.birthday,
    training_process: doctorData.training_process,
    department_name: doctorData.department_name,
    day_off: doctorData.day_off,
    certificate: doctorData.certificate,
    working_process: doctorData.working_process,
    language_name: doctorData.language_name,
    experience: doctorData.experience,
    degree_name: doctorData.degree_name,
    academic_rank_name: academic_rank_name,
    disease_name: doctorData.disease_name,
    organization: doctorData.organization,
    research_work: doctorData.research_work,
    place: doctorData.place,
    position_name: doctorData.position_name
  });

  alert("From update infor saga: "+dataBody+"====>"+urlUpdateDoctorInfo.concat(doctor_id));
   return yield handlePostRequest(urlUpdateDoctorInfo.concat(doctor_id), headers, dataBody);
  // return {result:"update"};
  // return yield fetch(urlUpdateDoctorInfo.concat(doctor_id), {
  //   method: "POST",
  //   headers: headers,
  //   body: dataBody
  // })
  //   .then(response => response.json())
  //   .then(responseJson => {
  //     return responseJson;
  //   })
  //   .catch(error => {
  //     console.error("error..." + error);
  //   });

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
    user_id: userID,
    notify: time * 60000
  });
  return yield handlePostRequest(ApiString.URL_Update_TimeSettingNotification, headers, dataBody);
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
  doChangePasswordApi,
  doGetDoctorInfoApi,
  doUpdateDoctorInfoApi,
  doUpdateTimeSettingNotificationApi,
  doGetTimeSettingNotificationApi
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
       console.log(
         `handleGetRequest...data response = ${JSON.stringify(responseJson)} `
       );
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