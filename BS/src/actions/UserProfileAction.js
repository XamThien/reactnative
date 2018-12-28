import { PROFILE_DO_LOGOUT, PROFILE_LOAD_USER_PROFILE } from "./ActionType";

export const logOutApp = () => {
  return {
    type: PROFILE_DO_LOGOUT
  };
};

export const fetchUserProfile = () => {
  return {
    type: PROFILE_LOAD_USER_PROFILE
  };
};
