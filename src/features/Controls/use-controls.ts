import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../store';
import type { FilterType, PokemonTypeName } from '../../types';
import { selectSearch } from './controls-selectros';
import { setSearch, setType } from './controls-slice';

const useControls = () => {
    const dispatch = useAppDispatch();
    const search = useSelector(selectSearch);
    
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        dispatch(setSearch(e.target.value));
    };

    type TypeOption = {
            [TypeKey in PokemonTypeName]: { value: PokemonTypeName, label: PokemonTypeName }
        }
    
    const typeMap: TypeOption = {
        normal: { value: 'normal', label: 'normal' },
        fire: { value: 'fire', label: 'fire' },
        water: { value: 'water', label: 'water' },
        electric: { value: 'electric', label: 'electric' },
        grass: { value: 'grass', label: 'grass' },
        ice: { value: 'ice', label: 'ice' },
        fighting: { value: 'fighting', label: 'fighting' },
        poison: { value: 'poison', label: 'poison' },
        ground: { value: 'ground', label: 'ground' },
        flying: { value: 'flying', label: 'flying' },
        psychic: { value: 'psychic', label: 'psychic' },
        bug: { value: 'bug', label: 'bug' },
        rock: { value: 'rock', label: 'rock' },
        ghost: { value: 'ghost', label: 'ghost' },
        dragon: { value: 'dragon', label: 'dragon' },
        dark: { value: 'dark', label: 'dark' },
        steel: { value: 'steel', label: 'steel' },
        fairy: { value: 'fairy', label: 'fairy' },
    };

    const typeOptions = Object.values(typeMap);
    
    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement, HTMLSelectElement>) => {
        const value = e.target.value as FilterType;
        dispatch(setType(value));
    };

    return {search, typeOptions, handleSearch, handleSelect};
};

export default useControls;