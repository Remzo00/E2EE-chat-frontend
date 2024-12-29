import { useContext, useState } from "react";
import {
  Container,
  Form,
  Input,
  Button,
  Footer,
  Link,
  Title,
} from "./index.styled";
import { AuthContext } from "../../context";

export default function Register() {
  const { register, isLoading, error } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await register(formData.username, formData.email, formData.password);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>Register</Title>
        <Input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          disabled={isLoading}
        />
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          disabled={isLoading}
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          disabled={isLoading}
        />
        <Button disabled={isLoading}>
          {isLoading ? "Loading..." : "Sign Up"}
        </Button>
        {error && <p>{error}</p>}
        <Footer>
          Already have an account? <Link href="/login">Login</Link>
        </Footer>
      </Form>
    </Container>
  );
}
