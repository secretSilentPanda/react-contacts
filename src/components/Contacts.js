import { collection, onSnapshot } from "@firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import Contact from "./Contact";

export default function Contacts() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const q = collection(db, "contacts");
    onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          //   console.log("New contact: ", change.doc.data());
          setContacts((prev) => [...prev, change.doc.data()]);
        }

        if (change.type === "removed") {
          //   console.log("Removed contact: ", change.doc.data());
          setContacts((prev) =>
            prev.filter((contact) => contact.email !== change.doc.data().email)
          );
        }
      });
    });
  }, []);

  return (
    <div
      style={{
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      }}
      className="grid max-w-screen-lg px-6 mx-auto"
    >
      {contacts?.map((contact) => {
        return (
          <Contact
            key={contact.email}
            contact={contact}
            setContacts={setContacts}
          />
        );
      })}
    </div>
  );
}
