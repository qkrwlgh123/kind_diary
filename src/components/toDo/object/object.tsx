import React, { useState } from "react";

const Object = () => {
  const [isTypingInput, setIsTypingInput] = useState(false);

  /** 클릭시 할입 입력 필드를 생성 및 활성화하는 함수 */
  const handleClickObject = () => {
    setIsTypingInput((prev) => !prev);
  };

  /** 입력 중 엔터키 누를 시 할일이 추가되는 함수 */
  const handlePressEnter = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") alert("엔터키 감지");
  };
  return (
    <div>
      <button onClick={handleClickObject}>
        <span>목표</span>
      </button>
      <div>
        {isTypingInput && (
          <input placeholder="할일 입력" onKeyDown={handlePressEnter} />
        )}
      </div>
    </div>
  );
};

export default Object;
