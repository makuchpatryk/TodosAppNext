import { Box, Button, Flex, FormControl, Input } from "@chakra-ui/react";
import { useState } from "react";

type ItemProps = {
  createTodo: (text: string) => void;
};
const CreateForm = ({ createTodo }: ItemProps) => {
  const [newTodo, setNewTodo] = useState<string>("");

  return (
    <Flex>
      <Box p="4" w="100%">
        <FormControl>
          <Input
            value={newTodo}
            onChange={(e) => {
              setNewTodo(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                createTodo(newTodo);
                setNewTodo("");
              }
            }}
          />
        </FormControl>
      </Box>
      <Box p="4">
        <Button
          onClick={() => {
            createTodo(newTodo);
            setNewTodo("");
          }}
        >
          Add new
        </Button>
      </Box>
    </Flex>
  );
};

export default CreateForm;
