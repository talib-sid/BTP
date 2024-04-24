import React, { useState } from 'react';
import Papa from 'papaparse';
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';

const RMSECalculator = () => {
    const [data, setData] = useState({ x: [], y: [] });
    const [rmse, setRMSE] = useState(null);
    const [inputX, setInputX] = useState('');
    const [inputY, setInputY] = useState('');
    const [inputMethod, setInputMethod] = useState('manual');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        if (name === 'x') setInputX(value);
        else if (name === 'y') setInputY(value);
    };

    const handleAddData = () => {
        if (!inputX || !inputY) {
            setErrorMessage('Both X and Y values are required.');
            return;
        }
        setData(prevData => ({
            x: [...prevData.x, parseFloat(inputX)],
            y: [...prevData.y, parseFloat(inputY)],
        }));
        setInputX('');
        setInputY('');
        setErrorMessage('');
    };

    const handleInputMethodChange = (e) => {
        setInputMethod(e.target.value);
    };

    const calculateRMSE = () => {
        const { x, y } = data;
        if (x.length !== y.length) {
            setRMSE(null);
            setErrorMessage('Number of X and Y values must be equal.');
            return;
        }
        const n = x.length;
        let sumSquaredErrors = 0;
        for (let i = 0; i < n; i++) {
            sumSquaredErrors += Math.pow(y[i] - x[i], 2);
        }
        const rmse = Math.sqrt(sumSquaredErrors / n);
        setRMSE(rmse);
        setErrorMessage('');
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            const contents = e.target.result;
            const rows = contents.split('\n');
            const x = [];
            const y = [];
            rows.forEach(row => {
                const values = row.split(',');
                if (values.length === 2) {
                    x.push(parseFloat(values[0]));
                    y.push(parseFloat(values[1]));
                }
            });
            setData({ x, y });
        };
        reader.readAsText(file);
    };

    const dataGraph = {
        labels: data.x,
        datasets: [
            {
                label: 'Y',
                data: data.y,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
            },
            {
                label: 'X',
                data: data.x,
                fill: false,
                borderColor: 'rgb(255, 99, 132)',
                tension: 0.1,
            },
        ],
    };
    const handleReset = () => {
        setData({ x: [], y: [] });
        setRMSE(null);
        setInputX('');
        setInputY('');
        setErrorMessage('');
        const fileInput = document.getElementById('fileInput');
        if (fileInput) fileInput.value = '';
    
    };


    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
            {errorMessage && <p>{errorMessage}</p>}
            {rmse !== null && <p>RMSE: {rmse}</p>}
            <div style={{ height: '400px', width: '600px' }}>
                    <Line data={dataGraph} />
                </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <select value={inputMethod} onChange={handleInputMethodChange}>
                    <option value="manual">Manual Input</option>
                    <option value="csv">Upload CSV</option>
                </select>
                {inputMethod === 'manual' ? (
                    <div>
                        <input type="text" name="x" value={inputX} onChange={handleChange} placeholder="X value" />
                        <input type="text" name="y" value={inputY} onChange={handleChange} placeholder="Y value" />
                        <button onClick={handleAddData}>Add Data</button>
                    </div>
                ) : (
                    <div>
                        <input id="fileInput" type="file" accept=".csv" onChange={handleFileUpload} />
                    </div>
                )}
            </div>
            <button onClick={calculateRMSE}>Calculate</button>
            <button onClick={handleReset}>Reset</button>
            
        </div>
    );
    
};

export default RMSECalculator;
