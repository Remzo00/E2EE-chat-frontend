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

export const Input = styled.input`
display: block;
width: 100%;
padding: 12px;
margin: 10px 0;
border: 1px solid #444;
border-radius: 6px;
background: #1a1a1a;
color: #fff;
font-size: 1rem;
outline: none;

&:focus {
  border-color: #ff7f11;
  box-shadow: 0 0 5px #ff7f11;
}
`;

export const Button = styled.button`
width: 100%;
padding: 12px;
margin-top: 20px;
background: #ff7f11;
color: #fff;
font-size: 1rem;
border: none;
border-radius: 6px;
cursor: pointer;
transition: background 0.3s, transform 0.2s;

&:hover {
  opacity: 0.5;
  transform: scale(1.02);
}

&:active {
  opacity: 0.5;
}
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