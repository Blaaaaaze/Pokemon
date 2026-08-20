type defaultApiItem = {
    name: string,
    url: string
}

export type Type = {
    damage_relations: {
        double_damage_from: defaultApiItem[]
        double_damage_to: defaultApiItem[],
        half_damage_from: defaultApiItem[],
        half_damage_to: defaultApiItem[],
        no_damage_from: defaultApiItem[],
        no_damage_to: defaultApiItem[],
    },
    id: number,
    name: string,
    sprites: {
        'generation-ix': {
            'scarlet-violet': {
                symbol_icon: string
            }
        }
    }
}