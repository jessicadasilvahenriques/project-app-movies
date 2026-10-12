import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import MoviesPage from "./Pages/MoviesPage";
import TvPage from "./Pages/TvPage";
import DetailsMoviesPage from "./Pages/DetailsMoviesPage";
import DetailsTvPage from "./Pages/DetailsTvPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Página inicial */}
        <Route path="/" element={<Navigate to="/movies" />} />

        {/* Página de filmes */}
        <Route path="/movies" element={<MoviesPage />} />

        {/* Página de séries */}
        <Route path="/tv" element={<TvPage />} />

        {/* Detalhes de um filme */}
        <Route path="/movie/:id" element={<DetailsMoviesPage />} />

        {/* Detalhes de uma série */}
        <Route path="/tv/:id" element={<DetailsTvPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
