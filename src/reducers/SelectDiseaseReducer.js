import {
  SELECT_DISEASE_ONCLICK_ITEM,
  SELECT_DISEASE_PUSH_TO_BOOKING
} from "../actions/ActionType";

export const _INITIAL_STATE_ = {
    typeId: "",
    typeName: "",
    dataTypes:""
};

export const selectDiseaseReducer = (state = _INITIAL_STATE_, action) => {
  switch (action.type) {
    case SELECT_DISEASE_ONCLICK_ITEM :
      return onclickItem(action.typeId, action.dataTypes);
        return {
            ...state,
            typeId: action.typeId,
            typeName: action.typeName
        };
    case SELECT_DISEASE_PUSH_TO_BOOKING:
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

