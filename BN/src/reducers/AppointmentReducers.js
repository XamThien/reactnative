import {
    APPOINTMENT_GET_TIME_SUCCESS,
    APPOINTMENT_GET_TIME_FAIL,
    APPOINTMENT_CLICK_ITEM_TIME,
    APPOINTMENT_SAVE_DATA_SUCCESS,
    APPOINTMENT_SAVE_DATA_FAIL,
    APPOINTMENT_RESET_LOADING,
    APPOINTMENT_RESET_DATA,

    APPOINTMENT_GET_DATA_SCHEDULE_SUCCESS,
    APPOINTMENT_GET_DATA_SCHEDULE_FAIL

} from "../actions/ActionType";

export const _INITIAL_STATE_ = {
    dataTimes: [],
    dataAppoints: {},
    isLoading: false,
    lastError: undefined,
    hasError: false,
    isSaveSuccess: false
};

var mDataTimes = [];

export const saveDataAppointReducer = (state = _INITIAL_STATE_, action) => {
    switch (action.type) {
        case APPOINTMENT_SAVE_DATA_SUCCESS:
            return {
                ...state,
                hasError: action.hasError,
                lastError: "",
                isLoading: false,
                isSaveSuccess: true
            };
        case APPOINTMENT_SAVE_DATA_FAIL:
            return {
                ...state,
                lastError : action.lastError,
                hasError : action.hasError,
                isLoading: false,
                isSaveSuccess: false
            };
        case APPOINTMENT_RESET_LOADING:
            return {
                ...state,
                dataAppoints: {},
                lastError : action.lastError,
                hasError : action.hasError,
                isLoading: true,
                isSaveSuccess: false
            };
        case APPOINTMENT_GET_TIME_SUCCESS:
            mDataTimes = action.dataTimes;
            return {
                ...state,
                dataTimes: action.dataTimes,
                hasError: action.hasError,
                lastError: "",
                isLoading: false
            };
        case APPOINTMENT_GET_TIME_FAIL:
            return {
                ...state,
                lastError : action.lastError,
                hasError : action.hasError,
                isLoading: false
            };
        case APPOINTMENT_CLICK_ITEM_TIME:
            mDataTimes = handleClickItemTime(action.timeID, action.oldDataTimes);
            return {
                ...state,
                dataTimes: mDataTimes,
                hasError: action.hasError,
                lastError: "",
                isLoading: false
            };
        case APPOINTMENT_RESET_DATA:
        return {
            ...state,
            dataTimes: [],
            dataAppoints: {},
            hasError: action.hasError,
            lastError: "",
            isLoading: false,
            isSaveSuccess: false
        };  
        case APPOINTMENT_GET_DATA_SCHEDULE_SUCCESS:
        return {
            ...state,
            dataAppoints: action.dataAppoints,
            isLoading: false,
            lastError: undefined,
            hasError: false,
            isSaveSuccess: false
        };
    case APPOINTMENT_GET_DATA_SCHEDULE_FAIL:
        return {
            ...state,
            dataAppoints: {},
            isLoading: false,
            lastError: action.lastError,
            hasError: false,
            isSaveSuccess: false
        }; 
        default:
            return state; //state does not change
    }
};

  function handleClickItemTime(timeId, dataTimes) {
    var arrDataTime = [];
    console.log("nvTien - handleClickItemTime timeID: " + timeId);
    dataTimes.map((object, index) => {
      var data;
      console.log("nvTien - handleClickItemTime inputTime: " + timeId + " dataTime: " + object.id);
      if (object.id === timeId) {
        data = {
          ...object,
          selected: true
        };
      } else {
        data = {
          ...object,
          selected: false
        };
      }
      arrDataTime.push(data);
    });
    console.log(`nvTien - handleClickItemTime inputTime: dataTime - ${JSON.stringify(arrDataTime)}`);
    return arrDataTime;
  }
  
