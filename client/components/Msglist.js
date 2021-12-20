import { useState } from "react";
import MsgInput from "./MsgInput";
import MsgItem from "./MsgItem";

const UserIds = ["roy", "jay"];
const getRandomUserId = () => UserIds[Math.round(Math.random())];

const originalMsg = Array(50)
  .fill(0)
  .map((_, i) => ({
    id: i + 1,
    userId: getRandomUserId(),
    timestamp: 1234567890123 + i * 1000 * 60,
    text: `${i + 1} mock text`,
  }))
  .reverse();

const MsgList = () => {
  const [msgs, setMsgs] = useState(originalMsg);

  const [editingId, setEditingId] = useState(null);

  const onCreate = (text) => {
    const newMsg = {
      id: msgs.length + 1,
      userId: getRandomUserId(),
      timestamp: Date.now(),
      text: `${msgs.length + 1} ${text}`,
    };
    setMsgs((msgs) => [newMsg, ...msgs]);
  };

  const onUpdate = (text, id) => {
    setMsgs((prev) =>
      prev.map((item) => (item.id === id ? { ...item, text } : item))
    );
    setEditingId(null);
  };

  const onDelete = (id) => {
    setMsgs((prev) => prev.filter((item) => item.id !== id));
  };

  const startEdit = (id) => setEditingId(id);

  return (
    <>
      <MsgInput mutate={onCreate} />
      <ul className="messages">
        {msgs.map((x) => (
          <MsgItem
            key={x.id}
            {...x}
            onUpdate={onUpdate}
            startEdit={startEdit}
            isEditing={x.id === editingId}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </>
  );
};

export default MsgList;
