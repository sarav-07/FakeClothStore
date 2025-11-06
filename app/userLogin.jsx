"use client";
import React, { useEffect, useState } from "react";
import { Eye, EyeOff, Lock, User } from "lucide-react";
import { useGlobalStore } from "./useGlobalStore";

export default function UserLogin() {
  const setUserDetails = useGlobalStore((state) => state.setUserDetails);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("userDetails");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        if (parsed.email) setEmail(parsed.email);
        if (parsed.password) setPassword(parsed.password);
        setUserDetails(parsed);
      } catch (err) {
        console.error("Error parsing userDetails from localStorage", err);
      }
    }
  }, [setUserDetails]);

  const handleLogin = () => {
    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }

    const userData = { email, password };
    setUserDetails(userData);
    localStorage.setItem("userDetails", JSON.stringify(userData));
    alert("User details saved to store!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 font-nunito px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 border border-gray-100">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">
          Welcome Back
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Sign in to continue to your account
        </p>
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Email
            </div>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="text-black w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-black focus:outline-none placeholder-gray-400"
          />
        </div>
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4" />
              Password
            </div>
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="text-black w-full border border-gray-300 rounded-lg px-4 py-2.5 pr-10 focus:ring-2 focus:ring-black focus:outline-none placeholder-gray-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-black"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
        <button
          onClick={handleLogin}
          className="w-full bg-black text-white font-semibold py-2.5 rounded-lg hover:bg-gray-900 transition-all"
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
