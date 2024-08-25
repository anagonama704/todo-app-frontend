import { Center, Container, Title } from "@mantine/core";
import { Form } from "@mantine/form";
import { ReactEventHandler } from "react";
import LoginForm from "../../../components/Layout/LoginForm";

const Login = ({ isActive }: { isActive: boolean }) => {
  const LoginFormSubmit = () => {};
  return (
    <Container w={"50%"} mt={50} display={!isActive ? "block" : "none"}>
      {/* <Title component={Center} children={"ログイン"} c={"#59B5F8"} /> */}
      <LoginForm LoginFormSubmit={LoginFormSubmit} />
    </Container>
  );
};
export default Login;
