import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Tools from './Components/Tools'
import HydroTools from './Components/HydroTools'
import CompositeRunoffCoefficient from './Components/MixedLand'



function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/tools" element={<Tools/>} />
          <Route exact path="/HydroTools" element={<HydroTools/>} />
          <Route exact path="/Mixedland" element={<CompositeRunoffCoefficient/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
