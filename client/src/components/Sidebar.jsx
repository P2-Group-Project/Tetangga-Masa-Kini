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

const Sidebar = () => {
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
    // setCurrentRoom(email);
    console.log(`pindah room`);
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
        {rooms &&
          rooms.map((el, i) => {
            return (
              <div
                key={i}
                onClick={() => {
                  handleOnClick(el.email);
                }}
              >
                <div className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
                  <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                    <img
                      src={el.iconURL}
                      alt="User Avatar"
                      className="w-12 h-12 rounded-full"
                    />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold">Rumah {el.name}</h2>
                    <p className="text-gray-600">testing</p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Sidebar;
