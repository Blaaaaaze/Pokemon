import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Extra, Pokemon, PokemonCard, PokemonListItem, Status } from "../../types";
import { pokemonListMapper, pokemonMapperToCard } from "../../mappers/pokemonMapper";
import type { RootState } from "../../store";

interface PokemonListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: PokemonListItem[];
}

export const loadPokemonsByType = createAsyncThunk<
    {
        pokemonList: PokemonListItem[],
        count: number,
        page: number
    },
    string | undefined,
    {
        extra: Extra,
    }
>(
    '@@pokemons/load-pokemons-by-type',
    async (pokemonType, {
        extra: {client, api},
    }) => {
        const page = 1;
            
        if (pokemonType) {
            const pokemonFetch = await client.get(api.pokemonsByType(pokemonType));
            const pokemonList = pokemonFetch.data.pokemon;
            const mappedPokemonList = pokemonListMapper(pokemonList);
            const count = mappedPokemonList.length;

            
            return {pokemonList: mappedPokemonList, count, page};
        }

        const pokemonFetch = await client.get<PokemonListResponse>(api.allPokemons);
        const pokemonList = pokemonFetch.data.results;
        const count = pokemonFetch.data.count;

        return {pokemonList, count, page};
    }
)

export const loadPokemons = createAsyncThunk<
PokemonCard[], 
{
    pokemonList: PokemonListItem[],
    page: number,
    search: string,
},
{
    extra: Extra,
    state: RootState
}
>(
    '@@pokemons/load-pokemons',
    async ({ pokemonList, page, search }, {
        extra: {client},
        getState,
    }) => {
        
        const start = (page - 1) * 20;
        const pokemonsSlice = pokemonList
            .filter(pokemon => pokemon.name.includes(search.trim()))
            .slice(start, start+getState().pokemons.pageSize || -1);

        const pokemonsData: Pokemon[] = await Promise.all(
            pokemonsSlice.map(async (pokemonItem: PokemonListItem) => {
                const pokemonInfo = await client.get(pokemonItem.url);
                return pokemonInfo.data;
            })
        )
        const pokemonCardsData = pokemonMapperToCard(pokemonsData);

        return pokemonCardsData;
    }
)

type PokemonSlice = {
    status: Status,
    currentPage: number,
    pageSize: number,
    totalCount: number
    error: string | null,
    pagePokemonsList: PokemonCard[]
    allPokemonsList: PokemonListItem[],
}

const initialState: PokemonSlice = {
    status: 'idle',
    currentPage: 1,
    pageSize: 20,
    totalCount: 0,
    error: null,
    pagePokemonsList: [],
    allPokemonsList: []
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
            .addCase(loadPokemons.fulfilled, (state, action) => {
                state.status = 'idle';
                state.pagePokemonsList = action.payload;
            })
            .addCase(loadPokemonsByType.fulfilled, (state, action) => {
                state.status = 'idle';
                state.allPokemonsList = action.payload.pokemonList;
                state.totalCount = action.payload.count;
                state.currentPage = action.payload.page;
            })
            .addMatcher((action) => action.type.endsWith('/rejected'), (state) => {
                state.status = 'error';
                state.error = 'Cannot load data';
            })
            .addMatcher((action) => action.type.endsWith('/pending'), (state) => {
                state.status = 'loading';
                state.error = null;
            })
    }
});

export const pokemonReducer = pokemonSlice.reducer;
export const {setCurrentPage} = pokemonSlice.actions;