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
export const resultFamilyManagerReducer = (state = _INITIAL_STATE_, action) => {
  switch (action.type) {
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
      // alert(`From reducer: ${JSON.stringify(action.dataNames)}`);
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
            lastError : "",
            hasError : undefined,
            isLoading: false,
            isDissmiss: false,
            dataNewUser: {}
          };
      case FAMILY_MANAGER_ADD_NEW_MEMBER:
          return {
            ...state,
            lastError : "",
            hasError : undefined,
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
            dataNewUser: updateListAfterAdd(action.dataNewUser)
          };
      case FAMILY_MANAGER_ADD_NEW_MEMBER_FAIL:
          return {
            ...state,
            lastError : action.lastError,
            hasError : action.hasError,
            isLoading: false,
            isDissmiss: false,
          };
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
            lastError : action.lastError,
            hasError : action.hasError,
            isLoading: false
          };
      case FAMILY_MANAGER_RESERT_DELETE:
          return {
            ...state,
            messageSuccess: "",
            lastError : action.lastError,
            hasError : action.hasError,
            isLoading: true
          };
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
          lastError : action.lastError,
          hasError : action.hasError,
          isLoading: false
        };
      case FAMILY_MANAGER_RESERT_UPDATE:
        return {
          ...state,
          messageSuccess: "",
          lastError : action.lastError,
          hasError : action.hasError,
          isLoading: true
        };
    default:
      return state; //state does not change
  }
};

function saveLocal(listMember){
  allMember = listMember;
  return allMember;
}
function updateListAfterAdd(newUser) {
  allMember.push(newUser);
  alert("update func: ==>"+ JSON.stringify(allMember)+"==>>"+JSON.stringify(newUser))
  return allMember;
}
function updateListAfterDeleteMember(memberId){
  allMember.filter(function( obj ) {
    return obj.user_id !== memberId;
  });
  return allMember;
}
function updateListAfterUpdateMember(dataMember){
  updateListAfterDeleteMember(dataMember.user_id);
  updateListAfterAdd(dataMember);
  return  allMember ;
}
