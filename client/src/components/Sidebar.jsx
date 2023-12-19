import React from "react";

const Sidebar = () => {
  return (
    <div className="w-1/4 bg-white border-r border-gray-300">
      {/* Sidebar Header */}
      <header className="p-4 border-b border-gray-300 flex justify-between items-center bg-black text-white">
        <h1 className="text-2xl font-semibold">Chat Web</h1>
        <div className="relative">
          <button id="addChat" className="focus:outline-none">
            add new
          </button>
        </div>
      </header>

      <div className="overflow-y-auto h-screen p-3 mb-9 pb-20">
        <div className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
          <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
            <img
              src="https://i.pinimg.com/564x/0d/a2/0f/0da20f7ea0e8bfdea0cdd4c3d7361ea2.jpg"
              alt="User Avatar"
              className="w-12 h-12 rounded-full"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold">moka</h2>
            <p className="text-gray-600">testing</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;