import React, { useState } from "react";
import { useMutation } from "react-apollo";
import { loader } from "graphql.macro";

import { validate } from "../helpers/validate";

import TextInput from "../components/TextInput";
import Button from "../components/Button";
import Error from "../components/Error";

const register = loader("../graphql/register.graphql");

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = null;

  const [registerMutation, { data, error, loading }] = useMutation(register);

  return (
    <div className="mt-5 p-24">
      <form
        className="mt-8 md:mx-auto"
        onSubmit={e => {
          e.preventDefault();
          setErrors(validate({ username, email, password }));
          if (
            Object.keys(validate({ username, email, password })).length === 0
          ) {
            registerMutation({ variables: { username, email, password } });
          }
        }}
      >
        <h2 className="uppercase text-teal-darkest">Sign in</h2>
        <hr className="hr" />
        {error && <Error error={error.message} />}
        <div>
          <TextInput
            label="Username"
            name="username"
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          {errors.username && <Error error={errors.username} />}

          <TextInput
            label="Email"
            name="email"
            type="text"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          {errors.email && <Error error={errors.email} />}

          <TextInput
            label="Password"
            type="password"
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          {errors.password && <Error error={errors.password} />}

          <Button type="submit">Sign up</Button>
        </div>
      </form>
      )}
    </div>
  );
};

export default Register;
