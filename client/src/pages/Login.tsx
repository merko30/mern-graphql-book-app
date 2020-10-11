import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { faKey, faUser } from "@fortawesome/free-solid-svg-icons";
import * as yup from "yup";

import { TextInput, Button, Error, LoadingTwo } from "../common";
import { AuthLayout } from "../layout";

import { useLoginMutation, MeDocument, MeQuery } from "../generated";

interface FormData {
  emailOrUsername: string;
  password: string;
}

const schema = yup.object().shape({
  emailOrUsername: yup.string().required("Email or username is required"),
  password: yup.string().required("Password is required"),
});

const Login = ({ history }: RouteComponentProps) => {
  const { handleSubmit, errors, control } = useForm<FormData>({
    resolver: yupResolver(schema),
    reValidateMode: "onSubmit",
    mode: "onTouched",
  });

  const [loginMutation, { error, loading }] = useLoginMutation({
    onCompleted: (data) => {
      localStorage.setItem("token", `Bearer ${data.login.token}`);
      history.push("/");
    },
    update: (cache, { data }) => {
      if (data) {
        cache.writeQuery<MeQuery>({
          query: MeDocument,
          data: { me: data.login.user },
        });
      }
    },
  });

  return (
    <AuthLayout
      title="Welcome back"
      text="You don't have an account?"
      to="/register"
      linkText="Sign up"
    >
      <form
        onSubmit={handleSubmit(({ emailOrUsername, password }) => {
          loginMutation({
            variables: { input: { emailOrUsername, password } },
          });
        })}
      >
        {error && <Error error={error.message} />}
        <Controller
          control={control}
          defaultValue=""
          name="emailOrUsername"
          render={(props) => (
            <TextInput
              {...props}
              icon={faUser}
              placeholder="Email or username"
              error={errors.emailOrUsername?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          defaultValue=""
          render={(props) => (
            <TextInput
              {...props}
              type="password"
              icon={faKey}
              placeholder="Password"
              error={errors.password?.message}
            />
          )}
        />

        <Button type="submit" className="w-full">
          {loading ? <LoadingTwo /> : "Sign in"}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default Login;
