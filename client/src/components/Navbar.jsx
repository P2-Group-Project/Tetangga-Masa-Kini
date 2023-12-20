import { useNavigate } from "react-router-dom";
import logo from "../assets/Tetanggamasa.png";

export default function Navbar() {
  const navigate = useNavigate();
  function handleLogout(e) {
    e.preventDefault();
    localStorage.clear();
    navigate(`/login`);
  }
  return (
    <>
      <div className="navbar bg-white border-b mb-2 rounded-2xl ">
        <div className="flex-1">
          <img alt="Tailwind CSS Navbar component" src={logo} className="w-[200px]"/>
        </div>
        <div className="flex-none gap-2">
          <div>
            <h1 className=" w-24 md:w-auto text-black font-bold">
              Welcome, pick your room!
            </h1>
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://i.pinimg.com/564x/95/da/a1/95daa19a4110e01f6841057c4fe1d17b.jpg"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <button>Setting</button>
              <button onClick={handleLogout}>Logout</button>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
