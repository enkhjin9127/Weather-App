import React, { useEffect, useState, useCallback } from "react";
import searchIcon from "./img/Search-Icon.png";
import { citiesFilter } from "./utils/citiesFilter";

const App = () => {
  const [countriesSearch, setCountriesSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://countriesnow.space/api/v0.1/countries"
      );
      const result = await response.json();
      const countriesAndCity = citiesFilter(result);
      setCities(countriesAndCity);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterData = useCallback(() => {
    if (countriesSearch === "") {
      setFilteredData([]);
    } else {
      setFilteredData(
        cities
          .filter((city) =>
            city.toLowerCase().startsWith(countriesSearch.toLowerCase())
          )
          .slice(0, 5)
      );
    }
  }, [countriesSearch, cities]);

  useEffect(() => {
    filterData();
  }, [countriesSearch, filterData]);

  useEffect(() => {
    console.log("useEffect fetch data worked");
    fetchData();
  }, []);

  const handleChange = (e) => {
    setCountriesSearch(e.target.value);
  };

  return (
    <div className="flex h-screen">
      {/* Left Section */}
      <section className="flex-1 bg-gray-100 flex flex-col items-center justify-between relative">
        {/* Search Bar */}
        <div className="relative flex items-center max-w-[567px] mt-10 bg-white shadow-md rounded-full">
          <img
            className="absolute left-4 h-6 w-6 text-gray-500"
            src={searchIcon}
            alt="Search-Logo"
          />
          <input
            type="text"
            placeholder="Search"
            className="w-full py-3 pl-14 pr-6 outline-none text-lg font-medium text-gray-700 rounded-full focus:ring-2 focus:ring-orange-400"
            value={countriesSearch}
            onChange={handleChange}
          />
        </div>

        {/* Display Filtered Data */}
        <div className="absolute top-full left-0 w-full max-w-[567px] bg-white rounded-lg shadow-lg mt-2 overflow-hidden z-10">
          {loading ? (
            <p className="text-center py-4 text-gray-500">Loading...</p>
          ) : (
            filteredData.map((city, index) => (
              <div
                key={index}
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer"
              >
                <p className="text-gray-800">{city}</p>
              </div>
            ))
          )}
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
