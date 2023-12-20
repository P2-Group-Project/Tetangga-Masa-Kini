import React, { useEffect, useState } from "react";
import {
  collection,
  getDoc,
  onSnapshot,
  query,
  doc,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

const Sidebar = ({ changeRoom }) => {
  const [rooms, setRooms] = useState([]);

  // const [currentRoom, setCurrentRoom] = useState(null);

  const roomsRef = collection(db, "rooms");

  async function upsertRoom() {
    const docRef = doc(db, "rooms", localStorage.email);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      await setDoc(doc(roomsRef, localStorage.email), {
        name: localStorage.name,
        email: localStorage.email,
        iconURL: localStorage.photo,
      });
    }
  }

  function handleOnClick(email) {
    changeRoom(email);
  }

  useEffect(() => {
    upsertRoom();

    const queryRooms = query(roomsRef);
    const unsubscribeRooms = onSnapshot(queryRooms, (snapshot) => {
      let rooms = [];
      snapshot.forEach((doc) => {
        rooms.push({ ...doc.data() });
      });
      setRooms(rooms);
    });

    return () => {
      unsubscribeRooms;
    };
  }, []);

  return (
    <div className="md:flex hidden flex-col w-[240px] py-10 px-4 h-full sm:w-1/4 bg-white border-gray-300">
      {/* Sidebar Header */}
      <div className="flex flex-row items-center justify-center h-12 w-full bg-white border-r rounded-2xl">
        {/* Logo */}
        <div className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10">
          {/* SVG or Logo Content */}
        </div>
        {/* Title */}
      
          <div className="ml-2 font-bold text-2xl">Static user name</div>

        
      </div>
      <div className="flex flex-col items-center bg-white border border-r mt-4 w-full py-6 px-4 rounded-2xl bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-yellow-500 via-purple-500 to-blue-500">
        {/* User Avatar */}
        <div className="h-20 w-20 rounded-full border overflow-hidden">
          <img
            src="https://i.pinimg.com/564x/1f/d2/51/1fd25138fe5b5dd469b33843c5c40e96.jpg"
            alt="Avatar"
            className="h-full w-full"
          />
        </div>
        {/* User Info */}
        <div className="text-sm font-semibold mt-2">static user email</div>
        <div className="text-xs text-gray-500">static user profile</div>
        <div className="flex flex-row items-center mt-3">
          {/* Online Indicator */}
          <div className="flex flex-col justify-center h-4 w-8 bg-indigo-500 rounded-full">
            <div className="h-3 w-3 bg-white rounded-full self-end mr-1"></div>
          </div>
          <div className="leading-none ml-1 text-xs">Active</div>
        </div>
      </div>

      <header className="p-4 border-b border-gray-300 flex justify-between items-center  text-black border-r mt-2 rounded-2xl">
        <h1 className="text-2xl font-semibold ">Tetangga masa kini chatroom</h1>
        <div className="relative">
          <button id="addChat" className="focus:outline-none cursor-pointer hover:bg-orange-300 p-2 rounded-lg">
            Add+
          </button>
        </div>
      </header>

      <div className="flex flex-col mt-8 justify-center">
        <div className="flex flex-row items-center justify-between text-xs bg-orange-300 rounded-2xl mb-3">
          <span className="font-bold text-black ">Active Conversations</span>
          <span className="flex items-center justify-center bg-red-400 h-5 w-5 rounded-full text-black">
            4
          </span>
        </div>

        <div className="overflow-y-auto h-screen p-5 mb-9 sm:mb-0 pb-20 bg-white rounded-2xl border-r">
          {rooms &&
            rooms.map((el, i) => {
              return (
                <div
                  key={i}
                  onClick={() => {
                    handleOnClick(el.email);
                  }}
                >
                  <div className="flex items-center mb-4 cursor-pointer hover:bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-yellow-500 via-purple-500 to-blue-500 border-r p-2 rounded-2xl ">
                    <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                      <img
                        src={el.iconURL}
                        alt="User Avatar"
                        className="w-12 h-12 rounded-full"
                      />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-l font-semibold text-black">Rumah {el.name}</h2>
                      <p className="text-gray-600">Home</p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
