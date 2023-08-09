import styled from "@emotion/styled";

export const TodoListContainerStyle = styled.section`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 10px;
  padding: 10px;
  border-radius: 30px;
`;

export const TodoListCommandStyle = styled.article`
  background-color: var(--section-color);
  box-shadow: 0px 0px 5px var(--sub-color);
  width: calc(20rem - 30px);
  height: calc(40rem - 30px);
  border-radius: 30px;
  padding: 15px;
`;

export const TodoListStyle = styled.article`
  background-color: var(--section-color);
  box-shadow: 0px 0px 5px var(--sub-color);
  overflow-y: auto;
  max-height: 40rem;
  border-radius: 30px;
  position: relative;
`;
