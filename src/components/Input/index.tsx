import { Container, StyledInput } from "./index.styled";

interface InputProps {
  type?: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function Input({
  type = "text",
  value,
  placeholder,
  onChange,
}: InputProps) {
  return (
    <Container>
      <StyledInput
        disabled={false}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </Container>
  );
}
