import { nanoid } from "nanoid";
import React, { createContext, useState } from "react";
const FavouriteContext = createContext();
const FavouriteContextProvider = (props) => {
  const [favouriteObj, setFavouriteObj] = useState({
    id: nanoid(),
    siteName: "",
    siteURL: "",
  });
  const [favourites, setFavourites] = useState(
    localStorage.getItem("favourites")
      ? JSON.parse(localStorage.getItem("favourites"))
      : []
  );
  const handleFavouriteInput = (e) => {
    const { name, value } = e.target;
    setFavouriteObj({ ...favouriteObj, [name]: value });
  };

  const addToFavourite = () => {
    setFavourites([...favourites, favouriteObj]);
    setFavouriteObj({ id: nanoid(), siteName: "", siteURL: "" });
  };
  React.useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);
  return (
    <FavouriteContext.Provider
      value={{ favouriteObj, favourites, handleFavouriteInput, addToFavourite }}
    >
      {props.children}
    </FavouriteContext.Provider>
  );
};

export { FavouriteContextProvider, FavouriteContext };
