import React from 'react'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const navigate = useNavigate()
  return (
    <div className="bg-gradient-to-r from-amber-500 to-pink-500">
    <div className="flex min-h-screen items-center justify-center">
      <div className="min-h-1/2 bg-gray-900 border border-gray-900 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-700">
        <div className="mx-4 sm:mx-24 md:mx-34 lg:mx-56 flex items-center space-y-4 py-12 font-semibold text-gray-500 flex-col text-center">
          <img
            className="h-12 w-12"
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="Google Logo"
          />
          <h1 className="text-white text-2xl">Hello! Login to access your chat!</h1>
          <button type="submit" className="flex items-center bg-white dark:bg-gray-900 border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 dark:text-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mx-auto mt-2" onClick={() => {
            navigate('/')
          }}>
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
  )
}

export default LoginPage