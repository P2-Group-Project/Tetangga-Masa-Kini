import React from "react";

const ChatMessage = ({ chat }) => {
  return (
    <>
      {chat.user === localStorage.name ? (
        <div className="flex justify-end mb-4 cursor-pointer">
          <div className="flex max-w-96 bg-black text-white rounded-lg p-3 gap-3">
            <p>{chat.text}</p>
          </div>
          <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
            <img
              src={chat.photo}
              alt="My Avatar"
              className="w-8 h-8 rounded-full"
            />
          </div>
        </div>
      ) : (
        <div className="flex mb-4 cursor-pointer">
          <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
            <img
              src={chat.photo}
              alt="User Avatar"
              className="w-8 h-8 rounded-full"
            />
          </div>
          <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
            <p className="text-gray-700">{chat.text}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatMessage;
