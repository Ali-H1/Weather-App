let isDayTime;
let ismorningTime;
let iseveningTime;
let isnightTime;
let hours;
const app = Vue.createApp({
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      mesh: null,
      api_key: "2a41068c17782df6c77cda0893fbcf65",
      url_base: "https://api.openweathermap.org/data/2.5/",
      url_cordinate: "http://api.openweathermap.org/geo/1.0/",
      query: "",
      city: "",
      icon1: "",
      icon2: "",
      icon3: "",
      icon4: "",
      icon5: "",
      weather: {},
      weekforcast: {},
      cordinate: {},
      weathercheck: typeof this.weather,
      timezone_offset_: "",
      app_background: "",
      weekday : ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
    };
  },
  methods: {
    async fetchweather() {
      fetch(
        `${this.url_base}onecall?lat=${this.lat}&lon=${this.lon}&units=metric&APPID=${this.api_key}`
      )
        .then((res) => {
          return res.json();
        })
        .then(this.setResults);
    },
    async fetchcordinates(e) {
      if (e.key == "Enter") {
        fetch(
          `${this.url_cordinate}direct?q=${this.query}&limit=1&APPID=${this.api_key}`
        )
          .then((res) => {
            return res.json();
          })
          .then(this.setcordResults);
      }
    },
    setResults(results) {
      this.weather = results;
      this.app_background = this.weather.current.temp > 23 ? " hot_weather" : "";
      this.weathercheck = typeof this.weather;
      this.icon1 =
        "http://openweathermap.org/img/wn/" +
        results.daily[0].weather[0].icon +
        "@2x.png";
      this.icon2 =
        "http://openweathermap.org/img/wn/" +
        results.daily[1].weather[0].icon +
        "@2x.png";
      this.icon3 =
        "http://openweathermap.org/img/wn/" +
        results.daily[2].weather[0].icon +
        "@2x.png";
      this.icon4 =
        "http://openweathermap.org/img/wn/" +
        results.daily[3].weather[0].icon +
        "@2x.png";
      this.icon5 =
        "http://openweathermap.org/img/wn/" +
        results.daily[4].weather[0].icon +
        "@2x.png";
      this.weekforcast = results.daily;
      this.timezone_offset_ = results.timezone_offset;
      console.log(this.weather);
    },
    setcordResults(results) {
      this.cordinate = results;
      this.lat = results[0].lat;
      this.lon = results[0].lon;
      console.log(this.cordinate);
      console.log(this.lat);
      console.log(this.lon);
      this.city = this.query;
      this.fetchweather();
    },

    currentDate() {
      const current = new Date();
      const date = `${current.getDate()}/${
        current.getMonth() + 1
      }/${current.getFullYear()}`;
      return date;
    },
    feels_like_time(index) {
      hours = new Date().getHours();
      if (hours >= 5 && hours <= 11) ismorningTime = true;
      if (hours >= 12 && hours <= 17) isDayTime = true;
      if (hours >= 18 && hours <= 20) iseveningTime = true;
      if (hours >= 21 || hours <= 4) isnightTime = true;

      if (isDayTime) return Math.round(this.weekforcast[index].feels_like.day);
      else if (isnightTime)
        return Math.round(this.weekforcast[index].feels_like.night);
      else if (ismorningTime)
        return Math.round(this.weekforcast[index].feels_like.morn);
      else if (iseveningTime)
        return Math.round(this.weekforcast[index].feels_like.eve);
    },
  },
  computed: {
    current_day() {
      const d = new Date();
      return d.getDay();
    },
  },
});
app.mount(".app");
