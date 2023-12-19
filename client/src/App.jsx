import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <>
      <Navbar />
      <div>
        <div className="flex">
          <Sidebar />
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default App;
