import type { ApiItem } from './api-item';

export type Type = {
    damage_relations: {
        double_damage_from: ApiItem[]
        double_damage_to: ApiItem[],
        half_damage_from: ApiItem[],
        half_damage_to: ApiItem[],
        no_damage_from: ApiItem[],
        no_damage_to: ApiItem[],
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