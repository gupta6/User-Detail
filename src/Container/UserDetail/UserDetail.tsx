import { useState } from "react";
import { useLocation, Redirect } from "react-router-dom";
import Header from "../../Components/Header/Header";
import IUser from "../../interfaces/IUser";
import classes from "./UserDetail.module.css";

import { validateEmail } from "../../shared/validation";
import { updateUser } from "../../store/actions";
import { useDispatch } from "react-redux";
import useUnsavedChangesWarning from "../../hooks/unsavedChangesWarning";

const UserDetail = () => {
  const [editable, setEditable] = useState(false);
  const location = useLocation<IUser>();
  const dispatch = useDispatch();
  const [user, setUser] = useState({ ...location.state });
  const [error, setError] = useState("");

  const { prompt, setDirty, setPristine } = useUnsavedChangesWarning();

  function editHandler() {
    setEditable(true);
  }

  function inputChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setUser({ ...user, [event.target.id]: event.target.value });
    setDirty();
  }

  function saveHandler() {
    console.log(validateEmail(user.email));
    if (
      user.name === "" ||
      user.email === "" ||
      user.phone === "" ||
      user.username === ""
    ) {
      setError("All Fields Are Required.");
    } else if (!validateEmail(user.email)) {
      setError("Please Enter Valid Email.");
    } else {
      setError("");
      dispatch(updateUser(user));
      setEditable(false);
      setPristine();
    }
  }

  function cancelHandler() {
    setPristine();
    setEditable(false);
  }

  return (
    <>
      {" "}
      {!location.state ? (
        <Redirect to="/" />
      ) : (
        <div className={classes.UserDetail}>
          {prompt}
          <Header />
          <div className="container d-flex justify-content-center">
            <form
              onSubmit={(event) => event.preventDefault()}
              className="col-12 col-sm-10 col-md-8 col-lg-6 border p-3 my-5 text-start"
            >
              <h2 className="text-secondary text-center">User Edit Form</h2>
              {error && <span className="text-danger">{error}</span>}
              <div className="mb-3 text-start">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  disabled={!editable}
                  className="form-control"
                  id="name"
                  value={user.name}
                  onChange={inputChangeHandler}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  disabled={!editable}
                  className="form-control"
                  id="email"
                  value={user.email}
                  onChange={inputChangeHandler}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  disabled={!editable}
                  className="form-control"
                  id="username"
                  value={user.username}
                  onChange={inputChangeHandler}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">
                  Mobile
                </label>
                <input
                  type="text"
                  disabled={!editable}
                  className="form-control"
                  id="phone"
                  value={user.phone}
                  onChange={inputChangeHandler}
                />
              </div>
              <div className="d-flex justify-content-center">
                {editable ? (
                  <>
                    <button
                      type="submit"
                      className="btn btn-success"
                      onClick={saveHandler}
                    >
                      Save
                    </button>{" "}
                    <button
                      type="submit"
                      className={[classes["cancel"], "btn btn-danger"].join(
                        " "
                      )}
                      onClick={cancelHandler}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={editHandler}
                  >
                    Edit
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UserDetail;
