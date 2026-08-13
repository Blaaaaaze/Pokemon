const BASE_URL = 'https://pokeapi.co/api/v2/';

export const basePokemonsUrl = BASE_URL + 'pokemon/';

export const allPokemons = basePokemonsUrl + '?limit=10000&offset=0'
export const pokemonsPage = (offset: number) => basePokemonsUrl + `?limit=20&offset=${offset}`;
