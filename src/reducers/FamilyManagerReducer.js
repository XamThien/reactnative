import {

  FAMILY_MANAGER_LOAD_ALL_SUCCESS,
  FAMILY_MANAGER_LOAD_ALL_FAIL,
  FAMILY_MANAGER_LOAD_ALL_RESET_OLD_DATA,

  FAMILY_MANAGER_ADD_NEW_MEMBER,
  FAMILY_MANAGER_ADD_NEW_MEMBER_SUCCESS,
  FAMILY_MANAGER_ADD_NEW_MEMBER_FAIL,

  FAMILY_MANAGER_SUCCESS_DELETE,
  FAMILY_MANAGER_ERROR_DELETE,
  FAMILY_MANAGER_RESERT_DELETE,

  FAMILY_MANAGER_SUCCESS_DUPDATE,
  FAMILY_MANAGER_ERROR_UPDATE,
  FAMILY_MANAGER_RESERT_UPDATE
} from "../actions/ActionType";


// ================for load all member ========================== 
export const _INITIAL_STATE_ = {
  dataNames: [],
  selectName: "",
  isLoading: false,
  lastError: undefined,
  dataNewUser: {},
  isDissmiss: false,
  messageSuccess: ''
};
var allMember = [];
export const familyManagerReducer = (state = _INITIAL_STATE_, action) => {
  switch (action.type) {

    // cases for load all family member
    case FAMILY_MANAGER_LOAD_ALL_RESET_OLD_DATA:
      return {
        ...state,
        dataNames: [],
        selectName: "",
        isLoading: true,
        lastError: undefined,
        hasError: false,
      };
    case FAMILY_MANAGER_LOAD_ALL_SUCCESS:
      return {
        ...state,
        dataNames: saveLocal(action.dataNames),
        lastError: "",
        isLoading: false,
        hasError: false,
        selectName: "",
      };
    case FAMILY_MANAGER_LOAD_ALL_FAIL:
      return {
        ...state,
        dataNames: [],
        lastError: action.lastError,
        isLoading: false,
        selectName: "",
        hasError: true
      };
    case FAMILY_MANAGER_LOAD_ALL_RESET_OLD_DATA:
      return {
        ...state,
        lastError: "",
        hasError: undefined,
        isLoading: false,
        isDissmiss: false,
        dataNewUser: {}
      };

    // cases for add new family member
    case FAMILY_MANAGER_ADD_NEW_MEMBER:
      return {
        ...state,
        lastError: "",
        hasError: undefined,
        isLoading: true,
        isDissmiss: false,
        dataNewUser: {}
      };
    case FAMILY_MANAGER_ADD_NEW_MEMBER_SUCCESS:
      return {
        ...state,
        hasError: action.hasError,
        lastError: "",
        isLoading: false,
        isDissmiss: true,
        dataNames: updateListAfterAdd(action.dataNewUser)
      };
    case FAMILY_MANAGER_ADD_NEW_MEMBER_FAIL:
      return {
        ...state,
        lastError: action.lastError,
        hasError: action.hasError,
        isLoading: false,
        isDissmiss: false,
      };

    // cases for delete family member
    case FAMILY_MANAGER_SUCCESS_DELETE:
      console.log(`nvHuy - delete member success...`);
      return {
        ...state,
        messageSuccess: action.messageSuccess,
        hasError: action.hasError,
        lastError: "",
        isLoading: false,
        dataNames: updateListAfterDeleteMember(action.user_id)
      };
    case FAMILY_MANAGER_ERROR_DELETE:
      console.log(`nvHuy - delete member false...`);
      return {
        ...state,
        messageSuccess: "",
        lastError: action.lastError,
        hasError: action.hasError,
        isLoading: false
      };
    case FAMILY_MANAGER_RESERT_DELETE:
      return {
        ...state,
        messageSuccess: "",
        lastError: action.lastError,
        hasError: action.hasError,
        isLoading: true
      };

    // cases for update family member information
    case FAMILY_MANAGER_SUCCESS_DUPDATE:
      console.log(`nvHuy - update member success...`);
      return {
        ...state,
        messageSuccess: action.messageSuccess,
        hasError: action.hasError,
        lastError: "",
        isLoading: false,
        dataNames: updateListAfterUpdateMember(action.dataMember)
      };
    case FAMILY_MANAGER_ERROR_UPDATE:
      console.log(`nvHuy - update member false...`);
      return {
        ...state,
        messageSuccess: "",
        lastError: action.lastError,
        hasError: action.hasError,
        isLoading: false
      };
    case FAMILY_MANAGER_RESERT_UPDATE:
      return {
        ...state,
        messageSuccess: "",
        lastError: action.lastError,
        hasError: action.hasError,
        isLoading: true
      };
    default:
      return state; //state does not change
  }
};

// function save variable to global
function saveLocal(listMember) {
  allMember = listMember;
  return allMember;
}

//function update array of member when after add new member infor
function updateListAfterAdd(newUser) {
  allMember.push(newUser);
  return allMember;
}

//function update array of member when after delete member 
function updateListAfterDeleteMember(memberId) {
  var arrNew = new Array();
  arrNew = [];
  allMember.forEach(ele => {
    if (ele.user_id !== memberId) {
      arrNew.push(ele);
    }
  });
  return saveLocal(arrNew);
}

//function update array of member when after update member infor
function updateListAfterUpdateMember(dataMember) {
  updateListAfterDeleteMember(dataMember.user_id);
  updateListAfterAdd(dataMember);
  return allMember;
}
