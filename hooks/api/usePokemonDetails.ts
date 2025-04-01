import { useQuery } from "@tanstack/react-query";

interface PokemonStat {
  name: string;
  value: number;
}

interface Pokemon {
  id: number;
  name: string;
  types: string[];
  stats: PokemonStat[];
  abilities: string[];
  height: number;
  weight: number;
  sprite: string;
}

export function usePokemonDetails(pokemonUrl: string | null) {
  return useQuery<Pokemon>({
    queryKey: ["pokemonDetails", pokemonUrl],
    queryFn: async () => {
      if (!pokemonUrl) {
        throw new Error("No Pokémon URL provided");
      }

      const response = await fetch(pokemonUrl);

      if (!response.ok) {
        throw new Error("Failed to fetch Pokémon details");
      }

      const data = await response.json();

      return {
        id: data.id,
        name: data.name,
        types: data.types.map(
          (type: { type: { name: string } }) => type.type.name,
        ),
        stats: data.stats.map(
          (stat: { stat: { name: string }; base_stat: number }) => ({
            name: stat.stat.name,
            value: stat.base_stat,
          }),
        ),
        abilities: data.abilities.map(
          (ability: { ability: { name: string } }) => ability.ability.name,
        ),
        height: data.height,
        weight: data.weight,
        sprite: data.sprites.front_default,
      };
    },
    enabled: !!pokemonUrl,
  });
}
