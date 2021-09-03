import React, { Component } from "react";
import "./style.css";

class Title extends Component {
  render() {
    return (
      <div>
        <div className="Title-container">
          <div className="Title">
            <h1 className="">VUTTR</h1>
            <h3 className="subTitle">Very Useful tool to Remember</h3>
          </div>
        </div>
      </div>
    );
  }
}

export default Title;
