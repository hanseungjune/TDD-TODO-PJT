import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import { store } from "../app/store";
import TodoCommand from "./TodoCommand";
import { configureStore } from "@reduxjs/toolkit";
import { todoReducer } from "../features/todoSlice";
import TodoList from "./TodoList";

const queryClient = new QueryClient();

const mockStore = configureStore({
  reducer: {
    todos: todoReducer.reducer,
  },
});

test("TodoCommand 컴포넌트 초기 렌더링 확인", () => {
  render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <TodoCommand />
      </QueryClientProvider>
    </Provider>
  );
  const todoCommandElement = screen.getByTestId("todo-command");
  expect(todoCommandElement).toBeInTheDocument();
});

test("일정 추가 버튼 클릭 시 동작", async () => {
  render(
    <Provider store={mockStore}>
      <QueryClientProvider client={queryClient}>
        <TodoCommand />
        <TodoList />
      </QueryClientProvider>
    </Provider>
  );

  await waitFor(() => {
    expect(mockStore.getState().todos.todos.length).toBe(6);
  });

  const inputElement = await waitFor(() =>
    screen.getByPlaceholderText("할 일을 입력하세요")
  );

  fireEvent.change(inputElement, { target: { value: "새로운 할 일" } });

  const addButton = await waitFor(() => screen.getByText("일정 추가"));
  fireEvent.click(addButton);

  await waitFor(() => {
    expect(mockStore.getState().todos.todos.length).toBe(7);
  });
});

test("일정 수정 버튼 클릭 시 동작", async () => {
  render(
    <Provider store={mockStore}>
      <QueryClientProvider client={queryClient}>
        <TodoCommand />
        <TodoList />
      </QueryClientProvider>
    </Provider>
  );

  await waitFor(() => {
    expect(mockStore.getState().todos.todos[0].text).toBe(
      "소프티어 문제 1개 풀기"
    );
  });

  const todoItem = await waitFor(() => screen.getByTestId("todo-list-1"));
  fireEvent.click(todoItem);

  const inputElement = await waitFor(() => screen.getByTestId("todo-updated"));
  fireEvent.change(inputElement, { target: { value: "수정된 할 일" } });

  const updateButton = await waitFor(() => screen.getByText("일정 수정"));
  fireEvent.click(updateButton);

  await waitFor(() => {
    expect(mockStore.getState().todos.todos[0].text).toBe("수정된 할 일");
  });
});

test("일정 취소 버튼 클릭 시 동작", async () => {
  render(
    <Provider store={mockStore}>
      <QueryClientProvider client={queryClient}>
        <TodoCommand />
        <TodoList />
      </QueryClientProvider>
    </Provider>
  );

  await waitFor(() => {
    expect(screen.getByTestId("todo-list-1")).toBeInTheDocument();
  });

  const todoItem = await waitFor(() => screen.getByTestId("todo-list-1"));
  fireEvent.click(todoItem);

  const cancelButton = await waitFor(() => screen.getByText("일정 취소"));
  fireEvent.click(cancelButton);

  await waitFor(() => {
    expect(screen.queryByTestId("todo-list-1")).not.toBeInTheDocument();
    expect(
      mockStore.getState().todos.todos.find((todo) => todo.id === 1)
    ).toBeUndefined();
  });
});

test("프로필 이미지 렌더링 확인", () => {
  render(
    <Provider store={mockStore}>
      <QueryClientProvider client={queryClient}>
        <TodoCommand />
        <TodoList />
      </QueryClientProvider>
    </Provider>
  );
  const image = screen.getByAltText("profile");
  expect(image).toBeInTheDocument();
});
