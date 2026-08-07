import type { RootState } from "../../store";

export const selectAllPokemons = (state: RootState) => state.pokemons.list;