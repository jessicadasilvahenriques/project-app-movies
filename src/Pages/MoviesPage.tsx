import { useEffect, useState } from "react";
import CardMovie from "../components/card";
import "./MoviesPage.css";

type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  release_date: string;
};


// Várias secções
function MoviesPage() {
  const [popular, setPopular] = useState<Movie[]>([]);
  const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
  const [topRated, setTopRated] = useState<Movie[]>([]);
  const [upcoming, setUpcoming] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const categories = [
          "popular",
          "now_playing",
          "top_rated",
          "upcoming"
        ];

        for (const category of categories) {
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/${category}`,
            {
              headers: {
                Authorization: `Bearer 1d4565ccd007b60cf5465cc2628b379b`,
              },
            }
          );

          if (!response.ok) {
            throw new Error("Erro ao obter os filmes");
          }

          const fetchedMovies = await response.json();

          if (category === "popular") {
            setPopular(fetchedMovies.results);
          }

          if (category === "now_playing") {
            setNowPlaying(fetchedMovies.results);
          }

          if (category === "top_rated") {
            setTopRated(fetchedMovies.results);
          }

          if (category === "upcoming") {
            setUpcoming(fetchedMovies.results);
          }
        }
      } catch (error) {
        console.error("Erro ao obter os filmes:", error);
      }
    };

    fetchMovies();
  }, []);

  // Função para apresentar os cartões
  const renderMovies = (movies: Movie[]) => {
    return movies.map((movie) => (
      <CardMovie
        key={movie.id}
        poster={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : ""
        }
        title={movie.title}
        rating={movie.vote_average}
        releaseDate={movie.release_date}
      />
    ));
  };

  return (
    <div className="movies-page">
      <h1>Movies</h1>

      <h2>Popular</h2>
      <div className="movies-list">
        {renderMovies(popular)}
      </div>

      <h2>Now Playing</h2>
      <div className="movies-list">
        {renderMovies(nowPlaying)}
      </div>

      <h2>Top Rated</h2>
      <div className="movies-list">
        {renderMovies(topRated)}
      </div>

      <h2>Upcoming</h2>
      <div className="movies-list">
        {renderMovies(upcoming)}
      </div>
    </div>
  );
}

export default MoviesPage;
