import React from "react";
import { Link, RouteComponentProps } from "react-router-dom";

import TextInput from "../common/TextInput";
import Button from "../common/Button";
import Error from "../common/Error";
import Loading from "../common/Loading";
import { useRegisterMutation } from "../generated";
import { Controller, useForm } from "react-hook-form";

interface FormData {
  username: string;
  email: string;
  password: string;
}

const Register = ({ history }: RouteComponentProps) => {
  const { handleSubmit, errors } = useForm<FormData>();

  const [registerMutation, { error, loading }] = useRegisterMutation({
    onCompleted: () => history.push("/"),
  });

  return (
    <div className="h-screen flex items-center justify-center flex-col mx-5">
      <form
        className="w-full md:w-1/2 p-16 md:mx-auto bg-primary rounded shadow-lg"
        onSubmit={handleSubmit((values) => {
          registerMutation({ variables: { input: values } });
        })}
      >
        {error && <Error error={error.message.split(":")[1]} />}
        {loading ? (
          <Loading />
        ) : (
          <div>
            <Controller
              name="username"
              render={(props) => <TextInput {...props} label="Username" />}
            />
            {errors.username && <Error error={errors.username.message!} />}

            <Controller
              name="email"
              render={(props) => <TextInput {...props} label="Email" />}
            />

            {errors.email && <Error error={errors.email.message!} />}

            <Controller
              name="password"
              render={(props) => <TextInput {...props} label="Password" />}
            />
            {errors.password && <Error error={errors.password.message!} />}

            <Link to="/login" className="block text-secondary mb-2 text-sm">
              Already have an account ?
            </Link>

            <Button type="submit" color="orange">
              Sign up
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Register;
