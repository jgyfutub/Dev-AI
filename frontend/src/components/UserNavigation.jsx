import React from 'react'
import { Link } from "react-router-dom";
export default function UserNavigation(){
    return (
        <>
        <nav className="bg-black dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <Link to="/" className="flex items-center">
              <span className="self-center text-2xl font-semibold whitespace-nowrap text-white mr-4">
                Vedant Pandey
              </span>
              <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
                Student
              </span>
            </Link>
            <div className="flex space-x-2 md:order-2 m-2">
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <Link to="/login">Log Out</Link>
              </button>
            </div>
          </div>
        </nav>
      </>
    )
}