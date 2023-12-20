import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  function handleLogout(e) {
    e.preventDefault();
    localStorage.clear();
    navigate(`/login`);
  }
  return (
    <>
<div className="navbar bg-white ">
  <div className="flex-1">
    <a className="btn bg-gradient-to-tl from-orange-400 to-sky-400 text-gray-100 text-xl">LOGO DISINI</a>
  </div>
  <div className="flex-none gap-2">
    <div >
      <h1 className=" w-24 md:w-auto text-black">Tetangga masa kini/LOGO DROPDOWN LOGOUT</h1>
    </div>
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </div>
      </div>
      <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
        <button>Setting</button>
        <button onClick={handleLogout}>Logout</button>
      </ul>
    </div>
  </div>
</div>
    </>
  );
}
