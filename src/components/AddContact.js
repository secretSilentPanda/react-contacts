import { doc, setDoc } from "@firebase/firestore";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { db } from "../firebase/firebase";
const initialState = {
  email: "",
  firstName: "",
  lastName: "",
  phoneNUmber: "",
  editMode: false,
};

export default function AddContact({ user }) {
  const [openAddContact, setOpenAddContact] = useState(false);
  const [contactDetails, setContactDetails] = useState(initialState);

  async function handleSubmit(e) {
    let res;
    e.preventDefault();
    try {
      user?.email &&
        (res = await setDoc(
          doc(db, "contacts/users", user.email, contactDetails.email),
          contactDetails
        ));
      setTimeout(() => {
        setContactDetails(initialState);
      }, 0);
      console.log(`res`, res);
    } catch (error) {
      console.log(`error.message`, error.message);
    }
  }
  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-col max-w-screen-lg mx-auto pt-2 px-2 top-0 ${
        openAddContact && "border rounded-md p-2 shadow-sm pb-4 mb-14"
      } `}
    >
      {/* <h1 className="pl-1 mb-2 text-xl">Add new contact</h1> */}
      <svg
        onClick={() => setOpenAddContact((prev) => !prev)}
        xmlns="http://www.w3.org/2000/svg"
        className={`transform duration-300 text-gray-500 mb-2 ${
          openAddContact ? "rotate-45 text-red-500 w-6 h-6" : "w-10 h-10"
        } cursor-pointer`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <AnimatePresence>
        {openAddContact && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="flex flex-col space-y-3 overflow-hidden"
          >
            <div className="flex space-x-2">
              <input
                required
                className="w-full px-2 py-1 border rounded-md"
                value={contactDetails.firstName}
                name="firstName"
                autoComplete="off"
                onChange={(e) =>
                  setContactDetails({
                    ...contactDetails,
                    [e.target.name]: e.target.value,
                  })
                }
                type="text"
                placeholder="First name"
              />
              <input
                required
                className="w-full px-2 py-1 border rounded-md"
                value={contactDetails.lastName}
                name="lastName"
                autoComplete="off"
                onChange={(e) =>
                  setContactDetails({
                    ...contactDetails,
                    [e.target.name]: e.target.value,
                  })
                }
                type="text"
                placeholder="Last name"
              />
            </div>
            <div className="flex space-x-2">
              <input
                required
                value={contactDetails.email}
                name="email"
                onChange={(e) =>
                  setContactDetails({
                    ...contactDetails,
                    [e.target.name]: e.target.value,
                  })
                }
                className="w-full px-2 py-1 border rounded-md"
                type="text"
                placeholder="Email"
              />
              <input
                value={contactDetails.phoneNUmber}
                name="phoneNUmber"
                onChange={(e) =>
                  setContactDetails({
                    ...contactDetails,
                    [e.target.name]: e.target.value,
                  })
                }
                className="w-full px-2 py-1 border rounded-md"
                type="number"
                placeholder="Phone"
              />
            </div>
            <button className="py-1 text-white bg-blue-500 rounded-md">
              ADD
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
