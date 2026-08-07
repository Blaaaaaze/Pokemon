const BASE_URL = 'https://pokeapi.co/api/v2/';

export const allPokemons = BASE_URL + 'pokemon/';
export const pokemonsPage = (offset: number) => allPokemons + `?limit=20&offset=${offset}`;