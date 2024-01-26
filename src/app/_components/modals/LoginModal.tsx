"use client";
import { useRouter } from "next/navigation";
import Button from "../Button";
import Heading from "../Heading";
import Modal from "./Modal";
import useLoginModal from "~/app/hooks/useLoginModal";
import { useCallback, useState } from "react";
import useRegisterModal from "~/app/hooks/useRegisterModal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "../Inputs/Input";

const LoginModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      loginModal.onClose();
      console.log("login success");
    }, 1000);
  };

  const toggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading title="Welcome back!" subtitle="Login to your account." />
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
    </div>
  );

  const footerContent = (
    <div className="mt-8 flex flex-col gap-4">
      <hr />
      <Button
        label="Login with Google"
        onClick={() => console.log("google")}
        outline
      />
      <Button
        label="Login with Github"
        onClick={() => console.log("github")}
        outline
      />

      <div className="mt-4 text-center font-light text-neutral-500">
        <div>Don't have an account yet?</div>
        <div
          onClick={toggle}
          className="cursor-pointer text-neutral-800 transition hover:underline"
        >
          Create an account.
        </div>
      </div>
    </div>
  );
  return (
    <Modal
      disabled={isLoading}
      actionLabel="Continue"
      onSubmit={handleSubmit(onSubmit)}
      isOpen={loginModal.isOpen}
      title="Login"
      onClose={loginModal.onClose}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
