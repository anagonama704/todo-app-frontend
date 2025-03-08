import { Center, Container, Loader } from "@mantine/core";
import Title from "../../components/Layout/Title";
import { useState } from "react";
import Login from "./components/Login";

const Top = () => {
  const [isLoader, setIsLoader] = useState(false);
  return (
    <Container>
      <Center m={"10% 0 0 0"}>
        <Title />
      </Center>
      <Login isActive={isLoader} setIsLoader={setIsLoader} />
    </Container>
  );
};
export default Top;
