import axios from "axios";

export default axios.create({
  baseURL: "https://api.openweathermap.org/",
  params: {
    appid: "2f907c0f862ff9d2cbb4df68833cdd45",
    lang: "pt_br",
    units: "metric"
  },
});
