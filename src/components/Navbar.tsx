import { AiOutlineMenu, AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { LuPopcorn } from "react-icons/lu";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  return (
    <div className="max-w-[1640px] mx-auto flex justify-between items-center p-4 bg-black">
      {/* leftside */}
      <div className="flex items-center">
        <div onClick={() => setNav(!nav)} className="cursor-pointer text-white">
          <AiOutlineMenu size={30} />
        </div>
        <Link to="/" className="flex items-center">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl px-2 text-white">
            Pop<span className="font-bold text-yellow-400">Corn</span>
          </h1>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl text-white">
            Movies
          </h1>
        </Link>
      </div>

      {/* rightside */}

      <div className=" bg-yellow-600 flex items-center px-2   rounded-full w-[250px] sm:w-[400] lg:w-[600px]">
        <Link to={`search/${searchTerm}`}>
          <AiOutlineSearch size={30} />
        </Link>

        <input
          className="  focus:outline-none bg-transparent w-full  placeholder-black "
          type="text"
          placeholder="Search Movies or TVShows "
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => {
            // Execute search when Enter key is pressed
            if (e.key === "Enter") {
              navigate(`search/${searchTerm}`);
            }
          }}
        />
      </div>

      {/* mobilemenu */}
      {/* overlay */}

      {nav ? (
        <div className="bg-black/80 fixed w-full h-screen z-10 top-0 left-0"></div>
      ) : (
        ""
      )}

      {/* sidedrawer */}
      <div
        className={
          nav
            ? "fixed top-0 left-0 bg-white h-screen z-10 duration-300 w-[300px]  "
            : "fixed top-0 left-[-100%] bg-white h-screen z-10 duration-300 w-[300px] "
        }
      >
        <AiOutlineClose
          onClick={() => setNav(!nav)}
          size={30}
          className="absolute right-4 top-4 cursor-pointer text-white"
        />

        <div className="flex bg-black py-4 ">
          <h2 className="text-2xl  pl-4 text-white">
            Pop
            <span className="font-bold text-yellow-400 ml-0">Corn</span>
          </h2>
          <h2 className="text-2xl pl-2 text-white">Movies</h2>
        </div>

        <nav>
          <ul className="flex flex-col p-4">
            <li className="text-xl py-4  cursor-pointer">
              <Link
                onClick={() => setNav(!nav)}
                className="flex"
                to="/favourites"
              >
                <FaHeart size={25} className=" ml-3 mr-2 " /> Favourites
              </Link>
            </li>
            <li className="text-xl py-4  cursor-pointer">
              <Link onClick={() => setNav(!nav)} className="flex" to="/rated">
                <LuPopcorn size={25} className=" ml-3 mr-2" /> Rated
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
