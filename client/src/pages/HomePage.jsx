import React, { useEffect, useState } from "react";
import ChatMessage from "../components/ChatMessage";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import Sidebar from "../components/Sidebar";

const HomePage = () => {
  const [room, setRoom] = useState(localStorage.email);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const messageRef = collection(db, "messages");

  function changeRoom(destination) {
    setRoom(destination);
  }

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

  useEffect(() => {
    const queryMessages = query(messageRef, where("room", "==", room));
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data() });
      });
      setMessages(messages);
    });

    return () => unsubscribe();
  }, [room]);
  return (
    <>
      <div>
        <div className="flex">
          <Sidebar changeRoom={changeRoom} />

          {/* Main Chat Area */}
          <div className="flex-1">
            {/* Chat Header */}
            <header className="bg-black p-4 text-white">
              <h1 className="text-2xl font-semibold">{room}</h1>
            </header>

            {/* Chat Messages */}
            <div className="h-screen overflow-y-auto p-4 pb-10">
              <div>
                {messages &&
                  messages.map((chat, i) => {
                    return <ChatMessage chat={chat} key={i} />;
                  })}
              </div>
            </div>

            {/* Chat Input */}
            <footer className="bg-white border-t border-gray-300 p-4 absolute bottom-0 w-3/4 ">
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
                  className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                >
                  Send
                </button>
              </form>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
