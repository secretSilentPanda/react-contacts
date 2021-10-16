import { deleteDoc, doc, setDoc } from "@firebase/firestore";
import React, { useState } from "react";
import { useRef } from "react/cjs/react.development";
import { db } from "../firebase/firebase";
import {
  DeleteButton,
  DoneButton,
  EditButton,
} from "./helper-components/Buttons";
import { edit } from "./helpers/contactEditors";

export default function Contact({ contact, setContacts, user }) {
  const [newData, setNewData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
  });

  const firstNameRef = useRef();

  async function deleteEntry(email) {
    await deleteDoc(doc(db, "contacts/users", user.email, email));
  }

  async function finishEdits() {
    const { editMode, ...updatedContact } = newData;
    await setDoc(
      doc(db, "contacts/users", user.email, newData.email),
      updatedContact
    );

    setContacts((prev) => {
      const { editMode, ...updatedContact } = newData;
      return prev.map((contact) =>
        contact.email === newData.email ? updatedContact : contact
      );
    });

    setContacts((prev) =>
      prev.map((contact) => ({ ...contact, editMode: false }))
    );
  }

  function setData(e, name) {
    setNewData({
      ...newData,
      [name]: e.target.value,
    });
  }

  return (
    <div className="relative flex flex-wrap justify-between px-2 py-3 m-2 space-y-1 duration-100 border rounded-md shadow-sm bg-green-50 hover:shadow-md group">
      <div className="mx-3 bg-redd-100">
        <div className="absolute flex space-x-2 duration-200 opacity-0 right-1 top-2 group-hover:opacity-100">
          {!contact.editMode ? (
            <div
              onClick={() => edit(contact, setNewData, setContacts)}
              className="bg-white rounded-md"
            >
              <EditButton />
            </div>
          ) : (
            <div onClick={finishEdits} className="bg-white rounded-full ">
              <DoneButton />
            </div>
          )}
          <div
            className="text-red-500 "
            onClick={() => deleteEntry(contact.email)}
          >
            <DeleteButton />
          </div>
        </div>
        <div>
          <div className="my-2 space-y-2">
            <div>
              {contact.editMode ? (
                <div className="flex items-start">
                  <span className="whitespace-nowrap"> First Name:&nbsp;</span>
                  <input
                    ref={firstNameRef}
                    style={{
                      width:
                        (newData.firstName.length || contact.firstName.length) +
                        2 +
                        "ch",
                    }}
                    autoComplete="off"
                    className="editable"
                    value={newData.firstName}
                    name="firstName"
                    onChange={(e) => {
                      setData(e, "firstName");
                    }}
                  ></input>
                </div>
              ) : (
                <div className="flex max-w-full place-items-start">
                  <span className="whitespace-nowrap"> First Name:&nbsp;</span>
                  <div className="px-2 text-lg break-all">
                    {contact.firstName}
                  </div>
                </div>
              )}
            </div>
            <div>
              {contact.editMode ? (
                <div className="flex items-center">
                  <span className="whitespace-nowrap"> Last Name:&nbsp;</span>
                  <input
                    autoComplete="off"
                    className="editable"
                    style={{
                      width:
                        (newData.lastName.length || contact.lastName.length) +
                        2 +
                        "ch",
                    }}
                    value={newData.lastName}
                    name="lastName"
                    onChange={(e) => setData(e, "lastName")}
                  />
                </div>
              ) : (
                <div className="flex items-center">
                  <span className="whitespace-nowrap"> Last Name:&nbsp;</span>
                  <div className="px-2 text-lg break-all">
                    {contact.lastName}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="break-words">
            Email:&nbsp;
            <span className="text-blue-500 underline break-all ">
              {contact.email}
            </span>
          </div>
          <div className="my-2">
            Phone number: <div>{contact.phoneNumber}</div>{" "}
          </div>
        </div>
      </div>
      <img
        className="object-cover h-40 ml-3 rounded-md w-28"
        src={contact.imageURL || "no_avatar.jpg"}
        alt=""
      />
    </div>
  );
}
