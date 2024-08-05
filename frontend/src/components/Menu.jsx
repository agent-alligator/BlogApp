import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { URL } from "../url";
import { Link, useNavigate } from "react-router-dom";
import { FiLogIn, FiUserPlus, FiUser, FiEdit, FiBookOpen, FiLogOut } from "react-icons/fi";

const Menu = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get(`${URL}/api/auth/logout`, { withCredentials: true });
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const menuItems = [
    { condition: !user, label: "Login", icon: <FiLogIn />, link: "/login" },
    { condition: !user, label: "Register", icon: <FiUserPlus />, link: "/register" },
    { condition: user, label: "Profile", icon: <FiUser />, link: `/profile/${user?._id}` },
    { condition: user, label: "Write", icon: <FiEdit />, link: "/write" },
    { condition: user, label: "My blogs", icon: <FiBookOpen />, link: `/myblogs/${user?._id}` },
    { condition: user, label: "Logout", icon: <FiLogOut />, onClick: handleLogout },
  ];

  return (
    <div className="absolute top-full right-0 mt-2 w-56 bg-white shadow-lg rounded-lg overflow-hidden z-50">
      <div className="py-2">
        {menuItems.map((item, index) => (
          item.condition && (
            <MenuItem
              key={index}
              icon={item.icon}
              label={item.label}
              link={item.link}
              onClick={item.onClick}
            />
          )
        ))}
      </div>
    </div>
  );
};

const MenuItem = ({ icon, label, link, onClick }) => {
  const content = (
    <div className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200">
      <span className="mr-3 text-lg">{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </div>
  );

  return onClick ? (
    <button onClick={onClick} className="w-full text-left">
      {content}
    </button>
  ) : (
    <Link to={link} className="block">
      {content}
    </Link>
  );
};

export default Menu;