import { useEffect, useState } from "react";
import CardMovie from "../components/card";
import "./principalsPages.css";

type TV = {
  id: number;
  name: string;
  poster_path: string | null;
  vote_average: number;
  first_air_date: string;
};

// Várias secções
function TvPage() {
  const [popular, setPopular] = useState<TV[]>([]);
  const [airingToday, setAiringToday] = useState<TV[]>([]);
  const [topRated, setTopRated] = useState<TV[]>([]);
  const [onTheAir, setOnTheAir] = useState<TV[]>([]);

  useEffect(() => {
    const fetchTV = async () => {
      try {
        const categories = [
          "popular",
          "airing_today",
          "top_rated",
          "on_the_air"
        ];

        for (const category of categories) {
          const response = await fetch(
            `https://api.themoviedb.org/3/tv/${category}`,
            {
              headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZDQ1NjVjY2QwMDdiNjBjZjU0NjVjYzI2MjhiMzc5YiIsIm5iZiI6MTc5MTgzMDgyNy42MTY5OTk5LCJzdWIiOiI2YWNkMmIyYmY0ZDNiMzMwNjVkNWFlYjMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.zT4-mvF0lIzwmY0gaA3VYqosVqm47LtFeiy3SHRnyrw`,
              },
            }
          );

          if (!response.ok) {
            throw new Error("Erro ao obter as séries");
          }

          const fetchedTV = await response.json();

          if (category === "popular") {
            setPopular(fetchedTV.results);
          }

          if (category === "airing_today") {
            setAiringToday(fetchedTV.results);
          }

          if (category === "top_rated") {
            setTopRated(fetchedTV.results);
          }

          if (category === "on_the_air") {
            setOnTheAir(fetchedTV.results);
          }
        }
      } catch (error) {
        console.error("Erro ao obter as séries:", error);
      }
    };

    fetchTV();
  }, []);

  // Função para apresentar os cartões
  const renderTV = (series: TV[]) => {
    return series.map((tv) => (
      <CardMovie
        key={tv.id}
        poster={
          tv.poster_path
            ? `https://image.tmdb.org/t/p/w500${tv.poster_path}`
            : ""
        }
        title={tv.name}
        rating={tv.vote_average}
        releaseDate={tv.first_air_date}
      />
    ));
  };

  return (
    <div className="movies-page">
      <h1>TV</h1>

      <h2>Popular</h2>
      <div className="movies-list">
        {renderTV(popular)}
      </div>

      <h2>Airing Today</h2>
      <div className="movies-list">
        {renderTV(airingToday)}
      </div>

      <h2>Top Rated</h2>
      <div className="movies-list">
        {renderTV(topRated)}
      </div>

      <h2>On The Air</h2>
      <div className="movies-list">
        {renderTV(onTheAir)}
      </div>
    </div>
  );
}

export default TvPage;
