// App.js
import React, { useEffect, useState, useCallback } from "react";
import searchIcon from "./img/Search-Icon.png";
import moonIcon from "./img/moon.png";
import sunIcon from "./img/sun.png";
import localIcon from "./img/localization_icon.png";

const weatherApiKey = "1ce21f8398014abf9da21949251501";

const App = () => {
  const [countriesSearch, setCountriesSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("Ulaanbaatar");
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weather, setWeather] = useState({});
  const [error, setError] = useState(null);

  const getWeather = async () => {
    setWeatherLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${selectedCity}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch weather data");
      const result = await response.json();

      const weatherData = {
        max_c: result.forecast.forecastday[0].day.maxtemp_c,
        min_c: result.forecast.forecastday[0].day.mintemp_c,
        condition: result.forecast.forecastday[0].day.condition.text,
        date: result.forecast.forecastday[0].date,
        localtime: result.location.localtime,
      };

      setWeather(weatherData);
    } catch (error) {
      setError(error.message);
    } finally {
      setWeatherLoading(false);
    }
  };

  useEffect(() => {
    getWeather();
  }, [selectedCity]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://countriesnow.space/api/v0.1/countries"
      );
      const result = await response.json();
      const citiesList = result.data.reduce((acc, country) => {
        return acc.concat(
          country.cities.map((city) => ({
            city,
            country: country.country,
          }))
        );
      }, []);
      setCities(citiesList);
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
          .filter(
            ({ city, country }) =>
              city.toLowerCase().startsWith(countriesSearch.toLowerCase()) ||
              country.toLowerCase().startsWith(countriesSearch.toLowerCase())
          )
          .slice(0, 5)
      );
    }
  }, [countriesSearch, cities]);

  useEffect(() => {
    filterData();
  }, [countriesSearch, filterData]);

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setCountriesSearch(e.target.value);
  };

  return (
    <div className="flex h-screen">
      <section className="flex-1 flex flex-col items-center bg-gray-100">
        <div className="mt-[40px]">
          <div className="relative flex items-center w-[567px] h-[80px] bg-white shadow-md rounded-full right-[70px]">
            <img
              className="absolute left-6 h-[35px] w-[35px] text-gray-500"
              src={searchIcon}
              alt="Search-Logo"
            />
            <input
              type="text"
              placeholder="Search"
              className="w-full py-3 pl-20 pr-6 outline-none text-[32px] font-medium text-gray-700 rounded-full focus:ring-2 focus:ring-orange-400"
              value={countriesSearch}
              onChange={handleChange}
            />

            <div className="absolute top-full left-0 w-full bg-white rounded-lg shadow-lg mt-2 overflow-hidden z-10">
              {loading ? (
                <p className="text-center py-4 text-gray-500">Loading...</p>
              ) : (
                filteredData.map(({ city, country }, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer ${
                      selectedCity === city ? "bg-orange-100 font-semibold" : ""
                    }`}
                    onClick={() => {
                      setSelectedCity(city);
                      setCountriesSearch("");
                      setFilteredData([]);
                    }}
                  >
                    <p className="text-gray-800">
                      {city}, <span className="text-gray-500">{country}</span>
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        {/* Day */}
        <div className="w-[414px] h-[824px] p-4 rounded-[48px] bg-white bg-opacity-75">
          {!weatherLoading && !error && (
            <div className="w-full h-full ">
              <div className="py-10 px-8 flex flex-col">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className=" text-gray-400 ">{weather.date}</h4>
                    <h2 className="h-12 text-5xl font-bold text-textDark mt-2">
                      {selectedCity}
                    </h2>
                  </div>
                  <img
                    className="w-[40px] h-[40px]"
                    src={localIcon}
                    alt="localization-icon"
                  />
                </div>
                <div className="mt-12 flex justify-center items-center">
                  <img
                    className="w-[262.11px] h-[262.11px]"
                    src={sunIcon}
                    alt="sun"
                  />
                </div>
              </div>
              <div className="w-[414px] h-[269px] pl-9">
                <div className="text-transparent bg-clip-text font-extrabold text-[110px] -mt-10 bg-gradient-to-b from-black to-white">
                  {weather.max_c}°C
                </div>
                <div
                  className="font-bold mb-12 h-6 font-manrope"
                  style={{ color: "rgb(119, 124, 206)" }}
                >
                  {weather.condition}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Night */}
      <section
        className={`flex-1 flex flex-col items-center justify-center bg-customDark text-white`}
      >
        <div className="w-[414px] h-[824px] bg-customDarkAlpha rounded-[48px]">
          {!weatherLoading && !error && (
            <div>
              <div>
                <div>
                  <p>{weather.date}</p>
                  <p className="text-4xl font-bold mb-4">{selectedCity}</p>
                </div>
                <img src={localIcon} alt="localization-icon" />
              </div>
              <img
                className="w-[262.11px] h-[262.11px]"
                src={moonIcon}
                alt="moon"
              />
              <div>{weather.min_c}°C</div>
              <div>{weather.condition}</div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default App;
