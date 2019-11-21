import React, { useState } from "react";
import { useMutation } from "react-apollo";
import { loader } from "graphql.macro";
import { Link } from "react-router-dom";

import { validate } from "../utils/validate";

import TextInput from "../common/TextInput";
import Button from "../common/Button";
import Error from "../common/Error";

const login = loader("../graphql/login.graphql");
const meQuery = loader("../graphql/me.graphql");

const Login = ({ history }) => {
  const [email, setEmail] = useState("gessg@g.com");
  const [password, setPassword] = useState("password");
  const [errors, setErrors] = useState({});

  const [loginMutation, { error }] = useMutation(login, {
    onCompleted(data) {
      localStorage.setItem("token", `Bearer ${data.login.token}`);
      history.push("/");
    },
    update(store, { data }) {
      if (data) {
        store.writeQuery({
          query: meQuery,
          data: {
            me: {
              ...data.login.user
            }
          }
        });
      }
    }
  });

  return (
    <div className="h-screen flex items-center justify-center flex-col">
      <form
        className="p-16 bg-primary rounded shadow-lg md:mx-auto mx-5"
        onSubmit={e => {
          e.preventDefault();
          setErrors(validate({ email, password }));
          if (Object.keys(validate({ email, password })).length === 0) {
            loginMutation({ variables: { email, password } });
          }
        }}
      >
        {error && <Error error={error.message} />}
        <div>
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

          <Link to="/register" className="block text-secondary mb-2 text-sm">
            You don't have an account ?
          </Link>

          <Button type="submit" color="orange">
            Sign in
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
