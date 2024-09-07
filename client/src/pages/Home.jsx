import React, { useEffect, useState } from "react";
import Note from "../components/Note";
import Loading from "../components/Loading";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const getNotes = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/notes`);
    const data = await response.json();
    setNotes(data.notes);
    setLoading(false);
  };

  useEffect(() => {
    getNotes();
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <section className="  max-w-6xl mx-auto mt-5">
      <div className=" flex items-center gap-4 justify-center flex-wrap">
        {notes?.map((note) => {
          return <Note key={note._id} {...note} getNotes={getNotes} />;
        })}
      </div>
    </section>
  );
};

export default Home;
