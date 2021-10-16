import React from "react";

export default function ImageInput({ avatarRef, userImage, setInputBg }) {
  return (
    <label
      tabIndex="0"
      ref={avatarRef}
      style={{ backgroundImage: "url(no_avatar.jpg)" }}
      htmlFor="image"
      className="input_file_label"
    >
      {!userImage && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-16 h-16 mt-24 opacity-30"
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
        onChange={setInputBg}
      />
    </label>
  );
}
