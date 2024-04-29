import React, { useState } from "react";
import { UserContext } from "./UserContext";
const UserProvider = ({ children }) => {
  const userdata = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(userdata || {});
  // console.log(userdata);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
