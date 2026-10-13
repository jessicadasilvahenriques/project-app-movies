import Stars from "./stars";
import "./card.css";

type CardMovieProps = {
  poster: string;
  title: string;
  rating: number;
  releaseDate: string;
};

function CardMovie({
  poster,
  title,
  rating,
  releaseDate,
}: CardMovieProps) {
  return (
    <div className="movie-card">
      <img
        className="movie-image"
        src={poster}
        alt={title}
      />

      <div className="movie-info">

        <h2>{title}</h2>

       <p className="movie-date">
        {releaseDate.slice(0, 4)}
        </p>

        <div className="movie-rating">
          <Stars rating={rating} />
        </div>

      </div>
    </div>
  );
}

export default CardMovie;
