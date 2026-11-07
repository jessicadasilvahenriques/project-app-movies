import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./detailsMoviesPage.css";
import CardPerson from "../components/cardPerson";

type TV = {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  first_air_date: string;
  vote_average: number;
  number_of_seasons: number;
  number_of_episodes: number;
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

function DetailsTvPage() {
  const { id } = useParams();

  const [tv, setTv] = useState<TV | null>(null);
  const [cast, setCast] = useState<Actor[]>([]);
  const [crew, setCrew] = useState<Crew[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTV = async () => {
      try {
        setLoading(true);
        setError("");

        // Obter os detalhes da série
        const response = await fetch(
          `https://api.themoviedb.org/3/tv/${id}`,
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZDQ1NjVjY2QwMDdiNjBjZjU0NjVjYzI2MjhiMzc5YiIsIm5iZiI6MTc5MTgzMDgyNy42MTY5OTk5LCJzdWIiOiI2YWNkMmIyYmY0ZDNiMzMwNjVkNWFlYjMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.zT4-mvF0lIzwmY0gaA3VYqosVqm47LtFeiy3SHRnyrw`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Erro ao obter os detalhes da série");
        }

        const fetchedTV = await response.json();
        setTv(fetchedTV);

        // Obter o elenco e a equipa técnica
        const responseCredits = await fetch(
          `https://api.themoviedb.org/3/tv/${id}/credits`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZDQ1NjVjY2QwMDdiNjBjZjU0NjVjYzI2MjhiMzc5YiIsIm5iZiI6MTc5MTgzMDgyNy42MTY5OTk5LCJzdWIiOiI2YWNkMmIyYmY0ZDNiMzMwNjVkNWFlYjMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.zT4-mvF0lIzwmY0gaA3VYqosVqm47LtFeiy3SHRnyrw`,
            },
          }
        );

        if (!responseCredits.ok) {
          throw new Error("Erro ao obter o elenco");
        }

        const fetchedCredits = await responseCredits.json();

        setCast(fetchedCredits.cast);
        setCrew(fetchedCredits.crew);

      } catch (error) {
        console.error("Erro ao obter a série:", error);
        setError("Não foi possível carregar a série.");
      } finally {
        setLoading(false);
      }
    };

    fetchTV();
  }, [id]);

  if (loading) {
    return <p>A carregar série...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!tv) {
    return <p>Série não encontrada.</p>;
  }

  return (
    <div className="details-page">

      <div className="details-content">

        {tv.poster_path && (
          <img
            className="details-poster"
            src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`}
            alt={tv.name}
          />
        )}

        <div className="details-info">
          <h1>{tv.name}</h1>

          <p>Ano: {tv.first_air_date?.slice(0, 4)}</p>

          <div className="details-rating">
            <span className="rating-star">★</span>
            <span>{tv.vote_average.toFixed(1)}</span>
          </div>

          <p>Temporadas: {tv.number_of_seasons}</p>
          <p>Episódios: {tv.number_of_episodes}</p>

          <h2>Géneros</h2>
          <p>
            {tv.genres.map((genre) => genre.name).join(", ")}
          </p>

          <h2>Sinopse</h2>
          <p>{tv.overview}</p>

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

export default DetailsTvPage;
