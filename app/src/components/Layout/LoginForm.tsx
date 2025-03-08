import {
  Button,
  Container,
  PasswordInput,
  Stack,
  TextInput,
} from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "@mantine/form";

interface LoginFormProps {
  loginBtnClick: (values: { email: string; password: string }) => void;
  errorMsg?: string;
  onInputChange?: () => void;
}

const LoginForm = ({
  loginBtnClick,
  errorMsg,
  onInputChange,
}: LoginFormProps) => {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : "無効なメールアドレスです",
      password: (value) =>
        value.length < 6 ? "パスワードは6文字以上である必要があります" : null,
    },
  });

  return (
    <Container>
      <form onSubmit={form.onSubmit(loginBtnClick)}>
        <Stack>
          <TextInput
            required
            label="メールアドレス"
            placeholder="your@email.com"
            value={form.values.email}
            onChange={(event) => {
              form.setFieldValue("email", event.currentTarget.value);
              onInputChange?.();
            }}
            error={form.errors.email}
            radius="md"
          />

          <PasswordInput
            required
            label="パスワード"
            placeholder="パスワードを入力"
            value={form.values.password}
            onChange={(event) => {
              form.setFieldValue("password", event.currentTarget.value);
              onInputChange?.();
            }}
            error={form.errors.password}
            radius="md"
          />

          <Button type="submit" radius="xl">
            ログイン
          </Button>
        </Stack>
      </form>
      <Link
        to="/register"
        style={{
          display: "block",
          textAlign: "center",
          marginTop: "1rem",
          textDecoration: "none",
          color: "#59B5F8",
        }}
      >
        新規登録はこちら
      </Link>
    </Container>
  );
};

export default LoginForm;
