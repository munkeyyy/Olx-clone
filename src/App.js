import { useEffect, useState } from "react";
import CategoryBar from "./Components/CategoryBar/CategoryBar";
import NavBar from "./Components/NavBar/NavBar";
import ProductList from "./Components/ProductList/ProductList";
import Loader from "./Components/Loader";
import { Route, Router, Routes } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <CategoryBar />
              <ProductList />
            </div>
          }
        />
        
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
