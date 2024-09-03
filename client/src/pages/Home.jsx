import React, { useEffect, useState } from "react";
import Note from "../components/Note";
import { Circles } from "react-loader-spinner";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const getNotes = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/notes`);
    const data = await response.json();
    console.log(data);
    setNotes(data.notes);
    setLoading(false);
  };

  useEffect(() => {
    getNotes();
  }, []);

  if (loading) {
    return (
      <div className=" flex items-center justify-center w-full h-screen">
        <Circles
          height={50}
          width={50}
          color="#FCA5A5"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
         />
      </div>
    );
  }
  return (
    <section className="  max-w-6xl mx-auto mt-5">
      <div className=" flex items-center gap-4 justify-center flex-wrap">
        {notes?.map((note) => {
          return <Note key={note._id} {...note} />;
        })}
      </div>
    </section>
  );
};

export default Home;
