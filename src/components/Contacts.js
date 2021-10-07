import { collection, onSnapshot } from "@firebase/firestore";
import { AnimatePresence, motion } from "framer-motion";
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
      style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}
      className="grid max-w-screen-lg px-6 mx-auto"
    >
      <AnimatePresence>
        {contacts?.map((contact) => {
          return (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              layout
              key={contact.email}
            >
              <Contact contact={contact} setContacts={setContacts} />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
