import { useContext, useState } from "react";
import {
  Container,
  Form,
  Input,
  Button,
  Footer,
  Link,
  Title,
  VerificationText,
  VerificationTextBold,
} from "./index.styled";
import { AuthContext } from "../../context";

export default function Register() {
  const { register, isLoading, error } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await register(
      formData.username,
      formData.email,
      formData.password
    );
    if (success) {
      setRegistrationSuccess(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (registrationSuccess) {
    return (
      <Container>
        <Form>
          <Title>Registration Successful!</Title>
          <VerificationText>
            We've sent a verification email to{" "}
            <VerificationTextBold>{formData.email}</VerificationTextBold>.
            Please check your inbox and click the verification link to activate
            your account.
          </VerificationText>
          <VerificationText>
            If you don't see the email, please check your spam folder.
          </VerificationText>
          <Footer>
            <Link href="/login">Return to Login</Link>
          </Footer>
        </Form>
      </Container>
    );
  }

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
