import { useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import * as api from './config';
import axios from 'axios';
import { pokemonReducer } from './features/PokemonList/pokemons-slice';
import {controlsReducer} from './features/Controls/controls-slice';
import { pokemonDetailsReducer } from './features/PokemonDetails/pokemonDetails-slice';
import { typeDetailsReducer } from './features/TypeDetails/typeDetails-slice';
import { teamSliceReducer } from './features/Team/team-slice';
import { teamListener } from './features/Team/team-listener';
import { loadTeam } from './features/Team/team-storage';

export const store = configureStore({
    reducer: {
        pokemons: pokemonReducer,
        controls: controlsReducer,
        pokemonDetails: pokemonDetailsReducer,
        typeDetails: typeDetailsReducer,
        team: teamSliceReducer
    },
    preloadedState: {
        team: {
            pokemons: loadTeam(),
        },
    },
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        thunk: {
            extraArgument: {
                client: axios,
                api,
            }
        }
    }).prepend(teamListener.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;