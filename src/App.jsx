import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/react";
import { BsGoogle } from "react-icons/bs";
import { SiMicrosoftbing } from "react-icons/si";
import { IoClose } from "react-icons/io5";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";

import AddFavourite from "./components/AddFavourite";
import { FavouriteContext } from "./components/FavouriteContext";
import Todo from "./components/Todo";

function App() {
  const [background, setBackground] = useState("");
  const hasBackground = localStorage.getItem("hasBackground");
  const [getBackground, setGetBackground] = useState(
    hasBackground === "true" ? true : false
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [time, setTime] = useState(
    new Date().toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
    })
  );

  const [searchEngine, setSearchEngine] = useState(
    localStorage.getItem("searchEngine")
      ? localStorage.getItem("searchEngine")
      : "google"
  );
  const { favourites, removeFavorite } = useContext(FavouriteContext);
  const { colorMode, toggleColorMode } = useColorMode();

  const searchIcon = () => {
    if (searchEngine === "google") {
      localStorage.setItem("searchEngine", "google");
      return <BsGoogle />;
    } else if (searchEngine === "bing") {
      localStorage.setItem("searchEngine", "bing");
      return <SiMicrosoftbing />;
    }
  };

  const ToolTipIcon = React.forwardRef(({ children, ...rest }, ref) => (
    <Box ref={ref} {...rest}>
      {children}
    </Box>
  ));

  useEffect(() => {
    if (getBackground) {
      fetch(
        "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature"
      )
        .then((res) => res.json())
        .then((data) => {
          setBackground(data.urls.full);
        });
    }
  }, [getBackground]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
        })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, [time]);

  useEffect(() => {
    localStorage.setItem("hasBackground", getBackground);
  }, [getBackground]);

  return (
    <div className="App">
      <Container
        maxW={"100vw"}
        h={"100vh"}
        p={5}
        backgroundImage={getBackground ? `url(${background})` : ""}
        bgSize={"cover"}
        bgRepeat={"no-repeat"}
        bgPosition={"center"}
      >
        <Grid templateColumns={"1fr 2fr 1fr"} gap={2}>
          <Box gridColumn={"1 / 2"}>
            <Todo />
          </Box>
          <Box mt={100}>
            <Heading textAlign={"center"} mb={5} fontSize={"5rem"}>
              {time}
            </Heading>
            <form
              action={`https://www.${searchEngine}.com/search`}
              method="GET"
            >
              <InputGroup maxW={600} mx={"auto"}>
                <InputLeftElement
                  cursor={"pointer"}
                  onClick={() => {
                    searchEngine === "google"
                      ? setSearchEngine("bing")
                      : setSearchEngine("google");
                  }}
                  children={searchIcon()}
                  fontSize={"1.5rem"}
                />
                <Input
                  bg={"blur(10px)"}
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
                    id={fav.id}
                    key={fav.id}
                    w={100}
                    flexDirection={"column"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    pos={"relative"}
                  >
                    <Link
                      bg={"#5858585a"}
                      w={"70px"}
                      h={"70px"}
                      borderRadius={"50"}
                      border={"1px solid #585858a5"}
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
                    <Tooltip
                      label="Remove"
                      aria-label="A tooltip"
                      placement={"top"}
                      hasArrow
                    >
                      <ToolTipIcon
                        onClick={() => removeFavorite(fav.id)}
                        style={{
                          position: "absolute",
                          top: "0",
                          right: "0",
                          opacity: "0.2",
                          cursor: "pointer",
                        }}
                      >
                        <IoClose />
                      </ToolTipIcon>
                    </Tooltip>

                    <Text
                      textAlign={"center"}
                      sx={{
                        backdropFilter: "blur(10px)",
                      }}
                    >
                      {fav.siteName.split(" ")[0]}
                    </Text>
                  </Flex>
                );
              })}
              <AddFavourite />
            </Grid>
          </Box>
          <Box justifySelf={"flex-end"}>
            <Button w={50} h={50} borderRadius={50} onClick={toggleColorMode}>
              {colorMode === "light" ? <BsFillMoonFill /> : <BsFillSunFill />}
            </Button>
            <Tooltip
              label="Get New Background on Each Refresh"
              aria-label="A tooltip"
              placement={"top-start"}
              hasArrow
            >
              <ToolTipIcon pos={"absolute"} bottom="5" right="5">
                <input
                  type="checkbox"
                  name="getBackground"
                  id="getBackground"
                  checked={getBackground}
                  onChange={() => {
                    setGetBackground(!getBackground);
                  }}
                />
              </ToolTipIcon>
            </Tooltip>
          </Box>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
