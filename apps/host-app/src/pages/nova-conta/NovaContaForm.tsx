"use client";

import { FormEvent, useState } from "react";
import Input from "@/components/forms/Input";
import InputCheckbox from "@/components/forms/InputCheckbox";
import validaEmail from "@/shared/utils/validaEmail";
import Button from "@/components/ui/Button";
import Image from "next/image";
import userService from "@/services/userService";
import { NovaContaDTO } from "@/shared/models/User";

interface NovaContaForm extends NovaContaDTO {
  termoAceito: boolean;
}

interface NovaContaFormErrors {
  username?: string;
  email?: string;
  password?: string;
  termoAceito?: string;
}

export default function NovaContaForm() {
  const [errors, setErrors] = useState<NovaContaFormErrors>({});
  const [showToast, setShowToast] = useState<boolean>(false);
  const [httpError, setHttpError] = useState<string>();
  const [formValues, setFormValues] = useState<NovaContaForm>({
    email: "",
    username: "",
    password: "",
    termoAceito: false,
  });
  const { create: createUser } = userService();

  function handleOnChange(field: string, value: any) {
    setFormValues({ ...formValues, [field]: value });
  }

  async function criarConta(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setShowToast(false);
    setHttpError(undefined);

    const errors = Validation(formValues);
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      const data: NovaContaDTO = {
        username: formValues.username,
        email: formValues.email,
        password: formValues.password,
      };

      const resp = await createUser(data);

      if (resp.status === 201) {
        setShowToast(true);

        setTimeout(() => {
          setShowToast(false);
        }, 2000);
      } else {
        setHttpError("Erro ao criar usuário");
      }
    }
  }

  function Validation(value: NovaContaForm) {
    const error: NovaContaFormErrors = {};

    if (!value.email) {
      error.email = "Email é obrigatório";
    } else if (!validaEmail(value.email)) {
      error.email = "Email inválido";
    }

    if (!value.username) error.username = "Nome é obrigatório";
    if (!value.password) error.password = "Senha é obrigatório";
    if (!value.termoAceito) error.termoAceito = "Necessário aceitar os termos";

    return error;
  }

  return (
    <div className="flex items-center flex-col bg-fiap-white md:max-w-[90%] lg:w-[650px] max-md:mx-[60px] max-sm:mx-6 h-auto rounded-[8px]">
      <Image
        className="py-6 z-10"
        src="/ilustracao-nova-conta.png"
        width={230}
        height={170}
        alt="Imagem do login"
      />

      <form
        className="flex items-center flex-col w-full px-12 pb-12 max-sm:px-4"
        onSubmit={criarConta}
        autoComplete="off"
      >
        <h2 className="font-bold text-xl pb-5">
          Preencha os campos abaixo para criar sua conta corrente!
        </h2>

        <Input
          className="pb-5"
          name="username"
          type="text"
          label="Nome"
          placeholder="Digite seu nome completo"
          error={errors.username}
          onValueChanged={(value) => handleOnChange("username", value)}
        />

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
          className="pb-5"
          name="password"
          type="password"
          label="Senha"
          placeholder="Digite sua senha"
          error={errors.password}
          onValueChanged={(value) => handleOnChange("password", value)}
        />

        <InputCheckbox
          className="pb-6"
          name="termoAceito"
          label="Li e estou ciente quanto às condições de tratamento dos meus dados conforme descrito na Política de
              Privacidade do banco."
          error={errors.termoAceito}
          onValueChanged={(value) => handleOnChange("termoAceito", value)}
        />

        <Button type="submit" color="orange" text="Criar conta" />
      </form>

      {showToast && (
        <div className="toast toast-top toast-end">
          <div className="alert alert-success">
            <span>Conta cadastrada com sucesso</span>
          </div>
        </div>
      )}
      {httpError && (
        <div className="toast toast-top toast-end">
          <div className="alert alert-error">
            <span>{httpError}</span>
          </div>
        </div>
      )}
    </div>
  );
}
