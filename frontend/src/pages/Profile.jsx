import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";

const Profile = () => {
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"MY"} text2={"PROFILE"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full max-w-112.5 "
          src={assets.profile_section}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p className="text-3xl font-bold text-black">
            Name: <span className="text-gray-500">{name}</span>
          </p>
          <p className="text-3xl font-bold text-black">
            Email: <span className="text-gray-500">{email}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
