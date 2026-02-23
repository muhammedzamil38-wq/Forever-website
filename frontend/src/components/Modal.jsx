import React from "react";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";

const Modal = ({ title, text }) => {
  const { isModal, setIsModal } = useContext(ShopContext);
  return (
    <div className="flex justify-center items-center">
      {isModal === true ?  (
        <div className="flex flex-col">
          <div className="flex justify-start ">
            <h3>{title}</h3>
            <img className="w-1.5 h-1.5 ml-auto" src={assets.cross_icon} alt="" />
          </div>
        </div>
      ):''}
    </div>
  );
};

export default Modal;
