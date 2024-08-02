import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

function App() {
    const [jsonInput, setJsonInput] = useState('');
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const parsedInput = JSON.parse(jsonInput);
            const res = await axios.post('https://bfhlapi-fspu.onrender.com/bfhl', parsedInput);
            setResponse(res.data);
            setError('');
        } catch (err) {
            setError('Invalid JSON input');
            setResponse(null);
        }
    };

    const handleSelectChange = (selected) => {
        setSelectedOptions(selected.map(option => option.value));
    };

    const renderResponse = () => {
        if (!response) return null;
        const { alphabets, numbers, highest_alphabet } = response;
        return (
            <div className="mt-3">
                {selectedOptions.includes('Alphabets') && <div>Alphabets: {alphabets.join(', ')}</div>}
                {selectedOptions.includes('Numbers') && <div>Numbers: {numbers.join(', ')}</div>}
                {selectedOptions.includes('Highest alphabet') && <div>Highest Alphabet: {highest_alphabet.join(', ')}</div>}
            </div>
        );
    };

    const options = [
        { value: 'Alphabets', label: 'Alphabets' },
        { value: 'Numbers', label: 'Numbers' },
        { value: 'Highest alphabet', label: 'Highest alphabet' }
    ];

    return (
        <div className="container mt-5">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        value={jsonInput}
                        onChange={(e) => setJsonInput(e.target.value)}
                        placeholder='Enter JSON here'
                    />
                </div>
                <button type='submit' className="btn btn-primary mt-2">Submit</button>
            </form>
            {error && <div className="alert alert-danger mt-3">{error}</div>}
            {response && (
                <div className="mt-3">
                    <Select
                        isMulti
                        options={options}
                        onChange={handleSelectChange}
                        className="basic-multi-select"
                        classNamePrefix="select"
                    />
                    {renderResponse()}
                </div>
            )}
        </div>
    );
}

export default App;