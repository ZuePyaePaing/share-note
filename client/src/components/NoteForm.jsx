import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

const NoteForm = ({ create }) => {
  const noteSchema = Yup.object({
    title: Yup.string()
      .max(30, "Title must be at least 6 characters")
      .required("Title is required"),
    description: Yup.string()
      .min(10, "Description must be at least 6 characters")
      .required("Description is required"),
    file: Yup.string().required("File is required"),
  });
  const handleSubmit = (values) => {
    console.log(values);
    
  };
  return (
    <section className="max-w-5xl mx-auto my-4">
      <div className="w-[450px] mx-auto rounded-md shadow-lg bg-red-100 p-4">
        <h1 className="text-center text-2xl mb-4">
          {create ? "Create Note" : "Edit Note"}
        </h1>
        <Formik
          initialValues={{ title: "", description: "", file: "" }}
          validateOnMount={noteSchema}
          onSubmit={handleSubmit}
        >
          <Form className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label htmlFor="title" className="mb-2 font-semibold">
                Title
              </label>
              <Field name="title" type="text" className="p-2 border rounded" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="description" className="mb-2 font-semibold">
                Description
              </label>
              <Field
                name="description"
                as="textarea"
                type="text"
                className="p-2 border rounded"
              />
            </div>
            <div className="flex items-center">
              <label htmlFor="file" className="mb-2 font-semibold">
                File
              </label>
              <Field name="file" type="file" className="p-2 border rounded " />
            </div>
            <button
              type="submit"
              className="mt-4 bg-green-500 text-white p-2 rounded"
            >
              {create ? "Create" : "Update"}
            </button>
          </Form>
          ;
        </Formik>
      </div>
    </section>
  );
};

export default NoteForm;
