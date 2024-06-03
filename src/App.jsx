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
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";


function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/favourites/:userId" element={<Favourites />} />
          <Route path="/cart/:menuId" element={<Cart />} />
          <Route path="/confirmation/:orderId" element={<Confirmation />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
