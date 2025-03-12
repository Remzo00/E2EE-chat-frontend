import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: Arial, sans-serif;
  background-color: ${(props) => props.theme.color.secondary};
`;

export const HeroSection = styled.section`
  flex: 1;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 20px;
`;

export const HeroText = styled.div`
  max-width: 50%;
  h1 {
    font-size: 2.5rem;
    color: ${props => props.theme.color.text};
  }
  p {
    font-size: 1.2rem;
    color: ${props => props.theme.color.text};
    margin: 10px 0;
  }
`;

export const Title = styled.h1`
    color: ${props => props.theme.color.text};
`;

export const CTAButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

export const CTAButton = styled.a`
 padding: 10px 20px;
margin-top: 20px;
background: ${(props) => props.theme.color.primary};
color: ${props => props.theme.color.secondary};
font-size: 1rem;
border: none;
border-radius: 6px;
cursor: pointer;
text-decoration: none;
transition: background 0.3s, transform 0.2s;

&:hover {
  opacity: 0.9;
  transform: scale(1.02);
}

&:active {
  opacity: 0.9;
}
`;

