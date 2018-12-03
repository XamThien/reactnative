import {
    FETCH_ALL_DATA_SPECIALIZED,
    FETCH_SPACIALIZED_SUCCESS,
    FETCH_DOCTOR_SUCCESS,
    FETCH_SPACIALIZED_FAIL,
    FETCH_DOCTOR_FAIL,
    SCHEDULE_LOAD_USER_FROFILE_SUCCESS,
    SCHEDULE_PRESS_SELECT_DATE,
    SCHEDULE_PRESS_SELECT_IMMEDIATELY, FIND_DOCTOR_BY_ID,
    SCHEDULE_MESSAGE_EVENTS_CALLBACK,
    VIDEO_CALL_RESET_MESSAGE_CALLBACK,
    VIDEO_CALL_LISTENER_GET_FRIEND_ONLINE
} from "../actions/ActionType";

var saveDataDoctor = [];
//spectId là id cuả chuyên ngành bác sĩ khám, mặc định = 1 tức là lấy ra tất cả chuyên ngành
var specID = 1;

export const _INITIAL_STATE_SPECIALIZE = {
    specializedData: [],
    dataAllDoctors: [],
    isLoading: false,
    lastError: undefined,
    hasError: false,
    dataDoctors: [],
    doctorSelected: {},
    actionCallbackDoctor: ""
};

export const specializedReducers = (state = _INITIAL_STATE_SPECIALIZE, action) => {
    console.log(`ScheduleReducers specializedReducer action: ` + action.type);
    switch (action.type) {
        case FETCH_ALL_DATA_SPECIALIZED:
            return {
                ...state,
                isLoading: true,
                actionCallbackDoctor: ""
            };

        case FETCH_SPACIALIZED_SUCCESS:
            return {
                ...state,
                lastError: "",
                specializedData: action.dataSpecialized,
                dataAllDoctors: action.dataAllDoctors,
                actionCallbackDoctor: ""
            };
        case FETCH_SPACIALIZED_FAIL:
            return {
                ...state,
                lastError: action.lastError,
                hasError: true,
                isLoading: false,
                specializedData: [],
                dataAllDoctors: [],
                actionCallbackDoctor: ""
            };
        case SCHEDULE_PRESS_SELECT_DATE:
            console.log("nvTien - SCHEDULE_PRESS_SELECT_DATE " + state.isLoading);
            return {
                ...state,
                isLoading: true,
                actionCallbackDoctor: ""
            };
        case SCHEDULE_PRESS_SELECT_IMMEDIATELY:
            console.log("nvTien - SCHEDULE_PRESS_SELECT_IMMEDIATELY " + state.isLoading);
            return {
                ...state,
                isLoading: true,
                actionCallbackDoctor: ""
            };
        case FETCH_DOCTOR_SUCCESS:
            saveDataDoctor = action.dataDoctor;
            specID = action.specID;
            return {
                ...state,
                lastError: "",
                hasError: false,
                isLoading: false,
                dataDoctors: _findDataDoctor(action.specID, action.dataDoctor)
            };

        case FETCH_DOCTOR_FAIL:
            return {
                ...state,
                lastError: action.lastError,
                hasError: true,
                isLoading: false,
                dataDoctors: []
            };
        case FIND_DOCTOR_BY_ID:
            specID = action.specID;
            return {
                ...state,
                lastError: "",
                hasError: false,
                isLoading: false,
                dataDoctors: _findDataDoctor(action.specID, saveDataDoctor)
            };
        case SCHEDULE_MESSAGE_EVENTS_CALLBACK:
        return {
            ...state,
            actionCallbackDoctor: action.actionCallbackDoctor
        };
        case VIDEO_CALL_RESET_MESSAGE_CALLBACK: 
        return {
          ...state,
          actionCallbackDoctor: ""
        };
        case VIDEO_CALL_LISTENER_GET_FRIEND_ONLINE:
        saveDataDoctor = action.userFriends;
        return {
            ...state,
            dataDoctors: _findDataDoctor(specID, saveDataDoctor)
          };
        default:
            return state; //state does not change
    }
};
export const getProfilesReducers = (userProfiles = [], action) => {
    switch (action.type) {
        case SCHEDULE_LOAD_USER_FROFILE_SUCCESS:
        console.log(`nvTien-data fetchUserProfiles SCHEDULE_LOAD_USER_FROFILE_SUCCESS.... 
        ${JSON.stringify(action.userProfiles)}`);
            return action.userProfiles;
        default:
            return userProfiles;
    }
};

function _findDataDoctor(key, dataDoctors) {
    var arrCompareDoctor = [];
    if (key == "1") {
        return dataDoctors;
    }
    if (dataDoctors === undefined || dataDoctors.length == 0) {
        // array empty or does not exist
        return arrCompareDoctor;
    }
    dataDoctors.map(object => {
        console.log("Cur ID..." + key + ` input id: ` + key);
        if (key == object.speciality.id) {
            arrCompareDoctor.push(object);
        }
    });
    return arrCompareDoctor;
}



