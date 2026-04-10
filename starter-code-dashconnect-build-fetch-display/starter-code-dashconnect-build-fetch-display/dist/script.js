//dog api

document.addEventListener("DOMContentLoaded", () => {
  const dogButton = document.getElementById("dog-button");
  const dogPhotoOutput = document.getElementById("dog-output");
  const dogFactButton = document.getElementById("dog-facts-button");
  const dogFactOutput = document.getElementById("dog-fact-output");

  let prefetchedDogUrl = null;

  async function fetchDogImageUrl() {
    const response = await fetch("https://dog.ceo/api/breeds/image/random");
    const data = await response.json();
    console.log(data);
    return data.message;
  }

  async function prefetchNextDogImage() {
    try {
      prefetchedDogUrl = await fetchDogImageUrl();
      const preloadedImage = new Image();
      preloadedImage.decoding = "async";
      preloadedImage.src = prefetchedDogUrl;
    } catch (error) {
      console.error(error);
      prefetchedDogUrl = null;
    }
  }

  async function getDogImage() {
    dogPhotoOutput.innerHTML = "<p>Loading...</p>";

    try {
      const dogImageUrl = prefetchedDogUrl || (await fetchDogImageUrl());
      prefetchedDogUrl = null;

      const dogImage = document.createElement("img");
      dogImage.src = dogImageUrl;
      dogImage.alt = "Random dog";

      dogPhotoOutput.innerHTML = "";
      dogPhotoOutput.appendChild(dogImage);

      prefetchNextDogImage();
    } catch (error) {
      console.error(error);
      dogPhotoOutput.innerHTML = "<p>Unable to load a dog image right now.</p>";
    }
  }

  async function getDogFact() {
    const response = await fetch("https://dogapi.dog/api/v2/facts?limit=1");
    const data = await response.json();
    console.log(data);

    const dogFact = document.createElement("p");
    dogFact.textContent = data.data[0].attributes.body;

    dogFactOutput.innerHTML = "";
    dogFactOutput.appendChild(dogFact);
  }

  dogButton.addEventListener("click", getDogImage);
  dogFactButton.addEventListener("click", getDogFact);

  prefetchNextDogImage();
});

//cat api
document.addEventListener("DOMContentLoaded", () => {
  const catButton = document.getElementById("cat-button");
  const catPhotoOutput = document.getElementById("cat-output");
  let prefetchedCatUrl = null;

  async function fetchCatImageUrl() {
    return `https://cataas.com/cat?width=300&height=300&cb=${Date.now()}`;
  }

  async function prefetchNextCatImage() {
    try {
      prefetchedCatUrl = await fetchCatImageUrl();
      const preloadedImage = new Image();
      preloadedImage.decoding = "async";
      preloadedImage.src = prefetchedCatUrl;
    } catch (error) {
      console.error(error);
      prefetchedCatUrl = null;
    }
  }

  async function getCatImage() {
    catPhotoOutput.innerHTML = "<p>Loading...</p>";

    try {
      const catImageUrl = prefetchedCatUrl || (await fetchCatImageUrl());
      prefetchedCatUrl = null;

      const catImage = document.createElement("img");
      catImage.src = catImageUrl;
      catImage.alt = "Random cat";

      catPhotoOutput.innerHTML = "";
      catPhotoOutput.appendChild(catImage);

      prefetchNextCatImage();
    } catch (error) {
      console.error(error);
      catPhotoOutput.innerHTML = "<p>Unable to load a cat image right now.</p>";
    }
  }

  const catFactButton = document.getElementById("cat-facts-button");
  const catFactOutput = document.getElementById("cat-fact-output");
  async function getCatFact() {
    const response = await fetch("https://catfact.ninja/fact");
    const data = await response.json();
    console.log(data);

    const catFact = document.createElement("p");
    catFact.textContent = data.fact;

    catFactOutput.innerHTML = "";
    catFactOutput.appendChild(catFact);
  }

  catButton.addEventListener("click", getCatImage);
  catFactButton.addEventListener("click", getCatFact);

  prefetchNextCatImage();
});

//weather api
document.addEventListener("DOMContentLoaded", () => {
  const weatherButton = document.getElementById("weather-button");
  const weatherOutput = document.getElementById("weather-output");
  const weatherCityInput = document.getElementById("weather-city-input");

  function renderWeatherMessage(message) {
    const weatherInfo = document.createElement("p");
    weatherInfo.textContent = message;
    weatherOutput.innerHTML = "";
    weatherOutput.appendChild(weatherInfo);
  }

  async function getWeather() {
    const city = weatherCityInput.value.trim();

    if (!city) {
      renderWeatherMessage("Please enter a city name.");
      return;
    }

    renderWeatherMessage("Loading...");

    try {
      const geocodeResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`,
      );
      const geocodeData = await geocodeResponse.json();
      console.log(geocodeData);

      if (!geocodeData.results || geocodeData.results.length === 0) {
        renderWeatherMessage("City not found. Try another name.");
        return;
      }

      const location = geocodeData.results[0];

      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current_weather=true`,
      );
      const weatherData = await weatherResponse.json();
      console.log(weatherData);

      const temperature = weatherData.current_weather.temperature;
      renderWeatherMessage(
        `Current temperature in ${location.name}: ${temperature}°C`,
      );
    } catch (error) {
      console.error(error);
      renderWeatherMessage("Unable to fetch weather right now.");
    }
  }

  weatherButton.addEventListener("click", getWeather);
  weatherCityInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      getWeather();
    }
  });
});

