import { ButtonColors } from "../types/Button";

export interface IconOptions {
  name: string;

  className?: string;

  title?: string;
}

export interface IconButtonOptions {
  icon: string;

  color?: ButtonColors;

  className?: string;

  title?: string;

  onClick?: () => void;
}
