import React, { useEffect, useState } from "react";
import { SearchContext } from "./SearchContext";
import axios from "axios";
import { baseUrl } from "../../utils";
import { useNavigate } from "react-router-dom";
const SearchProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
const navigate=useNavigate()
  const getData = (val = "") => {
    // val.preventDefault()
    axios
      .get(`${baseUrl}products/get-products?search=${val}`)
      .then((res) => {
        console.log(res.data.data);
        setSearch(res.data.data);
        setLoading(false)
        navigate("/")
    // window.location.reload()
        

      })
      .catch((err) => console.log(err));
  };
  // useEffect(()=>{
  //   // window.location.reload()
  // },[search])
  return (
    <SearchContext.Provider value={{ search, setSearch, getData,loading, setLoading }}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
