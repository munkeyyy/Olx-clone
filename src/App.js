import { useEffect, useState } from "react";
import CategoryBar from "./Components/CategoryBar/CategoryBar";
import NavBar from "./Components/NavBar/NavBar";
import ProductList from "./Components/ProductList/ProductList";
import Loader from "./Components/Loader";
import { Route, Router, Routes } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import LogInProvider from "./contexts/Login/LogInProvider";
import ProfilePage from "./Components/ProfilePage/ProfilePage";
import UserProvider from "./contexts/User/UserProvider";
import EditProfile from "./Components/EditProfile/EditProfile";
import SearchProvider from "./contexts/Search/SearchProvider";
import Favourites from "./Components/Favourites/Favourites";
import SingleProductPage from "./Components/SingleProduct/SingleProductPage";
import Post from "./Components/Post/Post";
import ProductDetail from "./Components/Post/ProductDetail";
import Chat from "./Components/Chat/Chat";
function App() {
  return (
    <UserProvider>
      <SearchProvider>
        <LogInProvider>
          <div className="App bg-white">
            <NavBar />
            <div className="hidden md:block">
              <CategoryBar />
            </div>

            <Routes>
              <Route
                path="/"
                element={
                  <div>
                    <ProductList />
                  </div>
                }
              />
              <Route path="/single_page/:_id" element={<SingleProductPage />} />
              <Route path="/editprofile" element={<EditProfile />} />
              <Route path="/profile/:user_id" element={<ProfilePage />} />
              <Route path="/my-favourites" element={<Favourites />} />
              <Route path="/post" element={<Post />} />
              <Route path="/attributes/:id" element={<ProductDetail />} />
              <Route path="/chat" element={<Chat/>} />
            </Routes>
            <Footer />
          </div>
        </LogInProvider>
      </SearchProvider>
    </UserProvider>
  );
}

export default App;
