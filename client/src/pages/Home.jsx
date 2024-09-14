import React, { useEffect, useState } from "react";
import Note from "../components/Note";
import Loading from "../components/Loading";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCruurentPage] = useState(1);
 const [totalPages, setTotalPages] = useState(1);
  const getNotes = async (currentPage) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/notes?page=${currentPage}`
    );
    const {notes,pagination} = await response.json();
    setNotes(notes);
    setTotalPages(pagination.totalPages);
    setLoading(false);
  };

  console.log(totalPages);
  const handlePrev = () => {
    if (currentPage > 1) {
      setCruurentPage(currentPage - 1);
    }
  };
  const handleNext = () => {
    setCruurentPage(currentPage + 1);
  };
  useEffect(() => {
    getNotes(currentPage);
  }, [currentPage]);

  if (loading) {
    return <Loading />;
  }
  return (
    <section className="  max-w-6xl mx-auto mt-5 flex flex-col items-center gap-y-2">
      <div className=" flex items-center gap-4 justify-center flex-wrap">
        {notes?.map((note) => {
          return <Note key={note._id} {...note} getNotes={getNotes} />;
        })}
      </div>
      <div className="flex items-center gap-4 justify-center">
        {currentPage > 1 && (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handlePrev}
          >
            Prev
          </button>
        )}
        {currentPage < totalPages && (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleNext}
          >
            Next
          </button>
        )}
      </div>
    </section>
  );
};

export default Home;
