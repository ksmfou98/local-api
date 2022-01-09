import MsgList from "../components/MsgList";
import fetcher from "../fetcher";

const Home = ({ smsgs, users }) => {
  return (
    <>
      <h1>Home</h1>
      <MsgList smsgs={smsgs} users={users} />
    </>
  );
};

export const getServerSideProps = async () => {
  const smsgs = await fetcher("get", "/messages");
  const users = await fetcher("get", "/users");
  return {
    props: {
      smsgs,
      users,
    },
  };
};

export default Home;
