import {
    SELECT_NAME_FETCH_NAME,
    SELECT_NAME_CLICK_ITEM
  } from "./ActionType";
  
  export const fetchDataModalName = (userId) => {
    return {
      type: SELECT_NAME_FETCH_NAME,
        userId
    }
  }

  export const onClickItem = (userId, selectName) => {
    return {
      type: SELECT_NAME_CLICK_ITEM,
      userId,
      selectName
    }
  }

  
  
  