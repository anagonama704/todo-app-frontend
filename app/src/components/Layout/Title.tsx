import { Container, Flex, Image, Title as Titles } from "@mantine/core";
import logo from "/images/logo.png";

const Title = () => {
  return (
    <Container fluid display={"block"}>
      <Flex w={400} justify={"space-between"} align={"center"}>
        <Image w={100} h={100} src={"/images/logo.png"} />
        <Titles order={1} size={60} c={"#59B5F8"}>
          ToDoApp
        </Titles>
      </Flex>
    </Container>
  );
};
export default Title;
