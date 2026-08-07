import type { RootState } from "../../store";

export const selectPokemons = (state: RootState) => state.pokemons.list;
export const selectPokemonsCount = (state: RootState) => state.pokemons.totalCount;
export const selectCurrentPage = (state: RootState) => state.pokemons.currentPage;