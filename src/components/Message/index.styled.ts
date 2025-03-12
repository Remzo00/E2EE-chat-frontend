import styled, { css } from "styled-components";

export const Container = styled.div<{ isSentByUser: boolean }>`
  display: flex;
  flex-direction: column;
  margin: 10px;
  ${({ isSentByUser }) => isSentByUser && 'align-items: flex-end;'}
`;

export const MessageContainer = styled.div<{ isSentByUser: boolean }>`
  max-width: 60%;
  padding: 10px 15px;
  margin: 10px;
  border-radius: 12px;
  font-size: 1rem;
  word-wrap: break-word;

  ${({ isSentByUser }) =>
    isSentByUser
      ? css`
          align-self: flex-end;
          background-color: ${(props) => props.theme.color.primary};
          color: #fff;
          border-bottom-right-radius: 0;
        `
      : css`
          align-self: flex-start;
          background-color: ${(props) => props.theme.color.secondary};
          color: ${(props) => props.theme.color.text};
          border-bottom-left-radius: 0;
        `}
`;

export const Username = styled.span`
  font-size: 0.8rem;
  color: ${(props) => props.theme.color.text};
  padding: 0 12px;
`;