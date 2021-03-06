import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import NavBar from "./NavBar";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(false);

    try {
      await signInWithEmailAndPassword(getAuth(), email, password);
    } catch (error) {
      setError(error.message.substring(10));
    }
  }
  return (
    <>
      <NavBar />
      <motion.div
        initial={{ translateY: -20, opacity: 0 }}
        animate={{ translateY: 0, opacity: 1 }}
      >
        <form
          onSubmit={handleSubmit}
          className="flex flex-col max-w-md px-4 py-4 mx-auto mt-16 space-y-2 border rounded-md shadow-lg"
        >
          <h1 className="pl-1 mb-4 text-2xl">Login</h1>

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-2 py-1 border rounded-md"
            type="text"
            placeholder="Email"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-2 py-1 border rounded-md"
            type="password"
            placeholder="Password"
          />

          <button className="py-1 text-white bg-blue-500 rounded-md">
            Login
          </button>
          <Link className="text-center text-blue-500 underline" to="/signup">
            Signup
          </Link>
          {error && (
            <span className="py-1 my-2 text-center bg-red-200 border rounded-sm">
              {error}
            </span>
          )}
        </form>
      </motion.div>
    </>
  );
}
