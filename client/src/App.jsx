import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import EditNoteForm from "./pages/EditNoteForm";
import CreateNoteFrom from "./pages/CreateNoteFrom";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<CreateNoteFrom />} />
        <Route path="/edit/:id" element={<EditNoteForm />} />
      </Routes>
    </>
  );
};

export default App;
