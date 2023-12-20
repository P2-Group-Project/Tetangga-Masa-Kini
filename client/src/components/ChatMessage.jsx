import React from "react";

const ChatMessage = ({ chat }) => {
  return (
    <>
    {chat.user === localStorage.name ? (
      <div className="flex flex-col h-full overflow-x-auto mb-4">
        <div className="flex flex-row items-center justify-end">
          <div className="col-start-1 col-end-8 p-3 rounded-lg flex items-center">
            <img
              src={chat.photo}
              alt="My Avatar"
              className="w-8 h-8 rounded-full"
            />
            <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
              <p>{chat.user}</p>
              <p className="text-gray-700">{chat.text}</p>
            </div>
          </div>
        </div>
        {/* Reply messages container */}
        <div className="flex flex-row items-center justify-end">
          <div className="col-start-1 col-end-8 p-3 rounded-lg flex items-center">
            {/* Add reply message content here */}
          </div>
        </div>
      </div>
    ) : (
      <div className="flex flex-row items-center">
        <div className="col-start-1 col-end-8 p-3 rounded-lg flex items-center">
          <img
            src={chat.photo}
            alt="User Avatar"
            className="w-8 h-8 rounded-full"
          />
          <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
            <p>{chat.user}</p>
            <p className="text-gray-700">{chat.text}</p>
          </div>
        </div>
        {/* Reply messages container */}
        <div className="col-start-1 col-end-8 p-3 rounded-lg flex items-center">
          {/* Add reply message content here */}
        </div>
      </div>
    )}
  </>
  );
};

export default ChatMessage;
