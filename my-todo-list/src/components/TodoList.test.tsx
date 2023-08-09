import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import TodoList from "./TodoList";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { act } from "react-dom/test-utils";
import { configureStore } from "@reduxjs/toolkit";
import { todoReducer } from "../features/todoSlice";

const queryClient = new QueryClient();

test("로딩 잘 되는지 확인", async () => {
  render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <TodoList />
      </QueryClientProvider>
    </Provider>
  );
  expect(screen.getByText("Loading...")).toBeInTheDocument();
});

test("에러 잘 되는지 확인", () => {
  render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <TodoList />
      </QueryClientProvider>
    </Provider>
  );
  waitFor(() => {
    expect(screen.getByText("Error...")).toBeInTheDocument();
  });
});

test("입력 값이 정상적으로 변경되는지 확인", async () => {
  render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <TodoList />
      </QueryClientProvider>
    </Provider>
  );
  await waitFor(() => screen.getByRole("textbox"));

  const input = screen.getByRole("textbox") as HTMLInputElement;
  fireEvent.change(input, { target: { value: "새로운 할 일" } });
  expect(input.value).toBe("새로운 할 일");
});

test("Todo 항목 선택 시 입력 값이 변경되는지 확인", async () => {
  render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <TodoList />
      </QueryClientProvider>
    </Provider>
  );

  await waitFor(() => screen.getByText("1번째 할 일"));
  fireEvent.click(screen.getByText("1번째 할 일"));
  expect((screen.getByRole("textbox") as HTMLInputElement).value).toBe(
    "소프티어 문제 1개 풀기"
  );
});

test("Todo 항목의 완료 상태를 토글할 수 있는지 확인", async () => {
  render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <TodoList />
      </QueryClientProvider>
    </Provider>
  );

  await waitFor(() => screen.getByText("1번째 할 일"));

  const checkboxIcon = screen.getByTestId("checkbox-icon-1");
  fireEvent.click(checkboxIcon);
  await waitFor(() => expect(checkboxIcon.textContent).toBe("❤️"));
});

test("API에서 정상 응답을 받으면 Todo 항목이 올바르게 렌더링됩니다", async () => {
  render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <TodoList />
      </QueryClientProvider>
    </Provider>
  );

  // 특정 항목이 렌더링되는 것을 기다립니다.
  await waitFor(() => screen.getByText("1번째 할 일"));

  expect(screen.getByText("1번째 할 일")).toBeInTheDocument();
});

test("액션 디스패치로 Redux 상태가 올바르게 변경되는지 확인", () => {
  const mockStore = configureStore({
    reducer: {
      todos: todoReducer.reducer,
    },
  });

  render(
    <Provider store={mockStore}>
      <QueryClientProvider client={queryClient}>
        <TodoList />
      </QueryClientProvider>
    </Provider>
  );

  const input = screen.getByRole("textbox") as HTMLInputElement;
  fireEvent.change(input, { target: { value: "새로운 할 일" } });
  expect(mockStore.getState().todos.inputValue).toBe("새로운 할 일");
});
