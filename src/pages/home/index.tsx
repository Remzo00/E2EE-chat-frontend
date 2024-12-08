import {
  Container,
  CTAButton,
  CTAButtons,
  Footer,
  Header,
  HeroImage,
  HeroSection,
  HeroText,
  Logo,
  Nav,
  NavButton,
} from "./index.styled";
export default function Home() {
  return (
    <Container>
      <Header>
        <Logo>ChatApp</Logo>
        <Nav>
          <NavButton href="/login">Login</NavButton>
          <NavButton href="/register">Register</NavButton>
        </Nav>
      </Header>

      <HeroSection>
        <HeroText>
          <h1>Welcome to ChatApp</h1>
          <p>Connect with your friends in real-time, anytime, anywhere.</p>
          <CTAButtons>
            <CTAButton href="/login">Get Started</CTAButton>
            <CTAButton href="/register">Sign Up</CTAButton>
          </CTAButtons>
        </HeroText>
        <HeroImage
          src="https://via.placeholder.com/400"
          alt="Chat illustration"
        />
      </HeroSection>

      <Footer>
        <p>&copy; 2024 ChatApp. All rights reserved.</p>
      </Footer>
    </Container>
  );
}
