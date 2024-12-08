import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 100vh;
  background: #1a1a1a;
  color: #fff;
`;

export const MainContent = styled.div`
  flex: 1;
  padding: 20px;
`;

export const Header = styled.h1`
  font-size: 2rem;
  color: #ff7f11;
  margin-bottom: 20px;
`;

export const Placeholder = styled.div`
  background: #252525;
  padding: 30px;
  border-radius: 12px;
  text-align: center;
  font-size: 1.2rem;
  color: #aaa;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
`;

export const ChatSection = styled.div`
display: flex;
flex-direction: column;
height: calc(100vh - 150px);
`;

export const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  background: #1f1f1f;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 10px;
`;

export const Message = styled.div`
  background: #333;
  color: #fff;
  padding: 10px;
  margin-bottom: 8px;
  border-radius: 8px;
`;