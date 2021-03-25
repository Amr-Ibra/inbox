import React, { Component } from "react";

const selection = {
  all: "fa-check-square-o",
  some: "fa-minus-square-o",
  none: "fa-square-o",
};

class Toolbar extends Component {
  state = {
    unreadCount: 0,
    selectionStatus: selection.all,
  };

  handleSelection = () => {};

  render = () => (
    <div className="row toolbar">
      <div className="col-md-12">
        <p className="pull-right">
          <span className="badge badge">{this.state.unreadCount}</span>
          unread messages
        </p>

        <button className="btn btn-default" onClick={this.handleSelection}>
          <i className={`fa ${this.state.selectionStatus}`}></i>
        </button>

        <button className="btn btn-default">Mark As Read</button>

        <button className="btn btn-default">Mark As Unread</button>

        <select className="form-control label-select">
          <option>Apply label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <select className="form-control label-select">
          <option>Remove label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <button className="btn btn-default">
          <i className="fa fa-trash-o"></i>
        </button>
      </div>
    </div>
  );
}

export default Toolbar;
