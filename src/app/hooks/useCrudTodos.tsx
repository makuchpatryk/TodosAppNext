import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { getCookie, setCookie } from "cookies-next";

export type TodoType = {
  id: string;
  text: string;
  done: boolean;
};

export default function useCrudTodos(tabId: string) {
  const [todos, setTodos] = useState<TodoType[]>([]);

  useEffect(() => {
    const init = async () => {
      const localCookiesValue = await getCookie(`todos/tab/${tabId}`);

      if (localCookiesValue) {
        const todos = JSON.parse(localCookiesValue || "");
        if (todos) {
          setTodos(todos);
        }
      }
    };
    init();
  }, [tabId]);

  const updateCookies = (value: TodoType[]) => {
    setCookie(`todos/tab/${tabId}`, JSON.stringify(value));
  };

  const updateDoneTodo = (todoId: string) => {
    const newTodos = todos.map((i) =>
      i.id === todoId ? { ...i, done: !i.done } : i
    );
    setTodos(newTodos);

    updateCookies(newTodos);
  };

  const updateTextTodo = (todoId: string, text: string) => {
    const newTodos = todos.map((i) =>
      i.id === todoId ? { ...i, text: text } : i
    );
    setTodos(newTodos);

    updateCookies(newTodos);
  };

  const createTodo = (newTodo: string) => {
    if (newTodo) {
      const newTodos = [...todos, { id: uuidv4(), text: newTodo, done: false }];
      setTodos(newTodos);

      updateCookies(newTodos);
    }
  };

  const deleteTodo = (todoId: string) => {
    const newTodos = todos.filter((i) => i.id !== todoId);
    setTodos(newTodos);

    updateCookies(newTodos);
  };
  return { todos, updateTextTodo, updateDoneTodo, createTodo, deleteTodo };
}
