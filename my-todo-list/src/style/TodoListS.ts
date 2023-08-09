
import styled from '@emotion/styled';

export const TodoInputStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  margin: 20px;
  width: 40rem;
  height: 10%;
  background-color: var(--bg-color);
  box-shadow: 0px 0px 5px var(--sub-color);
  border-radius: 30px;
  transition: transform 1s ease;

  & > input {
    width: 37.7rem;
    height: 100%;
    outline: none;
    border: none;
    border-radius: 30px;
    padding-left: 2rem;
    font-size: 1.3rem;
    font-weight: 900;
  }
`;

export const TodoStyle = styled.section<{ selected: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 50px;
  padding-left: 20px;
  margin: 20px;
  width: calc(100% - 60px);
  height: 20%;
  background-color: ${({ selected }) =>
    selected ? "var(--bg-color)" : "var(--sub-color)"};
  color: ${({ selected }) =>
    selected ? "var(--sub-color)" : "var(--bg-color)"};
  box-shadow: ${({ selected }) =>
    selected ? "0px 0px 5px var(--sub-color)" : "0px 0px 5px var(--bg-color)"};
  border-radius: 30px;
  transition: transform 0.5s ease, background-color 0.5s ease, color 0.5s ease;

  &:hover {
    transform: scale(1.05);
    background-color: black;
    color: white;
  }
`;

export const TodoTitleStyle = styled.div`
  font-size: 0.8rem;
  font-weight: bold;
`;

export const TodoContentStyle = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  width: calc(100% - 10px);
  display: flex;
  justify-content: space-between;
`;

export const TodoCompletedLabelStyle = styled.label`
  cursor: pointer;
  font-size: 24px;
`;

export const HiddenCheckboxStyle = styled.input`
  display: none;
`;

export const CheckboxIcon = styled.span`
  font-size: 1.5rem;
`;