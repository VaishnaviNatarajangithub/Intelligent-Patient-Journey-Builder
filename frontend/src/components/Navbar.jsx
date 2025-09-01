import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const NavBar = () => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => setOpen(!open);

  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 w-full bg-blue-900 text-white z-50 shadow-md">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="text-2xl font-bold">IntelliJourney</Link>

        <div className="hidden md:flex gap-6">
          <button onClick={() => handleScroll("home")} className="hover:text-yellow-300">Home</button>
          <button onClick={() => handleScroll("about")} className="hover:text-yellow-300">About</button>
          <button onClick={() => handleScroll("services")} className="hover:text-yellow-300">Services</button>
          <button onClick={() => handleScroll("features")} className="hover:text-yellow-300">Features</button>
          <button onClick={() => handleScroll("contact")} className="hover:text-yellow-300">Contact</button>
          <Link to="/login" className="hover:text-yellow-300">Login</Link>
        </div>

        <div className="md:hidden" onClick={handleToggle}>
          {open ? <FaTimes size={24} /> : <FaBars size={24} />}
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-blue-800 flex flex-col px-6 py-4">
          <button onClick={() => handleScroll("home")} className="py-2">Home</button>
          <button onClick={() => handleScroll("about")} className="py-2">About</button>
          <button onClick={() => handleScroll("services")} className="py-2">Services</button>
          <button onClick={() => handleScroll("features")} className="py-2">Features</button>
          <button onClick={() => handleScroll("contact")} className="py-2">Contact</button>
          <Link to="/login" className="py-2">Login</Link>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
