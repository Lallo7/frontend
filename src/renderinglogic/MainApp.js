// src/MainApp.js
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import Shop from "../Pages/Shop";
import ShopCategory from "../Pages/ShopCategory";
import Cart from "../Pages/Cart";
import Signup from "../Pages/Signup";
import CheckoutForm from "../Components/Checkoutform/CheckoutForm";
import Login from "../Pages/Login";
import SearchResults from "../Components/ProductList/ProductList";
import ProductList from "../Components/ProductList/ProductList";
import Favorite from "../Components/Favorite/Favorite";
import Userdashboard from "../Components/Userdashboard/Userdashboard";
import Myorders from "../Components/Userdashboard/Myorders/Myorders";
import Rating from "../Components/Rating/Rating";
import AdminLogin from "../Pages/AdminLogin";
import FavoriteButton from "../Components/FavoriteButton/FavoriteButton";
import "../App.css";
import Product from "../Pages/Product";
import ShopContextProvider from "../Context/ShopContext";

function MainApp() {
  const location = useLocation();
  const isAdminRoute =
    location.pathname === "/SecretAdminPanelLoginForm2990d8h028";

  return (
    <div>
      {isAdminRoute ? (
        <ShopContextProvider>
          <Routes>
            <Route
              path="/SecretAdminPanelLoginForm2990d8h028"
              element={<AdminLogin />}
            />
          </Routes>
        </ShopContextProvider>
      ) : (
        <>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={<Shop />}
            />
            <Route
              path="/Myorders"
              element={<Myorders />}
            />
            <Route
              path="/FavoriteButton"
              element={<FavoriteButton />}
            />
            <Route
              path="/Rating"
              element={<Rating />}
            />
            <Route
              path="/category/:category"
              element={<ShopCategory />}
            />
            <Route
              path="/Userdashboard"
              element={<Userdashboard />}
            />
            <Route
              path="/Favorite"
              element={<Favorite />}
            />
            <Route
              path="/product/:productId"
              element={<Product />}
            />
            <Route
              path="/cart"
              element={<Cart />}
            />
            <Route
              path="/Signup"
              element={<Signup />}
            />
            <Route
              path="/Login"
              element={<Login />}
            />
            <Route
              path="/ProductList"
              element={<ProductList />}
            />
            <Route
              path="/CheckoutForm"
              element={<CheckoutForm />}
            />
            <Route
              path="/SearchResults"
              element={<SearchResults />}
            />
          </Routes>
          <Footer />
        </>
      )}
    </div>
  );
}

export default MainApp;
