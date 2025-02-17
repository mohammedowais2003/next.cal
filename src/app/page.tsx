'use client';
import { useState } from 'react';

export default function Calculator() {
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const handleClick = (value: string | number) => {
    setInput((prev) => prev + value);
  };

  const clearInput = () => {
    setInput('');
    setResult('');
  };

  const calculateResult = () => {
    try {
      setResult(eval(input).toString()); // Using eval isn't safe in production
    } catch {
      setResult('Error');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <input 
          type="text" 
          value={input} 
          readOnly 
          className="w-full p-2 text-right border border-gray-300 rounded mb-2 text-lg"
        />
        <div className="grid grid-cols-4 gap-2">
          {[7, 8, 9, '/'].map((val) => (
            <button key={val} onClick={() => handleClick(val)} className="p-4 bg-gray-200 rounded">{val}</button>
          ))}
          {[4, 5, 6, '*'].map((val) => (
            <button key={val} onClick={() => handleClick(val)} className="p-4 bg-gray-200 rounded">{val}</button>
          ))}
          {[1, 2, 3, '-'].map((val) => (
            <button key={val} onClick={() => handleClick(val)} className="p-4 bg-gray-200 rounded">{val}</button>
          ))}
          {[0, '.', '=', '+'].map((val) => (
            <button key={val} onClick={() => (val === '=' ? calculateResult() : handleClick(val))} className="p-4 bg-gray-200 rounded">{val}</button>
          ))}
          <button onClick={clearInput} className="col-span-4 p-4 bg-red-500 text-white rounded">Clear</button>
        </div>
        {result && <div className="text-right text-xl font-bold mt-2">Result: {result}</div>}
      </div>
    </div>
  );
}
