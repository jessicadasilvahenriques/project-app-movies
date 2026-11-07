
import "./cardPerson.css";

type CardPersonProps = {
  name: string;
  role: string;
  image?: string;
};

function CardPerson({ name, role, image }: CardPersonProps) {
  return (
    <div className={image ? "person-card" : "person-card crew-card"}>

      {/* Fotografia da pessoa, caso exista */}
      {image && (
        <img src={image} alt={name} />
      )}

      {/* Nome e personagem ou função */}
      <p className="person-name">{name}</p>
      <p className="person-role">{role}</p>
    </div>
  );
}

export default CardPerson;
