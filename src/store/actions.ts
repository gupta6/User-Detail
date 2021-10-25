import { Action } from "redux";
import IUser from "../interfaces/IUser";

export const SAVE_USERS = "SAVE_USERS";
export const SET_ERROR = "SET_ERROR";
export const VALIDATE_USER = "VALIDATE_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const UPDATE_EMAILS = "UPDATE_EMAILS";
export const UPDATE_USER = "UPDATE_USER";

export interface SAVE_USERS_ACTION extends BASEACTION<{ users: IUser[] }> {}

export interface SAVE_ERROR_ACTION extends BASEACTION<{ error: string }> {}

export interface UPDATE_EMAILS_ACTION
  extends BASEACTION<{ updatedEmails: any[] }> {}

export interface VALIDATE_USER_ACTION
  extends BASEACTION<{ username: string }> {}

export interface UPDATE_USER_ACTION
  extends BASEACTION<{ updatedUser: IUser }> {}

export interface BASEACTION<T> extends Action<string> {
  payload: T;
}

export const saveAction: (users: IUser[]) => SAVE_USERS_ACTION = (users) => ({
  type: SAVE_USERS,
  payload: { users: users },
});

export const setError: (err: string) => SAVE_ERROR_ACTION = (err) => ({
  type: SET_ERROR,
  payload: { error: err },
});

export const validateUser: (username: string) => VALIDATE_USER_ACTION = (
  username
) => ({
  type: VALIDATE_USER,
  payload: { username: username },
});

export const logOutUser = () => {
  localStorage.removeItem("user");
  return { type: LOGOUT_USER };
};

export const updateEmails: (emails: any[]) => UPDATE_EMAILS_ACTION = (
  emails
) => ({
  type: UPDATE_EMAILS,
  payload: { updatedEmails: emails },
});

export const updateUser: (obj: IUser) => UPDATE_USER_ACTION = (obj) => ({
  type: UPDATE_USER,
  payload: { updatedUser: obj },
});
