import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Link } from "react-router-dom";

const Home = () => {
  const { currUser, handleSignIn, handleSignOut } = useContext(AuthContext);
  return (
    <div>
      <h2>Home</h2>
      {currUser ? (
        <div>
          <h2>{currUser.displayName}</h2>
          <button onClick={handleSignOut}>Sign Out</button>
          <Link to={"/readtasks"}>
            <button>Read Tasks</button>
          </Link>
        </div>
      ) : (
        <button onClick={handleSignIn}>Sign In</button>
      )}
    </div>
  );
};

export default Home;
