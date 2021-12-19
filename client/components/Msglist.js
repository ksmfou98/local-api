import MsgItem from "./MsgItem";

const UserIds = ["roy", "jay"];
const getRandomUserId = () => UserIds[Math.round(Math.random())];

const msgs = Array(50)
  .fill(0)
  .map((_, i) => ({
    id: i + 1,
    userId: getRandomUserId(),
    timestamp: 1234567890123 + i * 1000 * 60,
    text: `${i + 1} mock text`,
  }))
  .reverse();

const MsgList = () => {
  return (
    <ul className="messages">
      {msgs.map((x) => (
        <MsgItem key={x.id} {...x} />
      ))}
    </ul>
  );
};

export default MsgList;
