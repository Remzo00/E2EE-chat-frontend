import styled, { css } from "styled-components";

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
          background-color: #ff7f11;
          color: #fff;
          border-bottom-right-radius: 0;
        `
      : css`
          align-self: flex-start;
          background-color: #333;
          color: #fff;
          border-bottom-left-radius: 0;
        `}
`;