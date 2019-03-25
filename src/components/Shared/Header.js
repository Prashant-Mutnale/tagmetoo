import React, { Component } from "react";
import { firebaseRef } from "../../Firebase/firebase";
import * as Firebase from "firebase";
var provider = new Firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export default class Header extends Component {
  componentDidMount() {
    console.log("das", this.props.getProps);
  }
  changeRoute(getdata) {
    this.props.getProps.history.push(getdata);
  }
  state = {
    popup: false,
    signInActive: true,
    overLayActive: false,
    userDetails: null,
    rock: "",
    dropdownActive: false
  };
  componentDidMount() {
    // if (typeof Storage !== "undefined") {
    //   // Code for localStorage/sessionStorage.
    // } else {
    //   // Sorry! No Web Storage support..
    // }
    this.setState({
      userDetails: JSON.parse(localStorage.getItem("userdetails"))
    });
  }
  signOut() {
    firebaseRef
      .auth()
      .signOut()
      .then(function() {
        // Sign-out successful.
        console.log("successfully signed out");
        localStorage.removeItem("userdetails");
        window.location.reload();
        this.setState({
          userDetails: ""
        });
      })
      .catch(function(error) {
        // An error happened.
      });
  }
  login() {
    this.setState({
      popup: true,
      overLayActive: true
    });
  }
  activeSignup() {
    this.setState({
      signInActive: false
    });
  }
  activeSignin() {
    this.setState({
      signInActive: true
    });
  }
  closePopup() {
    this.setState({
      popup: false,
      overLayActive: false,
      signInActive: true
    });
  }
  callAction() {
    alert("calld");
  }
  signInGoogle() {
    firebaseRef
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        console.log("result", result.additionalUserInfo);
        localStorage.setItem(
          "userdetails",
          JSON.stringify(result.additionalUserInfo)
        );
        window.location.reload();
        // this.setState({
        //   userDetails: result.additionalUserInfo
        // });
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
    // Firebase.auth().signInWithRedirect(provider);
  }
  openDropdown() {
    this.setState({
      dropdownActive: !this.state.dropdownActive
    });
  }
  render() {
    return (
      <div className="header">
        {/* <a onClick={() => this.changeRoute("/repairphone")}>Homepage</a>; */}
        {this.state.overLayActive ? (
          <div className="overlay" onClick={() => this.closePopup()} />
        ) : null}
        {this.state.popup ? (
          this.state.signInActive ? (
            <div className="popup-holder">
              <h4>Sign in</h4>
              <a className="google-sign-in" onClick={() => this.signInGoogle()}>
                <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iNDgiIGhlaWdodD0iNDgiCnZpZXdCb3g9IjAgMCA0OCA0OCIKc3R5bGU9IiBmaWxsOiMwMDAwMDA7Ij48ZyBpZD0ic3VyZmFjZTEiPjxwYXRoIHN0eWxlPSIgZmlsbDojRkZDMTA3OyIgZD0iTSA0My42MDkzNzUgMjAuMDgyMDMxIEwgNDIgMjAuMDgyMDMxIEwgNDIgMjAgTCAyNCAyMCBMIDI0IDI4IEwgMzUuMzA0Njg4IDI4IEMgMzMuNjUyMzQ0IDMyLjY1NjI1IDI5LjIyMjY1NiAzNiAyNCAzNiBDIDE3LjM3MTA5NCAzNiAxMiAzMC42Mjg5MDYgMTIgMjQgQyAxMiAxNy4zNzEwOTQgMTcuMzcxMDk0IDEyIDI0IDEyIEMgMjcuMDU4NTk0IDEyIDI5Ljg0Mzc1IDEzLjE1MjM0NCAzMS45NjA5MzggMTUuMDM5MDYzIEwgMzcuNjE3MTg4IDkuMzgyODEzIEMgMzQuMDQ2ODc1IDYuMDU0Njg4IDI5LjI2OTUzMSA0IDI0IDQgQyAxMi45NTMxMjUgNCA0IDEyLjk1MzEyNSA0IDI0IEMgNCAzNS4wNDY4NzUgMTIuOTUzMTI1IDQ0IDI0IDQ0IEMgMzUuMDQ2ODc1IDQ0IDQ0IDM1LjA0Njg3NSA0NCAyNCBDIDQ0IDIyLjY2MDE1NiA0My44NjMyODEgMjEuMzUxNTYzIDQzLjYwOTM3NSAyMC4wODIwMzEgWiAiPjwvcGF0aD48cGF0aCBzdHlsZT0iIGZpbGw6I0ZGM0QwMDsiIGQ9Ik0gNi4zMDQ2ODggMTQuNjkxNDA2IEwgMTIuODc4OTA2IDE5LjUxMTcxOSBDIDE0LjY1NjI1IDE1LjEwOTM3NSAxOC45NjA5MzggMTIgMjQgMTIgQyAyNy4wNTg1OTQgMTIgMjkuODQzNzUgMTMuMTUyMzQ0IDMxLjk2MDkzOCAxNS4wMzkwNjMgTCAzNy42MTcxODggOS4zODI4MTMgQyAzNC4wNDY4NzUgNi4wNTQ2ODggMjkuMjY5NTMxIDQgMjQgNCBDIDE2LjMxNjQwNiA0IDkuNjU2MjUgOC4zMzU5MzggNi4zMDQ2ODggMTQuNjkxNDA2IFogIj48L3BhdGg+PHBhdGggc3R5bGU9IiBmaWxsOiM0Q0FGNTA7IiBkPSJNIDI0IDQ0IEMgMjkuMTY0MDYzIDQ0IDMzLjg1OTM3NSA0Mi4wMjM0MzggMzcuNDEwMTU2IDM4LjgwODU5NCBMIDMxLjIxODc1IDMzLjU3MDMxMyBDIDI5LjIxMDkzOCAzNS4wODk4NDQgMjYuNzE0ODQ0IDM2IDI0IDM2IEMgMTguNzk2ODc1IDM2IDE0LjM4MjgxMyAzMi42ODM1OTQgMTIuNzE4NzUgMjguMDU0Njg4IEwgNi4xOTUzMTMgMzMuMDc4MTI1IEMgOS41MDM5MDYgMzkuNTU0Njg4IDE2LjIyNjU2MyA0NCAyNCA0NCBaICI+PC9wYXRoPjxwYXRoIHN0eWxlPSIgZmlsbDojMTk3NkQyOyIgZD0iTSA0My42MDkzNzUgMjAuMDgyMDMxIEwgNDIgMjAuMDgyMDMxIEwgNDIgMjAgTCAyNCAyMCBMIDI0IDI4IEwgMzUuMzA0Njg4IDI4IEMgMzQuNTExNzE5IDMwLjIzODI4MSAzMy4wNzAzMTMgMzIuMTY0MDYzIDMxLjIxNDg0NCAzMy41NzAzMTMgQyAzMS4yMTg3NSAzMy41NzAzMTMgMzEuMjE4NzUgMzMuNTcwMzEzIDMxLjIxODc1IDMzLjU3MDMxMyBMIDM3LjQxMDE1NiAzOC44MDg1OTQgQyAzNi45NzI2NTYgMzkuMjAzMTI1IDQ0IDM0IDQ0IDI0IEMgNDQgMjIuNjYwMTU2IDQzLjg2MzI4MSAyMS4zNTE1NjMgNDMuNjA5Mzc1IDIwLjA4MjAzMSBaICI+PC9wYXRoPjwvZz48L3N2Zz4=" />
                <span>Login with Google</span>
              </a>
              <div className="form-group">
                <div>
                  <label>Email</label>
                </div>
                <input type="email" classname="form-control" />
              </div>
              <div className="form-group">
                <div>
                  <label>Password</label>
                </div>
                <input type="password" classname="form-control" />
              </div>
              <button className="button-primary">Log in</button>
              <p>
                Don’t have an account?
                <a onClick={() => this.activeSignup()}> Sign up</a>
              </p>
            </div>
          ) : (
            <div className="popup-holder">
              <h4>Sign up</h4>
              <div className="form-group">
                <div>
                  <label>Name</label>
                </div>
                <input type="text" classname="form-control" />
              </div>
              <div className="form-group">
                <div>
                  <label>Email</label>
                </div>
                <input type="email" classname="form-control" />
              </div>
              <div className="form-group">
                <div>
                  <label>Number</label>
                </div>
                <input type="number" classname="form-control" />
              </div>
              <div className="form-group">
                <div>
                  <label>Password</label>
                </div>
                <input type="password" classname="form-control" />
              </div>
              <button className="button-primary">Sign up</button>
              <p>
                Already have an Tagmetoo account?
                <a onClick={() => this.activeSignin()}> Log in</a>
              </p>
            </div>
          )
        ) : null}
        <div className="container">
          <div className="header-inner">
            <div className="logo">
              <a href="/"># TAG ME TOO</a>
            </div>
            <div className="navlinks">
              <ul>
                {/* <li>
									<Link href='/exploreevents'>
										<a>exploreevents</a>
									</Link>
								</li> */}
                <li>
                  <a>Explore Events</a>
                </li>
                <li>
                  <a>Corporate Bookings</a>
                </li>
                <li>
                  {this.state.userDetails !== null ? (
                    <div>
                      <h3 onClick={() => this.openDropdown()}>
                        <img src={this.state.userDetails.profile.picture} />
                      </h3>
                      {this.state.dropdownActive ? (
                        <ul className="userMenu">
                          <li>
                            <a>Create Page</a>
                          </li>
                          <li>
                            <a>Event Pass</a>
                          </li>
                          <li>
                            <a>Profile</a>
                          </li>
                          <li>
                            {this.state.userDetails != null ? (
                              <a onClick={() => this.signOut()}>SignOut</a>
                            ) : null}
                          </li>
                        </ul>
                      ) : null}
                    </div>
                  ) : (
                    <a onClick={() => this.login()}>Login</a>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
