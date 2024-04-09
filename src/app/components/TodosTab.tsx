import { CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

type TTab = {
  id: string;
  title: string;
  content: string | JSX.Element | JSX.Element[];
};
type tabPanelProps = {
  tabs: TTab[];
  onCreateTab: (v: string) => void;
  onDeleteTab: (id: string) => void;
};

export default function TodosTab({
  tabs,
  onCreateTab,
  onDeleteTab,
}: tabPanelProps) {
  const [editable, setEditable] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editable && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editable]);

  return (
    <>
      <Tabs w="500px" m="auto">
        <TabList>
          {tabs.map((tab) => (
            <Tab key={tab.id}>
              <Box mr="3">{tab.title}</Box>
              <CloseIcon
                onClick={() => {
                  onDeleteTab(tab.id);
                }}
              />
            </Tab>
          ))}
          <Tab>
            {editable ? (
              <Input
                ref={inputRef}
                onBlur={(e) => {
                  setEditable(!editable);
                  if (!e.target.value) return;

                  onCreateTab(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const target = e.target as HTMLInputElement;

                    setEditable(!editable);
                    if (!target.value) return;
                    onCreateTab(target.value);
                  }
                }}
              />
            ) : (
              <Box
                onClick={() => {
                  setEditable(!editable);
                }}
              >
                Add new Tab
              </Box>
            )}
          </Tab>
        </TabList>

        <TabPanels>
          {tabs.map((tab) => (
            <TabPanel key={tab.id}>{tab.content}</TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </>
  );
}
