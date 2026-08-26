import type { RootState } from '../../store';

export const selectPokemonData = (state: RootState) => state.pokemonDetails.currentPokemon;
export const selectStatus = (state: RootState) => state.pokemonDetails.status;