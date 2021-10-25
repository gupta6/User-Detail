import IUser from "../interfaces/IUser";
import {
  SAVE_USERS,
  SET_ERROR,
  VALIDATE_USER,
  LOGOUT_USER,
  BASEACTION,
  UPDATE_EMAILS,
  UPDATE_USER,
} from "./actions";

const initialState: { users: IUser[]; currentUser: string } = {
  users: [],
  currentUser: localStorage.getItem("user") ?? "",
};

const reducer = (state = initialState, action: BASEACTION<any>) => {
  switch (action.type) {
    case SAVE_USERS:
      return { ...state, users: action.payload.users };
    case SET_ERROR:
      return { ...state, error: action.payload.error };
    case VALIDATE_USER:
      let user = state.users.find(
        (user) =>
          user.email === action.payload.username ||
          user.phone === action.payload.username
      );
      user && localStorage.setItem("user", user.username);
      return {
        ...state,
        currentUser: user ? user.username : "",
      };
    case LOGOUT_USER:
      return { ...state, currentUser: "" };
    case UPDATE_EMAILS:
      if (action.payload.updatedEmails.length !== 0) {
        const data = Object.values(
          [...state.users, ...action.payload.updatedEmails].reduce(
            (data, { id, ...rest }) => {
              data[id] = { ...(data[id] || {}), id, ...rest };
              return data;
            },
            {}
          )
        );
        return { ...state, users: data };
      } else {
        return state;
      }
    case UPDATE_USER:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.payload.updatedUser.id) {
            return { ...action.payload.updatedUser };
          }
          return user;
        }),
      };
    default:
      return state;
  }
};

export default reducer;
