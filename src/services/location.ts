import axios from "axios";

const location = axios.create({
  baseURL: "https://us1.locationiq.com/v1",
  params: {
    key: "pk.c7fe1bef0ffcdb6148be3b69d995d2c2",
    format: "json",
  },
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Accept: "application/json",
  },
});

export const searchCityByCep = (cep: string) =>
  location
    .get(`/search.php?postalcode=${cep}`)
    .then((res) => res.data)
    .catch((err) => err.response);
