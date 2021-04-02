import Label from "./Label";

const Message = ({
  id,
  subject,
  body,
  read,
  starred,
  selected,
  bodyHidden,
  labels,
  toggleSelection,
  toggleStarring,
  toggleMessageBody,
}) => (
  <div>
    <div
      className={`row message ${read ? "read" : "unread"} ${
        selected ? "selected" : null
      }`}
    >
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input
              type="checkbox"
              checked={selected}
              onChange={toggleSelection.bind(this, id)}
            />
          </div>
          <div className="col-xs-2">
            <i
              className={`star fa ${starred ? "fa-star" : "fa-star-o"}`}
              onClick={toggleStarring.bind(this, id)}
            ></i>
          </div>
        </div>
      </div>
      <div className="col-xs-11" onClick={toggleMessageBody}>
        {labels.map((label, i) => (
          <Label key={i} label={label} />
        ))}
        <span className="subject">{subject}</span>
      </div>
    </div>
    <div className="row message-body" hidden={bodyHidden}>
      <div className="col-xs-11 col-xs-offset-1">{body}</div>
    </div>
  </div>
);

export default Message;
