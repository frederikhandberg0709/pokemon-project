import { useState } from "react";
import Button from "components/Button";
import PokemonCard from "components/PokemonCard";
import { usePokemonList } from "hooks/api/usePokemonList";
import { getPokemonIdFromUrl } from "utils/getPokemonIdFromUrl";
import { getPokemonImageUrl } from "utils/getPokemonImageUrl";
import { getColorByPokemonId } from "utils/getColorByPokemonId";
import Footer from "components/Footer";

export default function Pokedex() {
  const [page, setPage] = useState(1);
  const { data: pokemonList, isPending: isListLoading } = usePokemonList({
    page,
    limit: 20,
  });

  const totalPages = pokemonList ? Math.ceil(pokemonList.count / 20) : 0;

  return (
    <div className="flex min-h-screen flex-col justify-between">
      <div className="mx-auto mt-10 space-y-7 max-md:w-max max-md:px-5 md:max-w-4xl">
        <header>
          <h1 className="text-3xl font-semibold">Pokémon List</h1>
        </header>

        <main className="container mx-auto">
          <div className="flex flex-col items-center gap-7">
            {isListLoading ? (
              <p>Loading Pokémon list...</p>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {pokemonList?.results.map((pokemon) => {
                  return (
                    <PokemonCard
                      key={pokemon.id}
                      id={pokemon.id}
                      name={pokemon.name}
                      number={`#${getPokemonIdFromUrl(pokemon.url)}`}
                      imageSrc={getPokemonImageUrl(pokemon.url)}
                      cardColor={getColorByPokemonId(Number(pokemon.id))}
                    />
                  );
                })}
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
        </main>
      </div>
      <Footer />
    </div>
  );
}
