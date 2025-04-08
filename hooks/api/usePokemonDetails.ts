import { useQuery } from "@tanstack/react-query";

interface PokemonStat {
  id: string;
  name: string;
  value: number;
}

interface Pokemon {
  id: string;
  name: string;
  types: string[];
  stats: PokemonStat[];
  abilities: string[];
  height: number;
  weight: number;
  sprite: string;
  officialArtwork?: string;
  description?: string;
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

      let description = "";
      try {
        const speciesReponse = await fetch(data.species.url);

        if (speciesReponse.ok) {
          const speciesData = await speciesReponse.json();
          const englishFlavorText = speciesData.flavor_text_entries.find(
            (entry: { language: { name: string } }) =>
              entry.language.name === "en",
          );
          if (englishFlavorText) {
            description = englishFlavorText.flavor_text.replace(/\f/g, " ");
          }
        }
      } catch (error) {
        console.error("Failed to fetch species data:", error);
      }

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
        officialArtwork:
          data.sprites.other?.["official-artwork"]?.front_default || null,
        description,
      };
    },
    enabled: !!pokemonUrl,
  });
}
