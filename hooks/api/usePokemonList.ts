import { useQuery } from "@tanstack/react-query";
import { getPokemonIdFromUrl } from "utils/getPokemonIdFromUrl";

interface PokemonFromApi {
  name: string;
  url: string;
}

interface PokemonListItem {
  id: string;
  name: string;
  url: string;
}

interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

interface UsePokemonListProps {
  page: number;
  limit: number;
}

export function usePokemonList({ page = 1, limit = 20 }: UsePokemonListProps) {
  const offset = (page - 1) * limit;

  return useQuery<PokemonListResponse>({
    queryKey: ["pokemonList", page, limit],
    queryFn: async () => {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`,
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch Pokemon list`);
      }

      const data = await response.json();

      const resultsWithIds = data.results.map((pokemon: PokemonFromApi) => {
        const id = getPokemonIdFromUrl(pokemon.url);

        return {
          ...pokemon,
          id: id,
        };
      });

      return {
        ...data,
        results: resultsWithIds,
      };
    },
  });
}
