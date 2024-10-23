import { Link, useLocation } from "react-router-dom";
import style from "./MovieList.module.css";

function MovieList({ movies }) {
  const location = useLocation();
  return (
    <ul className={style.movieMainList}>
      {movies.map((movie) => (
        <li key={movie.id} className={style.movieList}>
          <Link to={`/movies/${movie.id}`} state={location}>
            <img
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              className={style.movieImage}
              alt="poster"
              width="200"
              //   height="200"
            />
            <p className={style.movieTitle}>{movie.title}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default MovieList;
