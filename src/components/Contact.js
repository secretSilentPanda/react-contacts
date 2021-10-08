import { deleteDoc, doc, setDoc } from "@firebase/firestore";
import React, { useRef, useState } from "react";
import { db } from "../firebase/firebase";

export default function Contact({ contact, setContacts, user }) {
  const [newData, setNewData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
  });
  const inputRef = useRef();

  function edit(contactToEdit) {
    setNewData(contactToEdit);
    setContacts((prev) =>
      prev.map((contact) =>
        contact.email === contactToEdit.email
          ? { ...contact, editMode: true }
          : { ...contact, editMode: false }
      )
    );
    setTimeout(() => {
      inputRef.current.focus();
    }, 0);
  }

  async function deleteEntry(email) {
    await deleteDoc(doc(db, user.email, email));
  }

  async function finishEdits() {
    await setDoc(doc(db, user.email, newData.email), newData);

    setContacts((prev) => {
      return prev.map((contact) =>
        contact.email === newData.email ? newData : contact
      );
    });

    setContacts((prev) =>
      prev.map((contact) => ({ ...contact, editMode: false }))
    );
  }
  return (
    <div className="relative flex flex-col p-3 m-2 space-y-1 duration-100 border rounded-md shadow-sm hover:shadow-md group">
      <div className="absolute flex space-x-2 duration-100 opacity-0 right-1 top-2 group-hover:opacity-100">
        {!contact.editMode ? (
          <div
            onClick={() => edit(contact)}
            className="cursor-pointer EDIT_BUTTON"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </div>
        ) : (
          <div
            onClick={finishEdits}
            className="cursor-pointer FINISH_EDITING_BUTTON"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        )}
        <div
          className="text-red-500 cursor-pointer"
          onClick={() => deleteEntry(contact.email)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </div>
      <div>
        <div>
          Name:&nbsp;
          {contact.editMode ? (
            <input
              ref={inputRef}
              className="inline-block px-2 text-lg font-bold bg-transparent rounded-sm bg-yellow-50"
              value={newData.name}
              name="name"
              onChange={(e) =>
                setNewData({
                  ...newData,
                  name: e.target.value,
                })
              }
            ></input>
          ) : (
            <span className="px-2 text-lg font-bold bg-transparent">
              {contact.name}
            </span>
          )}
        </div>
        <div className="break-words">
          Email:&nbsp;
          <span className="text-blue-500 underline cursor-pointer">
            {contact.email}
          </span>
        </div>
        <div>Phone number: {contact.phoneNumber}</div>
      </div>
    </div>
  );
}
