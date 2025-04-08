import { Link } from "react-router";

interface PokemonProps {
  id: string | undefined;
  number: string;
  name: string;
  imageSrc: string;
  cardColor: string;
}

export default function PokemonCard({
  id,
  number,
  name,
  imageSrc,
  cardColor,
}: PokemonProps) {
  const hasValidId = id && id !== "undefined";

  if (hasValidId) {
    return (
      <Link
        to={`/pokemon/${id}`}
        style={{ backgroundColor: cardColor }}
        className="flex h-24 w-52 items-center justify-between rounded-2xl bg-white p-2.5"
      >
        <div>
          <p className="text-sm opacity-50">{number}</p>
          <p className="text-xl font-bold">{name}</p>
        </div>
        <div>
          <img src={imageSrc} alt={name} className="size-20" />
        </div>
      </Link>
    );
  }

  return (
    <div
      style={{ backgroundColor: cardColor }}
      className="flex h-24 w-52 items-center justify-between rounded-2xl bg-white p-2.5"
    >
      <div>
        <p className="text-sm opacity-50">{number}</p>
        <p className="text-xl font-bold">{name}</p>
      </div>
      <div>
        <img src={imageSrc} alt={name} className="size-20" />
      </div>
    </div>
  );
}
