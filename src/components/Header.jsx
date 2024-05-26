import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const Header = ({ className }) => {
  const { currUser } = useContext(AuthContext);
  return (
    <nav className={className}>
      <h3>CRUD-22</h3>
      <ul>
        <li>Link</li>
        <li>Link</li>
        <li>Link</li>
      </ul>
      <button>{currUser?.displayName}</button>
    </nav>
  );
};

export default Header;
