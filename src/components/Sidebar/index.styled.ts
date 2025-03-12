import styled from "styled-components";

export const Container = styled.div`
  width: 250px;
  background-color: ${(props) => props.theme.color.primary};
  display: flex;
  flex-direction: column;
  border-right: 2px solid #333;
`;

export const Header = styled.div`
  padding: 20px;
  font-size: 1.5rem;
  font-weight: bold;
  color: ${(props) => props.theme.color.secondary};
  border-bottom: 2px solid #fff;
`;

export const RoomList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  flex: 1;
`;

export const RoomItem = styled.li`
  padding: 15px 20px;
  font-size: 1.2rem;
  color: ${(props) => props.theme.color.secondary};
  cursor: pointer;
  transition: background 0.3s, color 0.3s;

  &:hover {
    background-color: ${(props) => props.theme.color.primary};
    opacity: 0.5;
  }
`;

export const LogoutButton = styled.button`
  background: #ff7f11;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  margin: 10px;
  border-radius: 5px;
`