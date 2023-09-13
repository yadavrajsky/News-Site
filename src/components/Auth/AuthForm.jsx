/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";

function AuthForm({
  onSubmit,
  buttonText,
  usernameLabel,
  emailLabel,
  passwordLabel,
  isLogin,
}) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    // e.preventDefault();
    // Basic client-side validations
    if (!username || !password) {
      setError("All fields are required");
    } else if (!isLogin && !isValidEmail(email)) {
      setError("Please enter a valid email address");
    } else {
      setError("");
      if (isLogin) onSubmit({ username, password });
      else onSubmit({ username, email, password });
    }
  };

  const isValidEmail = (email) => {
    // Basic email validation using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <form className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md border-t-2">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-semibold mb-2">
          {usernameLabel || "Username"}
        </label>
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-3 py-2 placeholder-gray-300 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
        />
      </div>
      {!isLogin && (
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            {emailLabel || "Email"}
          </label>
          <input
            type="text"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 placeholder-gray-300 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
      )}

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-semibold mb-2">
          {passwordLabel || "Password"}
        </label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 placeholder-gray-300 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
        />
      </div>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <button
        type="button"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
        onClick={handleSubmit}
      >
        {buttonText}
      </button>
    </form>
  );
}

export default AuthForm;
