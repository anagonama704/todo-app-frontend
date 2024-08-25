import { Box, Center, Container, rem, Text } from "@mantine/core";
import { ReactEventHandler } from "react";
import TextInput from "../UI/TextInput";
import { IconAt, IconKey } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import LoginButton from "../UI/LoginButton";

const LoginForm = ({
  LoginFormSubmit,
}: {
  LoginFormSubmit: ReactEventHandler;
}) => {
  const EmailIcon = <IconAt style={{ width: rem(16), height: rem(16) }} />;
  const Keyicon = <IconKey style={{ width: rem(16), height: rem(16) }} />;
  const ClickLoginButton = () => {};
  return (
    <Container>
      <form method="post" onSubmit={LoginFormSubmit}>
        <TextInput
          label="メールアドレス"
          placeholder="メールアドレス"
          icon={EmailIcon}
          type="text"
          withAsterisk
        />
        <TextInput
          label="パスワード"
          placeholder=""
          icon={Keyicon}
          type="password"
          withAsterisk
        />
        <Center mt={10}>
          <LoginButton label="ログイン" onClick={ClickLoginButton} />
        </Center>
        <Center mt={10}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Text c={"#59B5F8"}>新規登録はこちら</Text>
          </Link>
        </Center>
      </form>
    </Container>
  );
};
export default LoginForm;
