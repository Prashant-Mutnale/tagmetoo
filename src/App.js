import React, { Component } from "react";
import "./App.css";
import { signUpAction } from "../src/actions/signUpActions";
import logo from "./logo.svg";
import { connect } from "react-redux";
import Homepage from "./components/Homepage";
import Profile from "../src/components/Profile";
import RepairPhone from "../src/components/Repairphone";
import { BrowserRouter, Route, Switch } from "react-router-dom";
class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/" component={Homepage} exact />
          <Route path="/Profile" component={Profile} />
          {/* <Route component={error} /> */}
        </Switch>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log("new state", state);
  return {
    signUpdata: state
  };
}

export default connect(
  mapStateToProps,
  { signUpAction }
)(App);
