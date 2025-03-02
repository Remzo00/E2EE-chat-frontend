/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context";
import {
  Container,
  Form,
  Button,
  Footer,
  Link,
  Title,
  VerificationText,
  VerificationTextWrapper,
} from "./index.styled";

//GOOGLAJ STA JE FLAG, FEATURE FLAG
export default function EmailVerification() {
  const { token } = useParams<{ token: string }>();
  const { verifyUserEmail, isLoading, error } = useContext(AuthContext);
  const [verificationStatus, setVerificationStatus] = useState<
    "verifying" | "success" | "error"
  >("verifying");
  const [hasVerified, setHasVerified] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || hasVerified) return;
    setHasVerified(true);
    const verifyToken = async () => {
      try {
        const success = await verifyUserEmail(token);

        if (success) {
          setVerificationStatus("success");
          setTimeout(() => navigate("/login"), 3000);
        } else {
          setVerificationStatus("error");
        }
      } catch (err) {
        setVerificationStatus("error");
      }
    };

    verifyToken();
  }, [token, hasVerified, verifyUserEmail, navigate]);

  return (
    <Container>
      <Form>
        <Title>Email Verification</Title>

        {verificationStatus === "verifying" && (
          <VerificationTextWrapper>
            <VerificationText>Verifying your email address...</VerificationText>
            {isLoading && <VerificationText>Please wait...</VerificationText>}
          </VerificationTextWrapper>
        )}

        {verificationStatus === "success" && (
          <VerificationTextWrapper>
            <VerificationText>
              Your email has been successfully verified!
            </VerificationText>
            <VerificationText>
              You will be redirected to the login page in a moment.
            </VerificationText>
            <Button onClick={() => navigate("/login")}>Go to Login Now</Button>
          </VerificationTextWrapper>
        )}

        {verificationStatus === "error" && (
          <VerificationTextWrapper>
            <VerificationText>Verification failed.</VerificationText>
            {error && <p>{error}</p>}
            <VerificationText>
              The verification link may be expired or invalid.
            </VerificationText>
            <Button onClick={() => navigate("/login")}>Go to Login</Button>
          </VerificationTextWrapper>
        )}

        <Footer>
          <Link href="/login">Return to Login</Link>
        </Footer>
      </Form>
    </Container>
  );
}
