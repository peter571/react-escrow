import Home from '../Home/Home'
import Contracts from '../Contracts/Contracts'
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Contracts" element={<Contracts />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
