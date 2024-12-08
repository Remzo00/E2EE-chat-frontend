import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: Arial, sans-serif;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #282c34;
  color: white;
`;

export const Logo = styled.h1`
  font-size: 24px;
`;

export const Nav = styled.nav`
  display: flex;
  gap: 10px;
`;

export const NavButton = styled.a`
  color: white;
  text-decoration: none;
  padding: 8px 16px;
  border: 1px solid white;
  border-radius: 4px;
  &:hover {
    background-color: white;
    color: #282c34;
    transition: 0.3s;
  }
`;

export const HeroSection = styled.section`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

export const HeroText = styled.div`
  max-width: 50%;
  h1 {
    font-size: 2.5rem;
    color: #282c34;
  }
  p {
    font-size: 1.2rem;
    color: #555;
    margin: 10px 0;
  }
`;

export const CTAButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

export const CTAButton = styled.a`
  padding: 10px 20px;
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

export const HeroImage = styled.img`
  max-width: 400px;
  border-radius: 10px;
`;

export const Footer = styled.footer`
  text-align: center;
  padding: 10px 20px;
  background-color: #f1f1f1;
  color: #555;
  font-size: 0.9rem;
`;
