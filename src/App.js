import "./App.css";
import { Component } from "react";
import MessageList from "./components/MessageList";
import Toolbar from "./components/Toolbar";
import Compose from "./components/Compose";

const flag = {
  all: "fa-check-square-o",
  some: "fa-minus-square-o",
  none: "fa-square-o",
};

const ApiUrl = "http://localhost:8082/api/messages";

class App extends Component {
  state = {
    messages: [],
    selection: flag.some,
    unreadCount: 0,
    plural: null,
    disabled: false,
    hidden: true,
  };

  async componentDidMount() {
    const response = await fetch(ApiUrl);
    const messages = await response.json();

    /* Messages that come from the server do not
    have a "selected" key. Add that missing key. */
    this.addSelectedKey(messages);

    this.setState({ messages: messages });

    this.updateOverallSelectionFlag(messages);
    this.countUnreadMessages(messages);
  }

  addSelectedKey(messages) {
    messages.forEach((message) => {
      if (message.selected === undefined || message.selected === true) {
        message["selected"] = false;
      }
    });
  }

  updateOverallSelectionFlag(messages) {
    const statuses = messages.map((message) => message.selected);
    const allSelected = statuses.every((status) => status);
    const allUnselected = statuses.every((status) => !status);

    if (allSelected) {
      this.setState({ selection: flag.all, disabled: false });
    } else if (allUnselected) {
      this.setState({ selection: flag.none, disabled: true });
    } else {
      this.setState({ selection: flag.some, disabled: false });
    }
  }

  countUnreadMessages(messages) {
    const unreadMessages = messages.filter((message) => !message.read);
    const unreadCount = unreadMessages.length;

    this.setState({ unreadCount: unreadCount });

    if (unreadCount === 1) {
      this.setState({ plural: null });
    } else {
      this.setState({ plural: "s" });
    }
  }

  getSelectedIds() {
    const ids = [];
    this.state.messages.forEach((message) => {
      if (message.selected) {
        ids.push(message.id);
      }
    });
    return ids;
  }

  async fetchApi(request, obj) {
    const response = await fetch(ApiUrl, {
      method: request,
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const promise = await response.json();
    return promise;
  }

  async postMessageToServer(obj) {
    const newMessage = await this.fetchApi("POST", obj);

    /* Add the "selected" key */
    newMessage["selected"] = false;

    const messages = this.state.messages.concat(newMessage);
    this.setState({ messages: messages });

    this.updateOverallSelectionFlag(messages);
    this.countUnreadMessages(messages);
  }

  async patchMessagesOnServer(obj) {
    const messages = await this.fetchApi("PATCH", obj);

    this.addSelectedKey(messages);

    this.setState({ messages: messages });

    this.updateOverallSelectionFlag(messages);
    this.countUnreadMessages(messages);
  }

  toggleComposeForm = () => this.setState({ hidden: !this.state.hidden });

  sendMessage = (e) => {
    e.preventDefault();

    const subject = e.target.elements.subject.value;
    const body = e.target.elements.body.value;
    const obj = { subject: subject, body: body };

    this.postMessageToServer(obj);

    this.toggleComposeForm();

    /* Clear the subject and body fields */
    e.target.elements.subject.value = null;
    e.target.elements.body.value = null;
  };

  toggleSelection = (id) => {
    const messages = [...this.state.messages];
    const message = messages.find((message) => message.id === id);
    message.selected = !message.selected;

    this.setState({ messages: messages });
    this.updateOverallSelectionFlag(messages);
  };

  toggleOverallSelection = () => {
    const messages = [...this.state.messages];

    if (this.state.selection === flag.all) {
      messages.forEach((message) => (message.selected = false));
      this.setState({ messages: messages });
    } else {
      messages.forEach((message) => (message.selected = true));
      this.setState({ messages: messages });
    }

    this.updateOverallSelectionFlag(messages);
  };

  toggleStarring = (id) => {
    const message = this.state.messages.find((message) => message.id === id);
    const obj = { messageIds: [id], command: "star", star: !message.starred };
    this.patchMessagesOnServer(obj);
  };

  markAsRead = () => {
    const ids = this.getSelectedIds();
    const obj = { messageIds: ids, command: "read", read: true };
    this.patchMessagesOnServer(obj);
  };

  markAsUnread = () => {
    const ids = this.getSelectedIds();
    const obj = { messageIds: ids, command: "read", read: false };
    this.patchMessagesOnServer(obj);
  };

  applyLabel = (e) => {
    const label = e.target.value;
    const ids = this.getSelectedIds();

    const obj = { messageIds: ids, command: "addLabel", label: label };
    this.patchMessagesOnServer(obj);

    e.target.selectedIndex = 0;
  };

  removeLabel = (e) => {
    const label = e.target.value;
    const ids = this.getSelectedIds();

    const obj = { messageIds: ids, command: "removeLabel", label: label };
    this.patchMessagesOnServer(obj);

    e.target.selectedIndex = 0;
  };

  deleteMessage = () => {
    const ids = this.getSelectedIds();
    const obj = { messageIds: ids, command: "delete" };
    this.patchMessagesOnServer(obj);
  };

  render = () => (
    <div>
      <Toolbar
        unreadCount={this.state.unreadCount}
        plural={this.state.plural}
        selection={this.state.selection}
        disabled={this.state.disabled}
        toggleComposeForm={this.toggleComposeForm}
        toggleOverallSelection={this.toggleOverallSelection}
        markAsRead={this.markAsRead}
        markAsUnread={this.markAsUnread}
        deleteMessage={this.deleteMessage}
        applyLabel={this.applyLabel}
        removeLabel={this.removeLabel}
      />
      <Compose hidden={this.state.hidden} sendMessage={this.sendMessage} />
      <MessageList
        messages={this.state.messages}
        toggleSelection={this.toggleSelection}
        toggleStarring={this.toggleStarring}
      />
    </div>
  );
}

export default App;
