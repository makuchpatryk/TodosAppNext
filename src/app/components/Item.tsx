import {
  Button,
  Textarea,
  Flex,
  Box,
  Spacer,
  Checkbox,
} from "@chakra-ui/react";
import { TodoType } from "../hooks/useCrudTodos";
import { useEffect, useRef, useState } from "react";

type ItemProps = {
  todo: TodoType;
  onDoneUpadate: () => void;
  onTextUpdate: (text: string) => void;
  onRemove: () => void;
};
const Item = ({ todo, onDoneUpadate, onTextUpdate, onRemove }: ItemProps) => {
  const [editable, setEditable] = useState<boolean>(false);
  const [textValue, setTextValue] = useState<string>(todo.text);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (editable && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [editable]);

  return (
    <Flex alignItems="center" w="500px">
      <Box p="4" w="100%">
        {editable ? (
          <Textarea
            ref={textareaRef}
            value={textValue}
            onChange={(e) => {
              setTextValue(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setEditable(!editable);
                onTextUpdate(textValue);
              }
            }}
            onBlur={() => {
              setEditable(!editable);
              onTextUpdate(textValue);
            }}
          />
        ) : (
          <Box
            textAlign="left"
            cursor="pointer"
            onClick={() => {
              setEditable(!editable);
            }}
          >
            {textValue}
          </Box>
        )}
      </Box>
      <Spacer />
      <Box p="4">
        <Checkbox defaultChecked={todo.done} onChange={onDoneUpadate} />
      </Box>
      <Box p="4">
        <Button p="2" size="1" onClick={onRemove}>
          Remove
        </Button>
      </Box>
    </Flex>
  );
};

export default Item;
