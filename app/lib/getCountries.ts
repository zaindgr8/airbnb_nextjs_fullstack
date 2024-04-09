import countries from "world-countries";

const countriesFomrated = countries.map((item:any) => ({
  value: item.cca2,
  label: item.name.common,
  flag: item.flag,
  latLang: item.latlng,
  region: item.region,
}));

export const useCountries = () => {
  const getAllCountries = () => countriesFomrated;
  const getCountryByValue = (value: string) => {
    return countriesFomrated.find((item:any) => item.value === value);
  };
  return {
    getAllCountries,
    getCountryByValue,
  };
};
