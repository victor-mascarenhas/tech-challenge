export interface InputOptions {
  name: string;

  label: string;

  type: string;

  value?: string | number;

  placeholder?: string;

  style?: "ligth" | "dark";

  error?: string;

  className?: string;

  labelTextBold?: boolean;

  onValueChanged?: (value: string | number) => void;
}

export interface InputCheckboxOptions {
  name: string;

  label: string;

  value?: boolean;

  error?: string;

  className?: string;

  onValueChanged?: (value: string | number | boolean) => void;
}

export interface InputLabelOptions {
  text: string;

  htmlFor?: string;

  textBold?: boolean;
}
export interface InputSelectOption {
  value: string;

  label: string;
}

export interface InputSelectOptions {
  name: string;

  label: string;

  value?: string | number;

  error?: string;

  options?: InputSelectOption[];

  style?: "ligth" | "dark";

  onValueChanged?: (value: string | number) => void;
}
