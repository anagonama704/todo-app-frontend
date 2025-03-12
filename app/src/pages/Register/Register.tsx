import {
  Container,
  Stepper,
  Center,
  Flex,
  Image,
  Title as Titles,
  Paper,
  Box,
  rem,
  TextInput,
  Button,
  Stack,
  PasswordInput,
  Text,
  List,
  LoadingOverlay,
  Group,
  MantineProvider,
} from "@mantine/core";
import { useState } from "react";
import { useForm } from "@mantine/form";
import { IconCheck } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuthStore } from "../../features/auth/store/auth";

const Register = () => {
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(false);
  const { register } = useAuthStore();
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      username: "",
      displayName: "",
    },
    validate: {
      email: (value) => {
        if (!value) return "メールアドレスは必須です";
        if (!/^\S+@\S+$/.test(value)) return "無効なメールアドレスです";
        return null;
      },
      password: (value) => {
        if (!value) return "パスワードは必須です";
        if (value.length < 8)
          return "パスワードは8文字以上である必要があります";
        if (!/[A-Z]/.test(value))
          return "パスワードは大文字を含む必要があります";
        if (!/[a-z]/.test(value))
          return "パスワードは小文字を含む必要があります";
        if (!/[0-9]/.test(value)) return "パスワードは数字を含む必要があります";
        return null;
      },
      confirmPassword: (value, values) => {
        if (!value) return "パスワード（確認）は必須です";
        if (value !== values.password) return "パスワードが一致しません";
        return null;
      },
      username: (value) => {
        if (!value) return "ユーザー名は必須です";
        if (value.length < 3)
          return "ユーザー名は3文字以上である必要があります";
        if (!/^[a-zA-Z0-9_-]+$/.test(value))
          return "ユーザー名は半角英数字、ハイフン、アンダースコアのみ使用できます";
        return null;
      },
      displayName: (value) => {
        if (!value) return "表示名は必須です";
        if (value.length < 1) return "表示名は1文字以上である必要があります";
        if (value.length > 30) return "表示名は30文字以内である必要があります";
        return null;
      },
    },
    validateInputOnChange: true,
  });

  const handleRegister = async () => {
    try {
      setLoading(true);
      const { confirmPassword, ...rest } = form.values;

      const registerData = {
        email: rest.email,
        password: rest.password,
        name: rest.username,
        displayName: rest.displayName,
      };

      await register(registerData);
      setActive(4);
    } catch (error) {
      console.error("Registration error:", error);

      if (axios.isAxiosError(error)) {
        if (error.response) {
          const errorMessage =
            error.response.data.message || "登録に失敗しました";
          if (error.response.status === 409) {
            form.setErrors({
              email: "このメールアドレスは既に登録されています",
            });
          } else {
            form.setErrors({ email: errorMessage });
          }
        } else if (error.request) {
          form.setErrors({
            email:
              "サーバーに接続できません。ネットワーク接続を確認してください。",
          });
        } else {
          form.setErrors({ email: "リクエストの送信に失敗しました" });
        }
      } else {
        form.setErrors({ email: "予期せぬエラーが発生しました" });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleStepSubmit = () => {
    switch (active) {
      case 0:
        const emailError = form.validateField("email");
        if (!emailError.hasError) {
          setActive((current) => current + 1);
        }
        break;
      case 1:
        const passwordError = form.validateField("password");
        const confirmPasswordError = form.validateField("confirmPassword");
        if (!passwordError.hasError && !confirmPasswordError.hasError) {
          setActive((current) => current + 1);
        }
        break;
      case 2:
        const usernameError = form.validateField("username");
        const displayNameError = form.validateField("displayName");
        if (!usernameError.hasError && !displayNameError.hasError) {
          setActive((current) => current + 1);
        }
        break;
      default:
        setActive((current) => current + 1);
    }
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleStepSubmit();
            }}
          >
            <Stack>
              <Text size="lg" fw={700} c="#59B5F8" ta="center">
                メールアドレスを入力してください
              </Text>
              <Text size="sm" c="dimmed" ta="center">
                このメールアドレスはログインに使用します
              </Text>
              <TextInput
                required
                label="メールアドレス"
                placeholder="your@email.com"
                {...form.getInputProps("email")}
                radius="md"
              />
              <Button
                type="submit"
                radius="xl"
                color="#59B5F8"
                disabled={!form.values.email}
              >
                次へ進む
              </Button>
            </Stack>
          </form>
        );
      case 1:
        return (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleStepSubmit();
            }}
          >
            <Stack>
              <Text size="lg" fw={700} c="#59B5F8" ta="center">
                パスワードを設定してください
              </Text>
              <Text size="sm" c="dimmed" ta="center">
                8文字以上で、大文字・小文字・数字を含める必要があります
              </Text>
              <PasswordInput
                required
                label="パスワード"
                placeholder="8文字以上で入力してください"
                {...form.getInputProps("password")}
                radius="md"
              />
              <PasswordInput
                required
                label="パスワード（確認）"
                placeholder="もう一度入力してください"
                {...form.getInputProps("confirmPassword")}
                radius="md"
              />
              <Group justify="space-between" w="100%">
                <Button
                  variant="light"
                  radius="xl"
                  color="#59B5F8"
                  onClick={() => setActive((current) => current - 1)}
                >
                  前へ戻る
                </Button>
                <Button
                  type="submit"
                  radius="xl"
                  color="#59B5F8"
                  disabled={
                    !form.values.password || !form.values.confirmPassword
                  }
                >
                  次へ進む
                </Button>
              </Group>
            </Stack>
          </form>
        );
      case 2:
        return (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleStepSubmit();
            }}
          >
            <Stack>
              <Text size="lg" fw={700} c="#59B5F8" ta="center">
                ユーザー情報を入力してください
              </Text>
              <Text size="sm" c="dimmed" ta="center">
                ユーザー名はログインID、表示名はアプリ内での表示に使用されます
              </Text>
              <TextInput
                required
                label="ユーザー名"
                placeholder="ログインIDとして使用します"
                {...form.getInputProps("username")}
                radius="md"
              />
              <TextInput
                required
                label="表示名"
                placeholder="アプリ内で表示される名前"
                {...form.getInputProps("displayName")}
                radius="md"
              />
              <Group justify="space-between" w="100%">
                <Button
                  variant="light"
                  radius="xl"
                  color="#59B5F8"
                  onClick={() => setActive((current) => current - 1)}
                >
                  前へ戻る
                </Button>
                <Button
                  type="submit"
                  radius="xl"
                  color="#59B5F8"
                  disabled={!form.values.username || !form.values.displayName}
                >
                  次へ進む
                </Button>
              </Group>
            </Stack>
          </form>
        );
      case 3:
        return (
          <Stack>
            <Text size="lg" fw={700} c="#59B5F8" ta="center">
              入力内容の確認
            </Text>
            <Text size="sm" c="dimmed" ta="center">
              以下の内容で登録を行います
            </Text>
            <List spacing="xs" size="sm" center>
              <List.Item icon={<IconCheck size={16} color="#59B5F8" />}>
                メールアドレス：{form.values.email}
              </List.Item>
              <List.Item icon={<IconCheck size={16} color="#59B5F8" />}>
                ユーザー名：{form.values.username}
              </List.Item>
              <List.Item icon={<IconCheck size={16} color="#59B5F8" />}>
                表示名：{form.values.displayName}
              </List.Item>
            </List>
            <Group justify="space-between" w="100%">
              <Button
                variant="light"
                radius="xl"
                color="#59B5F8"
                onClick={() => setActive((current) => current - 1)}
              >
                前へ戻る
              </Button>
              <Button
                onClick={handleRegister}
                radius="xl"
                color="#59B5F8"
                loading={loading}
              >
                登録する
              </Button>
            </Group>
          </Stack>
        );
      case 4:
        return (
          <Stack align="center" gap="lg">
            <IconCheck size={50} color="#59B5F8" />
            <Text size="xl" fw={700} c="#59B5F8">
              ようこそToDoAppへ！ 登録が完了しました！
            </Text>
            <Text size="sm" c="dimmed" ta="center">
              ログイン画面からログインしてください
            </Text>
            <Button component={Link} to="/" radius="xl" color="#59B5F8">
              ログイン画面へ
            </Button>
          </Stack>
        );
      default:
        return null;
    }
  };

  return (
    <MantineProvider forceColorScheme="light">
      <Container size="xs">
        <Center m={"10% 0 0 0"}>
          <Flex w={300} justify={"space-between"} align={"center"}>
            <Image w={80} h={80} src={"/images/logo.png"} />
            <Titles order={1} size={45} c={"#59B5F8"}>
              ToDoApp
            </Titles>
          </Flex>
        </Center>

        <Box mt={rem(30)}>
          <Titles order={2} size="h3" fw={900} ta="center" c="#59B5F8" mb="xl">
            新規登録
          </Titles>

          <Box mb="xl">
            <Stepper
              active={active}
              onStepClick={setActive}
              size="xs"
              iconSize={20}
              allowNextStepsSelect={false}
              styles={{
                separator: {
                  marginLeft: rem(2),
                  marginRight: rem(2),
                },
                stepBody: {
                  display: "none",
                },
                step: {
                  padding: 0,
                },
                stepIcon: {
                  borderWidth: rem(2),
                },
              }}
            >
              <Stepper.Step c="#59B5F8" />
              <Stepper.Step c="#59B5F8" />
              <Stepper.Step c="#59B5F8" />
              <Stepper.Step c="#59B5F8" />
              <Stepper.Step c="#59B5F8" />
            </Stepper>
          </Box>

          <Paper radius="md" p="xl" withBorder pos="relative">
            <LoadingOverlay visible={loading} overlayProps={{ blur: 2 }} />
            {renderStepContent(active)}
          </Paper>
        </Box>
        <Link
          to="/"
          style={{
            display: "block",
            textAlign: "center",
            marginTop: "1rem",
            textDecoration: "none",
            color: "#59B5F8",
          }}
        >
          ログイン画面へ戻る
        </Link>
      </Container>
    </MantineProvider>
  );
};

export default Register;
