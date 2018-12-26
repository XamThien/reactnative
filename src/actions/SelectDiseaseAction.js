import {
  SELECT_DISEASE_ONCLICK_ITEM,
  SELECT_DISEASE_PUSH_TO_BOOKING
} from "./ActionType";

export const onClickItem = (typeId, dataTypes) => {
  return {
    type: SELECT_DISEASE_ONCLICK_ITEM,
    typeId,
    dataTypes
  };
};

export const onPushDataToBooking = (typeName, typeId) => {
  return {
    type: SELECT_DISEASE_PUSH_TO_BOOKING,
    typeName,
    typeId
  };
};
