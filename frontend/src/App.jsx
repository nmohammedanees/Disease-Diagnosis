import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import "./App.css";
import Footer from "./Components/Footer";
import AboutUs from "./Components/AboutUs";
import Diagnose from "./Components/Diagnose";
import ContactUs from "./Components/ContactUs";
import ResultPage from "./Components/ResultPage";
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/aboutus" element={<AboutUs />}></Route>
          <Route exact path="/diagnose" element={<Diagnose />}></Route>
          <Route exact path="/contactus" element={<ContactUs />}></Route>
          <Route exact path="/resultpage" element={<ResultPage />}></Route>
        </Routes>
      </Router>
    </>
  );
}
export default App;
