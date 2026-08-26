import type { RootState } from '../../store';

export const selectAllPokemons = (state: RootState) => state.pokemons.allPokemonsList;
export const selectPokemons = (state: RootState) => state.pokemons.pagePokemonsList;
export const selectPokemonsCount = (state: RootState) => state.pokemons.totalCount;
export const selectCurrentPage = (state: RootState) => state.pokemons.currentPage;
export const selectStatus = (state: RootState) => state.pokemons.status;
export const selectPageSize = (state: RootState) => state.pokemons.pageSize;