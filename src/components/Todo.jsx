import React from "react";
import { Button, Flex, Input, Box, Text, Divider } from "@chakra-ui/react";
import { nanoid } from "nanoid";
import { FcTodoList } from "react-icons/fc";

const Todo = () => {
  const [showTodo, setShowTodo] = React.useState(false);
  const [todoItem, setTodoItem] = React.useState({ id: null, todo: "" });
  const [todoList, setTodoList] = React.useState([]);

  const handleTodoInput = (e) => {
    const { name, value } = e.target;
    setTodoItem({ id: nanoid(), [name]: value });
  };

  const addToTodo = () => {
    setTodoList([...todoList, todoItem]);
    setTodoItem({ id: null, todo: "" });
  };

  return (
    <Flex pos={"relative"} w={"100%"}>
      <Button
        w={50}
        h={50}
        borderRadius={50}
        onClick={() => setShowTodo((prev) => !prev)}
      >
        <FcTodoList />
      </Button>
      {showTodo && (
        <Box pos={"absolute"} top={20} w={"100%"}>
          {todoList.map((todo) => (
            <Box key={todo.id}>
              <Text p={2}>{todo.todo}</Text>
              <Divider />
            </Box>
          ))}
          <Flex>
            <Input
              placeholder="Add Todo"
              name="todo"
              value={todoItem.todo}
              onChange={handleTodoInput}
            />
            <Button onClick={addToTodo}>Add</Button>
          </Flex>
        </Box>
      )}
    </Flex>
  );
};

export default Todo;
