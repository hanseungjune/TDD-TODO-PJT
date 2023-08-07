import styled from "@emotion/styled";
import TodoList from "./TodoList";
import TodoCommand from "./TodoCommand";

const TodoListContainerStyle = styled.section`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 10px;
  background-color: var(--main-color);
`;

const TodoListCommandStyle = styled.article`
  background-color: red;
  width: 20rem;
  height: 40rem;
`;

const TodoListStyle = styled.article`
  background-color: green;
`;

const TodoListContainer = () => {
  return (
    <TodoListContainerStyle>
      <TodoListCommandStyle>
        <TodoCommand/>
      </TodoListCommandStyle>
      <TodoListStyle>
        <TodoList/>
      </TodoListStyle>
    </TodoListContainerStyle>
  );
};

export default TodoListContainer;
