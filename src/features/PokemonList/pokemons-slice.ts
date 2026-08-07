import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Extra, Pokemon, PokemonListItem, PokemonLocal, Status } from "../../types";
import { pokemonMapper } from "../../mappers/pokemonMapper";

export const loadPokemons = createAsyncThunk<
PokemonLocal[],
undefined,
{
    extra: Extra,
}
>(
    '@@pokemons/load-pokemons',
    async (_, {
        extra: {client, api},
    }) => {
        const pokemonFetch = await client.get(api.allPokemons);
        const pokemonsData: Pokemon[] = await Promise.all(
            pokemonFetch.data.results.map(async (pokemonItem: PokemonListItem) => {
                const pokemonInfo = await client.get(pokemonItem.url);
                return pokemonInfo.data;
            })
        )

        return pokemonMapper(pokemonsData);
    }
)

type PokemonSlice = {
    status: Status,
    error: string | null,
    list: PokemonLocal[]
}

const initialState: PokemonSlice = {
    status: 'idle',
    error: null,
    list: []
}


const pokemonSlice = createSlice({
    name: '@@pokemons',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadPokemons.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(loadPokemons.rejected, (state) => {
                state.status = 'error';
                state.error = 'Cannot load data';
            })
            .addCase(loadPokemons.fulfilled, (state, action) => {
                state.status = 'idle';
                state.list = action.payload;
            })
    }
});

export const pokemonReducer = pokemonSlice.reducer;