import { render, screen, waitFor } from "@testing-library/react";
import TodoListContainer from "./TodoListContainer";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import { store } from "../app/store";
const queryClient = new QueryClient();

test("TodoList와 TodoCommand 컴포넌트가 렌더링되는지 확인", async () => {
  render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <TodoListContainer />
      </QueryClientProvider>
    </Provider>
  );

  const todoListContainerElement = screen.getByTestId("todo-list-container");
  expect(todoListContainerElement).toBeInTheDocument();
  
  const todoCommandElement = screen.getByTestId("todo-command");
  expect(todoCommandElement).toBeInTheDocument();

  // 비동기 렌더링
  const todoListElement = await waitFor(() => screen.getByTestId("todo-list"));
  expect(todoListElement).toBeInTheDocument();
});
