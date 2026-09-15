import type { RootState } from '../../store';

export const TeamSelector = (state: RootState) => state.team.pokemons;
