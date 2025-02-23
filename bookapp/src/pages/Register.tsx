import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { faEnvelope, faKey, faUser } from "@fortawesome/free-solid-svg-icons";
import * as yup from "yup";

import { TextInput, Button, Error, LoadingTwo } from "src/common/index";

import { AuthLayout } from "src/layout/index";

import { useRegisterMutation } from "src/generated/index";

interface FormData {
  username: string;
  email: string;
  password: string;
}

const schema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .min(6, "Username should have at least 6 characters"),
  email: yup.string().required("Email is required").email("Invalid email"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password should have at least 8 characters"),
});

const Register = () => {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<FormData>({
    shouldUnregister: false,
    resolver: yupResolver(schema),
    reValidateMode: "onSubmit",
    mode: "onTouched",
  });

  const navigate = useNavigate();

  const [registerMutation, { error, loading }] = useRegisterMutation({
    onCompleted: () => navigate("/login"),
  });

  return (
    <AuthLayout
      title="Get started"
      text="Already have an account?"
      linkText="Sign in"
      to="/login"
    >
      <form
        onSubmit={handleSubmit((values) => {
          console.log(values);
          // registerMutation({ variables: { input: values } });
        })}
      >
        {error && <Error error={error.message} />}

        <TextInput
          error={errors.username?.message}
          icon={faUser}
          {...register("username")}
          placeholder="Username"
        />

        <TextInput
          error={errors.email?.message}
          icon={faEnvelope}
          {...register("email")}
          placeholder="Email"
        />

        <TextInput
          error={errors.password?.message}
          icon={faKey}
          type="password"
          {...register("password")}
          placeholder="Password"
          className="mb-4"
        />

        <Button type="submit" className="w-full">
          {loading ? <LoadingTwo /> : "Sign up"}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default Register;
