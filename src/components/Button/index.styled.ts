import styled from 'styled-components';

export const StyledButton = styled.button`
    border-radius: 6px;
    font-family: "SegoeUISemiBold";
    width: 100%;
    padding: 12px;
    margin: 10px 0;
    cursor: pointer;
    box-sizing: border-box;
  `;
  
  export const ButtonContent = styled.div`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 15px;
  `;
  
  export const StyledText = styled.div`
    text-align: center;
    color: ${(props) => props.theme.colors.secondaryText};
    font-size: 18px;
    font-family: "SegoeUISemiBold";
  `;
  
  export const IconContainer = styled.img`
    margin-left: 10px;
  `;