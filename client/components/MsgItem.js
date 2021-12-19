import MsgInput from "./MsgInput";

const MsgItem = ({
  id,
  userId,
  timestamp,
  text,
  onUpdate,
  isEditing,
  startEdit,
  onDelete,
}) => {
  return (
    <li className="messages__item">
      <h3>
        {userId}{" "}
        <sub>
          {new Date(timestamp).toLocaleString("ko-KR", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </sub>
      </h3>
      {isEditing ? <MsgInput mutate={onUpdate} id={id} text={text} /> : text}

      <div className="messages__buttons">
        <button onClick={() => startEdit(id)}>수정</button>
        <button onClick={() => onDelete(id)}>삭제</button>
      </div>
    </li>
  );
};

export default MsgItem;
