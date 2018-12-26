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

//service đăng ký tài khoản người dùng
function* doRegisterApi(input) {
  let token = "";
  let xKey = "";
  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "x-access-token": token,
    "x-key": xKey
  };
  var dataBody = JSON.stringify({
    first_name: input.firstName,
    last_name: input.lastName,
    email: input.email,
    phone: input.phoneNumber,
    password: input.passWord
  });
  return yield handlePostRequest(ApiString.URL_Register, headers, dataBody);
 
}

//service lấy danh sách tất cả các chuyên ngành
function* doGetSpecialityApi() {
  let token = yield getDataStorage(Constants.KEY_STORE_TOKEN);
  let xKey = "";
  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "x-access-token": token,
    "x-key": xKey
  };
  return yield handleGetRequest(ApiString.URL_Speciality, headers);
}

//service lấy danh sách bác sĩ khám ngay lập tức, tức chưa có cuộc hẹn nào ở thời điểm hiện tại
function* doGetDataDoctorImmediatelyApi(input) {
  let token = yield getDataStorage(Constants.KEY_STORE_TOKEN);
  let getDate = yield convertDateToMillisecond(input.date);
  let getTime = yield convertTimeToMillisecond(input.time);
  let xKey = "";
  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "x-access-token": token,
    "x-key": xKey
  };
  var url = ApiString.URL_Doctor_Immediately + getDate + "/" + getTime;
  return yield handleGetRequest(url, headers);
}

//service lấy danh sách bác sĩ theo ngày
function* doGetDoctorByDateApi(input) {
  let token = yield getDataStorage(Constants.KEY_STORE_TOKEN);
  let getDate = yield convertDateToMillisecond(input.date);
  let xKey = "";
  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "x-access-token": token,
    "x-key": xKey
  };
  var url =
    ApiString.URL_Doctor_by_date +
    input.specID +
    "/" +
    input.typeSearch +
    "/" +
    getDate;
  return yield handleGetRequest(url, headers);
}

//service lưu dữ liệu đặt hẹn khám bệnh
function* doSaveDataBookingApi(input) {
  let token = yield getDataStorage(Constants.KEY_STORE_TOKEN);
  let xKey = "";
  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "x-access-token": token,
    "x-key": xKey
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
  return yield handlePostRequest(ApiString.URL_Save_Booking, headers, dataBody);
}

//service lấy lịch khám của bác sĩ theo ngày chọn
function* doGetDataBookingApi(input) {
  let token = yield getDataStorage(Constants.KEY_STORE_TOKEN);
  let getDate = yield convertDateToMillisecond(input.date);
  let xKey = "";
  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "x-access-token": token,
    "x-key": xKey
  };
  let url = ApiString.URL_Get_Data_Booking + input.doctor_id + "/" + getDate;
  return yield handleGetRequest(url, headers);
}

//service lấy lịch danh sách thành viên gia đình
function* doGetListFamilyApi(userId) {
  let token = yield getDataStorage(Constants.KEY_STORE_TOKEN);
  let xKey = "";
  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "x-access-token": token,
    "x-key": xKey
  };
  const url = ApiString.URL_ListFamily.concat(userId);
  return yield handleGetRequest(url, headers);
}

//service thêm thành viên mới gia đình
function* doAddMemberFamilyApi(input) {
  let token = yield getDataStorage(Constants.KEY_STORE_TOKEN);
  let xKey = "";
  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "x-access-token": token,
    "x-key": xKey
  };
  let dataBody = JSON.stringify({
    email: input.email,
    phone: "",
    password: "",
    email: input.email,
    first_name: input.firstName,
    last_name: input.lastName,
    date_birth: yield convertDateToMillisecond(input.birthDate),
    relation: input.relationship,
    sex: input.sex,
    parent_id: input.parent_id
  });
  return yield handlePostRequest(ApiString.URL_AddMemberFamily, headers, dataBody);
}

