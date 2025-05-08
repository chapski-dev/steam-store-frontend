import React, { useState } from 'react';
import { useUserStore } from '../store/user';
import ExitIcon from "../assets/exit.svg";

const UserDropdown = () => {
  const { user, logoutUser } = useUserStore();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = React.useRef(null);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <li className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="focus:outline-none"
      >
        <img
          src={user?.avatar}
          alt="User Icon"
          className="rounded-full"
        />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg overflow-hidden"
        >
          <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
            Settings
          </a>
          <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
            My Purchases
          </a>
          <div onClick={logoutUser} className="flex gap-2 px-4 py-2 text-gray-800 hover:bg-gray-200">
            <img src={ExitIcon} /> {' '} Logout
          </div>
        </div>
      )}
    </li>
  );
};

export default UserDropdown;
