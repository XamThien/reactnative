import {
  CHANGE_PASSWORD_DO_CHANGE,

} from "./ActionType";


export const doChangePassword = (newPassword,oldPassword) => {
  return {
    type: CHANGE_PASSWORD_DO_CHANGE,
    newPassword,
    oldPassword
  }
}


