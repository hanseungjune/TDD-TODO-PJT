import TodoList from "./TodoList";
import TodoCommand from "./TodoCommand";
import { TodoListCommandStyle, TodoListContainerStyle, TodoListStyle } from "../style/TodoListContainerS";

const TodoListContainer = () => {
  return (
    <TodoListContainerStyle>
      <TodoListCommandStyle>
        <TodoCommand />
      </TodoListCommandStyle>
      <TodoListStyle>
        <TodoList />
      </TodoListStyle>
    </TodoListContainerStyle>
  );
};

export default TodoListContainer;
