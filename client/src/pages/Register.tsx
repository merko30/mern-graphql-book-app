import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { faEnvelope, faKey, faUser } from "@fortawesome/free-solid-svg-icons";
import * as yup from "yup";

import { TextInput, Button, Error, LoadingTwo } from "../common";
import { AuthLayout } from "../layout";

import { useRegisterMutation } from "../generated";
import { useNavigate } from "react-router-dom";

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
    control,
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
          registerMutation({ variables: { input: values } });
        })}
      >
        {error && <Error error={error.message} />}
        <Controller
          control={control}
          name="username"
          render={(props) => (
            <TextInput
              error={errors.username?.message}
              icon={faUser}
              {...props.field}
              placeholder="Username"
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          render={(props) => (
            <TextInput
              error={errors.email?.message}
              icon={faEnvelope}
              {...props.field}
              placeholder="Email"
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={(props) => (
            <TextInput
              error={errors.password?.message}
              icon={faKey}
              type="password"
              {...props.field}
              placeholder="Password"
            />
          )}
        />

        <Button type="submit" className="w-full">
          {loading ? <LoadingTwo /> : "Sign up"}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default Register;
