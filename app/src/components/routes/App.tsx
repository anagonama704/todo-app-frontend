import { Route, Routes } from "react-router-dom";
import Home from "../../pages/Home";
import Top from "../../pages/Top/Top";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Top />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;
