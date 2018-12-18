import {
  FAMILY_MANAGER_LOAD_ALL,

  FAMILY_MANAGER_ADD_NEW_MEMBER,
  FAMILY_MANAGER_ADD_NEW_MEMBER_SUCCESS,
  FAMILY_MANAGER_ADD_NEW_MEMBER_FAIL,
  FAMILY_MANAGER_ADD_NEW_MEMBER_RESET,

  FAMILY_MANAGER_DO_DELETE,
  FAMILY_MANAGER_SUCCESS_DELETE,
  FAMILY_MANAGER_ERROR_DELETE,
  FAMILY_MANAGER_RESERT_DELETE,
  
  FAMILY_MANAGER_DO_UPDATE,
  FAMILY_MANAGER_SUCCESS_DUPDATE,
  FAMILY_MANAGER_ERROR_UPDATE,
  FAMILY_MANAGER_RESERT_UPDATE,
  FAMILY_MANAGER_LOAD_ALL_SUCCESS
} from "./ActionType";

export const doLoadAllFamilyMember = (userId) => {
  return {
    type: FAMILY_MANAGER_LOAD_ALL,
      userId
  }
}

export const getAllMemberSuccess = (dataNames) => {
  return {
    type: FAMILY_MANAGER_LOAD_ALL_SUCCESS,
    dataNames
  }
}

export const addNewMember = (dataNewUser) => {
  return {
    type: FAMILY_MANAGER_ADD_NEW_MEMBER,
    dataNewUser
  }
}

export const addNewMemberSuccess = (dataNewUser) => {
  return {
    type: FAMILY_MANAGER_ADD_NEW_MEMBER_SUCCESS,
    dataNewUser
  }
}
export const addNewMemberFail = (error) => {
  return {
    type: FAMILY_MANAGER_ADD_NEW_MEMBER_FAIL,
    error
  }
}

export const addNewMemberReset = (lastError, hasError) => {
  return {
    type: FAMILY_MANAGER_ADD_NEW_MEMBER_RESET,
    lastError,
    hasError
  }
}

export const doDeleteMember = (memberID) => {
  return {
    type: FAMILY_MANAGER_DO_DELETE,
    memberID
  };
};

export const isDeleteMember = (msgSuccess) => {
    return {
      type: FAMILY_MANAGER_SUCCESS_DELETE,
      msgSuccess,
      memberID
    }
  }

export const getErrorDeleteMember = (lastError, hasError) => {
  return {
    type: FAMILY_MANAGER_ERROR_DELETE,
    lastError,
    hasError
  };
};

export const resetDeleteMember = (lastError, hasError) => {
  return {
    type: FAMILY_MANAGER_RESERT_DELETE,
    lastError,
    hasError
  };
};



export const doUpdateMember = (dataMember) => {
  return {
    type: FAMILY_MANAGER_DO_UPDATE,
    dataMember
  };
};

export const isUpdateMember = (msgSuccess,dataMember ) => {
  return {
    type: FAMILY_MANAGER_SUCCESS_DUPDATE,
    msgSuccess,
    dataMember
  }
}

export const getErrorUpdateMember = (lastError, hasError) => {
return {
  type: FAMILY_MANAGER_ERROR_UPDATE,
  lastError,
  hasError
};
};

export const resetUpdateMember = (lastError, hasError) => {
return {
  type: FAMILY_MANAGER_RESERT_UPDATE,
  lastError,
  hasError
};
};