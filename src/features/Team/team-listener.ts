import { createListenerMiddleware } from '@reduxjs/toolkit';
import {
    addPokemon,
    removePokemon,
    clearTeam,
} from './team-slice';
import type { RootState } from '../../store';

export const teamListener = createListenerMiddleware();

teamListener.startListening({
    matcher: (action) =>
        addPokemon.match(action) ||
        removePokemon.match(action) ||
        clearTeam.match(action),

    effect: (_, listenerApi) => {
        const state = listenerApi.getState() as RootState;

        localStorage.setItem(
            'pokemon-team',
            JSON.stringify(state.team.pokemons)
        );
    },
});