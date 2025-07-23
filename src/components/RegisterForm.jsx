
import { useForm } from "react-hook-form";
import Input from "./Input";
import { useUser } from "../hooks/useUser";

const RegisterForm = ({ onRegister }) => {

  const user = useUser();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    await user.register(data.email, data.password, data.fullName);
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
      <Input
        label="Full Name"
        name="fullName"
        type="text"
        register={register}
      />
      <button type="submit" disabled={isSubmitting} style={{ padding: "8px 16px" }}>
        {isSubmitting ? "Registering..." : "Register"}
      </button>
    </form>
  );
};

export default RegisterForm;