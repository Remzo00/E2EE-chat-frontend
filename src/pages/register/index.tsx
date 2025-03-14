import { useContext, useState } from "react";
import {
  Container,
  Form,
  Footer,
  Link,
  Title,
  VerificationText,
  VerificationTextBold,
  InputWrapper,
} from "./index.styled";
import { AuthContext } from "../../context";
import ReCAPTCHA from "react-google-recaptcha";
import Button from "../../components/Button";
import Input from "../../components/Input";

export default function Register() {
  const { register, isLoading, error } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [captchaToken, setCaptchaToken] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleCaptcha = (token: string | null) => {
    if (token) setCaptchaToken(token);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!captchaToken) {
      alert("Please complete the CAPTCHA");
      return;
    }

    const success = await register(
      formData.username,
      formData.email,
      formData.password,
      captchaToken
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
        <InputWrapper>
          <Input
            type="text"
            placeholder="Username"
            disabled={isLoading}
            value={formData.username}
            onChange={handleChange}
          />
          <Input
            type="email"
            placeholder="Email"
            disabled={isLoading}
            value={formData.email}
            onChange={handleChange}
          />
          <Input
            type="password"
            placeholder="Password"
            disabled={isLoading}
            value={formData.password}
            onChange={handleChange}
          />
          <ReCAPTCHA
            sitekey={import.meta.env.VITE_SITE_KEY}
            onChange={handleCaptcha}
            size="normal"
          />
          <Button
            disabled={isLoading}
            textColor="white"
            backgroundColor="#fff"
            onClick={handleSubmit}
          >
            {isLoading ? "Loading..." : "Sign Up"}
          </Button>
        </InputWrapper>
        {error && <p>{error}</p>}
        <Footer>
          Already have an account? <Link href="/login">Login</Link>
        </Footer>
      </Form>
    </Container>
  );
}
