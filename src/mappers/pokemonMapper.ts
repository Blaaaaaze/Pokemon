import type { Ability, Pokemon, PokemonCard, PokemonLocal } from '../types';
import type { pokemonList, PokemonListItem } from '../types/pokemonList';

export const pokemonMapper = (pokemon: Pokemon, abilities: Ability[]): PokemonLocal => {
    return (
        {
            name: pokemon.name,
            id: pokemon.id,
            img: pokemon.sprites.other['official-artwork'].front_default,
            stats: pokemon.stats,
            types: pokemon.types,
            abilities: abilities.map(ability => {
                const engDecription = ability.effect_entries.find(item => item.language.name === 'en');
                
                return {
                    name: ability.name,
                    description: engDecription ? engDecription.effect : 'Hasn\'t description',
                    short_description: engDecription ? engDecription.short_effect : 'Hasn\'t description',
                };
            }
            ),
            height: pokemon.height,
            weight: pokemon.weight,
        }
    );
};

export const pokemonMapperToCard = (pokemonsApiData: Pokemon[]): PokemonCard[] => {
    return pokemonsApiData.map(pokemon => (
        {
            name: pokemon.name,
            img: pokemon.sprites.other['official-artwork'].front_default,
            stats: pokemon.stats,
            types: pokemon.types,
        }
    ));
};

export const pokemonListMapper = (pokemonsList: pokemonList[]): PokemonListItem[] => {
    const result = pokemonsList.map(pokemon => {

        return (
            {
                name: pokemon.pokemon.name,
                url: pokemon.pokemon.url
            }
        );
    });
    return result;
};