import React from "react";

const ChatMessage = () => {
  return (
    <>
      <div className="h-screen overflow-y-auto p-4 pb-36">
        {/* Incoming Message */}
        <div className="flex mb-4 cursor-pointer">
          <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
            <img
              src="https://i.pinimg.com/564x/0d/a2/0f/0da20f7ea0e8bfdea0cdd4c3d7361ea2.jpg"
              alt="User Avatar"
              className="w-8 h-8 rounded-full"
            />
          </div>
          <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
            <p className="text-gray-700">haloooo wawwwwwww?</p>
          </div>
        </div>
        {/* Outgoing Message */}
        <div className="flex justify-end mb-4 cursor-pointer">
          <div className="flex max-w-96 bg-black text-white rounded-lg p-3 gap-3">
            <p>cuman template loh ini, kocak</p>
          </div>
          <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
            <img
              src="https://i.pinimg.com/564x/1a/10/be/1a10be224b92016e467c9577374cd1c0.jpg"
              alt="My Avatar"
              className="w-8 h-8 rounded-full"
            />
          </div>
        </div>
        {/* Incoming Message */}
        <div className="flex mb-4 cursor-pointer">
          <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
            <img
              src="https://i.pinimg.com/564x/0d/a2/0f/0da20f7ea0e8bfdea0cdd4c3d7361ea2.jpg"
              alt="User Avatar"
              className="w-8 h-8 rounded-full"
            />
          </div>
          <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
            <p className="text-gray-700">masok pak eko</p>
          </div>
        </div>
        {/* Outgoing Message */}
        <div className="flex justify-end mb-4 cursor-pointer">
          <div className="flex max-w-96 bg-black text-white rounded-lg p-3 gap-3">
            <p>hadeh hadeh ....</p>
          </div>
          <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
            <img
              src="https://i.pinimg.com/564x/1a/10/be/1a10be224b92016e467c9577374cd1c0.jpg"
              alt="My Avatar"
              className="w-8 h-8 rounded-full"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatMessage;
