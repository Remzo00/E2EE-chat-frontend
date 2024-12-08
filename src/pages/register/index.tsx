import {
  Container,
  Form,
  Input,
  Button,
  Footer,
  Link,
  Title,
} from "./index.styled";

export default function Register() {
  return (
    <Container>
      <Form>
        <Title>Register</Title>
        <Input type="text" placeholder="Full Name" />
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <Input type="password" placeholder="Confirm Password" />
        <Button>Sign Up</Button>
        <Footer>
          Already have an account? <Link href="/login">Login</Link>
        </Footer>
      </Form>
    </Container>
  );
}
