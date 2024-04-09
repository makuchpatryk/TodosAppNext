import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export type TodoType = {
  id: string;
  text: string;
  done: boolean;
};

export default function useCrudTodos(tabId: string) {
  const [todos, setTodos] = useState<TodoType[]>([]);

  useEffect(() => {
    const init = async () => {
      const localStorageValue = await localStorage.getItem(
        `todos/tab/${tabId}`
      );

      if (localStorageValue) {
        const todos = JSON.parse(localStorageValue || "");
        if (todos) {
          setTodos(todos);
        }
      }
    };
    init();
  }, [tabId]);

  const updateStorage = (value: TodoType[]) => {
    localStorage.setItem(`todos/tab/${tabId}`, JSON.stringify(value));
  };

  const updateDoneTodo = (todoId: string) => {
    const newTodos = todos.map((i) =>
      i.id === todoId ? { ...i, done: !i.done } : i
    );
    setTodos(newTodos);

    updateStorage(newTodos);
  };

  const updateTextTodo = (todoId: string, text: string) => {
    const newTodos = todos.map((i) =>
      i.id === todoId ? { ...i, text: text } : i
    );
    setTodos(newTodos);

    updateStorage(newTodos);
  };

  const createTodo = (newTodo: string) => {
    if (newTodo) {
      const newTodos = [...todos, { id: uuidv4(), text: newTodo, done: false }];
      setTodos(newTodos);

      updateStorage(newTodos);
    }
  };

  const deleteTodo = (todoId: string) => {
    const newTodos = todos.filter((i) => i.id !== todoId);
    setTodos(newTodos);

    updateStorage(newTodos);
  };
  return { todos, updateTextTodo, updateDoneTodo, createTodo, deleteTodo };
}
