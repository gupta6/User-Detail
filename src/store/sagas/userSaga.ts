import { call, takeEvery, put } from "redux-saga/effects";
import IUser from "../../interfaces/IUser";

import { fetchAPI } from "../../shared/fetchAPI";
import { saveAction, setError } from "../actions";
// import data from "../../data";

function* fetchUser() {
  try {
    const data: IUser[] = yield call(() =>
      fetchAPI("https://jsonplaceholder.typicode.com/users")
    );
    data.forEach((user) => (user.editable = false));
    console.log(data);
    yield put(saveAction(data));
  } catch (e) {
    console.log(e);
    yield put(setError(e));
  }
}

export function* rootSaga() {
  yield takeEvery("GET_USERS", fetchUser);
}
