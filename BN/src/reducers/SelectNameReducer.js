import {
  SELECT_NAME_FETCH_NAME,
  SELECT_NAME_FETCH_NAME_SUCCESS,
  SELECT_NAME_FETCH_NAME_FAIL,
  SELECT_NAME_CLICK_ITEM,
  SELECT_NAME_RESET_OLD_DATA
} from "../actions/ActionType";

export const _INITIAL_STATE_ = {
  dataNames: [],
  selectName: "",
  isLoading: false,
  lastError: undefined,
  hasError: false
};

export const selectNameReducer = (state = _INITIAL_STATE_, action) => {
  switch (action.type) {
    case SELECT_NAME_RESET_OLD_DATA:
      return {
        ...state,
        dataNames: [],
        selectName: "",
        isLoading: true,
        lastError: undefined,
        hasError: false
      };
    case SELECT_NAME_FETCH_NAME_SUCCESS:
      return {
        ...state,
        dataNames: action.dataNames,
        lastError: "",
        isLoading: false,
        hasError: false,
        selectName: ""
      };
    case SELECT_NAME_FETCH_NAME_FAIL:
      return {
        ...state,
        dataNames: [],
        lastError: action.lastError,
        isLoading: false,
        selectName: "",
        hasError: true
      };
    case SELECT_NAME_CLICK_ITEM:
      return {
        ...state,
        dataNames: onclickItem(action.userId, state.dataNames),
        selectName: action.selectName,
        isLoading: false,
        hasError: false
      };
    default:
      return state; //state does not change
  }
};

function onclickItem(userId, dataNames) {
  var arrNewData = [];
  dataNames.map((object, index) => {
    var data;
    if (object.id === userId) {
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
    arrNewData.push(data);
  });
  return arrNewData;
}
