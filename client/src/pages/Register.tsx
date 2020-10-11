import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { faEnvelope, faKey, faUser } from "@fortawesome/free-solid-svg-icons";
import * as yup from "yup";

import { TextInput, Button, Error, Loading } from "../common";
import { AuthLayout } from "../layout";

import { useRegisterMutation } from "../generated";

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

const Register = ({ history }: RouteComponentProps) => {
  const { handleSubmit, errors, control } = useForm<FormData>({
    shouldUnregister: false,
    resolver: yupResolver(schema),
    reValidateMode: "onSubmit",
    mode: "onTouched",
  });

  const [registerMutation, { error, loading }] = useRegisterMutation({
    onCompleted: () => history.push("/login"),
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
              {...props}
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
              {...props}
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
              {...props}
              placeholder="Password"
            />
          )}
        />

        <Button type="submit" className="w-full">
          {loading ? <Loading /> : "Sign up"}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default Register;
