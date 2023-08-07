import styled from "@emotion/styled";

const TodoCommandSectionStyle = styled.section`
  width: 99%;
  height: 100%;
`;

const TodoCommandProfileStyle = styled.article`
  width: 100%;
  height: 18rem;
  box-shadow: 0px 0px 5px var(--bg-color);
  background-color: var(--sub-color);
  color: var(--bg-color);
  border-radius: 50%;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TodoCommandProfileImgStyle = styled.img`
  width: 100%;
  height: 18rem;
  border-radius: 50%;
`;

const TodoCommandCUDStyle = styled.button`
  cursor: pointer;
  outline: none;
  border: none;
  width: 100%;
  height: 5rem;
  box-shadow: 0px 0px 5px var(--bg-color);
  background-color: var(--sub-color);
  color: var(--bg-color);
  border-radius: 20px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  font-weight: 600;

  &:active {
    background-color: var(--bg-color);
    color: var(--sub-color);
    box-shadow: 0px 0px 5px var(--sub-color);
  }
`;

const TodoCommand = () => {
  return (
    <TodoCommandSectionStyle>
      <TodoCommandProfileStyle>
        <TodoCommandProfileImgStyle
          src={"https://avatars.githubusercontent.com/u/92035406?v=4"}
          alt={"profile"}
        />
      </TodoCommandProfileStyle>
      <TodoCommandCUDStyle>일정 추가</TodoCommandCUDStyle>
      <TodoCommandCUDStyle>일정 수정</TodoCommandCUDStyle>
      <TodoCommandCUDStyle>일정 취소</TodoCommandCUDStyle>
    </TodoCommandSectionStyle>
  );
};

export default TodoCommand;
