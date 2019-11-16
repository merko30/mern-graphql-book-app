import React, { useState } from "react";
import { useMutation } from "react-apollo";
import { loader } from "graphql.macro";
import { Link } from "react-router-dom";

import { validate } from "../utils/validate";

import TextInput from "../common/TextInput";
import Button from "../common/Button";
import Error from "../common/Error";

const register = loader("../graphql/register.graphql");

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});

  const [registerMutation, { data, error, loading }] = useMutation(register);

  return (
    <div className="h-screen flex items-center justify-center flex-col">
      <form
        className="md:mx-auto p-16 bg-primary rounded shadow-lg"
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
          <Link to="/login" className="block text-secondary mb-2 text-sm">
            Already have an account ?
          </Link>

          <Button type="submit" color="orange">
            Sign up
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Register;
