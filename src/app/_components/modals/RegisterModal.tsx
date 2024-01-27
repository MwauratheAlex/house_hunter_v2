"use client";
import { useCallback, useState } from "react";
import Modal from "./Modal";
import useLoginModal from "~/app/hooks/useLoginModal";
import useRegisterModal from "~/app/hooks/useRegisterModal";
import { BsExclamationTriangle } from "react-icons/bs";

import {
  FieldValue,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import Heading from "../Heading";
import Input from "../Inputs/Input";
import Button from "../Button";
import { api } from "~/trpc/react";
import { RegisterUserSchema, RegisterUserSchemaType } from "~/types";
import { zodResolver } from "@hookform/resolvers/zod";
import FormError from "../FormError";
import FormSuccess from "../FormSuccess";

const RegisterModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const toggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [loginModal, registerModal]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterUserSchemaType>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(RegisterUserSchema),
  });

  const createUser = api.user.create.useMutation({
    onSuccess: ({ error, success }) => {
      setIsLoading(false);
      setError(error || "");
      setSuccess(success || "");
      reset();
    },
  });

  const onSubmit: SubmitHandler<RegisterUserSchemaType> = (data) => {
    setError("");
    setSuccess("");
    setIsLoading(true);
    createUser.mutate(data);
    // setTimeout(() => {
    //   setIsLoading(false);
    //   registerModal.onClose();
    //   loginModal.onOpen();
    //   console.log("login success");
    // }, 1000);
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Welcome to house hunter!"
        subtitle="Let's get you an account."
      />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="email"
      />
      <Input
        id="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="password"
      />
      <FormError message={error} />
      <FormSuccess message={success} />
    </div>
  );

  const footerContent = (
    <div className="mt-3 flex flex-col gap-4">
      <hr />
      <Button
        label="Continue with Google"
        onClick={() => console.log("google")}
        outline
      />
      <Button
        label="Continue with Github"
        onClick={() => console.log("github")}
        outline
      />

      <div className="mt-4 text-center font-light text-neutral-500">
        <div>Already have an account?</div>
        <div
          onClick={toggle}
          className="cursor-pointer text-neutral-800 transition hover:underline"
        >
          Log in.
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      actionLabel="Sign up"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      isOpen={registerModal.isOpen}
      title="Create an account"
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
