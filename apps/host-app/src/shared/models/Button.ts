import { ButtonColors } from "../types/Button";

export interface ButtonOptions {
  text: string;

  outlined?: boolean;

  color?: ButtonColors;

  type?: "submit" | "reset" | "button" | undefined;

  className?: string;

  disabled?: boolean;

  onClick?: () => void;
}
