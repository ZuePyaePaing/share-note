import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import InputField from "./InputField ";
import toast from "react-hot-toast";
import * as Yup from "yup";

const NoteForm = ({ create }) => {
  const fileInputRef = useRef();
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  // Define validation schema
  const noteSchema = Yup.object().shape({
    title: Yup.string()
      .max(30, "Title must be at most 30 characters")
      .required("Title is required"),
    description: Yup.string()
      .min(10, "Description must be at least 10 characters")
      .required("Description is required"),
  });
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);
  };
  const handleSubmit = async (values) => {
    const url = create
      ? `${import.meta.env.VITE_API_URL}/create`
      : `${import.meta.env.VITE_API_URL}/edit`;
    const method = create ? "POST" : "PUT";
    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      navigate("/");
      toast.success(data.message);
      console.log(values);
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  return (
    <section className="max-w-5xl mx-auto my-4">
      <div className="w-[450px] mx-auto rounded-md shadow-lg bg-red-100 p-4">
        <h1 className="text-center text-2xl mb-4">
          {create ? "Create Note" : "Edit Note"}
        </h1>
        <Formik
          initialValues={{ title: "", description: "", cover_image: "" }}
          validationSchema={noteSchema}
          onSubmit={handleSubmit}
        >
          {({ setInitialValues }) => (
            <Form className="flex flex-col gap-4">
              <InputField lable={"title"} name={"title"} type="text" />
              <InputField
                lable={"description"}
                name={"description"}
                component="textarea"
              />
              <div>
                <input
                  type="file"
                  name="cover_image"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  hidden
                />
                <button
                  type="button"
                  onClick={() => setImage(null)}
                  className=""
                >
                  Clear
                </button>
                <div
                  onClick={() => fileInputRef.current.click()}
                  className=" relative w-full h-56 border-2 rounded-md overflow-hidden  border-dashed border-red-500 flex items-center justify-center"
                >
                  {image && (
                    <img
                      src={image}
                      alt={"image"}
                      className=" absolute w-full h-full object-cover top-0 left-0"
                    />
                  )}
                  <ArrowUpTrayIcon className="w-6 h-6 text-red-500 z-20" />
                </div>
              </div>

              <button
                type="submit"
                className="mt-4 bg-green-500 text-white p-2 rounded"
              >
                {create ? "Create" : "Update"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default NoteForm;
