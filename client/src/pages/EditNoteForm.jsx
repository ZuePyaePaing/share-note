import React from "react";
import NoteForm from "../components/NoteForm";

const EditNoteForm = () => {
  return (
    <>
      <NoteForm create={false} />
    </>
  );
};

export default EditNoteForm;
