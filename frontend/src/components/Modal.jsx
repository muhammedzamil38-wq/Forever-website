import React from "react";
import { assets } from "../assets/assets";
import { useState } from "react";

const Modal = ({ title, text, buttonText, onSubmitHandler, cancelHandler }) => {
  const [hidden, setHidden] = useState(false);

  console.log("you have reached modal");
  return (
    <div
      className={`fixed inset-0 flex justify-center items-center bg-black/50 backdrop-blur-sm z-50 ${hidden ? "hidden" : "block"}`}
    >
      <div className="flex flex-col justify-between bg-gray-400 w-[50%] h-auto p-7.5 rounded-2xl">
        <div className="flex justify-start border-b border-b-black pb-3">
          <h3 className="text-2xl">{title}</h3>
          <img
            className="w-5 h-5 ml-auto cursor-pointer"
            src={assets.cross_icon}
            alt="close"
            onClick={() => {
              setHidden(true);
              cancelHandler();
            }}
          />
        </div>
        <div className="mt-3 text-lg mb-4">
          <h5>{text}</h5>
        </div>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onSubmitHandler}
            className="bg-black text-white px-4 py-2 rounded cursor-pointer"
          >
            {buttonText}
          </button>
          <button
            className="bg-gray-600 text-white px-4 py-2 rounded cursor-pointer"
            onClick={() => {
              setHidden(true);
              cancelHandler();
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
