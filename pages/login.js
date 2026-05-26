import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { StyledButton } from "@/components/Button/Button.styled";
import StandardSectionApp from "@/components/StandardSectionApp";

const StyledLoginWrapper = styled.div`
  max-width: 28rem;
  margin: 0 auto;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: var(--space-m);
`;

const StyledField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const StyledInput = styled.input`
  width: 100%;
`;

const StyledError = styled.p`
  margin: 0;
  color: #8f1d1d;
`;

export default function LoginPage() {
  const router = useRouter();
  const { status } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/admin");
    }
  }, [router, status]);

  async function handleSubmit(event) {
    event.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setIsSubmitting(false);

    if (result?.error) {
      setErrorMessage("Email or password is incorrect.");
      return;
    }

    router.push("/admin");
  }

  return (
    <StandardSectionApp sectionTitle="Admin login">
      <StyledLoginWrapper>
        <StyledForm onSubmit={handleSubmit}>
          <StyledField>
            <label htmlFor="email">Email</label>
            <StyledInput
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </StyledField>
          <StyledField>
            <label htmlFor="password">Password</label>
            <StyledInput
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </StyledField>
          {errorMessage && <StyledError>{errorMessage}</StyledError>}
          <StyledButton disabled={isSubmitting}>
            {isSubmitting ? "Signing in..." : "Sign in"}
          </StyledButton>
        </StyledForm>
      </StyledLoginWrapper>
    </StandardSectionApp>
  );
}
