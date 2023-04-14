import React from "react";

import { Button, Flex, Input, Box, Text, Divider } from "@chakra-ui/react";
import { nanoid } from "nanoid";
import { FcTodoList } from "react-icons/fc";
import { BsFillTrashFill } from "react-icons/bs";

const Todo = () => {
  const [showTodo, setShowTodo] = React.useState(false);
  const [todoItem, setTodoItem] = React.useState({ id: null, todo: "" });
  const [todoList, setTodoList] = React.useState(
    localStorage.getItem("todoList")
      ? JSON.parse(localStorage.getItem("todoList"))
      : []
  );
  const todoRef = React.useRef();
  const handleTodoInput = (e) => {
    const { name, value } = e.target;
    setTodoItem({ id: nanoid(), [name]: value });
  };

  const addToTodo = () => {
    setTodoList([...todoList, todoItem]);
    localStorage.setItem("todoList", JSON.stringify(todoList));
    setTodoItem({ id: null, todo: "" });
    todoRef.current.focus();
  };

  const removeTodo = (id) => {
    const newTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(newTodoList);
    localStorage.setItem("todoList", JSON.stringify(newTodoList));
  };

  const toggleTodo = () => {
    setShowTodo((prev) => !prev);
    if (showTodo) {
      todoRef.current.focus();
    }
  };
  return (
    <Flex pos={"relative"} w={"100%"}>
      <Button w={50} h={50} borderRadius={50} onClick={toggleTodo}>
        <FcTodoList />
      </Button>
      {showTodo && (
        <Box pos={"absolute"} top={20} w={"100%"}>
          {todoList.map((todo) => (
            <Box key={todo.id}>
              <Flex justifyContent={"space-between"} alignItems={"center"}>
                <Text p={2}>{todo.todo}</Text>
                <BsFillTrashFill
                  style={{ cursor: "pointer" }}
                  onClick={() => removeTodo(todo.id)}
                />
              </Flex>
              <Divider />
            </Box>
          ))}
          <Flex>
            <Input
              placeholder="Add Todo"
              name="todo"
              value={todoItem.todo}
              onChange={handleTodoInput}
              ref={todoRef}
            />
            <Button onClick={addToTodo}>Add</Button>
          </Flex>
        </Box>
      )}
    </Flex>
  );
};

export default Todo;
