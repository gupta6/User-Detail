import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import classes from "./Dashboard.module.css";
import Header from "../../Components/Header/Header";
import { useAppSelector } from "../../store/hooks";
import Card from "../../UI/Card/Card";
import List from "../../UI//List/List";
import Search from "../../Components/Search/Search";
import IUser from "../../interfaces/IUser";
import { sortByName } from "../../shared/utility";
import { updateEmails } from "../../store/actions";
import { useHistory } from "react-router-dom";

const Dashboard = () => {
  const users = useAppSelector((state) => state.users);
  const dispatch = useDispatch();
  const history = useHistory();
  console.log(users);

  const [userArray, setUserArray] = useState<IUser[]>([]);
  const [view, setView] = useState("List");
  const [sort, setSort] = useState("sortBy");
  const [editedEmails, setEditedMails] = useState<any[]>([]);
  const [sync, setSync] = useState(true);

  useEffect(() => {
    if (userArray.length < users.length && sync) {
      setUserArray(users);
    }
  }, [users, userArray.length, sync]);

  function viewHandler(e: React.MouseEvent<HTMLSpanElement>) {
    const span = e.target as HTMLSpanElement;
    if (span.innerHTML === view) return;
    else setView(span.innerText);
  }

  function searchHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const search = event?.target.value;
    const newArray = userArray.filter((user) => {
      let key: keyof IUser;
      for (key in user) {
        if (user[key] === "company" || user[key] === "address") continue;
        else if (String(user[key]).toLowerCase().includes(search.toLowerCase()))
          return true;
      }
      return false;
    });
    search ? setSync(false) : setSync(true);
    setUserArray(newArray);
    setSort("sortBy");
  }

  function sortUsers(e: React.FormEvent<HTMLSelectElement>) {
    const selectTag = e.target as HTMLSelectElement;
    if (selectTag.value === sort) return;
    let newArray = [...userArray];
    if (selectTag.value === "name") {
      setSort("name");
      newArray.sort((a, b) => sortByName(a.name, b.name));
    } else if (selectTag.value === "sortBy") {
      setSort("sortBy");
      newArray = [...users];
    }
    setUserArray(newArray);
  }

  function deleteEmailHandler(obj: IUser) {
    const userData = [...userArray];
    userData.forEach((user) => {
      if (user.id === obj.id) {
        user.email = "";
        user.editable = false;
      }
    });
    setUserArray(userData);

    const editArray = [...editedEmails];
    let ind = editedEmails.findIndex((user) => user.id === obj.id);
    const updatedUser = { email: "", id: obj.id };
    ind > -1 ? (editArray[ind] = updatedUser) : editArray.push(updatedUser);
    setEditedMails(editArray);
  }

  console.log(editedEmails);

  function enableEditHandler(obj: IUser) {
    const userData = [...userArray];
    userData.forEach((user) => {
      if (user.id === obj.id) user.editable = true;
    });
    setUserArray(userData);
  }

  const inputChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, obj: IUser) => {
      const userData = [...userArray];
      userData.forEach((user) => {
        if (user.id === obj.id) user.email = e.target.value;
      });
      setUserArray(userData);

      const editArray = [...editedEmails];
      let ind = editedEmails.findIndex((user) => user.id === obj.id);
      const updatedUser = { email: e.target.value, id: obj.id, editable: true };
      ind > -1 ? (editArray[ind] = updatedUser) : editArray.push(updatedUser);
      setEditedMails(editArray);
    },
    [userArray, editedEmails]
  );

  function redirectUser(user: IUser) {
    history.push({ pathname: "/user-edit", state: user });
  }

  const dispatchEmails = useCallback(
    (emails: any[]) => {
      dispatch(updateEmails(emails));
    },
    [dispatch]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatchEmails(editedEmails);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [editedEmails, dispatchEmails]);

  const data = userArray;
  return (
    <div className={classes.dash}>
      <Header />
      <div className="container justify-content-center">
        <div className="d-flex justify-content-between col-12 mt-4">
          <div className="col-sm-4 col-md-3 text-start">
            View Mode:
            <span className={classes.modes}>
              <span role="button" onClick={viewHandler}>
                &nbsp;Tiles
              </span>{" "}
              |{" "}
              <span role="button" onClick={viewHandler}>
                List
              </span>
            </span>
          </div>
          <div className="d-flex col-8 col-sm-7 col-md-6 col-xl-5 justify-content-between">
            <div className="col-7">
              <Search search={searchHandler} />
            </div>
            <div className="col-4">
              <select
                className="form-select"
                aria-label="Default select example"
                value={sort}
                onChange={sortUsers}
              >
                <option value="sortBy">Sort By</option>
                <option value="name">Name</option>
                <option value="dob">DOB</option>
              </select>
            </div>
          </div>
        </div>

        <div className="row justify-content-center my-3">
          {view === "List" ? (
            <List
              users={data}
              delEmail={deleteEmailHandler}
              enableEdit={enableEditHandler}
              changed={inputChangeHandler}
              redirect={redirectUser}
            />
          ) : (
            data.map((user) => (
              <div key={user.id} className="col-md-4 col-xs-12 mt-4">
                <Card user={user} redirect={redirectUser} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
