import { useQueryClient, useQuery } from "react-query";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import {
  setInputValue,
  setTodos,
  toggleCompleted,
  toggleSelectTodo,
} from "../features/todoSlice";
import { RootState } from "../app/store";
import {
  CheckboxIcon,
  HiddenCheckboxStyle,
  TodoCompletedLabelStyle,
  TodoContentStyle,
  TodoInputStyle,
  TodoStyle,
  TodoTitleStyle,
} from "../style/TodoListS";
import { TodoListStyle } from "../style/TodoListContainerS";

type ToggleCompletedResponse = {
  todoId: number;
  completed: boolean;
};

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoList = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos.todos);
  const selectedTodos = useSelector(
    (state: RootState) => state.todos.selectedTodos
  );
  const inputValue = useSelector((state: RootState) => state.todos.inputValue);

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setInputValue(event.target.value));
  };

  const { data, isLoading, error } = useQuery("todos", async () => {
    const response = await fetch("/api/todos");
    if (!response.ok) throw new Error("Fetching todos failed");
    const todos = await response.json();
    dispatch(setTodos(todos));
    return todos;
  });

  const handleToggleSelectTodo = (id: number) => {
    if (selectedTodos.includes(id)) {
      dispatch(setInputValue(""));
    } else {
      const selectedTodo = todos.find((todo) => todo.id === id);
      if (selectedTodo) {
        dispatch(setInputValue(selectedTodo.text));
      } 
    }
    dispatch(toggleSelectTodo(id));
  };

  const toggleCompletedMutation = useMutation(
    ({ todoId, completed }: { todoId: number; completed: boolean }) =>
      fetch(`/api/todos/${todoId}/completed`, {
        method: "PATCH",
        body: JSON.stringify({ completed }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json()),
    {
      onSuccess: (data: ToggleCompletedResponse) => {
        dispatch(
          toggleCompleted({ todoId: data.todoId, completed: data.completed })
        );
        queryClient.invalidateQueries("todos");
      },
    }
  );

  const handleToggleCompleted = (todoId: number, completed: boolean) => {
    toggleCompletedMutation.mutate({ todoId, completed });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;

  return (
    <TodoListStyle data-testid="todo-list">
      <TodoInputStyle>
        <input type="text" data-testid="todo-updated" value={inputValue} onChange={handleChangeInput} />
      </TodoInputStyle>
      {data.map((todo: Todo) => (
        <TodoStyle
          key={todo.id}
          selected={selectedTodos.includes(todo.id)}
          data-testid={`todo-list-${todo.id}`}
          onClick={() => handleToggleSelectTodo(todo.id)}
        >
          <TodoTitleStyle>
            <span>{todo.id}번째 할 일</span>
          </TodoTitleStyle>
          <TodoContentStyle>
            <span>{todo.text}</span>
            <TodoCompletedLabelStyle htmlFor={`todo ${todo.id}`}>
              <HiddenCheckboxStyle id={`todo ${todo.id}`} type="checkbox" />
              <CheckboxIcon
                data-testid={`checkbox-icon-${todo.id}`}
                onClick={() => handleToggleCompleted(todo.id, !todo.completed)}
              >
                {todo.completed ? "❤️" : "🖤"}
              </CheckboxIcon>
            </TodoCompletedLabelStyle>
          </TodoContentStyle>
        </TodoStyle>
      ))}
    </TodoListStyle>
  );
};

export default TodoList;
