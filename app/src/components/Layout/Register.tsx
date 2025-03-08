import {
  Box,
  Button,
  Card,
  Center,
  Container,
  Stepper,
  Text,
  Title,
} from "@mantine/core";
import { useState } from "react";

const Register = () => {
  const defaultGradient = { from: "blue", to: "cyan", deg: 45 };
  const changeGradient = { from: "cyan", to: "blue", deg: 45 };
  const [active, setActive] = useState(0);
  const [registerBtnHover, setRegisterBtnHover] = useState(defaultGradient);
  return (
    <Container
      p="lg"
      fluid
      h="100vh"
      style={{
        background: "linear-gradient(to right, #03afff 50%, #0381ff 50%)",
        boxSizing: "border-box",
      }}
      component={Center}
    >
      <Card
        w="35%"
        h="90vh"
        p="50px"
        radius="10px 0 0 10px"
        shadow="4px 4px 4px 2px rgb(0 0 0 /20%)"
      >
        <Box mt="30px" component="center">
          <Title c="#03afff" ta="center" mb="20px">
            新規登録
          </Title>
          <Text fz="20px" mt="50px" ta="center">
            ToDoAppへようこそ！
          </Text>
          <Text fz="20px" mt="10px" ta="center">
            ステップを進んでアプリを使う準備を
            <br />
            進めよう！
          </Text>
          <Button
            w="180px"
            h="180px"
            radius="50%"
            variant="gradient"
            fz="23px"
            fw={1000}
            mt="50px"
            gradient={registerBtnHover}
            onMouseOver={() => setRegisterBtnHover(changeGradient)}
            onMouseOut={() => setRegisterBtnHover(defaultGradient)}
          >
            登録スタート
          </Button>
        </Box>
      </Card>
      <Card
        w="35%"
        h="90vh"
        p="50px"
        radius="0 10px 10px 0"
        bg="#039fff"
        shadow="2px 4px 2px 2px rgb(0 0 0 /20%)"
      >
        <Title c="white" ta="center" mb="20px">
          ステップ
        </Title>
        <Card radius="lg" shadow="none">
          <Stepper
            active={active}
            onStepClick={setActive}
            orientation="vertical"
          >
            <Stepper.Step
              label="登録開始"
              c="cyan"
              style={{ alignItems: "center" }}
            ></Stepper.Step>
            <Stepper.Step
              label="ステップ１"
              description="メールアドレス登録"
              c="cyan"
            />
            <Stepper.Step
              label="ステップ２"
              description="パスワード設定"
              c="cyan"
            />
            <Stepper.Step
              label="ステップ３"
              description="ユーザー名・その他情報"
              c="cyan"
            />
            <Stepper.Step
              label="内容確認"
              c="cyan"
              style={{ alignItems: "center" }}
            />
            <Stepper.Step
              label="登録完了"
              c="cyan"
              style={{ alignItems: "center" }}
            />
          </Stepper>
        </Card>
      </Card>
    </Container>
  );
};
export default Register;
