export type PokemonTypeName = 
| 'normal'
| 'fire'
| 'water'
| 'electric'
| 'grass'
| 'ice'
| 'fighting'
| 'poison'
| 'ground'
| 'flying'
| 'psychic'
| 'bug'
| 'rock'
| 'ghost'
| 'dragon'
| 'dark'
| 'steel'
| 'fairy';

type PokemonStat = {
    base_stat: number,
    stat: {
        name: string,
        url: string,
    }
}

type PokemonAbility = {
    ability: {
        name: string
        url: string
    }
}

type PokemonType = {
    slot: number,
    type: {
        name: PokemonTypeName,
        url: string,
    }
}


export type Pokemon = {
    name: string,
    id: number,
    sprites: {
        other: {
            'official-artwork': {
                front_default: string
            }
        }
    },
    stats: PokemonStat[],
    types: PokemonType[],
    height: number,
    weight: number,
    abilities: PokemonAbility[]
}

export type PokemonListItem = {
    name: string,
    url: string,
}

export type PokemonLocal = {
    name: string,
    id: number,
    img: string,
    height: number,
    weight: number,
    stats: PokemonStat[],
    types: PokemonType[],
    abilities: PokemonAbility[]
}

export type PokemonCard = {
    name: string,
    img: string,
    stats: PokemonStat[],
    types: PokemonType[]
}