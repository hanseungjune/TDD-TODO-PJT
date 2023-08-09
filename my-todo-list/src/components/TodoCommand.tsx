import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import { useMutation, useQueryClient } from "react-query";
import {
  addTodo,
  deleteTodo,
  setInputValue,
  updatedTodo,
} from "../features/todoSlice";
import Swal from "sweetalert2";
import { TodoCommandCUDStyle, TodoCommandProfileImgStyle, TodoCommandProfileStyle, TodoCommandSectionStyle } from "../style/TodoCommandS";


interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoCommand = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos.todos);
  const inputValue = useSelector((state: RootState) => state.todos.inputValue);

  const selectedTodos = useSelector(
    (state: RootState) => state.todos.selectedTodos
  );

  const deleteTodosMutation = useMutation(
    (todoIds: number[]) =>
      Promise.all(
        todoIds.map((id) =>
          fetch(`api/todos/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }).then((res) => res.json())
        )
      ),
    {
      onSuccess: (_, variables) => {
        variables.forEach((todoId: number) => {
          dispatch(deleteTodo(todoId));
        });
      },
    }
  );

  const handleDeleteSelectedTodos = () => {
    deleteTodosMutation.mutate(selectedTodos);
  };

  const mutation = useMutation(
    async (newTodo: Todo) => {
      const response = await fetch("api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      });

      return response.json();
    },
    {
      onSuccess: (data) => {
        dispatch(addTodo(data));
        dispatch(setInputValue(""));
      },
    }
  );

  const handleAddTodo = () => {
    const newTodo = {
      id: todos.length,
      text: inputValue,
      completed: false,
    };
    mutation.mutate(newTodo);
  };

  const updateTodoMutation = useMutation(
    (updatedTodo: Todo) =>
      fetch(`api/todos/${updatedTodo.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTodo),
      }).then((res) => res.json()),
    {
      onSuccess: (data) => {
        dispatch(updatedTodo(data));
        Swal.fire({
          icon: "success",
          title: "수정 완료!",
          text: "할 일이 성공적으로 수정되었습니다.",
          confirmButtonText: "확인",
        });
        queryClient.invalidateQueries("todos");
      },
    }
  );

  const handleUpdateTodo = () => {
    const selectedTodoId = selectedTodos[0];
    const selectedTodo = todos.find((todo) => todo.id === selectedTodoId);
    if (selectedTodo) {
      const updatedTodo = { ...selectedTodo, text: inputValue };
      updateTodoMutation.mutate(updatedTodo);
    }
  };

  return (
    <TodoCommandSectionStyle>
      <TodoCommandProfileStyle>
        <TodoCommandProfileImgStyle
          src={"https://avatars.githubusercontent.com/u/92035406?v=4"}
          alt={"profile"}
        />
      </TodoCommandProfileStyle>
      <TodoCommandCUDStyle onClick={handleAddTodo}>
        일정 추가
      </TodoCommandCUDStyle>
      <TodoCommandCUDStyle onClick={handleUpdateTodo}>
        일정 수정
      </TodoCommandCUDStyle>
      <TodoCommandCUDStyle onClick={handleDeleteSelectedTodos}>
        일정 취소
      </TodoCommandCUDStyle>
    </TodoCommandSectionStyle>
  );
};

export default TodoCommand;
