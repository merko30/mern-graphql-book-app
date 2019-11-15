import React from "react";
import { Mutation } from "react-apollo";

import login from "../graphql/mutations/login";

import { validate } from "../helpers/validate";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import Error from "../components/Error";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  setToken = async ({ login: { token } }) => {
    await localStorage.setItem("token", `Bearer ${token}`);
    await setTimeout(() => {
      this.props.history.push("/dashboard");
    }, 2000);
  };

  render() {
    const { email, password, errors } = this.state;
    return (
      <div className="mt-5 p-24">
        <Mutation
          mutation={login}
          ignoreResults={false}
          onCompleted={data => this.setToken(data)}
        >
          {(login, { error, client }) => (
            <form
              className="mt-8 md:mx-auto"
              onSubmit={e => {
                e.preventDefault();
                let errors = validate({ email, password });
                this.setState({ errors }, () => {
                  if (Object.keys(errors).length === 0) {
                    login({ variables: { email, password } });
                  }
                });
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
                  onChange={this.handleChange}
                />

                {errors.email && <Error error={errors.email} />}

                <TextInput
                  label="Password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={this.handleChange}
                />
                {errors.password && <Error error={errors.password} />}

                <Button type="submit">Sign in</Button>
              </div>
            </form>
          )}
        </Mutation>
      </div>
    );
  }
}

export default Login;
