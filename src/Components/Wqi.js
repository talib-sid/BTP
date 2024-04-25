import React, { useState } from 'react';
import './Wqi.css';

function WQI() {
  const [ph, setPh] = useState('');
  const [alkalinity, setAlkalinity] = useState('');
  const [iron, setIron] = useState('');
  const [tds, setTds] = useState('');
  const [chloride, setChloride] = useState('');
  const [conductivity, setConductivity] = useState('');
  const [waterQualityIndex, setWaterQualityIndex] = useState('');

  const weight = {
    ph: 0.1176,
    alkalinity: 0.0083,
    iron: 3.333,
    tds: 0.001,
    chloride: 0.004,
    conductivity: 0.0033,
   };

   const standardValue = {
    ph: 8.5,
    alkalinity: 120,
    iron: 0.3,
    tds: 1000,
    chloride: 250,
    conductivity: 300,
   }
   
   const idealValue = {
    ph: 7,
    alkalinity: 0,
    iron: 0,
    tds: 0,
    chloride: 0,
    conductivity: 0,
   }
 
  const handleSubmit = (e) => {
    e.preventDefault();

    const phValue = parseFloat(ph);
    const alkalinityValue = parseFloat(alkalinity);
    const ironValue = parseFloat(iron);
    const tdsValue = parseFloat(tds);
    const chlorideValue = parseFloat(chloride);
    const conductivityValue = parseFloat(conductivity);

    const ph_qi = ((phValue-idealValue.ph)/(standardValue.ph-idealValue.ph))*100;
    const alk_qi = ((alkalinityValue-idealValue.alkalinity)/(standardValue.alkalinity-idealValue.alkalinity))*100;
    const iron_qi = ((iron-idealValue.iron)/(standardValue.iron-idealValue.iron))*100;
    const tds_qi = ((tds-idealValue.tds)/(standardValue.tds-idealValue.tds))*100;
    const chloride_qi = ((chlorideValue-idealValue.chloride)/(standardValue.chloride-idealValue.chloride))*100;
    const conductivity_qi = ((conductivity-idealValue.conductivity)/(standardValue.conductivity-idealValue.conductivity))*100;
    
    const numer = ph_qi*weight.ph +
                  alk_qi*weight.alkalinity +
                  iron_qi*weight.iron +
                  tds_qi*weight.tds +
                  chloride_qi*weight.chloride +
                  conductivity_qi*weight.conductivity;

    const denom = weight.ph + weight.alkalinity +
                    weight.iron +
                    weight.tds +
                    weight.chloride +
                    weight.conductivity;

           
    const wqi = numer/denom;
    setWaterQualityIndex(wqi);
};

  const handleReset = () => {
    setPh('');
    setAlkalinity('');
    setIron('');
    setChloride('');
    setConductivity('');
    setWaterQualityIndex('');
  };

  return (
    <div className="WQI">
      <h1>Water Quality Index (WQI) Calculator</h1>
      <p>
        An index value is calculated for each of five water quality parameters:
        temperature, biological oxygen demand (BOD), total suspended sediment
        (TSS), dissolved oxygen (DO), and conductivity. A higher value of each
        index indicates better water quality. The ISQA is calculated as the
        temperature index times the sum of the other four index values.
      </p>
      <a href="#" className="learn-more">
        Click here to learn more about the ISQA and the five water quality
        parameters used to compute it.
      </a>
      <form onSubmit={handleSubmit} className="parameter-form">
        
        <div className="parameter">
          <label htmlFor="ph">pH</label>
          <input
            type="number"
            id="ph"
            className="param-input"
            placeholder="pH"
            value={ph}
            onChange={(e) => setPh(e.target.value)}
          />
          <div className="parameter-range">
            <span className="min">0</span>
            <span className="max">14</span>
          </div>
        </div>

        <div className="parameter">
          <label htmlFor="Alkalinity">Alkalinity (mg/L)</label>
          <input
            type="number"
            id="Alkalinity"
            className="param-input"
            placeholder="Total Alkalinity"
            value={alkalinity}
            onChange={(e) => setAlkalinity(e.target.value)}
          />
          <div className="parameter-range">
            <span className="min">0 mg/L</span>
            <span className="max">120 mg/L</span>
          </div>
        </div>

        <div className="parameter">
          <label htmlFor="TDS">TDS (mg/L)</label>
          <input
            type="number"
            id="TDS"
            className="param-input"
            placeholder="Total Dissolved Solids"
            value={tds}
            onChange={(e) => setTds(e.target.value)}
          />
          <div className="parameter-range">
            <span className="min">0 mg/L</span>
            <span className="max">1000 mg/L</span>
          </div>
        </div>

        <div className="parameter">
          <label htmlFor="Chloride">Chloride (mg/L)</label>
          <input
            type="number"
            id="Chloride"
            className="param-input"
            placeholder="Chloride"
            value={chloride}
            onChange={(e) => setChloride(e.target.value)}
          />
          <div className="parameter-range">
            <span className="min">0 mg/L</span>
            <span className="max">250 mg/L</span>
          </div>
        </div>

        
        <div className="parameter">
          <label htmlFor="Iron">Iron (mg/L)</label>
          <input
            type="number"
            id="Iron"
            className="param-input"
            placeholder="Iron"
            value={iron}
            onChange={(e) => setIron(e.target.value)}
          />
          <div className="parameter-range">
            <span className="min">0 mg/L</span>
            <span className="max">0.3 mg/L</span>
          </div>
        </div>

        <div className="parameter">
          <label htmlFor="Conductivity">Conductivity (umhos/cm)</label>
          <input
            type="number"
            id="Conductivity"
            className="param-input"
            placeholder="Conductivity"
            value={conductivity}
            onChange={(e) => setConductivity(e.target.value)}
          />
          <div className="parameter-range">
            <span className="min">0 uS</span>
            <span className="max">300 uS</span>
          </div>
        </div>

        {/* Similar input fields for other parameters */}
        <div className="form-buttons">
          <button type="submit" className="submit-button">
            Submit
          </button>
          <button type="button" onClick={handleReset} className="reset-button">
            Reset
          </button>
        </div>
      </form>
      <div className="water-quality-index">
        Simple Water Quality Index: <span>{waterQualityIndex}</span>
      </div>

    <div className="quality-levels">
        <div className="quality-level excellent">
            <div className="quality-level-box"></div>
            <span>Excellent (91-100)</span>
        </div>
        <div className="quality-level good">
            <div className="quality-level-box"></div>
            <span>Good (71-90)</span>
        </div>
        <div className="quality-level average">
            <div className="quality-level-box"></div>
            <span>Average (51-70)</span>
        </div>
        <div className="quality-level fair">
            <div className="quality-level-box"></div>
            <span>Fair (26-50)</span>
        </div>
        <div className="quality-level poor">
            <div className="quality-level-box"></div>
            <span>Poor (0-25)</span>
        </div>
    </div>


    </div>
  );
};

export default WQI;
