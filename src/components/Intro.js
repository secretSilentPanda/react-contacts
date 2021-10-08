import React, { useRef } from "react";

export default function Intro({ user, setUser }) {
  const emailRef = useRef();
  const nameRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    emailRef.current.value &&
      nameRef.current.value &&
      setUser({ name: nameRef.current.value, email: emailRef.current.value });
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col max-w-md mx-auto mt-8 space-y-2"
    >
      <input
        className="px-2 py-1 border rounded-md"
        type="text"
        ref={nameRef}
        placeholder="Name"
      />
      <input
        className="px-2 py-1 border rounded-md"
        type="text"
        ref={emailRef}
        placeholder="Email"
      />

      <button className="py-1 text-white bg-blue-500 rounded-md">DONE</button>
    </form>
  );
}
