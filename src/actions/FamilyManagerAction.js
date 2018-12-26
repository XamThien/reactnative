import {
  FAMILY_MANAGER_LOAD_ALL,

  FAMILY_MANAGER_ADD_NEW_MEMBER,

  FAMILY_MANAGER_DO_DELETE,
  
  FAMILY_MANAGER_DO_UPDATE,

} from "./ActionType";

export const doLoadAllFamilyMember = (userId) => {
  return {
    type: FAMILY_MANAGER_LOAD_ALL,
      userId
  }
}

export const addNewMember = (dataNewUser) => {
  return {
    type: FAMILY_MANAGER_ADD_NEW_MEMBER,
    dataNewUser
  }
}


export const doDeleteMember = (memberID) => {
  return {
    type: FAMILY_MANAGER_DO_DELETE,
    memberID
  };
};



export const doUpdateMember = (dataMember) => {
  return {
    type: FAMILY_MANAGER_DO_UPDATE,
    dataMember
  };
};

