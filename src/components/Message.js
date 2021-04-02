import { Component } from "react";
import Label from "./Label";

class Message extends Component {
  state = { hidden: true };

  toggleMessageBody = () => {
    this.setState({ hidden: !this.state.hidden });
  };

  render = () => (
    <div>
      <div
        className={`row message ${this.props.read ? "read" : "unread"} ${
          this.props.selected ? "selected" : null
        }`}
      >
        <div className="col-xs-1">
          <div className="row">
            <div className="col-xs-2">
              <input
                type="checkbox"
                checked={this.props.selected}
                onChange={this.props.toggleSelection.bind(this, this.props.id)}
              />
            </div>
            <div className="col-xs-2">
              <i
                className={`star fa ${
                  this.props.starred ? "fa-star" : "fa-star-o"
                }`}
                onClick={this.props.toggleStarring.bind(this, this.props.id)}
              ></i>
            </div>
          </div>
        </div>
        <div className="col-xs-11" onClick={this.toggleMessageBody}>
          {this.props.labels.map((label, i) => (
            <Label key={i} label={label} />
          ))}
          <span className="subject">{this.props.subject}</span>
        </div>
      </div>
      <div className="row message-body" hidden={this.state.hidden}>
        <div className="col-xs-11 col-xs-offset-1">{this.props.body}</div>
      </div>
    </div>
  );
}

export default Message;
