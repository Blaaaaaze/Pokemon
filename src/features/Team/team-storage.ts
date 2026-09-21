import type { PokemonLocal } from '../../types';

const TEAM_STORAGE_KEY = 'pokemon-team';

export const saveTeam = (team: PokemonLocal[]) => {
    localStorage.setItem(
        TEAM_STORAGE_KEY,
        JSON.stringify(team)
    );
};

export const loadTeam = (): PokemonLocal[] => {
    const team = localStorage.getItem(TEAM_STORAGE_KEY);

    if (!team) {
        return [];
    }

    return JSON.parse(team);
};