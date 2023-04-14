import React, { useState, useContext } from "react";
import {
  Box,
  Container,
  Flex,
  Grid,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Text,
} from "@chakra-ui/react";
import { BsGoogle } from "react-icons/bs";
import { SiMicrosoftbing } from "react-icons/si";
import { IoClose } from "react-icons/io5";

import AddFavourite from "./components/AddFavourite";
import { FavouriteContext } from "./components/FavouriteContext";
import Todo from "./components/Todo";
import useHover from "./useHooks/useHover";
function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchEngine, setSearchEngine] = useState("google");
  const { favourites, removeFavorite } = useContext(FavouriteContext);
  const [isHovered, hoverRef] = useHover();
  const searchIcon = () => {
    if (searchEngine === "google") {
      return <BsGoogle />;
    } else if (searchEngine === "bing") {
      return <SiMicrosoftbing />;
    }
  };
  return (
    <div className="App">
      <Container maxW={"100vw"} h={"100vh"} p={5}>
        <Grid templateColumns={"1fr 2fr 1fr"} gap={2}>
          <Box gridColumn={"1 / 2"}>
            <Todo />
          </Box>
          <Box mt={100}>
            <form
              action={`https://www.${searchEngine}.com/search`}
              method="GET"
            >
              <InputGroup>
                <InputLeftElement
                  onClick={() => {
                    searchEngine === "google"
                      ? setSearchEngine("bing")
                      : setSearchEngine("google");
                  }}
                  children={searchIcon()}
                  fontSize={"1.5rem"}
                />
                <Input
                  type="text"
                  name="q"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search"
                  autoFocus
                  pl={51}
                />
              </InputGroup>
            </form>
            <Grid
              className="favourites"
              templateColumns={"repeat(auto-fit, minmax(100px, 100px))"}
              placeItems={"center"}
              mt={10}
              gap={5}
            >
              {favourites.map((fav) => {
                return (
                  <Flex
                    key={fav.id}
                    w={100}
                    flexDirection={"column"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    ref={hoverRef}
                    pos={"relative"}
                  >
                    <Link
                      w={"70px"}
                      h={"70px"}
                      borderRadius={"50"}
                      border={"1px solid lightgray"}
                      sx={{
                        display: "inline-flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      _hover={{ border: "1px solid gray" }}
                      transition={"border 0.2s ease-in-out"}
                      href={fav.siteURL}
                    >
                      <img
                        height="40"
                        width="40"
                        src={`http://www.google.com/s2/favicons?domain=${fav.siteURL}`}
                      />
                    </Link>
                    {isHovered && (
                      <IoClose
                        onClick={() => removeFavorite(fav.id)}
                        style={{
                          position: "absolute",
                          right: "0",
                          bottom: "5",
                          cursor: "pointer",
                        }}
                      />
                    )}
                    <Text textAlign={"center"}>
                      {fav.siteName.split(" ")[0]}
                    </Text>
                  </Flex>
                );
              })}
              <AddFavourite />
            </Grid>
          </Box>
          <Box>Theme Switcher</Box>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
