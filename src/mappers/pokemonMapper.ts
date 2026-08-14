import type { Pokemon, PokemonCard, PokemonLocal } from "../types";
import type { pokemonList, PokemonListItem } from "../types/pokemonList";

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

export const pokemonMapperToCard = (pokemonsApiData: Pokemon[]): PokemonCard[] => {
    return pokemonsApiData.map(pokemon => (
        {
                name: pokemon.name,
                img: pokemon.sprites.other['official-artwork'].front_default,
                stats: pokemon.stats,
                types: pokemon.types,
        }
    ))
}

export const pokemonListMapper = (pokemonsList: pokemonList[]): PokemonListItem[] => {
    const result = pokemonsList.map(pokemon => {
        console.log(pokemon.pokemon.name)
        return (
            {
                name: pokemon.pokemon.name,
                url: pokemon.pokemon.url
            }
        )
    })
    return result;
}