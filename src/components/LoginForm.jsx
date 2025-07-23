import React from "react";
import { useForm } from "react-hook-form";
import Input from "./Input";
import { useUser } from "../hooks/useUser";

const LoginForm = ({ onLogin }) => {
  const user = useUser();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    await user.login(data.email, data.password);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Email"
        name="email"
        type="email"
        register={register}
      />
      <Input
        label="Password"
        name="password"
        type="password"
        register={register}
      />
      <button type="submit" disabled={isSubmitting} style={{ padding: "8px 16px" }}>
        {isSubmitting ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;