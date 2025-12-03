import { FaFacebook, FaXTwitter, FaYoutube, FaInstagram, FaLinkedin, FaPinterest } from "react-icons/fa6";
import { IoCallOutline } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { useState } from "react";
import {HiOutlineMenu, HiOutlineX} from "react-icons/hi";

export default function Navigation() {

    const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full">
      {/* Üst bar */}
      <div className="bg-blue-700 text-white flex flex-wrap justify-between items-center px-6 py-2 text-sm">
        {/* Sosyal medya ikonları */}
        <div className="flex gap-3">
          <FaFacebook className="cursor-pointer hover:text-gray-200" />
          <FaXTwitter className="cursor-pointer hover:text-gray-200" />
          <FaYoutube className="cursor-pointer hover:text-gray-200" />
          <FaInstagram className="cursor-pointer hover:text-gray-200" />
          <FaLinkedin className="cursor-pointer hover:text-gray-200" />
          <FaPinterest className="cursor-pointer hover:text-gray-200" />
        </div>

        {/* Telefon ve mail */}
        <div className="hidden sm:flex items-center gap-4">
          <div className="flex items-center gap-1">
            <IoCallOutline className="text-lg" />
            <span>+90 224 443 26 88</span>
          </div>
          <div className="flex items-center gap-1">
            <MdEmail className="text-lg" />
            <span>satis@bluetech.com.tr</span>
          </div>
        </div>
      </div>

      {/* Alt bar (logo ve menü) */}
      <nav className="flex flex-wrap justify-between items-center px-8 py-4 bg-white shadow">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src="https://www.bluetech.com.tr/images/logo.png"
            alt="Bluetech Logo"
            className="h-10"
          />
        </div>
        <button
         className="md:hidden text-2xl text-gray-700"
         onClick={() => setMenuOpen(!menuOpen)}
        >
         {menuOpen ? <HiOutlineX /> : <HiOutlineMenu />}
        </button>


        {/* Menü listesi */}
        <ul
          className={`${
            menuOpen
              ? "flex flex-col absolute top-full left-0 w-full bg-white shadow-md border-t border-gray-200"
              : "hidden"
          } md:flex md:flex-row md:static md:w-auto md:shadow-none md:border-none gap-6 text-gray-700 font-medium`}
        >
          <li className="hover:text-blue-700 cursor-pointer px-4 py-2 md:px-0 md:py-0">
            Ana Sayfa
          </li>
          <li className="hover:text-blue-700 cursor-pointer px-4 py-2 md:px-0 md:py-0">
            Bluetech Hakkında
          </li>
          <li className="hover:text-blue-700 cursor-pointer px-4 py-2 md:px-0 md:py-0">
            İletişim
          </li>
        </ul>
      </nav>
    </header>
  );
}
