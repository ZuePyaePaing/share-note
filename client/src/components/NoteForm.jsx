import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Formik, ErrorMessage, Field } from "formik";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import InputField from "./InputField ";
import toast from "react-hot-toast";
import * as Yup from "yup";

const NoteForm = ({ create }) => {
  const fileInputRef = useRef(); 
  const navigate = useNavigate(); 
  const { id } = useParams(); 
  const [image, setImage] = useState(null); 
  const [oldNote, setOldNote] = useState(null); 

  
  const noteSchema = Yup.object().shape({
    title: Yup.string()
      .max(30, "Title must be at most 30 characters")
      .required("Title is required"),
    description: Yup.string()
      .min(10, "Description must be at least 10 characters")
      .required("Description is required"),
    cover_image: Yup.mixed()
      .nullable()
      .test("fileSize", "File too large", (value) => {
        if (value instanceof File) return value.size <= 10 * 1024 * 1024; 
        return true; 
      })
      .test("fileType", "Unsupported file format", (value) => {
        if (value instanceof File)
          return ["image/jpg", "image/jpeg", "image/png"].includes(value.type);
        return true;
      }),
  });

  
  const loadOldNote = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/edit/${id}`);
    const data = await response.json();
    setOldNote(data); 
    setImage(`${import.meta.env.VITE_API_URL}/${data.cover_image}`); 
  };

  useEffect(() => {
    if (!create) {
      loadOldNote(); 
    }
  }, [create, id]);

 
  const handleFileChange = (e, setFieldValue) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); 
      setImage(imageUrl); 
      setFieldValue("cover_image", file); 
    }
  };

  // Handle form submission
  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    if (values.cover_image instanceof File) {
      formData.append("cover_image", values.cover_image); 
    }
    if (!create) {
      formData.append("noteId", values.noteId); 
    }

    const url = create
      ? `${import.meta.env.VITE_API_URL}/create`
      : `${import.meta.env.VITE_API_URL}/edit`;
    const method = create ? "POST" : "PUT";

    try {
      const response = await fetch(url, { method, body: formData });
      const data = await response.json();
      navigate("/"); 
      toast.success(data.message); 
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
          initialValues={{
            title: oldNote?.title || "",
            description: oldNote?.description || "",
            cover_image: null, 
            noteId: oldNote?._id || "", 
          }}
          validationSchema={noteSchema} 
          onSubmit={handleSubmit} 
          enableReinitialize 
        >
          {({ setFieldValue, isSubmitting }) => (
            <Form className="flex flex-col gap-4">
              <InputField label="Title" name="title" />
              {!create && <Field name="noteId" hidden />}
            
              <InputField
                label="Description"
                name="description"
                component="textarea"
              />
             
              <div>
                <input
                  type="file"
                  name="cover_image"
                  ref={fileInputRef}
                  onChange={(e) => handleFileChange(e, setFieldValue)}
                  hidden
                />
                {image && (
                  <button
                    type="button"
                    onClick={() => {
                      setImage(null);
                      setFieldValue("cover_image", null); 
                    }}
                    className="text-white bg-red-500 px-2 rounded-md"
                  >
                    Clear
                  </button>
                )}
                <div
                  onClick={() => fileInputRef.current.click()}
                  className="relative w-full h-56 border-2 rounded-md overflow-hidden border-dashed border-red-500 flex items-center justify-center cursor-pointer"
                >
                  {image ? (
                    <img
                      src={image}
                      alt="cover"
                      className="absolute w-full h-full object-cover top-0 left-0"
                    />
                  ) : (
                    <ArrowUpTrayIcon className="w-6 h-6 text-red-500 z-20" />
                  )}
                </div>
                <ErrorMessage
                  name="cover_image"
                  component="div"
                  className="text-red-500"
                />
              </div>
            
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-4 bg-green-500 text-white p-2 rounded"
              >
                {create
                  ? isSubmitting
                    ? "Creating Note..."
                    : "Create Note"
                  : isSubmitting
                  ? "Updating Note..."
                  : "Update Note"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default NoteForm;
