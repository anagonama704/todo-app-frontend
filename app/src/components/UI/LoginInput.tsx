import {
  TextInput as MantineTextInput,
  PasswordInput,
  Button,
} from "@mantine/core";
import { useState } from "react";

interface LoginInputProps {
  onSubmit: (values: { email: string; password: string }) => Promise<void>;
  error?: string;
}

const LoginInput = ({ onSubmit, error }: LoginInputProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({ email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <MantineTextInput
        label="メールアドレス"
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={error}
        mb="md"
        required
      />
      <PasswordInput
        label="パスワード"
        placeholder="8文字以上"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={error}
        mb="xl"
        required
      />
      <Button fullWidth type="submit" color="#59B5F8">
        ログイン
      </Button>
    </form>
  );
};

export default LoginInput;
