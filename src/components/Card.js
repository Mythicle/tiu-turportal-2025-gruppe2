import ButtonLink from "./ButtonLink";

export default function Card({ title, text, link }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <p>{text}</p>
      <ButtonLink to={link}>Gå til {title}</ButtonLink>
    </div>
  );
}