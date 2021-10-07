import { doc, setDoc } from "@firebase/firestore";
import React, { useState } from "react";
import { db } from "../firebase/firebase";

export default function AddContact() {
  const [contactDetails, setContactDetails] = useState({
    email: "",
    name: "",
    phoneNUmber: "",
    editMode: false,
  });

  async function handleSubmit(e) {
    e.preventDefault();
    await setDoc(doc(db, "contacts", contactDetails.email), contactDetails);
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col max-w-md mx-auto space-y-2"
    >
      <input
        value={contactDetails.name}
        name="name"
        onChange={(e) =>
          setContactDetails({
            ...contactDetails,
            [e.target.name]: e.target.value,
          })
        }
        className="px-2 py-1 border rounded-md"
        type="text"
        id="email"
        placeholder="Name"
      />
      <input
        value={contactDetails.email}
        name="email"
        onChange={(e) =>
          setContactDetails({
            ...contactDetails,
            [e.target.name]: e.target.value,
          })
        }
        className="px-2 py-1 border rounded-md"
        type="text"
        id="email"
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
        className="px-2 py-1 border rounded-sm"
        type="number"
        id="email"
        placeholder="Phone"
      />
      <button className="py-1 text-white bg-blue-500 rounded-md">ADD</button>
    </form>
  );
}
