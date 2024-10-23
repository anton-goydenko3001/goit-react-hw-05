import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCast } from "../../tmdb-api";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import style from "./MovieCast.module.css";

export default function MovieCast() {
  const [movieCast, setMovieCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    async function fetchCastByMovie() {
      setIsLoading(true);
      setError(false);
      try {
        const data = await fetchMovieCast(movieId);
        setMovieCast(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCastByMovie();
  }, [movieId]);

  const baseUrl = "https://image.tmdb.org/t/p/original/";

  return (
    <div>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      <ul className={style.list}>
        {movieCast.map(({ id, name, profile_path, character }) => {
          return (
            <li className={style.castList} key={id}>
              <img
                src={profile_path ? baseUrl + profile_path : null}
                alt={name}
                width={250}
                className={style.castImage}
                // height={250}
              />
              <p className={style.castText}>{name}</p>
              <p className={style.castText}>Character: {character}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
