import React, { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(false);

    if (name && email && password) {
      const auth = getAuth();

      try {
        await createUserWithEmailAndPassword(auth, email, password);

        await updateProfile(auth.currentUser, {
          displayName: name,
        });
      } catch (error) {
        setError(error.message.substring(10));
      }
    }
  }
  return (
    <motion.div
      initial={{ translateY: -20, opacity: 0 }}
      animate={{ translateY: 0, opacity: 1 }}
      layoutId="box"
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col max-w-md px-4 py-4 mx-auto mt-16 space-y-2 border rounded-md shadow-lg"
      >
        <h1 className="pl-1 mb-4 text-2xl">Signup</h1>
        <input
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
          className="px-2 py-1 border rounded-md"
          type="text"
          placeholder="Name"
        />
        <input
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-2 py-1 border rounded-md"
          type="text"
          placeholder="Email"
        />
        <input
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-2 py-1 border rounded-md"
          type="password"
          placeholder="Password"
        />

        <button className="py-1 text-white bg-blue-500 rounded-md">
          Signup
        </button>
        <Link className="text-center text-blue-500 underline" to="/login">
          Login
        </Link>
        {error && (
          <span className="py-1 my-2 text-center bg-red-200 border rounded-sm">
            {error}
          </span>
        )}
      </form>
    </motion.div>
  );
}
