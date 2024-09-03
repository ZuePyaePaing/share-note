import { useNavigate } from "react-router-dom";
import { Field, Form, Formik, ErrorMessage } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";

const NoteForm = ({ create }) => {
  const nav = useNavigate();
  // Define validation schema
  const noteSchema = Yup.object().shape({
    title: Yup.string()
      .max(30, "Title must be at most 30 characters")
      .required("Title is required"),
    description: Yup.string()
      .min(10, "Description must be at least 10 characters")
      .required("Description is required"),
  });

  const handleSubmit = async (values) => {
    if (create) {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      nav("/");
      toast.success(data.message);
    }
  };

  return (
    <section className="max-w-5xl mx-auto my-4">
      <div className="w-[450px] mx-auto rounded-md shadow-lg bg-red-100 p-4">
        <h1 className="text-center text-2xl mb-4">
          {create ? "Create Note" : "Edit Note"}
        </h1>
        <Formik
          initialValues={{ title: "", description: "" }}
          validationSchema={noteSchema}
          onSubmit={handleSubmit}
        >
          <Form className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label htmlFor="title" className="mb-2 font-semibold">
                Title
              </label>
              <Field name="title" type="text" className="p-2 border rounded" />
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="description" className="mb-2 font-semibold">
                Description
              </label>
              <Field
                name="description"
                as="textarea"
                className="p-2 border rounded"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <button
              type="submit"
              className="mt-4 bg-green-500 text-white p-2 rounded"
            >
              {create ? "Create" : "Update"}
            </button>
          </Form>
        </Formik>
      </div>
    </section>
  );
};

export default NoteForm;
