class ApiService {
  static apiKey = process.env.REACT_APP_API_KEY;
  static baseUrl = "https://api.themoviedb.org/3";

  static async fetchFromApi(endpoint, params = {}) {
    const url = new URL(`${this.baseUrl}/${endpoint}`);
    url.search = new URLSearchParams({
      api_key: this.apiKey,
      language: "en-US",
      ...params,
    });

    const response = await fetch(url, {
      method: "GET",
      headers: { accept: "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status}`);
    }

    return response.json();
  }

  static searchMovie(query = "return", page = 1) {
    return this.fetchFromApi("search/movie", { query, page });
  }

  static getPopularMovies(page = 1) {
    return this.fetchFromApi("movie/popular", { page });
  }
}

export default ApiService;
