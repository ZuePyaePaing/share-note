import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeftIcon,
  CalendarDaysIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Loading from "../components/Loading";
import { formatISO9075 } from "date-fns";

const DetailNote = () => {
  const { id } = useParams();
  const [note, setNote] = useState({});
  const [loading, setLoading] = useState(true);

  const getNoteHandler = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/notes/${id}`);
    console.log(`${import.meta.env.VITE_API_URL}/note/${id}`);
    const data = await response.json();
    setNote(data.note);
    setLoading(false);
  };

  useEffect(() => {
    getNoteHandler();
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <section className=" max-w-6xl mx-auto h-screen mt-5 p-4 ">
      <div className=" flex justify-between">
        <h1 className=" font-bold font-roboto text-2xl">{note.title}</h1>
        <Link to={"/"}>
          <ArrowLeftIcon className=" w-5 h-5" />
        </Link>
      </div>
      {note.cover_image && (
        <img
        className=" w-full h-[300px] object-center"
          src={`${import.meta.env.VITE_API_URL}/${note.cover_image}`}
          title={note.title}
        />
      )}
      <p className=" font-mono font-normal text-[16px]">{note.description}</p>
      <div className=" flex items-center gap-x-2">
        <div className="flex items-center gap-x-2">
          <UserIcon className=" w-4 h-4" />
          <p className=" font-normal text-sm">{note.author}</p>
        </div>
        <div className="flex items-center gap-x-2">
          <CalendarDaysIcon className=" w-4 h-4" />
          <p className=" font-normal text-sm">
            {formatISO9075(new Date(note.createdAt), {
              representation: "date",
            })}
          </p>
        </div>
      </div>
    </section>
  );
};

export default DetailNote;
