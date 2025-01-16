import React, { useEffect, useState, useCallback } from "react";
import { citiesFilter } from "./utils/citiesFilter";
import searchIcon from "./img/Search-Icon.png";
import { ReactComponent as localization_icon } from "./img/localization_icon.svg";
const weatherApiKey = "1ce21f8398014abf9da21949251501";

const App = () => {
  const [countriesSearch, setCountriesSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("Ulaanbaatar, Mongolia");
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
        localtime: result.location.localtime, // local time for determining day or night
        country: result.location.country,
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
    fetchData();
  }, []);

  const handleChange = (e) => {
    setCountriesSearch(e.target.value);
  };

  return (
    <div className="flex h-screen">
      {/* Left Section */}
      <section
        className={`flex-1 flex flex-col items-center justify-center bg-gray-100`}
      >
        <div>
          <div className="relative flex items-center w-[567px] h-[80px] bg-white shadow-md rounded-full">
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
                filteredData.map((city, index) => (
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
                    <p className="text-gray-800">{city}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        <div className="w-[414px] h-[824px]">
          {!weatherLoading && !error && (
            <div>
              <p>{weather.date}</p>
              <p className="text-4xl font-bold mb-4">{selectedCity}</p>
              <div>{weather.max_c}°C</div>
              <div>Condition: {weather.condition}</div>
            </div>
          )}
        </div>
      </section>

      {/* Right Section */}
      <section
        className={`flex-1 flex flex-col items-center justify-center bg-gray-900 text-white`}
      >
        <div className="w-[414px] h-[824px]">
          {!weatherLoading && !error && (
            <div>
              <p>{weather.date}</p>
              <p className="text-4xl font-bold mb-4">{selectedCity}</p>
              <div>{weather.max_c}°C</div>
              <div>{weather.condition}</div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default App;
