import { useEffect, useState } from "react";
import CategoryBar from "./Components/CategoryBar/CategoryBar";
import NavBar from "./Components/NavBar/NavBar"
import ProductList from "./Components/ProductList/ProductList";
import Loader from "./Components/Loader";
function App() {
  
  return (
    <div className="App">
      <NavBar/>
      <CategoryBar/>
      <ProductList/>
    </div>
  );
}

export default App;
