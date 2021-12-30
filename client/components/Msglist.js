import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import fetcher from "../fetcher";
import MsgInput from "./MsgInput";
import MsgItem from "./MsgItem";

const UserIds = ["roy", "jay"];
const getRandomUserId = () => UserIds[Math.round(Math.random())];

const MsgList = () => {
  const {
    query: { userId = "" },
  } = useRouter();

  const [msgs, setMsgs] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const onCreate = async (text) => {
    const newMsg = await fetcher("post", "/messages", {
      text,
      userId,
    });
    if (!newMsg) throw Error("something wrong");
    setMsgs((msgs) => [newMsg, ...msgs]);
  };

  const onUpdate = async (text, id) => {
    const newMsg = await fetcher("put", `/messages/${id}`, { text, userId });
    if (!newMsg) throw Error("something wrong");
    setMsgs((prev) => prev.map((item) => (item.id === id ? newMsg : item)));
    setEditingId(null);
  };

  const onDelete = async (id) => {
    const receviedId = await fetcher("delete", `/messages/${id}`, {
      params: { userId },
    }); // query string을 params로 보내게 되면 서버에서 query로 받게됌
    console.log(receviedId);
    setMsgs((prev) => prev.filter((item) => item.id !== String(receviedId)));
  };

  const startEdit = (id) => setEditingId(id);

  const getMessages = async () => {
    const response = await fetcher("get", "/messages");
    setMsgs(response);
  };

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <>
      {userId && <MsgInput mutate={onCreate} />}
      <ul className="messages">
        {msgs.map((x) => (
          <MsgItem
            key={x.id}
            {...x}
            onUpdate={onUpdate}
            startEdit={startEdit}
            isEditing={x.id === editingId}
            onDelete={onDelete}
            myId={userId}
          />
        ))}
      </ul>
    </>
  );
};

export default MsgList;
