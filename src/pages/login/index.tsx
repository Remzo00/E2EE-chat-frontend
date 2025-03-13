/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext, useState } from "react";
import {
  Container,
  Form,
  Input,
  Title,
  Footer,
  Link,
  VerificationTextWrapper,
  VerificationText,
  InputWrapper,
} from "./index.styled";
import { AuthContext } from "../../context";
import Button from "../../components/Button";

type ResendStatus = "idle" | "sending" | "sent" | "error";

export default function Login() {
  const { login, isLoading, error } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [needsVerification, setNeedsVerification] = useState(false);
  const [resendStatus, setResendStatus] = useState<ResendStatus>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
    } catch (err) {
      if (error && error.includes("verify your email")) {
        setNeedsVerification(true);
      }
    }
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
        <Title>Login</Title>
        <InputWrapper>
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
          <Button
            disabled={isLoading}
            textColor="white"
            backgroundColor="#fff"
            onClick={handleSubmit}
          >
            {isLoading ? "Loading..." : "Sign In"}
          </Button>
        </InputWrapper>

        {error && !needsVerification && <p>{error}</p>}

        {needsVerification && (
          <VerificationTextWrapper>
            <VerificationText>
              Please verify your email before logging in.
            </VerificationText>
            {resendStatus === "sending" && <p>Sending verification email...</p>}
            {resendStatus === "sent" && (
              <VerificationText>
                Verification email has been sent. Please check your inbox.
              </VerificationText>
            )}
          </VerificationTextWrapper>
        )}

        <Footer>
          Don't have an account? <Link href="/register">Register</Link>
        </Footer>
      </Form>
    </Container>
  );
}
