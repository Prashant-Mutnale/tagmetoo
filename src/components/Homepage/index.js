import React, { Component } from "react";
import HomeModule from "../Homepage/HomePage";
export default class Homepage extends Component {
  render() {
    return (
      <div>
        <HomeModule getProps={this.props} />
      </div>
    );
  }
}
