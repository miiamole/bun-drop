//import logo from './logo.svg';
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Confirmation from "./pages/Confirmation";
import Menu from "./pages/Menu";
import Payment from "./pages/Payment";
import LogIn from "./pages/LogIn";
import Register from "./pages/Register";
import Favourites from "./pages/Favourites";
import Footer from "./components/Footer";
import Header from "./components/Header";


function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<LogIn/>}/>
          <Route path="/favourites" element={<Favourites/>}/>
          <Route path="/cart/:menuId" element={<Cart />} />
          <Route path="/confirmation/:orderId" element={<Confirmation />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
