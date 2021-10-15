import { doc, setDoc } from "@firebase/firestore";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { db } from "../firebase/firebase";
import uploadFile from "../components/helpers/uploadFile";

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
    imageURL && foo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageURL]);

  async function foo() {
    user?.email &&
      (await setDoc(
        doc(db, "contacts/users", user.email, contactDetails.email),
        { ...contactDetails, imageURL }
      ));
    setTimeout(() => {
      setContactDetails(initialState);
    }, 0);
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
    } else foo();
  }
  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-col max-w-screen-lg mx-auto pt-2 px-2 top-0 ${
        openAddContact && "border rounded-md p-2 shadow-sm pb-4 mb-14"
      } `}
    >
      <svg
        onClick={() => {
          setOpenAddContact((prev) => !prev);
          setTimeout(() => {
            !openAddContact && firstNameRef?.current?.focus();
          }, 0);
        }}
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
            <div className="flex space-x-2">
              <div className="mr-2">
                <input
                  required
                  ref={firstNameRef}
                  className="w-full px-2 py-1 mt-3 border rounded-md"
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
                  className="w-full px-2 py-1 mt-3 border rounded-md"
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
                  className="w-full px-2 py-1 mt-3 border rounded-md"
                  type="text"
                  placeholder="Email"
                />
                <input
                  value={contactDetails.phoneNumber}
                  name="phoneNumber"
                  onChange={(e) =>
                    setContactDetails({
                      ...contactDetails,
                      [e.target.name]: e.target.value,
                    })
                  }
                  className="w-full px-2 py-1 mt-3 border rounded-md"
                  type="number"
                  placeholder="Phone"
                />
              </div>

              <div className="flex w-32 mb-3">
                <label
                  tabIndex="0"
                  ref={avatarRef}
                  style={{ backgroundImage: "url(no_avatar.jpg)" }}
                  htmlFor="image"
                  className="flex items-center justify-center w-full h-full px-4 mt-3 bg-center bg-cover border rounded-md shadow-sm cursor-pointer"
                >
                  {!userImage && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-16 h-16 mb-10 opacity-30"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  )}

                  <input
                    className="hidden"
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      avatarRef.current.style.backgroundImage = `url(${URL.createObjectURL(
                        e.target.files[0]
                      )})`;
                      setUserImage(e.target.files[0]);
                    }}
                  />
                </label>
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
