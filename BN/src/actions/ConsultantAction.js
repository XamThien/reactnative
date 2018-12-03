import {
    CONSULTANT_MODAL_ONCLICK_ITEM
  } from "./ActionType";


  export const onClickItem = (typeId, dataTypes) => {
    return {
      type: CONSULTANT_MODAL_ONCLICK_ITEM,
      typeId,
      dataTypes
    }
  }

  
  
  