import { getCookie } from "cookies-next";
import Main from "../app/components/Main";
import { ChakraProvider } from "@chakra-ui/react";

export type TabType = {
  id: string;
  title: string;
};

function Page() {
  return (
    <>
      <ChakraProvider>
        <Main />
      </ChakraProvider>
    </>
  );
}

export default Page;
