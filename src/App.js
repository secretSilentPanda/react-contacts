import { useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { Redirect } from "react-router";

function App() {
  const [user, setUser] = useState();

  onAuthStateChanged(getAuth(), (user) => {
    setUser(user);
  });
  return (
    <Router basename="/react-contacts">
      <Switch>
        <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/signup">{user ? <Redirect to="/" /> : <Signup />}</Route>
        <Route exact path="/">
          {user ? <Home user={user} /> : <Redirect to="/login" />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
