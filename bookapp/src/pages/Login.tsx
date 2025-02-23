import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { faKey, faUser } from "@fortawesome/free-solid-svg-icons";
import * as yup from "yup";

import { TextInput, Button, Error, LoadingTwo } from "src/common/index";

import { AuthLayout } from "src/layout/index";

import { useLoginMutation, MeDocument, MeQuery } from "src/generated/index";
import Logo from "src/common/Logo";
interface FormData {
  emailOrUsername: string;
  password: string;
}

const schema = yup.object().shape({
  emailOrUsername: yup.string().required("Email or username is required"),
  password: yup.string().required("Password is required"),
});

const Login = () => {
  const { handleSubmit, register } = useForm<FormData>({
    resolver: yupResolver(schema),
    reValidateMode: "onSubmit",
    mode: "onTouched",
  });

  const navigate = useNavigate();

  const [loginMutation, { error, loading }] = useLoginMutation({
    onCompleted: (data) => {
      localStorage.setItem("token", `Bearer ${data.login.token}`);
      navigate("/");
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
        onSubmit={handleSubmit(({ emailOrUsername, password }) =>
          loginMutation({
            variables: { input: { emailOrUsername, password } },
          })
        )}
      >
        {error && <Error error={error!.message} />}
        <TextInput
          icon={faUser}
          placeholder="Email or username"
          {...register("emailOrUsername")}
        />
        <TextInput
          type="password"
          icon={faKey}
          placeholder="Password"
          {...register("password")}
          className="mb-4"
        />

        <Button type="submit" className="w-full">
          {loading ? <LoadingTwo /> : "Sign in"}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default Login;
