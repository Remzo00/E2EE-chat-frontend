import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.color.primary};
  padding: 10px;
  border-radius: 8px;
  margin-top: 20px;
`;

export const Input = styled.input`
  flex: 1;
  padding: 10px;
  font-size: 1rem;
  color: ${(props) => props.theme.color.text};
  border: none;
  border-radius: 8px;
  outline: none;

  &::placeholder {
    color: ${(props) => props.theme.color.text};
  }
`;

export const SendButton = styled.button`
  background: #ff7f11;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  margin-left: 10px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #e56e0b;
  }
`;