import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { FavouriteContextProvider } from "./components/FavouriteContext";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <FavouriteContextProvider>
        <App />
      </FavouriteContextProvider>
    </ChakraProvider>
  </React.StrictMode>
);
