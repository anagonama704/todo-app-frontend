import { MantineProvider } from "@mantine/core";
import { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";

const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <BrowserRouter>
        <MantineProvider>{children}</MantineProvider>
      </BrowserRouter>
    </>
  );
};
export default Provider;
