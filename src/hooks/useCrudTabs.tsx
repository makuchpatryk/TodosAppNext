import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { getCookie, setCookie } from "cookies-next";
import { TTab } from "../components/TodosTab";
import List from "../components/List";
import { TabType } from "src/pages";

export default function useCrudTodos() {
  const [tabs, setTabs] = useState<TTab[]>([
    {
      id: "e488437e-8366-4d8d-9dd4-89dd5e841c6a",
      title: "default",
      content: <List tabId="e488437e-8366-4d8d-9dd4-89dd5e841c6a" />,
    },
  ]);

  useEffect(() => {
    const init = async () => {
      const localCookieValue = await getCookie("tabs");

      if (localCookieValue) {
        const tabsCookies = JSON.parse(localCookieValue || "");

        if (tabsCookies) {
          setTabs(
            tabsCookies.map((i: TabType) => ({
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
  const updateCookies = (value: { id: string; title: string }[]) => {
    setCookie("tabs", JSON.stringify(value));
  };

  const onCreateTab = (title: string) => {
    const id = uuidv4();
    const tabLocal = [
      ...tabs,
      {
        id,
        title,
        content: <List tabId={id} />,
      },
    ];
    updateCookies(
      tabLocal.map((i) => ({
        id: i.id,
        title: i.title,
      }))
    );

    setTabs(tabLocal);
  };
  const onDeleteTab = (id: string) => {
    const newTabs = tabs.filter((tab) => tab.id !== id);

    updateCookies(
      newTabs.map((i) => ({
        id: i.id,
        title: i.title,
      }))
    );

    setTabs(newTabs);
  };
  return { tabs, onDeleteTab, onCreateTab };
}
