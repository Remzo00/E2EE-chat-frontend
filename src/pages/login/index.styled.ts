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
  text-align: center;
  width: 100%;
  max-width: 400px;
`;

export const Title = styled.h1`
font-size: 2rem;
color: ${(props) => props.theme.color.secondary};
margin-bottom: 20px;
`;

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

export const VerificationTextWrapper = styled.div``

export const VerificationText = styled.p`
  color: white
`