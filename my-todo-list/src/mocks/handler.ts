import { rest } from "msw";

let todos = [
  { id: 1, text: "소프티어 문제 1개 풀기", completed: false },
  { id: 2, text: "리팩토링 부분 기술 블로그에 올리기", completed: false },
  { id: 3, text: "CS 스터디 준비 하기", completed: false },
  { id: 4, text: "구현 테스트 강의 듣기", completed: false },
  { id: 5, text: "투두 리스트 프로젝트 완성하기", completed: false },
  { id: 6, text: "1만보 걷기", completed: false },
];

export const handlers = [
  rest.get("/api/todos", (req, res, ctx) => {
    return res(ctx.json(todos));
  }),
  rest.post("/api/todos", (req, res, ctx) => {
    const todo = req.body as { id: number; text: string; completed: boolean };
    todo.id = todos.length + 1;
    todos.push(todo);
    return res(ctx.json(todo));
  }),
  rest.patch("/api/todos/:id", (req, res, ctx) => {
    const id = Number(req.params.id);
    const updatedTodo = req.body as {
      id: number;
      text: string;
      completed: boolean;
    };
    const todoIndex = todos.findIndex((todo) => todo.id === id);
    if (todoIndex !== -1) {
      todos[todoIndex] = { ...todos[todoIndex], ...updatedTodo };
      return res(ctx.status(201), ctx.json(todos));
    } else {
      return res(ctx.status(404), ctx.json({ error: "수정이 되지 않네요" }));
    }
  }),
  rest.delete("/api/todos/:id", (req, res, ctx) => {
    const id = Number(req.params.id);
    const todoIndex = todos.findIndex((todo) => todo.id === id);
    if (todoIndex !== -1) {
      todos.splice(todoIndex, 1);
      return res(ctx.status(201), ctx.json(todos));
    } else {
      return res(ctx.status(404), ctx.json({ error: "삭제가 되지 않네요" }));
    }
  }),
  rest.patch("/api/todos/:id/completed", (req, res, ctx) => {
    const id = Number(req.params.id);
    const { completed } = req.body as { completed: boolean };
    const todoIndex = todos.findIndex((todo) => todo.id === id);
    if (todoIndex !== -1) {
      todos[todoIndex].completed = completed;
      return res(ctx.status(200), ctx.json(todos[todoIndex]));
    } else {
      return res(
        ctx.status(404),
        ctx.json({ error: "완료 상태를 업데이트할 수 없습니다" })
      );
    }
  }),
];
