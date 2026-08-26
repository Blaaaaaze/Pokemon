const BASE_URL = 'https://pokeapi.co/api/v2/';

export const basePokemonsUrl = BASE_URL + 'pokemon/';

export const allPokemons = basePokemonsUrl + '?limit=10000&offset=0';
export const Type = (type: string) => BASE_URL + `type/${type}/`;
export const pokemonData = (name: string) => basePokemonsUrl + name;
export const Ability = (ability: string) => BASE_URL + `ability/${ability}/`;