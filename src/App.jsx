//import logo from './logo.svg';
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Confirmation from "./pages/Confirmation";
import Menu from "./pages/Menu";
import Payment from "./pages/Payment";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart/:menuId" element={<Cart />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
