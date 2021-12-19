import { useEffect, useRef } from "react";

const MsgInput = ({ mutate, id = undefined, text = undefined }) => {
  const textRef = useRef(null);

  useEffect(() => {
    if (text) {
      textRef.current.value = text;
    }
  }, [text]);

  const onSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const text = textRef.current.value;
    textRef.current.value = "";
    mutate(text, id);
  };

  return (
    <form className="messages__input" onSubmit={onSubmit}>
      <textarea ref={textRef} placeholder="내용을 입력하세요." />
      <button type="submit">완료</button>
    </form>
  );
};

export default MsgInput;
