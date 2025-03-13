import { ButtonContent, StyledButton, StyledText } from "./index.styled";

interface ButtonProps {
  onClick: (e: React.FormEvent) => void;
  children?: React.ReactNode;
  text?: string;
  color?: string;
  textColor?: string;
  disabled?: boolean;
  backgroundColor?: string;
}
export default function Button({
  text,
  backgroundColor,
  onClick,
  disabled = false,
  textColor,
  children,
}: ButtonProps) {
  return (
    <StyledButton
      style={{ backgroundColor: backgroundColor }}
      onClick={onClick}
      disabled={disabled}
    >
      <ButtonContent>
        {text && <StyledText style={{ color: textColor }}>{text}</StyledText>}
        {!text && children}
      </ButtonContent>
    </StyledButton>
  );
}
