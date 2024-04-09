"use client";
import { ChakraProvider, Heading, Spacer } from "@chakra-ui/react";
import List from "./components/List";
import { v4 as uuidv4 } from "uuid";
import TodosTab from "./components/TodosTab";
import { useEffect, useState } from "react";

type TabType = {
  id: string;
  title: string;
};
function App() {
  const [tabs, setTabs] = useState([
    {
      id: "e488437e-8366-4d8d-9dd4-89dd5e841c6a",
      title: "default",
      content: <List tabId="e488437e-8366-4d8d-9dd4-89dd5e841c6a" />,
    },
  ]);
  useEffect(() => {
    const init = async () => {
      const localStorageValue = await localStorage.getItem("tabs");

      if (localStorageValue) {
        const tabs = JSON.parse(localStorageValue || "");
        if (tabs) {
          setTabs(
            tabs.map((i: TabType) => ({
              id: i.id,
              title: i.title,
              content: <List tabId={i.id} />,
            }))
          );
        }
      }
    };
    init();
  }, []);

  const updateStorage = (value: { id: string; title: string }[]) => {
    localStorage.setItem("tabs", JSON.stringify(value));
  };

  const onCreateTab = (title: string) => {
    const id = uuidv4();
    setTabs([
      ...tabs,
      {
        id,
        title,
        content: <List tabId={id} />,
      },
    ]);
    updateStorage(
      tabs.map((i) => ({
        id: i.id,
        title: i.title,
      }))
    );
  };
  const onDeleteTab = (id: string) => {
    const newTabs = tabs.filter((tab) => tab.id !== id);

    setTabs(newTabs);
    updateStorage(
      tabs.map((i) => ({
        id: i.id,
        title: i.title,
      }))
    );
  };
  return (
    <ChakraProvider>
      <Heading textAlign="center">Todos app</Heading>
      <Spacer my="4" />
      <TodosTab
        tabs={tabs}
        onCreateTab={onCreateTab}
        onDeleteTab={onDeleteTab}
      />
    </ChakraProvider>
  );
}

export default App;
