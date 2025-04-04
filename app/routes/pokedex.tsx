import { useState } from "react";
import Button from "components/Button";
import PokemonCard from "components/PokemonCard";
import { usePokemonList } from "hooks/api/usePokemonList";
import { getPokemonIdFromUrl } from "utils/getPokemonIdFromUrl";
import { getPokemonImageUrl } from "utils/getPokemonImageUrl";

export default function Pokedex() {
  const [page, setPage] = useState(1);
  const { data: pokemonList, isLoading: isListLoading } = usePokemonList({
    page,
    limit: 20,
  });

  const totalPages = pokemonList ? Math.ceil(pokemonList.count / 20) : 0;

  return (
    <div className="mx-auto mt-10 max-md:w-max max-md:px-5 md:max-w-4xl">
      <h1 className="mb-7 text-2xl font-semibold">Pokemon List</h1>
      <div className="flex flex-col items-center gap-7">
        {isListLoading ? (
          <p>Loading Pokemon list...</p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {pokemonList?.results.map((pokemon) => (
              <PokemonCard
                key={getPokemonIdFromUrl(pokemon.url)}
                name={pokemon.name}
                number={`#${getPokemonIdFromUrl(pokemon.url)}`}
                imageSrc={getPokemonImageUrl(pokemon.url)}
              />
            ))}
          </div>
        )}

        <div className="flex items-center gap-3">
          <Button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
          >
            Previous
          </Button>
          <span className="opacity-50">
            Page {page} of {totalPages}
          </span>
          <Button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
