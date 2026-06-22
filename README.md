# API Dashboard

A client-side dashboard that fetches and displays live data from 8 public APIs on a single page. Built with vanilla JavaScript, HTML5, and CSS3 — no frameworks, no build step.

## Features

| Widget | API Used |
|---|---|
| Random Dog | Dog CEO API + Dog Facts |
| Random Cat | CataaS + Cat Fact Ninja |
| Weather | Open-Meteo (geocoding + weather) |
| Currency Rates | ExchangeRate-API |
| Trending Movies | The Movie Database (TMDb) |
| GitHub User | GitHub REST API |
| Random Joke | Official Joke API |
| Pokemon | PokeAPI |

**Notable details:**
- Image prefetching on dog and cat widgets for instant next-image loads
- Input validation and keyboard (`Enter`) support on Weather and GitHub widgets
- Responsive CSS Grid layout — auto-fits columns down to 300 px wide
- Comprehensive error handling with user-friendly messages
- Zero dependencies, zero build tooling

## Getting Started

### Prerequisites

- [VS Code](https://code.visualstudio.com/) with the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension  
  *(or any static file server)*

### Run locally

```bash
git clone https://github.com/prellwitzdarian/api-dashboard.git
cd api-dashboard
Then right-click dist/index.html in VS Code and choose Open with Live Server.

Opening index.html directly via file:// will cause CORS errors on some API calls. Always serve through a local server.

Project Structure
dist/
├── index.html   # Layout and markup
├── script.js    # All API logic (async/await, modular event listeners)
└── style.css    # Responsive grid and widget styles
APIs Referenced
Service	Docs
Dog CEO	https://dog.ceo/dog-api
CataaS	https://cataas.com
Cat Fact Ninja	https://catfact.ninja
Open-Meteo	https://open-meteo.com
ExchangeRate-API	https://www.exchangerate-api.com
TMDb	https://developer.themoviedb.org
GitHub REST API	https://docs.github.com/en/rest
Official Joke API	https://official-joke-api.appspot.com
PokeAPI	https://pokeapi.co
