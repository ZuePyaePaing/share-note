import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";
import { formatISO9075 } from "date-fns";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Note = ({ _id, title, description, createdAt }) => {
  const deletHandler = async (noteId) => {
    const responce = await fetch(
      `${import.meta.env.VITE_API_URL}/delete/${noteId}`,
      {
        method: "delete",
      }
    );
    toast.success("Note is deleted");
  };

  return (
    <div className=" flex flex-col justify-between p-4 rounded-md shadow-md md:w-[340px] w-[300px] h-[200px] ">
      <h1 className=" font-roboto font-bold text-xl mb-1">{title}</h1>
      <p className=" font-mono font-normal text-[16px] self-start">
        {description.slice(0, 120)}...
      </p>
      {/* footer */}
      <div className="flex items-center pt-2 mt-auto justify-between border-t border-red-400">
        <div className="flex items-center gap-x-2">
          <CalendarDaysIcon className=" w-4 h-4" />
          <p className=" font-normal text-sm">
            {formatISO9075(new Date(createdAt), { representation: "date" })}
          </p>
        </div>
        <div className=" flex items-center gap-x-2">
          <TrashIcon
            className="h-4 w-5 text-red-500 cursor-pointer"
            onClick={() => deletHandler(_id)}
          />

          <Link to={`/edit/${_id}`}>
            <PencilSquareIcon className="h-4 w-5 text-teal-600 cursor-pointer" />
          </Link>
          <Link to={`/detail/${_id}`}>
            <EyeIcon className="h-4 w-5 cursor-pointer" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Note;
