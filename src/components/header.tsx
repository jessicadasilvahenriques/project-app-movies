import Button from "./button";
import "./header.css";

function Header() {
  return (
    <header>
      <h1><h1>Movies & TV Shows</h1></h1>

      <nav>
        <Button text="Movies" link="/movies" />
        <Button text="TV" link="/tv" />
      </nav>
    </header>
  );
}

export default Header;