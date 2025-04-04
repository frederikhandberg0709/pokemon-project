import { getPokemonIdFromUrl } from "./getPokemonIdFromUrl";

export const getPokemonImageUrl = (url: string) => {
  const id = getPokemonIdFromUrl(url);
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
};
