import styled from "styled-components";

export const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 100vh;
  background-color: ${(props) => props.theme.color.secondary};
`;

export const Form = styled.form`
  background-color: ${(props) => props.theme.color.primary};
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  text-align: center;
  width: 100%;
  max-width: 400px;
`;

export const Title = styled.h1`
  font-size: 2rem;
  color: ${(props) => props.theme.color.secondary};
  margin-bottom: 20px;
`;

export const VerificationText = styled.p`
  color: white
`

export const VerificationTextBold = styled.p`
  color: white
`

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px; 
  width: 100%; 
`;

export const Footer = styled.p`
color: ${(props) => props.theme.color.secondary};
margin-top: 20px;
`;

export const Link = styled.a`
color: ${(props) => props.theme.color.secondary};
text-decoration: none;

&:hover {
  text-decoration: underline;
}
`;