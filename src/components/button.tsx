import { Link } from "react-router-dom";

type ButtonProps = {
  text: string;
  link: string;
};

function Button({ text, link }: ButtonProps) {
  return (
    <Link to={link}>
      <button>{text}</button>
    </Link>
  );
}

export default Button;