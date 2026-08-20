import type { RootState } from '../../store';

export const selectPokemonData = (state: RootState) => state.pokemonDetails.currentPokemon;