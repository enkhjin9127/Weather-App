import React from "react";
import searchIcon from "./img/Search-Icon.png";

const App = () => {
  return (
    <div className="flex h-screen">
      {/* Left Section */}
      <section className="flex-1 bg-gray-100 flex flex-col items-center justify-center relative">
        {/* Search Bar */}
        <div>
          <img src={searchIcon} alt="Search-Logo" />
          <input
            type="text"
            placeholder="Search"
            className="w-full py-4 pl-20 pr-6 outline-none text-[32px] font-bold rounded-full"
          />
        </div>
        {/* Placeholder Weather Details */}
        <div className="mt-6 text-center">
          <h1 className="text-4xl font-bold">Los Angeles</h1>
          <p className="text-lg mt-2 text-gray-500">January 13, 2025</p>
          <p className="text-6xl font-bold mt-4">21.4°</p>
          <p className="text-lg text-blue-500">Sunny</p>
        </div>
      </section>

      {/* Right Section */}
      <section className="flex-1 bg-gray-900 text-white flex flex-col items-center justify-center">
        {/* Placeholder Weather Details */}
        <div className="mt-6 text-center">
          <h1 className="text-4xl font-bold">Los Angeles</h1>
          <p className="text-lg mt-2 text-gray-400">January 13, 2025</p>
          <p className="text-6xl font-bold mt-4">10.1°</p>
          <p className="text-lg text-yellow-500">Clear Night</p>
        </div>
      </section>
    </div>
  );
};

export default App;
