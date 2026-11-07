import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./detailsMoviesPage.css";
import CardPerson from "../components/cardPerson";


type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  runtime: number;
  genres: { id: number; name: string }[];
};

type Actor = {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
};

type Crew = {
  id: number;
  name: string;
  job: string;
  department: string;
};

function DetailsMoviesPage() {
  const { id } = useParams();

  const [movie, setMovie] = useState<Movie | null>(null);
  const [cast, setCast] = useState<Actor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [crew, setCrew] = useState<Crew[]>([]);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        setError("");

        // Obter os detalhes do filme
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}`,
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZDQ1NjVjY2QwMDdiNjBjZjU0NjVjYzI2MjhiMzc5YiIsIm5iZiI6MTc5MTgzMDgyNy42MTY5OTk5LCJzdWIiOiI2YWNkMmIyYmY0ZDNiMzMwNjVkNWFlYjMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.zT4-mvF0lIzwmY0gaA3VYqosVqm47LtFeiy3SHRnyrw`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Erro ao obter o filme: ${response.status}`);
        }

        const fetchedMovie = await response.json();
        setMovie(fetchedMovie);

        // Obter o elenco do filme
        const responseCredits = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits`,
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZDQ1NjVjY2QwMDdiNjBjZjU0NjVjYzI2MjhiMzc5YiIsIm5iZiI6MTc5MTgzMDgyNy42MTY5OTk5LCJzdWIiOiI2YWNkMmIyYmY0ZDNiMzMwNjVkNWFlYjMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.zT4-mvF0lIzwmY0gaA3VYqosVqm47LtFeiy3SHRnyrw`,
            },
          }
        );

        if (!responseCredits.ok) {
          throw new Error(`Erro ao obter o elenco: ${responseCredits.status}`);
        }

        const fetchedCredits = await responseCredits.json();
        setCast(fetchedCredits.cast);
        setCrew(fetchedCredits.crew);

          } catch (error) {
            console.error("Erro ao obter o filme:", error);
            setError("Não foi possível carregar o filme.");
          } finally {
            setLoading(false);
          }
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return <p>A carregar filme...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!movie) {
    return <p>Filme não encontrado.</p>;
  }

  return (
    <div className="details-page">

      <div className="details-content">

        {movie.poster_path && (
          <img
            className="details-poster"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
        )}

        <div className="details-info">
          <h1>{movie.title}</h1>

          <p>Ano: {movie.release_date?.slice(0, 4)}</p>

          
          <div className="details-rating">
            <span className="rating-star">★</span>
            <span>{movie.vote_average.toFixed(1)}</span>
          </div>

          <p>Duração: {movie.runtime} minutos</p>

          <h2>Géneros</h2>
          <p>
            {movie.genres.map((genre) => genre.name).join(", ")}
          </p>

          <h2>Sinopse</h2>
          <p>{movie.overview}</p>

          <h2>Elenco</h2>

          <div className="cast-list">
            {cast.slice(0, 10).map((actor) => (
              <CardPerson
                key={actor.id}
                name={actor.name}
                role={actor.character}
                image={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                    : undefined
                }
              />
            ))}
          </div>

          <h2>Equipa Técnica</h2>

          <div className="crew-list">
            {crew.slice(0, 10).map((person) => (
              <CardPerson
                key={`${person.id}-${person.job}`}
                name={person.name}
                role={person.job}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailsMoviesPage;