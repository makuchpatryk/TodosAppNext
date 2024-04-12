import Main from "../app/components/Main";
import { ChakraProvider } from "@chakra-ui/react";
import RootLayout from "src/app/components/Layout";
import { ReactElement } from "react";

export type TabType = {
  id: string;
  title: string;
};

const Page = () => {
  return (
    <>
      <ChakraProvider>
        <Main />
      </ChakraProvider>
    </>
  );
};
Page.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

export default Page;
