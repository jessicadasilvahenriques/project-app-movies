import { Link } from "react-router-dom";
import Stars from "./stars";
import "./card.css";

type CardMovieProps = {
  id: number;
  poster: string;
  title: string;
  rating: number;
  releaseDate: string;
  type: "movie" | "tv";
};

function CardMovie({ id, poster, title, rating, releaseDate, type }: CardMovieProps) {
  return (
    <Link to={`/${type}/${id}`} className="movie-card-link">
      <div className="movie-card">
        <img className="movie-image" src={poster} alt={title} />

        <div className="movie-info">
          <h2>{title}</h2>

          <div className="movie-rating">
            <Stars rating={rating} />
          </div>

          <p className="movie-date">{releaseDate.slice(0, 4)}</p>
        </div>
      </div>
    </Link>
  );
}

export default CardMovie;
