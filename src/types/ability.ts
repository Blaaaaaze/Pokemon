export type Ability = {
    effect_entries: {
        effect: string,
        language: {
            name: string,
        }
        short_effect: string
    }[],

    name: string,
}

export type AbilityLocal = {
    name: string,
    description: string,
    short_description: string
}