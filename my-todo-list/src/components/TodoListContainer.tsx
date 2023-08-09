import TodoList from "./TodoList";
import TodoCommand from "./TodoCommand";
import {
  TodoListContainerStyle,
} from "../style/TodoListContainerS";

const TodoListContainer = () => {
  return (
    <TodoListContainerStyle data-testid="todo-list-container">
      <TodoCommand />
      <TodoList />
    </TodoListContainerStyle>
  );
};

export default TodoListContainer;
