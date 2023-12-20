import React, { useEffect, useRef, useState } from "react";
import ChatMessage from "../components/ChatMessage";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import Sidebar from "../components/Sidebar";
import "../chatContainer.css"

// import data from '@emoji-mart/data'
// import Picker from '@emoji-mart/react'

const HomePage = () => {
  const [room, setRoom] = useState(localStorage.email);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const chatContainerRef = useRef(null)

  // const [showEmojiPicker, setShowEmojiPicker] = useState(false);


  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

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
    const queryMessages = query(
      messageRef,
      where("room", "==", room),
      orderBy("createdAt")
    );
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
        <div className="flex rounded-full">
          <Sidebar changeRoom={changeRoom} />

          {/* Main Chat Area */}
          <div className="flex-1 rounded-full">
            {/* Chat Header */}
            <header className="bg-white border-l p-2 text-black rounded-xl mt-10 mb-1 hover:bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-yellow-500 via-purple-500 to-blue-500">
              <h1 className="text-2xl font-semibold">{room}</h1>
            </header>

            {/* Chat Messages */}

            <div className="max-h-[1300px] overflow-y-auto hide-scrollbar border-l border-t border-b rounded-lg mt-3.5" ref={chatContainerRef}>
              {messages &&
                messages.map((chat, i) => {
                  return <ChatMessage chat={chat} key={i} />;
                })}
            </div>
            


            {/* Chat Input */}
            <footer className="bg-white fixed bottom-0 w-[1425px]">

            {/* {showEmojiPicker && (
              <Picker
                onSelect={(emoji) => {
                  setNewMessage((prev) => prev + emoji.native);
                  setShowEmojiPicker(false);
                }}
              />
            )} */}
            
              <form onSubmit={handleSubmit} className="flex items-center bg-white" id="chatForm">
                
                <div className="flex flex-row items-center h-16 bg-white w-full px-4">
                  <div className="flex-grow ml-4">
                    <div className="relative w-full">
                      
                      <input
                        onChange={(e) => {
                          setNewMessage(e.target.value);
                        }}
                        value={newMessage}
                        type="text"
                        placeholder="Type a message..."
                        className="flex w-full border rounded-xl bg-gray-300 focus:outline-none focus:border-indigo-300 pl-4 h-10 text-black"
                      />
                       <button className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-black hover:text-gray-600">
                        😃
                      </button>
 
                    </div>
                  </div>
                  <div className="ml-">
                    <button className="flex items-center justify-center bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-yellow-500 via-purple-500 to-blue-500 rounded-xl text-gray-900 px-4 py-1 flex-shrink-0">
                      <span>Send</span>
                      <span className="ml-2">
                        <svg
                          className="w-4 h-4 transform rotate-45 -mt-px"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
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
