import Button from "components/Button";
import Footer from "components/Footer";
import { usePokemonDetails } from "hooks/api/usePokemonDetails";
import { useNavigate, useParams } from "react-router";
import { typeColors } from "utils/getColorByPokemonId";

const formatStatName = (statName: string): string => {
  const statNameMap: Record<string, string> = {
    hp: "HP",
    attack: "Attack",
    defense: "Defense",
    "special-attack": "Sp. Atk",
    "special-defense": "Sp. Def",
    speed: "Speed",
  };

  return statNameMap[statName] || statName;
};

export default function PokemonDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const pokemonUrl = id ? `https://pokeapi.co/api/v2/pokemon/${id}/` : null;

  const {
    data: pokemonData,
    isPending,
    isError,
  } = usePokemonDetails(pokemonUrl);

  const handleBackToList = () => {
    navigate("/");
  };

  if (isPending) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center text-lg font-medium">
          Loading Pokémon details...
        </div>
      </div>
    );
  }

  if (isError || !pokemonData) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <h2 className="mb-4 text-center text-2xl font-bold">
          Pokémon not found
        </h2>
        <Button
          onClick={handleBackToList}
          className="bg-red-500 hover:bg-red-700"
        >
          Back to List
        </Button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col justify-between">
      <div className="container mx-auto mt-10 space-y-7 px-10">
        <header>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-semibold">Pokémon Details</h1>
            <Button onClick={handleBackToList} className="rounded-full">
              Back to List
            </Button>
          </div>
        </header>

        <main>
          <div className="space-y-8">
            <div className="flex flex-col items-center md:flex-row">
              <div className="flex justify-center md:w-1/3">
                {pokemonData?.officialArtwork || pokemonData?.sprite ? (
                  <img
                    src={pokemonData?.officialArtwork || pokemonData?.sprite}
                    alt={pokemonData?.name}
                    className="h-48 w-48 object-contain"
                  />
                ) : (
                  <p>Failed to fetch image.</p>
                )}
              </div>
              <div className="text-white md:w-2/3">
                <div className="mb-2 flex items-baseline">
                  <h2 className="mr-2 text-3xl font-bold capitalize">
                    {pokemonData.name}
                  </h2>
                  <span className="text-xl opacity-70">
                    #{pokemonData.id.toString().padStart(3, "0")}
                  </span>
                </div>

                <div className="mb-4 flex gap-2">
                  {pokemonData.types.map((type) => (
                    <span
                      key={type}
                      style={{
                        backgroundColor: typeColors[type] || "bg-gray-500",
                      }}
                      className={
                        "rounded-full px-3 py-1 text-sm font-semibold text-white capitalize"
                      }
                    >
                      {type}
                    </span>
                  ))}
                </div>

                <p className="mb-4 text-lg">
                  {pokemonData.description || "Failed to fetch description."}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-200">Height</p>
                  <p className="text-xl font-semibold">
                    {pokemonData.height / 10} m
                  </p>
                </div>
                <div>
                  <p className="text-gray-200">Weight</p>
                  <p className="text-xl font-semibold">
                    {pokemonData.weight / 10} kg
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-xl font-bold">Base Stats</h3>
              <div className="space-y-3">
                {pokemonData.stats.map((stat) => (
                  <div key={stat.id || stat.name}>
                    <div className="mb-1 flex justify-between">
                      <span className="font-semibold">
                        {formatStatName(stat.name)}
                      </span>
                      <span>{stat.value}</span>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-gray-800">
                      <div
                        className="h-2.5 rounded-full bg-red-600"
                        style={{
                          width: `${Math.min(100, (stat.value / 255) * 100)}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-xl font-bold">Abilities</h3>
              <div className="flex flex-wrap gap-4">
                {pokemonData.abilities.map((ability) => (
                  <div key={ability} className="rounded-lg border p-4">
                    <div className="items-center">
                      <h4 className="text-lg font-semibold capitalize">
                        {ability.replace("-", " ")}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
