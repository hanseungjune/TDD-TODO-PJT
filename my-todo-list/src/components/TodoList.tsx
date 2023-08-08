import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { setTodos, toggleSelectTodo } from "../features/todoSlice";
import styled from "@emotion/styled";
import { RootState } from "../app/store";

const TodoStyle = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 50px;
  padding-left: 20px;
  margin: 20px;
  width: calc(100% - 60px);
  height: 20%;
  background-color: var(--sub-color);
  box-shadow: 0px 0px 5px var(--bg-color);
  border-radius: 30px;
  transition: transform 1s ease;

  &:hover {
    transform: rotateX(360deg);
  }
`;

const TodoTitleStyle = styled.div`
  color: var(--bg-color);
  font-size: 0.8rem;
  font-weight: bold;
`;

const TodoContentStyle = styled.div`
  color: var(--bg-color);
  font-size: 1.5rem;
  font-weight: 600;
  width: calc(100% - 10px);
  display: flex;
  justify-content: space-between;
`;

const TodoCompletedLabelStyle = styled.label`
  cursor: pointer;
  font-size: 24px;
`;

const HiddenCheckboxStyle = styled.input`
  display: none;
`;

const CheckboxIcon = styled.span`
  font-size: 1.5rem;
`;

const SelectedTodosStyle = styled.div`
  position: fixed;
  padding: 20px;
  width: 350px;
  border-radius: 30px;
  box-shadow: 0px 0px 5px var(--main-color);
  top: 50px;
  right: 50px;
`;

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos.todos);
  const selectedTodos = useSelector(
    (state: RootState) => state.todos.selectedTodos
  );

  const { isLoading, error } = useQuery("todos", () => {
    fetch("/api/todos")
      .then((res) => res.json())
      .then((data) => {
        dispatch(setTodos(data));
      });
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred</div>;

  const handleToggleSelectTodo = (id: number) => {
    dispatch(toggleSelectTodo(id));
  };

  const selectedTodosText = selectedTodos.map(
    (todoId) => todos.find((todo) => todo.id === todoId)?.text
  );

  return (
    <>
      {todos.map((todo, index) => (
        <TodoStyle
          key={todo.id}
          onClick={() => handleToggleSelectTodo(todo.id)}
        >
          <TodoTitleStyle>
            <span>{todo.id}번째 할 일</span>
          </TodoTitleStyle>
          <TodoContentStyle>
            <span>{todo.text}</span>
            <TodoCompletedLabelStyle htmlFor={`todo ${todo.id}`}>
              <HiddenCheckboxStyle id={`todo ${todo.id}`} type="checkbox" />
              <CheckboxIcon>{todo.completed ? "❤️" : "🖤"}</CheckboxIcon>
            </TodoCompletedLabelStyle>
          </TodoContentStyle>
        </TodoStyle>
      ))}
      <SelectedTodosStyle>
        <h3>Selected TodoList</h3>
        <ul>
          {selectedTodosText.map((todoText, index) => (
            <li key={index}>{todoText}</li>
          ))}
        </ul>
      </SelectedTodosStyle>
    </>
  );
};

export default TodoList;
