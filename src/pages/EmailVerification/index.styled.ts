import styled from "styled-components";

export const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 100vh;
background: linear-gradient(135deg, #1a1a1a, #333);
`;


export const Form = styled.form`
background: #252525;
padding: 40px;
border-radius: 12px;
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
text-align: center;
width: 100%;
max-width: 400px;
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
  background: #e66a00;
  transform: scale(1.02);
}

&:active {
  background: #cc5800;
}
`;

export const VerificationTextWrapper = styled.div``

export const VerificationText = styled.p`
  color: white
`

export const VerificationTextBold = styled.p`
  color: white
`

export const Footer = styled.p`
color: #aaa;
margin-top: 20px;
`;

export const Link = styled.a`
color: #ff7f11;
text-decoration: none;

&:hover {
  text-decoration: underline;
}
`;

export const Title = styled.h1`
font-size: 2rem;
color: #ff7f11;
margin-bottom: 20px;
`;