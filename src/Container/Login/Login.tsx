import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import classes from "./Login.module.css";
import {
  validateEmail,
  validateMobile,
  validatePassword,
} from "../../shared/validation";
import { validateUser } from "../../store/actions";
import { useAppSelector } from "../../store/hooks";

// interface strictProps {
//   id: number;
//   userId?: string; // not mandatory
// }

// type propsType = {
//   id: number;
//   userId?: string; // not mandatory
// };

const Login = () => {
  // const [user, setUser] = useState<{username: string; password: string}>({username: '', password: ''}); // We don't need to explicitly. TS will take care ot itself.

  //   const [user, setUser] = useState({ username: "", password: "" });

  //   const inputChangedHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     setUser({ ...user, [e.target.name]: e.target.value });
  //   };

  const dispatch = useDispatch();
  const userValid = useAppSelector((state) => state.currentUser);

  const [error, setError] = useState("");

  const userNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const formHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = userNameRef.current?.value!;
    const password = passwordRef.current?.value!;

    if (username === "" || password === "") {
      setError("All Fields are Required.");
    } else if (!validateEmail(username) && !validateMobile(username)) {
      setError("Please Enter valid Email or Mobile");
    } else if (!validatePassword(password)) {
      setError("Please Enter Strong Password");
    } else {
      dispatch(validateUser(username));
      !userValid && setError("User Not Found");
    }
  };

  return (
    <div className={classes.login}>
      <form className={classes.form} onSubmit={formHandler}>
        <h2 className="text-secondary mb-3">Login</h2>
        {error && <span className="text-danger">{error}</span>}
        <div className="form-group mb-4 mt-2">
          <label className="form-label" htmlFor="exampleInputEmail1">
            Email or Phone
          </label>
          <input
            type="text"
            className="form-control-lg my-2"
            id="exampleInputEmail1"
            placeholder="Enter email"
            //value={user.username}
            name="username"
            //onChange={inputChangedHandler}
            ref={userNameRef}
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="exampleInputPassword1">
            Password
          </label>
          <input
            type="password"
            className="form-control-lg my-2"
            id="exampleInputPassword1"
            //value={user.password}
            placeholder="Password"
            name="password"
            //onChange={inputChangedHandler}
            ref={passwordRef}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-4">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
