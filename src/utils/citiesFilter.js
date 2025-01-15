export const citiesFilter = (countries) => {
  const citiesAndCountry = countries.data.flatMap((country) =>
    country.cities.map((city) => `${city}, ${country.country}`)
  );
  console.log(countries);

  return citiesAndCountry;
};
