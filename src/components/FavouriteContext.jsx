import React, { createContext, useState } from "react";
const FavouriteContext = createContext();
const FavouriteContextProvider = (props) => {
  const [favouriteObj, setFavouriteObj] = useState({
    siteName: "",
    siteURL: "",
  });
  const [favourites, setFavourites] = useState([]);
  const handleFavouriteInput = (e) => {
    const { name, value } = e.target;
    setFavouriteObj({ ...favouriteObj, [name]: value });
  };
  const addToFavourite = () => {
    setFavourites([...favourites, favouriteObj]);
    setFavouriteObj({ siteName: "", siteURL: "" });
  };
  return (
    <FavouriteContext.Provider
      value={{ favouriteObj, favourites, handleFavouriteInput, addToFavourite }}
    >
      {props.children}
    </FavouriteContext.Provider>
  );
};

export { FavouriteContextProvider, FavouriteContext };
