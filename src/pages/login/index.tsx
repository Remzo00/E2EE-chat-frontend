import { useContext, useState } from "react";
import {
  Button,
  Container,
  Form,
  Input,
  Title,
  Footer,
  Link,
} from "./index.styled";
import { AuthContext } from "../../context";

export default function Login() {
  const { login, isLoading, error } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(formData.email, formData.password);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.type]: e.target.value,
    });
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>Login</Title>
        <Input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          disabled={isLoading}
        />
        <Input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          disabled={isLoading}
        />
        <Button disabled={isLoading}>
          {isLoading ? "Loading..." : "Login"}
        </Button>
        {error && <p>{error}</p>}
        <Footer>
          Don't have an account? <Link href="/register">Sign up</Link>
        </Footer>
      </Form>
    </Container>
  );
}
