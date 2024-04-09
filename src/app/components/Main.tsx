"use client";

import TodosTab, { TTab } from "./TodosTab";

import { Heading, Spacer } from "@chakra-ui/react";
import useCrudTabs from "../hooks/useCrudTabs";

const Main = () => {
  const { tabs, onDeleteTab, onCreateTab } = useCrudTabs();
  return (
    <>
      <Heading textAlign="center">Todos app</Heading>
      <Spacer my="4" />
      <TodosTab
        tabs={tabs}
        onCreateTab={onCreateTab}
        onDeleteTab={onDeleteTab}
      />
    </>
  );
};

export default Main;
