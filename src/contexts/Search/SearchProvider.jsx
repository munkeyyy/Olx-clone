import React, { useState } from "react";
import { SearchContext } from "./SearchContext";
import axios from "axios";
import { baseUrl } from "../../utils";
const SearchProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const getData = (val = "") => {
    // val.preventDefault()
    axios
      .get(`${baseUrl}products/get-products?search=${val}`)
      .then((res) => {
        console.log(res.data.data);
        setSearch(res.data.data);
        setLoading(false)
    // window.location.reload()
        

      })
      .catch((err) => console.log(err));
  };
  return (
    <SearchContext.Provider value={{ search, setSearch, getData,loading, setLoading }}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
