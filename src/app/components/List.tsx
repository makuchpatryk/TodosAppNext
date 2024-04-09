import { Box, Divider } from "@chakra-ui/react";
import Item from "./Item";
import CreateForm from "./CreateForm";
import useCrudTodos from "../hooks/useCrudTodos";

type ListProps = {
  tabId: string;
};

export default function List({ tabId }: ListProps) {
  const { todos, updateTextTodo, updateDoneTodo, createTodo, deleteTodo } =
    useCrudTodos(tabId);

  return (
    <>
      <Box w="500px">
        <div className="body">
          {todos.map((todo) => {
            return (
              <Item
                todo={todo}
                key={todo.id}
                onDoneUpadate={() => updateDoneTodo(todo.id)}
                onTextUpdate={(text) => updateTextTodo(todo.id, text)}
                onRemove={() => deleteTodo(todo.id)}
              />
            );
          })}
        </div>
        <Divider my="4" />
        <CreateForm createTodo={createTodo} />
      </Box>
    </>
  );
}
