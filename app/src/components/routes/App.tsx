import { Route, Routes } from "react-router-dom";
import Home from "../../pages/Home";
import Title from "../../pages/Title";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Title />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;
