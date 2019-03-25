import React, { Component } from "react";
import Header from "../Shared/Header";
import Banner from "../../assets/images/banner.jpg";
import Card from "../../assets/images/cardimage.jpg";
export default class HomeModule extends Component {
  eventCategoty = () => {
    return (
      <div className="eventCategoryHolder">
        <div className="container pad-0">
          <h3>Events Category In Bangalore</h3>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-3 pad-0">
              <div className="card-holder">
                <img src={Card} alt />
              </div>
              <div className="card-text">
                <h4>Night Trek</h4>
              </div>
            </div>
            <div className="col-lg-3 pad-0">
              <div className="card-holder">
                <img src={Card} alt />
              </div>
              <div className="card-text">
                <h4>Night Trek</h4>
              </div>
            </div>
            <div className="col-lg-3 pad-0">
              <div className="card-holder">
                <img src={Card} alt />
              </div>
              <div className="card-text">
                <h4>Night Trek</h4>
              </div>
            </div>
            <div className="col-lg-3 pad-0">
              <div className="card-holder">
                <img src={Card} alt />
              </div>
              <div className="card-text">
                <h4>Night Trek</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  render() {
    return (
      <React.Fragment>
        <Header />
        <div className="banner">
          <img src={Banner} alt="" />
        </div>
        {this.eventCategoty()}
      </React.Fragment>
    );
  }
}
