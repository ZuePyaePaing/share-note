import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className=" font-roboto max-w-6xl mx-auto flex items-center justify-between py-2">
      <Link to={"/"} className=" font-bold text-2xl">
        Share <span className="text-red-600">Note</span>
      </Link>
      <div className=" flex gap-x-3">
        <div className=" flex gap-x-3">
          <Link
            to={"/create"}
            className=" px-4 py-2 bg-red-400 text-white  rounded-md  shadow-md font-semibold hover:bg-red-300 duration-150"
          >
            Create Note
          </Link>
          <button className=" px-4 py-2 bg-red-400 text-white  rounded-md  shadow-md font-semibold hover:bg-red-300 duration-150">
            {" "}
            Logout
          </button>
        </div>
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
      </div>
    </nav>
  );
};

export default Navbar;
