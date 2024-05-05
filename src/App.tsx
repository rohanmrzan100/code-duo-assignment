import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Favourites from "./pages/Favourites/Favourites";
import Home from "./pages/Home/Home";
import Spell from "./pages/Spell/Spell";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Navbar />
        <div className="main-section">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/my-fav" element={<Favourites />} />
            <Route path="/spell/:id" element={<Spell />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
