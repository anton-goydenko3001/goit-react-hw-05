import { useEffect, useState } from "react";
import { fetchSearchMovie } from "../../tmdb-api";
import { useSearchParams } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import MovieList from "../../components/MovieList/MovieList";

export default function MoviePage() {
  const [movies, setMovies] = useState([]);
  const [params] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const query = params.get("query") ?? "";
  //   const location = useLocation();

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setError(false);
      try {
        const data = await fetchSearchMovie(query);
        setMovies(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [query]);

  return (
    <div>
      <SearchBar query={params} />
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}
