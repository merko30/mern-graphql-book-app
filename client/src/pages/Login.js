import React, { useState } from "react";
import { useMutation } from "react-apollo";
import { loader } from "graphql.macro";

import { validate } from "../helpers/validate";

import TextInput from "../components/TextInput";
import Button from "../components/Button";
import Error from "../components/Error";

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
    <div className="mt-5 p-24">
      <form
        className="mt-8 md:mx-auto"
        onSubmit={e => {
          e.preventDefault();
          setErrors(validate({ email, password }));
          if (Object.keys(validate({ email, password })).length === 0) {
            loginMutation({ variables: { email, password } });
          }
        }}
      >
        <h2 className="uppercase text-teal-darkest">Sign in</h2>
        <hr className="hr" />
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

          <Button type="submit">Sign in</Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
