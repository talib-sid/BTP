import React from 'react';
import './Tools.css'; 
import Sidebar from './Sidebar';

function Tools() {
  return (
    <div>
      <Sidebar/>
      <div className="container">
          <h1 className="display-1 hydro-tool-title text-center mt-5 mb-5">
              <span className="hydro-text-primary" style={{ fontFamily: 'Montserrat, sans-serif' }}>Hydro</span>
              <span className="hydro-text-secondary" style={{ fontFamily: 'Roboto, sans-serif' }}>Tools</span>
          </h1>
      </div>
      
      <div className="tools-container">
        <div className="tool">
          <a href="HydroTools" className="tool-link">
          <img src={require('./asdf.jpg')} alt="tool image 1" className="tool-image" />
          </a>
          <p className="tool-description">Rational Method Tool</p>
        </div>
        <div className="tool">
          <a href="Mixedland" className="tool-link_2">
          <img src={require('./asdf.jpg')} alt="tool image 2" className="tool-image" />
          </a>
          <p className="tool-description">Composite Runoff</p>
        </div>
        <div className="tool">
          <a href="RMSE" className="tool-link">
          <img src={require('./asdf.jpg')} alt="tool image 3" className="tool-image" />
          </a>
          <p className="tool-description">RMSE</p>
        </div>
        <div className="tool">
          <a href="WQI" className="tool-link">
          <img src={require('./asdf.jpg')} alt="tool image 4" className="tool-image" />
          </a>
          <p className="tool-description">WQI</p>
        </div>
      </div>
    </div>
  );
}

export default Tools;
