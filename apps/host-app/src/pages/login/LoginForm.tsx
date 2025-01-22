"use client";

import { useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import Input from "../../components/forms/Input";
import validaEmail from "../../shared/utils/validaEmail";
import Button from "../../components/ui/Button";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { signIn } from '../../features/user/userSlice';
import { AppDispatch } from "@/store";

interface LoginForm {
  email?: string;
  password?: string;
}
interface LoginFormErrors {
  email?: string;
  password?: string;
}

export default function LoginForm() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const [formValues, setFormValues] = useState<LoginForm>({});
  const [errors, setErrors] = useState<LoginFormErrors>({});
  
  const dispatch = useDispatch<AppDispatch>();  

    function handleOnChange(field: string, value: any) {
    setFormValues({ ...formValues, [field]: value });
  }

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const errors = Validation(formValues);
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      dispatch(signIn({ email:formValues.email!, password:formValues.password! }));
    }
  }

  function Validation(value: LoginForm) {
    const error: LoginFormErrors = {};

    if (!value.email) {
      error.email = "Email é obrigatório";
    } else if (!validaEmail(value.email)) {
      error.email = "Email inválido";
    }

    if (!value.password) error.password = "Password é obrigatório";

    return error;
  }

  return (
    <div className="flex items-center flex-col bg-fiap-white w-96 max-w-[93%] h-full rounded-[8px]">
      <Image className="py-6 z-10" src="/ilustracao-login.png" width={230} height={170} alt="Imagem do login" />

      <form className="flex items-center flex-col w-full px-12 pb-12" onSubmit={login}>
        <h2 className="font-bold text-xl pb-4">Login</h2>

        <Input
          className="pb-5"
          name="email"
          type="email"
          label="Email"
          placeholder="Digite seu email"
          error={errors.email}
          onValueChanged={(value) => handleOnChange("email", value)}
        />

        <Input
          className="pb-6"
          name="password"
          type="password"
          label="Senha"
          placeholder="Digite sua senha"
          error={errors.password}
          onValueChanged={(value) => handleOnChange("password", value)}
        />

        <Button type="submit" color="orange" text="Acessar" />

        {error === "CredentialsSignin" && <div className="text-red-500">Erro no login</div>}
      </form>
    </div>
  );
}
