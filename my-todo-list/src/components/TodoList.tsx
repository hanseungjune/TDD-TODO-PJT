import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import {
  setInputValue,
  setTodos,
  toggleSelectTodo,
} from "../features/todoSlice";
import styled from "@emotion/styled";
import { RootState } from "../app/store";

const TodoInputStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  margin: 20px;
  width: 40rem;
  height: 10%;
  background-color: var(--bg-color);
  box-shadow: 0px 0px 5px var(--sub-color);
  border-radius: 30px;
  transition: transform 1s ease;

  & > input {
    width: 37.7rem;
    height: 100%;
    outline: none;
    border: none;
    border-radius: 30px;
    padding-left: 2rem;
    font-size: 1.3rem;
    font-weight: 900;
  }
`;

const TodoStyle = styled.section<{ selected: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 50px;
  padding-left: 20px;
  margin: 20px;
  width: calc(100% - 60px);
  height: 20%;
  background-color: ${({ selected }) =>
    selected ? "var(--bg-color)" : "var(--sub-color)"};
  color: ${({ selected }) =>
    selected ? "var(--sub-color)" : "var(--bg-color)"};
  box-shadow: 0px 0px 5px var(--bg-color);
  border-radius: 30px;
  transition: transform 1s ease;

  &:hover {
    transform: rotateX(360deg);
  }
`;

const TodoTitleStyle = styled.div`
  font-size: 0.8rem;
  font-weight: bold;
`;

const TodoContentStyle = styled.div`
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

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos.todos);
  const selectedTodos = useSelector(
    (state: RootState) => state.todos.selectedTodos
  );
  const inputValue = useSelector((state: RootState) => state.todos.inputValue);

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setInputValue(event.target.value));
  };

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

  return (
    <>
      <TodoInputStyle>
        <input type="text" value={inputValue} onChange={handleChangeInput} />
      </TodoInputStyle>
      {todos.map((todo) => (
        <TodoStyle
          key={todo.id}
          selected={selectedTodos.includes(todo.id)}
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
    </>
  );
};

export default TodoList;
