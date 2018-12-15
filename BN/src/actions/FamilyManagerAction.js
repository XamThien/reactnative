import {
  FAMILY_MANAGER_DO_DELETE,
  FAMILY_MANAGER_SUCCESS_DELETE,
  FAMILY_MANAGER_ERROR_DELETE,
  FAMILY_MANAGER_RESERT_DELETE,
  FAMILY_MANAGER_DO_UPDATE,
  FAMILY_MANAGER_SUCCESS_DUPDATE,
  FAMILY_MANAGER_ERROR_UPDATE,
  FAMILY_MANAGER_RESERT_UPDATE
} from "./ActionType";

export const doDeleteMember = (memberID) => {
  return {
    type: FAMILY_MANAGER_DO_DELETE,
    memberID
  };
};

export const isDeleteMember = (msgSuccess) => {
    return {
      type: FAMILY_MANAGER_SUCCESS_DELETE,
      msgSuccess
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

export const isUpdateMember = (msgSuccess) => {
  return {
    type: FAMILY_MANAGER_SUCCESS_DUPDATE,
    msgSuccess
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