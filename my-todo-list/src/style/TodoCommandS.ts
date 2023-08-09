import styled from '@emotion/styled';

export const TodoCommandSectionStyle = styled.section`
  width: 99%;
  height: 100%;
`;

export const TodoCommandProfileStyle = styled.article`
  width: 100%;
  height: 18rem;
  box-shadow: 0px 0px 5px var(--bg-color);
  background-color: var(--sub-color);
  color: var(--bg-color);
  border-radius: 50%;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const TodoCommandProfileImgStyle = styled.img`
  width: 100%;
  height: 18rem;
  border-radius: 50%;
`;

export const TodoCommandCUDStyle = styled.button`
  cursor: pointer;
  outline: none;
  border: none;
  width: 100%;
  height: 5rem;
  box-shadow: 0px 0px 5px var(--bg-color);
  background-color: var(--sub-color);
  color: var(--bg-color);
  border-radius: 20px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  font-weight: 600;

  &:active {
    background-color: var(--bg-color);
    color: var(--sub-color);
    box-shadow: 0px 0px 5px var(--sub-color);
  }
`;
