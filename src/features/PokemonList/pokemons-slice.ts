import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Extra, Pokemon, PokemonListItem, PokemonLocal, Status } from "../../types";
import { pokemonMapper } from "../../mappers/pokemonMapper";

export const loadPokemons = createAsyncThunk<
{
    pokemonList: PokemonLocal[], 
    count: number
},
{page: number},
{
    extra: Extra
}
>(
    '@@pokemons/load-pokemons',
    async ({ page }, {
        extra: {client, api},
    }) => {
        const offset = (page - 1) * 20;
        const pokemonFetch = await client.get(api.pokemonsPage(offset));
        const count = pokemonFetch.data.count;
        const pokemonsData: Pokemon[] = await Promise.all(
            pokemonFetch.data.results.map(async (pokemonItem: PokemonListItem) => {
                const pokemonInfo = await client.get(pokemonItem.url);
                return pokemonInfo.data;
            })
        )
        const pokemonList = pokemonMapper(pokemonsData);

        return {pokemonList, count};
    }
)

type PokemonSlice = {
    status: Status,
    currentPage: number,
    pageSize: number,
    totalCount: number
    error: string | null,
    list: PokemonLocal[]
}

const initialState: PokemonSlice = {
    status: 'idle',
    currentPage: 1,
    pageSize: 20,
    totalCount: 0,
    error: null,
    list: []
}


const pokemonSlice = createSlice({
    name: '@@pokemons',
    initialState,
    reducers: {
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        }
    },
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
                state.list = action.payload.pokemonList;
                state.totalCount = action.payload.count
            })
    }
});

export const pokemonReducer = pokemonSlice.reducer;
export const {setCurrentPage} = pokemonSlice.actions;