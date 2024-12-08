import {
  Container,
  CTAButton,
  CTAButtons,
  HeroImage,
  HeroSection,
  HeroText,
  Title,
} from "./index.styled";
export default function Home() {
  return (
    <Container>
      <HeroSection>
        <HeroText>
          <Title>Welcome to ChatApp</Title>
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
    </Container>
  );
}
