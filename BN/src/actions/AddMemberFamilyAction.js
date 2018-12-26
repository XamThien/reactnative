import {
  ADD_MEMBER_FAMILY
} from "./ActionType";

export const addNewMember = dataNewUser => {
  return {
    type: ADD_MEMBER_FAMILY,
    dataNewUser
  };
};

