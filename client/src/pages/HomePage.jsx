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

            <div>
              {messages &&
                messages.map((chat, i) => {
                  return <ChatMessage chat={chat} key={i} />;
                })}
            </div>

            {/* Chat Input */}
            <footer className="bg-black border-t border-gray-300 fixed bottom-0 w-[1425px] ">
              <form onSubmit={handleSubmit} className="flex items-center">
                <div class="flex flex-row items-center h-16 rounded-xl bg-black w-full px-4">
                  <div class="flex-grow ml-4">
                    <div class="relative w-full">
                      <input
                        onChange={(e) => {
                          setNewMessage(e.target.value);
                        }}
                        value={newMessage}
                        type="text"
                        placeholder="Type a message..."
                        className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                      />
                      <button class="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600">
                        <svg
                          class="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div class="ml-4">
                    <button class="flex items-center justify-center bg-gradient-to-tl from-orange-400 to-sky-400 hover:bg-indigo-600 rounded-xl text-gray-900 px-4 py-1 flex-shrink-0">
                      <span>Send</span>
                      <span class="ml-2">
                        <svg
                          class="w-4 h-4 transform rotate-45 -mt-px"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                          ></path>
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
              </form>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