//api lấy thời gian cài đặt notify trên server
function* doGetTimeSettingNotificationApi() {
  let token = yield getDataStorage(Constants.KEY_STORE_TOKEN);
  let userID = yield getDataStorage(Constants.KEY_USER_ID);

  let xKey = "";
  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "x-access-token": token,
    "x-key": xKey
  };
  let dataBody = JSON.stringify({
    user_id: userID
  });
  return yield handlePostRequest(ApiString.URL_Get_TimeSettingNotification, headers, dataBody);
  
}

//api cập nhật thời gian setting notify
function* doUpdateTimeSettingNotificationApi(time) {
  let token = yield getDataStorage(Constants.KEY_STORE_TOKEN);
  let userID = yield getDataStorage(Constants.KEY_USER_ID);

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

// function delete family member
function* doDeleteFamilyMemberApi(memberID) {
  let token = yield getDataStorage(Constants.KEY_STORE_TOKEN);
  let xKey = "";
  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "x-access-token": token,
    "x-key": xKey
  };
  let dataBody = "";
  let url = ApiString.URL_DeleteFamilyMember.concat(memberID);
  return yield handlePostRequest(url, headers, dataBody);
}

// function update family member info
function* doUpdateFamilyMemberApi(memberInfor) {
  let token = yield getDataStorage(Constants.KEY_STORE_TOKEN);
  let userID = yield getDataStorage(Constants.KEY_USER_ID);

  let xKey = "";
  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "x-access-token": token,
    "x-key": xKey
  };
  let dataBody = JSON.stringify({
    first_name: memberInfor.firstName,
    last_name: memberInfor.lastName,
    full_name: memberInfor.firstName + " " + memberInfor.lastName,
    email: memberInfor.email,
    date_birth: memberInfor.birthDate,
    sex: memberInfor.sex,
    relation: memberInfor.relationship,
    parent_id: userID
  });
  var url = ApiString.URL_UpdateFamilyMember.concat(memberInfor.user_id);
  return yield handlePostRequest(url, headers, dataBody);
}

// service update thong tin user
function* doUpdateUserInfoApi(dateUser) {
  let token = yield getDataStorage(Constants.KEY_STORE_TOKEN);
  let userID = yield getDataStorage(Constants.KEY_USER_ID);

  let xKey = "";
  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "x-access-token": token,
    "x-key": xKey
  };
  let dataBody = JSON.stringify({
    user_id: userID,
    first_name: dateUser.first_name,
    last_name: dateUser.last_name,
    phone: dateUser.phone,
    sex: 1,
    date_birth: dateUser.date_birth,
    avata: dateUser.avata
  });
  return yield handlePostRequest(ApiString.URL_UpdateUserInfo, headers, dataBody);
}

//Service resetpassword, khi người dùng quên mật khẩu, hệ thống sẽ gen pass mới và gửi lại vào mail đã đăng ký
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
  return yield handlePostRequest(ApiString.URL_ResetPassword, headers, dataBody);
}

//service change password, người dùng thay đổi mật khẩu
function* doChangePasswordApi(newPassword, old_password) {
  let token = yield getDataStorage(Constants.KEY_STORE_TOKEN);
  let userID = yield getDataStorage(Constants.KEY_USER_ID);
  // alert(userID);
  let xKey = "";
  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "x-access-token": token,
    "x-key": xKey
  };
  let dataBody = JSON.stringify({
    user_id: userID,
    old_password: old_password,
    new_password: newPassword
  });
  return yield handlePostRequest(ApiString.URL_ChangePassword, headers, dataBody);
}

export const Api = {
  doLoginApi,
  doRegisterApi,
  doGetSpecialityApi,
  doGetDataDoctorImmediatelyApi,
  doGetDoctorByDateApi,
  doSaveDataBookingApi,
  doGetDataBookingApi,
  doGetListFamilyApi,
  doAddMemberFamilyApi,
  doGetTimeSettingNotificationApi,
  doUpdateTimeSettingNotificationApi,
  doDeleteFamilyMemberApi,
  doUpdateFamilyMemberApi,
  doUpdateUserInfoApi,
  doResetPasswordApi,
  doChangePasswordApi
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
