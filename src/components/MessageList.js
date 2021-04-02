import Message from "./Message";

const MessageList = ({
  messages,
  toggleSelection,
  toggleStarring,
  // toggleMessageBody,
}) =>
  messages.map((message) => (
    <Message
      key={message.id}
      id={message.id}
      subject={message.subject}
      body={message.body}
      read={message.read}
      starred={message.starred}
      selected={message.selected}
      labels={message.labels}
      toggleSelection={toggleSelection}
      toggleStarring={toggleStarring}
      // toggleMessageBody={toggleMessageBody}
    />
  ));

export default MessageList;
