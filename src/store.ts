import { useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit'
import * as api from './config';
import axios from 'axios';
import { pokemonReducer } from './features/PokemonList/pokemons-slice';

export const store = configureStore({
    reducer: {
        pokemons: pokemonReducer,
    },
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        thunk: {
            extraArgument: {
                client: axios,
                api,
            }
        }
    })
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;