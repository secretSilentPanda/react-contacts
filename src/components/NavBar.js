import React, { useState } from "react";
import { signOut, getAuth } from "firebase/auth";
import { useEffect } from "react/cjs/react.development";

export default function NavBar() {
  let apostrophe;
  const [name, setName] = useState("");

  // const displayName = getAuth().currentUser?.displayName;

  if (name) {
    const lastLetter = name[name.length - 1].toLowerCase();
    apostrophe = lastLetter === "s" ? "'" : "'s";
  }

  useEffect(() => {
    setTimeout(() => {
      console.log("SETTING USER");
      const user = getAuth().currentUser;
      if (user) setName(user.displayName);
    }, 1000);
  }, []);

  function handleClick() {
    signOut(getAuth());
  }
  return (
    <nav className="w-full py-2 mb-6 duration-100 bg-blue-600 shadow-md">
      <div className="flex justify-between max-w-screen-lg px-10 mx-auto text-white ">
        <h1 className="text-xl font-bold shadow-sm">
          {name && `${name}${apostrophe} `}
          Contacts
        </h1>
        {name && (
          <button
            onClick={handleClick}
            className="px-2 transform border-2 border-white rounded-sm cursor-pointer active:scale-90"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
