import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import userImage from "../../assets/images/user.png";
import logo from "../../assets/images/logo.png";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const navLinks = (
    <>
      <li>
        <NavLink className="text-[16px]" to="/">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink className="text-[16px]" to="/availableFoods">
          Available Foods
        </NavLink>
      </li>
      <li>
        <NavLink className="text-[16px]" to="/addFood">
          Add Food
        </NavLink>
      </li>
      <li>
        <NavLink className="text-[16px]" to="/manageFood">
          Manage Foods
        </NavLink>
      </li>
      <li>
        <NavLink className="text-[16px]" to="/foodRequest">
          Request Foods
        </NavLink>
      </li>
    </>
  );

  const handleSignOut = () => {
    logOut()
      .then(() => {
        navigate("/");
      })
      .catch((error) => console.dir(error));
  };

  return (
    <div className="navbar mt-6">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navLinks}
          </ul>
        </div>
        <div>
          <Link to="/" className="flex items-center ml-[-10px]">
            <img
              className="md:w-[45px] w-[30px]"
              src={logo}
              alt="website-logo"
            />
            <span className="md:text-3xl text-xl font-bold">
              <span className="text-cyan-500">F</span>ood
              <span className="text-purple-500">B</span>uzz
            </span>
          </Link>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex ml-20">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <button
            onClick={handleSignOut}
            className="btn text-white mr-4  btn-sm font-light text-[14px] bg-gradient-to-r from-sky-500 to-purple-500"
          >
            Sign Out
          </button>
        ) : (
          <button
            className="btn btn-sm text-white border-none mr-4 font-light
           bg-gradient-to-r from-sky-500 to-purple-500"
          >
            <Link to="/signIn">Sign In</Link>
          </button>
        )}

        {user ? (
          <label tabIndex={0} data-tip={user?.displayName} className="tooltip">
              <img
                className="rounded-full w-10 h-10"
                alt="user-image"
                src={user?.photoURL}
              />
          </label>
        ) : (
          <label tabIndex={0} data-tip="No User" className="tooltip">
            <div className="w-10 rounded-full">
              <img alt="user-image" src={userImage} />
            </div>
          </label>
        )}
      </div>
    </div>
  );
};

export default Navbar;
