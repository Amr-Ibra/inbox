import React, { Component } from "react";
import Label from "./Label";

class Message extends Component {
  state = {
    subject: this.props.subject,
    isRead: this.props.isRead,
    isStarred: this.props.isStarred,
    isSelected: this.props.isSelected,
    labels: this.props.labels,
  };

  toggleSelection = () => this.setState({ isSelected: !this.state.isSelected });

  toggleStarring = () => this.setState({ isStarred: !this.state.isStarred });

  render = () => (
    <div
      className={`row message ${this.state.isRead ? "read" : "unread"} ${
        this.state.isSelected ? "selected" : null
      }`}
    >
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input
              type="checkbox"
              checked={this.state.isSelected}
              onChange={this.toggleSelection}
            />
          </div>
          <div className="col-xs-2">
            <i
              className={`star fa ${
                this.state.isStarred ? "fa-star" : "fa-star-o"
              }`}
              onClick={this.toggleStarring}
            ></i>
          </div>
        </div>
      </div>
      <div className="col-xs-11">
        {this.state.labels.map((label, i) => (
          <Label key={i} label={label} />
        ))}
        <span className="subject">{this.state.subject}</span>
      </div>
    </div>
  );
}

export default Message;
