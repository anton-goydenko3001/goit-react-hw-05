import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";
const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMmEwMjk0YjBjNzgyNmNiMDc2ZGQ5MDQzZWMxZjI2YyIsIm5iZiI6MTcyOTM2NzE4Ni4xNjYzOTYsInN1YiI6IjY3MTQwOWUyOTlmMjJmMzI2YWFkMmU4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KhoH3aKOfsKKNIzizkBLPQfyEsRWy8tUk_Jlt3-4DKo";

const fetch = {
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
};

export const searchMovie = async () => {
  const { data } = await axios.get(`/trending/movie/day`, fetch);
  return data;
};

export const searchMovies = async (movieId) => {
  const { data } = await axios.get(`movie/${movieId}`, fetch);

  return data;
};

export const fetchMovieCast = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}/credits`, fetch);
  return response.data.cast;
};

export const fetchMovieReviews = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}/reviews`, fetch);
  return response.data.results;
};

export const fetchSearchMovie = async (query) => {
  const { data } = await axios.get(
    `/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
    fetch
  );
  return data.results;
};