//currency rates api
document.addEventListener("DOMContentLoaded", () => {
  const currencyButton = document.getElementById("currency-button");
  const currencyOutput = document.getElementById("currency-output");

  async function getExchangeRates() {
    const response = await fetch(
      "https://api.exchangerate-api.com/v4/latest/USD",
    );
    const data = await response.json();
    console.log(data);
    const ratesInfo = document.createElement("div");
    ratesInfo.innerHTML = `
            <p>1 USD = ${data.rates.EUR} EUR</p>
            <p>1 USD = ${data.rates.GBP} GBP</p>
            <p>1 USD = ${data.rates.JPY} JPY</p>
        `;
    currencyOutput.innerHTML = "";
    currencyOutput.appendChild(ratesInfo);
  }

  currencyButton.addEventListener("click", getExchangeRates);
});

//trending movies api
document.addEventListener("DOMContentLoaded", () => {
  const moviesButton = document.getElementById("movies-button");
  const moviesOutput = document.getElementById("movies-output");

  async function getMovies() {
    const response = await fetch(
      "https://api.themoviedb.org/3/trending/movie/week?api_key=db9a42a02de2114804c46416a1060b75",
    );
    const data = await response.json();
    console.log(data);
    const moviesList = document.createElement("ul");
    data.results.slice(0, 5).forEach((movie) => {
      const movieItem = document.createElement("li");
      movieItem.textContent = movie.title;
      moviesList.appendChild(movieItem);
    });

    moviesOutput.innerHTML = "";
    moviesOutput.appendChild(moviesList);
  }

  moviesButton.addEventListener("click", getMovies);
});

//GitHub User API
document.addEventListener("DOMContentLoaded", () => {
  const githubButton = document.getElementById("github-button");
  const githubOutput = document.getElementById("github-output");
  const githubUserInput = document.getElementById("github-user-input");

  async function getGitHubUser() {
    const username = githubUserInput.value.trim();

    if (!username) {
      githubOutput.innerHTML = "<p>Please enter a GitHub username.</p>";
      return;
    }

    githubOutput.innerHTML = "<p>Loading...</p>";

    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        githubOutput.innerHTML = "<p>User not found. Try another username.</p>";
        return;
      }

      const userInfo = document.createElement("div");
      userInfo.innerHTML = `
        <p>Username: ${data.login}</p>
        <p>Followers: ${data.followers}</p>
        <p>Following: ${data.following}</p>
      `;
      githubOutput.innerHTML = "";
      githubOutput.appendChild(userInfo);
    } catch (error) {
      console.error(error);
      githubOutput.innerHTML = "<p>Unable to fetch GitHub user right now.</p>";
    }
  }

  githubButton.addEventListener("click", getGitHubUser);
  githubUserInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      getGitHubUser();
    }
  });
});

//random joke API
document.addEventListener("DOMContentLoaded", () => {
  const jokeButton = document.getElementById("joke-button");
  const jokeOutput = document.getElementById("joke-output");

  async function getJoke() {
    const response = await fetch(
      "https://official-joke-api.appspot.com/random_joke",
    );
    const data = await response.json();
    console.log(data);

    const jokeInfo = document.createElement("div");
    jokeInfo.innerHTML = `
      <p>${data.setup}</p>
      <p>${data.punchline}</p>
    `;
    jokeOutput.innerHTML = "";
    jokeOutput.appendChild(jokeInfo);
  }

  jokeButton.addEventListener("click", getJoke);
});

//pokemon API
document.addEventListener("DOMContentLoaded", () => {
  const pokemonButton = document.getElementById("pokemon-button");
  const pokemonOutput = document.getElementById("pokemon-output");
  async function getPokemon() {
    const randomId = Math.floor(Math.random() * 1025) + 1;
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${randomId}`,
    );
    const data = await response.json();
    console.log(data);

    const pokemonList = document.createElement("ul");
    const pokemonItem = document.createElement("li");
    pokemonItem.textContent = data.name;
    pokemonList.appendChild(pokemonItem);

    pokemonOutput.innerHTML = "";
    pokemonOutput.appendChild(pokemonList);
  }

  pokemonButton.addEventListener("click", getPokemon);
});
