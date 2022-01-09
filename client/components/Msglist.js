import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import fetcher from "../fetcher";
import MsgInput from "./MsgInput";
import MsgItem from "./MsgItem";
import useInfiniteScroll from "../hooks/useInfiniteScroll";

const MsgList = ({ smsgs, users }) => {
  const {
    query: { userId = "" },
  } = useRouter();

  const [msgs, setMsgs] = useState(smsgs);
  const [editingId, setEditingId] = useState(null);
  const [hasNext, setHasNext] = useState(true);
  const fetchMoreEl = useRef(null);
  const intersecting = useInfiniteScroll(fetchMoreEl);

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
    const response = await fetcher("get", "/messages", {
      params: { cursor: msgs[msgs.length - 1]?.id || "" },
    });
    if (response.length === 0) {
      setHasNext(false);
      return;
    }
    setMsgs((prev) => prev.concat(response));
  };

  useEffect(() => {
    if (intersecting && hasNext) getMessages();
  }, [intersecting]);

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
            user={users[x.userId]}
          />
        ))}
      </ul>
      {/** 화면 상에 이 div가 나타나면 추가 데이터를 요청해라 */}
      <div ref={fetchMoreEl} />
    </>
  );
};

export default MsgList;
