import {
  DOCTOR_INFO_MANAGER_DO_GET_DATA,
  DOCTOR_INFO_MANAGER_DO_GET_DATA_SUCCESS,
  DOCTOR_INFO_MANAGER_DO_GET_DATA_ERROR,
  DOCTOR_INFO_MANAGER_DO_GET_DATA_RESET,
  DOCTOR_INFO_MANAGER_DO_UPDATE_DATA,
  DOCTOR_INFO_MANAGER_DO_UPDATE_DATA_SUCCESS,
  DOCTOR_INFO_MANAGER_DO_UPDATE_DATA_ERROR,
  DOCTOR_INFO_MANAGER_DO_UPDATE_DATA_RESET
} from "../actions/ActionType";
//Saga effects
import { put, takeLatest } from "redux-saga/effects";
import { Api } from "./Api";
import Constants from "../commons/Constants";
import { AsyncStorage } from "react-native";
import { Translate } from "../utils/Language";
import DefineKey from "../config/language/DefineKey";

// ======================== Get doctor profile info ===========================================

function* doGetDoctorInfo(action) {
  try {
    yield put({
      type: DOCTOR_INFO_MANAGER_DO_GET_DATA_RESET,
      hasError: false,
      lastError: undefined
    });

    const response = yield Api.doGetDoctorInfoApi();
    if (response !== null && response.data !== null) {
      let dataResponse = response.data[0];

      //save doctor speciality id: 
      var speciality_id = dataResponse.speciality.id;
      if(speciality_id === null || speciality_id === undefined || speciality_id === "")
      {
        yield saveDataStorage(Constants.KEY_STORE_DOCTOR_SPECIALITY_ID,100); // set defalut neu doctor khong co chuyen nganh
      } else  {
        yield saveDataStorage(Constants.KEY_STORE_DOCTOR_SPECIALITY_ID,dataResponse.speciality.id);
      }
      var doctorInfoArr = [

        yield getDoctorInfoItem(1,DefineKey.Doctor_Info_Manager_Description,dataResponse.description),
        // yield getDoctorInfoItem(1,DefineKey.Doctor_Info_Manager_Age,dataResponse.age),
        yield getDoctorInfoItem(2,DefineKey.Doctor_Info_Manager_Birthday,dataResponse.birthday),
        yield getDoctorInfoItem(3,DefineKey.Doctor_Info_Manager_Birth_Place,dataResponse.birthplace),
        yield getDoctorInfoItem(4,DefineKey.Doctor_Info_Manager_Home_Town,dataResponse.home_town),
        yield getDoctorInfoItem(5,DefineKey.Doctor_Info_Manager_Phone,dataResponse.phone),
        yield getDoctorInfoItem(6,DefineKey.Doctor_Info_Manager_Email,dataResponse.email),
        // { key: "avata", value: (dataResponse.avata === null? "Null": dataResponse.avata) },
        
        yield getDoctorInfoItem(7,DefineKey.Doctor_Info_Manager_Speciality,dataResponse.speciality.name),
        yield getDoctorInfoItem(8,DefineKey.Doctor_Info_Manager_Place,dataResponse.place),
        yield getDoctorInfoItem(9,DefineKey.Doctor_Info_Manager_Department_Name,dataResponse.department_name),
        yield getDoctorInfoItem(10,DefineKey.Doctor_Info_Manager_Position_Name,dataResponse.position_name),
        yield getDoctorInfoItem(11,DefineKey.Doctor_Info_Manager_Disease_Name,dataResponse.disease_name),
        yield getDoctorInfoItem(12,DefineKey.Doctor_Info_Manager_Degree_Name,dataResponse.degree_name),
        yield getDoctorInfoItem(13,DefineKey.Doctor_Info_Manager_Academic_Rank_Name,dataResponse.academic_rank_name),
        yield getDoctorInfoItem(14,DefineKey.Doctor_Info_Manager_Experience,dataResponse.experience),

        yield getDoctorInfoItem(15,DefineKey.Doctor_Info_Manager_Language_Name,dataResponse.language_name),
        yield getDoctorInfoItem(16,DefineKey.Doctor_Info_Manager_Working_Process,dataResponse.working_process),
        yield getDoctorInfoItem(17,DefineKey.Doctor_Info_Manager_Training_Process,dataResponse.training_process),
        yield getDoctorInfoItem(18,DefineKey.Doctor_Info_Manager_Reseach_Work,dataResponse.research_work),
        yield getDoctorInfoItem(29,DefineKey.Doctor_Info_Manager_Certificate,dataResponse.certificate),
        yield getDoctorInfoItem(20,DefineKey.Doctor_Info_Manager_Organization,dataResponse.organization),
        yield getDoctorInfoItem(21,DefineKey.Doctor_Info_Manager_Day_Off,dataResponse.day_off)
        
      ];
      // var loginProfile = yield getDataStorage(Constants.KEY_STORE_USER_PROFILE);
      yield put({
        type: DOCTOR_INFO_MANAGER_DO_GET_DATA_SUCCESS,
        hasError: false,
        lastError: "",
        doctorData: doctorInfoArr
      });
    } else {
      yield put({
        type: DOCTOR_INFO_MANAGER_DO_GET_DATA_ERROR,
        lastError: "Error",
        hasError: true
      });
    }
  } catch (error) {
    let errorText = Translate(DefineKey.ERROR_CONNECT);
    yield put({
      type: DOCTOR_INFO_MANAGER_DO_GET_DATA_ERROR,
      lastError: errorText,
      hasError: true
    });
  }
}
export function* watchDoGetDoctorInfo() {
  yield takeLatest(DOCTOR_INFO_MANAGER_DO_GET_DATA, doGetDoctorInfo);
}

