import {
    MODAL_NAME_FETCH_NAME,
    MODAL_NAME_CLICK_ITEM
  } from "./ActionType";
  
  
  export const fetchDataModalName = (userId) => {
    return {
      type: MODAL_NAME_FETCH_NAME,
        userId
    }
  }

  export const onClickItem = (userId, selectName) => {
    return {
      type: MODAL_NAME_CLICK_ITEM,
      userId,
      selectName
    }
  }

  
  
  