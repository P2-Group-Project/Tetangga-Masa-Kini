import { createSlice } from "@reduxjs/toolkit";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    value: 0,
    room: localStorage.email,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    changeRoom: (state, action) => {
      state.room = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount, changeRoom } =
  appSlice.actions;

export function findOrCreateRoom() {
  return async function findOrCreateRoomThunk(dispatch) {
    try {
      const roomsRef = collection(db, "rooms");
      const docRef = doc(db, "rooms", localStorage.email);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(doc(roomsRef, localStorage.email), {
          name: localStorage.name,
          email: localStorage.email,
          iconURL: localStorage.photo,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export default appSlice.reducer;
