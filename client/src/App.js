import React from "react";
import "./style/master.scss"; // applies global scss styles
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Landing from "./components/pages/Landing";
import HomePage from "./components/pages/HomePage";
import AllTasks from "./components/pages/AllTasks";
import AddTask from "./components/pages/AddTask";
import EditTask from "./components/pages/EditTask";
import NotFound from "./components/pages/NotFound";
import Signup from "./components/pages/Signup";
import jwtDecode from "jwt-decode";
import store from "./store/store";
import actions from "./store/actions";
import axios from "axios";

const authToken = localStorage.authToken;
if (authToken) {
   // if the authToken is not expired
   const currentTimeInSec = Date.now() / 1000;
   const user = jwtDecode(authToken);
   if (currentTimeInSec > user.exp) {
      console.log("expired token");
      store.dispatch({
         type: actions.UPDATE_CURRENT_USER,
         payload: {},
      });
      delete axios.defaults.headers.common["x-auth-token"];
   } else {
      console.log("valid token");
      store.dispatch({
         type: actions.UPDATE_CURRENT_USER,
         payload: user,
      });
      // Set authorization headers for every request
      axios.defaults.headers.common["x-auth-token"] = authToken;
      const currentUrl = window.location.pathname;
      if (currentUrl === "/") {
         window.location.href = "/home";
      }
   }
} else {
   console.log("no token");
   delete axios.defaults.headers.common["x-auth-token"];
}

function App() {
   return (
      <Router>
         <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/home" component={HomePage} />
            <Route exact path="/all-tasks" component={AllTasks} />
            <Route exact path="/add-task" component={AddTask} />
            <Route exact path="/edit-task" component={EditTask} />
            <Route component={NotFound} />
         </Switch>
      </Router>
   );
}

export default App;
