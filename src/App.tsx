import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";

import Login from "./Container/Login/Login";
import Dashboard from "./Container/Dashboard/Dashboard";
import { useAppSelector } from "./store/hooks";
import Footer from "./Components/Footer/Footer";
import UserDetail from "./Container/UserDetail/UserDetail";

function App() {
  const dispatch = useDispatch();
  const user = useAppSelector((state) => state.currentUser);

  useEffect(() => {
    dispatch({ type: "GET_USERS" });
  }, [dispatch]);

  return (
    <div className="App">
      <BrowserRouter>
        {user ? (
          <Switch>
            <Route path="/user-edit" component={UserDetail} />
            <Route path="/" component={Dashboard} />
          </Switch>
        ) : (
          <>
            <Route path="/" component={Login} />
          </>
        )}
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
