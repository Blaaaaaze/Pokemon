import type { Pokemon, PokemonLocal } from "../types";

export const pokemonMapper = (pokemonsApiData: Pokemon[]): PokemonLocal[] => {
    return pokemonsApiData.map(pokemon => (
        {
            name: pokemon.name,
            id: pokemon.id,
            img: pokemon.sprites.other['official-artwork'].front_default,
            stats: pokemon.stats,
            types: pokemon.types,
            abilities: pokemon.abilities,
            height: pokemon.height,
            weight: pokemon.weight,
        }
    ));
}