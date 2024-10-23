import { useEffect, useState, useRef } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import { searchMovies } from "../../tmdb-api";
import style from "./MovieDetailsPage.module.css";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

export default function MovieDetailsPage() {
  const [movies, setMovies] = useState([]);
  const { movieId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const location = useLocation();
  const buttonGoBack = useRef(location.state ?? "/movies");

  useEffect(() => {
    async function getMovieDetails() {
      setIsLoading(true);
      setError(false);
      try {
        const data = await searchMovies(movieId);
        data.poster = `https://image.tmdb.org/t/p/original/${data.poster_path}`;
        setMovies(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getMovieDetails();
  }, [movieId]);

  return (
    <div>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      <div className={style.container}>
        <div className={style.img}>
          <Link className={style.buttonBack} to={buttonGoBack.current}>
            Back
          </Link>
          {movies && <img src={movies.poster} alt={movies.title} width={250} />}
        </div>
        <div className={style.info}>
          <h2>{movies.title}</h2>
          <p>User Score: {movies.popularity}</p>
          <h2>Overview</h2>
          <p>{movies.overview}</p>
          <ul>
            <h2>Genres</h2>
            {movies.genres?.map((genre) => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className={style.moreInfo}>
        <h2>Additional information</h2>
        <div className={style.button}>
          <NavLink className={style.cast} to="Cast">
            Cast
          </NavLink>
          <NavLink className={style.reviews} to="Reviews">
            Reviews
          </NavLink>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
