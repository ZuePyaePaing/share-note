import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className=" max-w-5xl mx-auto flex items-center justify-between py-2">
      <Link to={'/'} className=" font-bold text-xl">
        Share <span className="text-red-600">Note</span>
      </Link >
      <div className=" flex gap-x-3">
        <Link
          to={"/login"}
          className=" px-4 py-2 bg-red-400 text-white  rounded-md  shadow-md font-semibold hover:bg-red-300 duration-150"
        >
          Login
        </Link>
        <Link
          to={"/register"}
          className=" px-4 py-2 bg-red-400 text-white  rounded-md  shadow-md font-semibold hover:bg-red-300 duration-150"
        >
          Register
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
