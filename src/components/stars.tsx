type StarsProps = {
  rating: number;
};

function Stars({ rating }: StarsProps) {
  const stars = Math.round(rating / 2);

  return (
    <div className="stars">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star}>
          {star <= stars ? "★" : "☆"}
        </span>
      ))}
    </div>
  );
}

export default Stars;
