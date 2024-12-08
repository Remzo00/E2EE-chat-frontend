import {
  Button,
  Container,
  Form,
  Input,
  Title,
  Footer,
  Link,
} from "./index.styled";

export default function Login() {
  return (
    <Container>
      <Form>
        <Title>Login</Title>
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <Button>Login</Button>
        <Footer>
          Don't have an account? <Link href="/register">Sign up</Link>
        </Footer>
      </Form>
    </Container>
  );
}
