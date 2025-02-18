"use client"; // Add this at the top

import { useState } from "react";

export default function ATM() {
  const [balance, setBalance] = useState(1000);
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const correctPassword = "1234";

  const handleDeposit = () => {
    const depositAmount = parseFloat(amount);
    if (!isNaN(depositAmount) && depositAmount > 0) {
      setBalance(balance + depositAmount);
      setMessage(`Deposited $${depositAmount} successfully!`);
    } else {
      setMessage("Enter a valid amount to deposit.");
    }
    setAmount("");
  };

  const handleWithdraw = () => {
    const withdrawAmount = parseFloat(amount);
    if (!isNaN(withdrawAmount) && withdrawAmount > 0) {
      if (withdrawAmount <= balance) {
        setBalance(balance - withdrawAmount);
        setMessage(`Withdrawn $${withdrawAmount} successfully!`);
      } else {
        setMessage("Insufficient balance!");
      }
    } else {
      setMessage("Enter a valid amount to withdraw.");
    }
    setAmount("");
  };

  const handleLogin = () => {
    if (password === correctPassword) {
      setIsAuthenticated(true);
      setMessage("Access Granted!");
    } else {
      setMessage("Wrong Password! Try again.");
    }
    setPassword("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-6">
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 w-full max-w-md text-center text-white border border-gray-700">
        {!isAuthenticated ? (
          <div>
            <h1 className="text-3xl font-bold mb-4">Enter Password</h1>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              className="w-full p-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
            />
            <button
              onClick={handleLogin}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition duration-300"
            >
              Submit
            </button>
          </div>
        ) : (
          <div>
            <h1 className="text-3xl font-bold mb-4">ATM Machine</h1>
            <div className="mb-6">
              <p className="text-lg">Current Balance:</p>
              <p className="text-4xl font-semibold text-green-400">${balance.toFixed(2)}</p>
            </div>
            {message && <p className="text-sm text-yellow-300 mb-4">{message}</p>}
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full p-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
            />
            <div className="flex gap-4">
              <button
                onClick={handleDeposit}
                className="w-1/2 bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition duration-300"
              >
                Deposit
              </button>
              <button
                onClick={handleWithdraw}
                className="w-1/2 bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-lg transition duration-300"
              >
                Withdraw
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
