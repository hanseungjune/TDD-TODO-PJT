import React from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { setTodos } from "../features/todoSlice";
import styled from "@emotion/styled";

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

const TodoList = () => {
  const dispatch = useDispatch();

  const { isLoading, error } = useQuery("todos", () => {
    fetch("/api/todos")
      .then((res) => res.json())
      .then((data) => {
        dispatch(setTodos(data));
      });
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred</div>;

  return (
    <TodoStyle>
      <TodoTitleStyle>
        <span>1번째 할 일</span>
      </TodoTitleStyle>
      <TodoContentStyle>
        <span>오늘 내가 해야할 일의 내용</span>
        <TodoCompletedLabelStyle htmlFor={`todo ${0}`}>
          <HiddenCheckboxStyle id={`todo ${0}`} type="checkbox" />
          <CheckboxIcon>❤️</CheckboxIcon>
          <CheckboxIcon>🖤</CheckboxIcon>
        </TodoCompletedLabelStyle>
      </TodoContentStyle>
    </TodoStyle>
  );
};

export default TodoList;
