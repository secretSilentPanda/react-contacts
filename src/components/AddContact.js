import { doc, setDoc } from "@firebase/firestore";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { db } from "../firebase/firebase";
import uploadFile from "../components/helpers/uploadFile";
import ImageInput from "./helper-components/ImageInput";

const initialState = {
  email: "",
  firstName: "",
  lastName: "",
  phoneNUmber: "",
  imageURL: "",
};

export default function AddContact({ user }) {
  const [openAddContact, setOpenAddContact] = useState(false);
  const [contactDetails, setContactDetails] = useState(initialState);
  const [userImage, setUserImage] = useState("");
  const [imageURL, setImageURL] = useState("");
  const firstNameRef = useRef();
  const progressRef = useRef();
  const avatarRef = useRef();

  useEffect(() => {
    imageURL && addDocInDb();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageURL]);

  async function addDocInDb() {
    user?.email &&
      (await setDoc(
        doc(db, "contacts/users", user.email, contactDetails.email),
        { ...contactDetails, imageURL }
      ));
    setContactDetails(initialState);
    setUserImage("");
    firstNameRef?.current?.focus();
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (userImage) {
      const downloadURL = await uploadFile(
        userImage,
        contactDetails.email,
        progressRef.current
      );
      setImageURL(downloadURL);
    } else addDocInDb();
  }

  function openForm() {
    setOpenAddContact((prev) => !prev);
    setTimeout(() => {
      !openAddContact && firstNameRef?.current?.focus();
    }, 0);
  }

  function updateContactDetails(e) {
    setContactDetails({
      ...contactDetails,
      [e.target.name]: e.target.value,
    });
  }

  useEffect(() => {
    if (avatarRef.current) {
      if (userImage)
        avatarRef.current.style.backgroundImage = `url(${URL.createObjectURL(
          userImage
        )})`;
      else avatarRef.current.style.backgroundImage = "url(no_avatar.jpg)";
    }
  }, [userImage]);

  function setInputBg(e) {
    setUserImage(e.target.files[0]);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-col max-w-screen-lg mx-auto pt-2 px-2 top-0 ${
        openAddContact && "border rounded-md p-2 shadow-sm pb-4 mb-14"
      } `}
    >
      <svg
        onClick={openForm}
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
            className="overflow-hidden"
          >
            <div className="flex justify-between mr-4 space-x-4">
              <div className="mr-2">
                <input
                  required
                  ref={firstNameRef}
                  className="form_input"
                  value={contactDetails.firstName}
                  name="firstName"
                  autoComplete="off"
                  onChange={updateContactDetails}
                  type="text"
                  placeholder="First name"
                />
                <input
                  required
                  className="form_input"
                  value={contactDetails.lastName}
                  name="lastName"
                  autoComplete="off"
                  onChange={updateContactDetails}
                  type="text"
                  placeholder="Last name"
                />

                <input
                  required
                  value={contactDetails.email}
                  name="email"
                  onChange={updateContactDetails}
                  className="form_input"
                  type="text"
                  placeholder="Email"
                />
                <input
                  value={parseInt(contactDetails.phoneNumber)}
                  name="phoneNumber"
                  onChange={updateContactDetails}
                  className="form_input"
                  type="number"
                  placeholder="Phone"
                />
              </div>

              <div className="flex w-32 mb-3">
                <ImageInput
                  avatarRef={avatarRef}
                  userImage={userImage}
                  setInputBg={setInputBg}
                />
              </div>
            </div>
            <button className="w-full py-1 my-3 text-white bg-blue-500 rounded-md">
              ADD
            </button>
            <div
              ref={progressRef}
              className="w-0 h-1 duration-300 bg-green-500 rounded-md"
            ></div>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
