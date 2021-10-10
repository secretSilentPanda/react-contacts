import React from "react";
import { signOut, getAuth } from "firebase/auth";

export default function NavBar({ user }) {
  function handleClick() {
    signOut(getAuth());
  }
  return (
    <nav className="w-full py-2 mb-6 duration-100 bg-blue-600 shadow-md">
      <div className="flex justify-between max-w-screen-lg px-10 mx-auto text-white ">
        <h1 className="text-xl font-bold shadow-sm">
          {user?.displayName}'s Contacts
        </h1>
        <button
          onClick={handleClick}
          className="px-2 transform border-2 border-white rounded-sm cursor-pointer active:scale-90"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
