import { collection, onSnapshot } from "@firebase/firestore";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import Contact from "./Contact";

export default function Contacts({ user }) {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    if (user?.email) {
      const q = collection(db, "contacts/users", user?.email);
      onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            //   console.log("New contact: ", change.doc.data());
            setContacts((prev) => [...prev, change.doc.data()]);
          }

          if (change.type === "removed") {
            //   console.log("Removed contact: ", change.doc.data());
            setContacts((prev) =>
              prev.filter(
                (contact) => contact?.email !== change.doc.data().email
              )
            );
          }
        });
      });
    }
  }, [user?.email]);

  return (
    <div className="-mt-12">
      <h1 className="my-3 text-xl font-bold text-center text-blue-500">
        Contacts
      </h1>
      <div
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))" }}
        className="grid max-w-screen-lg mx-auto"
      >
        <AnimatePresence>
          {contacts?.map((contact) => {
            return (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                layout
                key={contact.email}
              >
                <Contact
                  user={user}
                  contact={contact}
                  setContacts={setContacts}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
