import {
  Center,
  Container,
  Title,
  Paper,
  Text,
  rem,
  LoadingOverlay,
} from "@mantine/core";
import { useAuthStore } from "../../../features/auth/store/auth";
import { Link, useNavigate } from "react-router-dom";
import LoginForm from "../../../components/Layout/LoginForm";
import { IconLock } from "@tabler/icons-react";
import { memo } from "react";

interface LoginProps {
  isActive: boolean;
  setIsLoader: (value: boolean) => void;
}

const Login = memo(({ isActive, setIsLoader }: LoginProps) => {
  const navigate = useNavigate();
  const { login, error, clearError } = useAuthStore();

  const loginBtnClicked = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setIsLoader(true);
    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      // エラーはストアで処理されます
    } finally {
      setIsLoader(false);
    }
  };

  const handleInputChange = () => {
    if (error) {
      clearError();
    }
  };

  return (
    <Container size="xs" mt={rem(50)}>
      <Paper radius="md" p="xl" withBorder shadow="md" pos="relative">
        <LoadingOverlay visible={isActive} overlayProps={{ blur: 2 }} />
        <Center mb="lg">
          <IconLock size={30} color="#59B5F8" stroke={1.5} />
        </Center>

        <Title order={2} size="h2" fw={900} ta="center" c="#59B5F8" mb="xl">
          ログイン
        </Title>

        {error && (
          <Text c="red" size="sm" ta="center" mb="md">
            {error}
          </Text>
        )}

        <LoginForm
          loginBtnClick={loginBtnClicked}
          errorMsg={error || undefined}
          onInputChange={handleInputChange}
        />

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

        <Text c="dimmed" size="xs" ta="center" mt="sm">
          ※ 初めての方は管理者にアカウントの発行を依頼してください
        </Text>
      </Paper>
    </Container>
  );
});

Login.displayName = "Login";

export default Login;
