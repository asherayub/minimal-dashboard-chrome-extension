import React, { useState, useContext } from "react";
import {
  Box,
  Container,
  Grid,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
} from "@chakra-ui/react";
import { BsGoogle } from "react-icons/bs";
import { SiMicrosoftbing } from "react-icons/si";

import AddFavourite from "./components/AddFavourite";
import { FavouriteContext } from "./components/FavouriteContext";
function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchEngine, setSearchEngine] = useState("google");
  const { favourites } = useContext(FavouriteContext);
  const searchIcon = () => {
    if (searchEngine === "google") {
      return <BsGoogle />;
    } else if (searchEngine === "bing") {
      return <SiMicrosoftbing />;
    }
  };
  return (
    <div className="App">
      <Container maxW={"100vw"} h={"100vh"}>
        <Grid templateColumns={"1fr 2fr 1fr"}>
          <Box>TODO</Box>
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
              templateColumns={"repeat(auto-fit, minmax(70px, 70px))"}
              mt={10}
              gap={5}
            >
              {favourites.map((fav) => {
                return (
                  <Link
                    w={"70px"}
                    h={"70px"}
                    borderRadius={"50"}
                    sx={{
                      display: "inline-block",
                      textAlign: "center",
                      lineHeight: "70px",
                      fontSize: "1.5rem",
                      color: "white",
                      backgroundColor: "blue.500",
                      marginRight: "10px",
                    }}
                    href={fav.siteURL}
                  >
                    {fav.siteName.slice(0, 1).toUpperCase()}
                  </Link>
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
