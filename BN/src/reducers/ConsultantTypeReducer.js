import {
  CONSULTANT_MODAL_ONCLICK_ITEM,
  APPOINTMENT_CLICK_ITEM_CONSULT_TYPE
} from "../actions/ActionType";

export const _INITIAL_STATE_ = {
    typeId: "",
    typeName: "",
    dataTypes:""
};

export const getDatatypeReducer = (state = _INITIAL_STATE_, action) => {
  switch (action.type) {
    case CONSULTANT_MODAL_ONCLICK_ITEM :
      return onclickItem(action.typeId, action.dataTypes);
        return {
            ...state,
            typeId: action.typeId,
            typeName: action.typeName
        };
    case APPOINTMENT_CLICK_ITEM_CONSULT_TYPE:
        return {
            ...state,
            typeId: action.typeId,
            typeName: action.typeName
        };
    default:
      return state; //state does not change
  }
};

function onclickItem(consID, dataTypes) {
  var arrNewData = [];
  dataTypes.map((object, index) => {
    var data;
    if (object.id === consID) {
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

