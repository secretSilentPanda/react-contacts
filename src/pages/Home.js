import { motion } from "framer-motion";
import React from "react";
import AddContact from "../components/AddContact";
import Contacts from "../components/Contacts";
import NavBar from "../components/NavBar";

export default function Home({ user }) {
  return (
    <>
      <NavBar user={user} />
      <motion.div
        initial={{ translateY: -30, opacity: 0, height: 0 }}
        animate={{ translateY: 0, opacity: 1, height: "auto" }}
        className="overflow-hidden"
      >
        <div className="mx-4">
          <AddContact user={user} />
          <Contacts user={user} />
        </div>
      </motion.div>
    </>
  );
}
