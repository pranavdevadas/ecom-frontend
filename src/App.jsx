import React, { useEffect, useState } from "react";
import "./App.css";
import { ThemeProvider, createTheme,CircularProgress } from "@mui/material";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./screen/Login";
import Register from "./screen/Register";
import Navbar from "./components/Navbar";
import Home from "./screen/Home";
import Checkout from "./screen/Checkout";
import Cart from "./screen/Cart";
import ProductDetails from "./screen/ProductDetails";
import Clothes from "./screen/Clothes";
import Furnitures from "./screen/Furnitures";
import Shoes from "./screen/Shoes";
import Electronic from "./screen/Electronic";
import Thankyou from "./screen/Thankyou";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
  typography: {
    fontFamily: "'Outfit', sans-serif",
    h1: {
      fontFamily: "'Raleway', sans-serif",
    },
    h2: {
      fontFamily: "'Raleway', sans-serif",
    },
  },
});

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <>
      <CircularProgress/>
    </>;
  }

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <ToastContainer theme="dark" />
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
        <Route path="/" element={!user ? <Navigate to="/login" /> : <Home />} />
        <Route
          path="/clothes"
          element={!user ? <Navigate to="/login" /> : <Clothes />}
        />
        <Route
          path="/furnitures"
          element={!user ? <Navigate to="/login" /> : <Furnitures />}
        />
        <Route
          path="/shoes"
          element={!user ? <Navigate to="/login" /> : <Shoes />}
        />
        <Route
          path="/electronics"
          element={!user ? <Navigate to="/login" /> : <Electronic />}
        />
        <Route
          path="/product/:id"
          element={!user ? <Navigate to="/login" /> : <ProductDetails />}
        />
        <Route
          path="/cart/:id"
          element={!user ? <Navigate to="/login" /> : <Cart />}
        />
        <Route
          path="/checkout/:id/:quantity"
          element={!user ? <Navigate to="/login" /> : <Checkout />}
        />
        <Route
          path="/thankyou"
          element={!user ? <Navigate to="/login" /> : <Thankyou />}
        />
      </Routes>
    </ThemeProvider>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
