import React, { useState } from 'react';

function CompositeRunoffCoefficient() {
    const [numDistinctLands, setNumDistinctLands] = useState(0);
    const [runoffCoefficients, setRunoffCoefficients] = useState([]);
    const [areas, setAreas] = useState([]);
    const [weightedCoefficient, setWeightedCoefficient] = useState(null);

    const handleNumDistinctLandsChange = (e) => {
        const count = parseInt(e.target.value);
        if (!isNaN(count) && count >= 1) {
            setNumDistinctLands(count);
            setRunoffCoefficients(Array(count).fill(0));
            setAreas(Array(count).fill(0));
            setWeightedCoefficient(null);
        }
    };

    const handleRunoffCoefficientChange = (index, value) => {
        const newValue = parseFloat(value);
        if (!isNaN(newValue) && newValue >= 0 && newValue <= 1) {
            const newCoefficients = [...runoffCoefficients];
            newCoefficients[index] = newValue;
            setRunoffCoefficients(newCoefficients);
        }
    };

    const handleAreaChange = (index, value) => {
        const newValue = parseFloat(value);
        const newAreas = [...areas];
        newAreas[index] = newValue;
        setAreas(newAreas);
    };

    const calculateWeightedCoefficient = () => {
        const totalArea = areas.reduce((acc, area) => acc + area, 0);
        const weightedCoefficient = runoffCoefficients.reduce((acc, coefficient, index) => {
            return acc + (coefficient * areas[index]);
        }, 0) / totalArea;
        setWeightedCoefficient(weightedCoefficient);
    };

    const handleReset = () => {
        setNumDistinctLands(0);
        setRunoffCoefficients([]);
        setAreas([]);
        setWeightedCoefficient(null);
    };

    return (
        <div>


            <div className="card bg-light shadow mt-5">
                <div className='card-body'></div>
                <h2>Composite Runoff Coefficient Calculator</h2>
                <p>Mixed land use refers to areas with a combination of different land uses, such as residential, commercial, industrial, and recreational areas.</p>
                <p>The composite runoff coefficient is used for such areas and is calculated based on the runoff coefficients and areas of each land use.</p>
                <p>The formula for the composite runoff coefficient (Cw) is:</p>
                <p>
                    <strong>Cw = Σ(C<sub>j</sub> * A<sub>j</sub>) / ΣA<sub>j</sub></strong>
                </p>
                <p>Where:</p>
                <ul>
                    <li>Cw = Weighted runoff coefficient</li>
                    <li>C<sub>j</sub> = Runoff coefficient for area j (0 to 1)</li>
                    <li>A<sub>j</sub> = Area for land cover j</li>
                </ul>
                <div>
                    <label>Number of distinct land uses:</label>
                    <input type="number" min="1" onChange={handleNumDistinctLandsChange} />
                </div>
                {numDistinctLands > 0 && (
                    <div>
                        {[...Array(numDistinctLands)].map((_, index) => (
                            <div key={index}>
                                <label>Runoff coefficient for area {index + 1} (0 to 1):</label>
                                <input type="number" step="0.01" min="0" max="1" value={runoffCoefficients[index]} onChange={(e) => handleRunoffCoefficientChange(index, e.target.value)} />
                                <label>Area for land cover {index + 1}:</label>
                                <input type="number" value={areas[index]} onChange={(e) => handleAreaChange(index, e.target.value)} />
                            </div>
                        ))}
                        <button onClick={calculateWeightedCoefficient}>Calculate Weighted Coefficient</button>
                    </div>
                )}
                {weightedCoefficient !== null && (
                    <div>
                        <label>Weighted Runoff Coefficient (Cw):</label>
                        <span>{weightedCoefficient}</span>
                    </div>
                )}
                <button onClick={handleReset}>Reset</button>
            </div>

        </div>
    );
}

export default CompositeRunoffCoefficient;
