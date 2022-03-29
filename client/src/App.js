import { Route } from "react-router";

import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import Home from "./components/Home/Home";

import classes from "./App.module.css";

function App() {
  return (
    <div>
      <Route path="/login" component={Login} exact />
      <Route path="/register" component={Register} exact />
      <Route path="/forgot-password" component={ForgotPassword} exact />
      
      <Route path="/" component={Home} exact />
    </div>
  );
}

export default App;