// ======================== Update doctor profile info ===========================================
function* doUpdateDoctorInfo(action) {
  try {
    yield put({
      type: DOCTOR_INFO_MANAGER_DO_GET_DATA_RESET,
      hasError: false,
      lastError: undefined
    });
    // alert("From update doctor info saga: "+JSON.stringify(action.doctorData));
    var speciality_id = yield getDataStorage(Constants.KEY_STORE_DOCTOR_SPECIALITY_ID);
    // alert("From update doctor info saga: "+JSON.stringify(speciality_id));

    const response = yield Api.doUpdateDoctorInfoApi(action.doctorData,speciality_id);
    // alert("From update doctor info saga: "+JSON.stringify(response));

    if (response !== null && response.result === "updated") {
      yield put({
        type: DOCTOR_INFO_MANAGER_DO_UPDATE_DATA_SUCCESS,
        hasError: false,
        lastError: "",
        messageSuccess: Translate(DefineKey.Doctor_Info_Manager_Update_Success_Message)
      });
    } else {
      yield put({
        type: DOCTOR_INFO_MANAGER_DO_GET_DATA_ERROR,
        lastError: Translate(DefineKey.Doctor_Info_Manager_Update_Error_Message),
        hasError: true
      });
    }
  } catch (error) {
    let errorText = Translate(DefineKey.ERROR_CONNECT);
    yield put({
      type: DOCTOR_INFO_MANAGER_DO_GET_DATA_ERROR,
      lastError: errorText,
      hasError: true
    });
  }
}

export function* watchDoUpdateDoctorInfo() {
  yield takeLatest(DOCTOR_INFO_MANAGER_DO_UPDATE_DATA, doUpdateDoctorInfo);
}

// ======================== end Update doctor profile info ===========================================

async function removeDataStorage(key) {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log("Error removeing data" + error);
  }
}

async function getDataStorage(key) {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    // Error retrieving data
    console.log("error... " + error.message);
    return null;
  }
}

async function saveDataStorage(key,value) {
  try {
    await AsyncStorage.setItem(key,value);
  } catch (error) {
    console.log("error... " + error.message);
  }
}

async function getDoctorInfoItem(id, key, value) {
  if (value === null || value === undefined || value === "") {
    return { id: id, key: key, value: "" };
  } else {
    return { id: id, key: key, value: value };
  }
}
