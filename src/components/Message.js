import React, { Component } from "react";
import Label from "./Label";

const label = { dev: "dev", personal: "personal", gschool: "gschool" };

class Message extends Component {
  state = {
    isRead: false,
    isStarred: false,
    isSelected: false,
    label: label.null,
  };

  render = () => (
    <div
      className={`row message ${this.state.isRead ? "read" : "unread"} ${
        this.state.isSelected ? "selected" : null
      }`}
    >
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input type="checkbox" />
          </div>
          <div className="col-xs-2">
            <i
              className={`star fa ${
                this.state.isStarred ? "fa-star" : "fa-star-o"
              }`}
            ></i>
          </div>
        </div>
      </div>
      <div className="col-xs-11">
        <Label label={this.state.label} />
        <span>Here is some message text that has a bunch of stuff</span>
      </div>
    </div>
  );
}

export default Message;
