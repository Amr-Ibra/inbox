const Toolbar = ({
  unreadCount,
  plural,
  selection,
  disabled,
  toggleOverallSelection,
  markAsRead,
  markAsUnread,
  deleteMessage,
  applyLabel,
  removeLabel,
}) => (
  <div className="row toolbar">
    <div className="col-md-12">
      <p className="pull-right">
        <span className="badge badge">{unreadCount}</span>
        unread message{plural}
      </p>
      <button className="btn btn-default" onClick={toggleOverallSelection}>
        <i className={`fa ${selection}`}></i>
      </button>
      <button
        className="btn btn-default"
        onClick={markAsRead}
        disabled={disabled}
      >
        Mark As Read
      </button>
      <button
        className="btn btn-default"
        onClick={markAsUnread}
        disabled={disabled}
      >
        Mark As Unread
      </button>
      <select
        className="form-control label-select"
        onChange={applyLabel}
        disabled={disabled}
      >
        <option value="">Apply label</option>
        <option value="dev">dev</option>
        <option value="personal">personal</option>
        <option value="gschool">gschool</option>
      </select>
      <select
        className="form-control label-select"
        onChange={removeLabel}
        disabled={disabled}
      >
        <option value="">Remove label</option>
        <option value="dev">dev</option>
        <option value="personal">personal</option>
        <option value="gschool">gschool</option>
      </select>
      <button
        className="btn btn-default"
        onClick={deleteMessage}
        disabled={disabled}
      >
        <i className="fa fa-trash-o"></i>
      </button>
    </div>
  </div>
);

export default Toolbar;
