import React from "react";
import { FaRegHeart } from "react-icons/fa";

const Nav = () => {
  return (
    <nav className=" p-2  text-white">
      <div className="flex items-center justify-between">
        <p className="text-2xl font-bold">+</p>
        <h4 className="text-lg font-semibold">Instagram</h4>
       <FaRegHeart size={20} />
      </div>
    </nav>
  );
};

export default Nav;
