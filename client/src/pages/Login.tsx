import React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";

import TextInput from "../common/TextInput";
import Button from "../common/Button";
import Error from "../common/Error";
import Loading from "../common/Loading";

import { useLoginMutation, MeDocument, MeQuery } from "../generated";

interface FormData {
  emailOrUsername: string;
  password: string;
}

const Login = ({ history }: RouteComponentProps) => {
  const { handleSubmit, errors, control } = useForm<FormData>();

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
    <div className="h-screen flex items-center justify-center flex-col mx-5">
      <form
        className="w-full md:w-1/2 p-16 bg-primary rounded shadow-lg md:mx-auto"
        onSubmit={handleSubmit(({ emailOrUsername, password }) => {
          loginMutation({
            variables: { input: { emailOrUsername, password } },
          });
        })}
      >
        {error && <Error error={error.message} />}
        {loading ? (
          <Loading />
        ) : (
          <div>
            <Controller
              control={control}
              defaultValue=""
              name="emailOrUsername"
              render={(props) => <TextInput {...props} label="Email" />}
            />

            {errors.emailOrUsername && (
              <Error error={errors.emailOrUsername.message!} />
            )}

            <Controller
              control={control}
              name="password"
              defaultValue=""
              render={(props) => (
                <TextInput {...props} type="password" label="Password" />
              )}
            />

            {errors.password && <Error error={errors.password.message!} />}

            <Link to="/register" className="block text-secondary mb-2 text-sm">
              You don't have an account ?
            </Link>

            <Button type="submit" color="orange">
              Sign in
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;
