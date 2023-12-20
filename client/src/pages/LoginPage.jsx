import React from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../firebaseConfig";
import { signInWithPopup } from "firebase/auth";

const LoginPage = () => {
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const { user } = await signInWithPopup(auth, provider);
      localStorage.access_token = user.accessToken;
      localStorage.name = user.displayName;
      localStorage.email = user.email;
      localStorage.photo = user.photoURL;
      navigate(`/`);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="min-h-screen bg-gradient-to-tl from-orange-400 to-sky-400 text-gray-100 flex justify-center">
      <div className="flex min-h-screen items-center justify-center max-w-screen-xl m-0 sm:m-18">
        <div className=" max-w-screen-xl m-0 sm:m-10 bg-gray-900 border border-gray-900 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-700">
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12 mx-4 sm:mx-24 md:mx-34 lg:mx-56 flex items-center space-y-4 py-12 font-semibold text-gray-500 flex-col text-center">
            <img
              className="w-16 mx-auto"
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google Logo"
            />
            <h1 className="text-white text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-sky-400">
              Hello! Login to access your chat!
            </h1>
            <button
              type="submit"
              className="mt-5 tracking-wide font-semibold bg-sky-800 text-gray-100 w-full py-4 rounded-lg hover:bg-sky-600 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
              onClick={handleLogin}
            >
              <img
                className="h-6 w-6 mr-2"
                src="https://www.svgrepo.com/show/355037/google.svg"
                alt="Google Logo"
              />
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
