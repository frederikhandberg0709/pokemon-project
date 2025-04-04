interface PokemonProps {
  number: string;
  name: string;
  imageSrc: string;
}

export default function PokemonCard({ number, name, imageSrc }: PokemonProps) {
  return (
    <div className="flex h-24 w-52 items-center justify-between rounded-2xl bg-white p-2.5">
      <div>
        <p className="text-sm opacity-50">{number}</p>
        <p className="text-xl font-bold">{name}</p>
      </div>
      <div>
        <img src={imageSrc} className="size-20" />
      </div>
    </div>
  );
}
