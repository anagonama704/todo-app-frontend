import { Box, Center, Container, Loader, Text } from "@mantine/core";
import Title from "../../components/Layout/Title";
import { useState } from "react";
import Login from "./components/Login";

const Top = () => {
  const [isLoader, setIsLoader] = useState(false);
  return (
    <Container>
      <Center m={"20% 0 0 0"}>
        <Title />
      </Center>
      <Loader
        m={"75px auto 0 auto"}
        display={isLoader ? "block" : "none"}
        size={70}
        color="#59B5F8"
      />
      <Login isActive={isLoader} />
    </Container>
  );
};
export default Top;
