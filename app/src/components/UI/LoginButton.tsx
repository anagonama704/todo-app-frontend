import { Button, Container } from "@mantine/core";
import { ReactEventHandler } from "react";

const LoginButton = ({
  onClick,
  label,
}: {
  onClick: ReactEventHandler;
  label: string;
}) => {
  return (
    <Container fluid w={"100%"} p={0} m={0}>
      <Button
        mt={40}
        w={"100%"}
        p={0}
        m={0}
        onClick={onClick}
        children={label}
        color="#59B5F8"
      />
    </Container>
  );
};
export default LoginButton;
