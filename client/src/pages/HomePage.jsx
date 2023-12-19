import React, { useState } from "react";
import ChatMessage from "../components/ChatMessage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebaseConfig";

const HomePage = () => {
  const [room, setRoom] = useState(localStorage.email);
  const [newMessage, setNewMessage] = useState("");

  const messageRef = collection(db, "messages");

  async function handleSubmit(e) {
    e.preventDefault();
    if (newMessage === "") return;
    try {
      await addDoc(messageRef, {
        text: newMessage,
        createdAt: serverTimestamp(),
        user: localStorage.name,
        photo: localStorage.photo,
        room,
      });
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {/* Main Chat Area */}
      <div className="flex-1">
        {/* Chat Header */}
        <header className="bg-white p-4 text-gray-700">
          <h1 className="text-2xl font-semibold">moka</h1>
        </header>

        {/* Chat Messages */}
        <ChatMessage />

        {/* Chat Input */}
        <footer className="bg-white border-t border-gray-300 p-4 absolute bottom-0 w-3/4">
          <form onSubmit={handleSubmit} className="flex items-center">
            <input
              onChange={(e) => {
                setNewMessage(e.target.value);
              }}
              value={newMessage}
              type="text"
              placeholder="Type a message..."
              className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2"
            >
              Send
            </button>
          </form>
        </footer>
      </div>
    </>
  );
};

export default HomePage;
