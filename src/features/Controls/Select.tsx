import type { PokemonTypeName } from "../../types";
import styles from './Controls.module.scss';

const Select = () => {
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


    return (
        <>
            <select name="typeSelect" id="typeSelect" className={styles.select}>
                {
                    typeOptions.map(({ value, label }) => {
                        return (
                            <option key={value} value={value} >
                                {label}
                            </option>
                        )
                    })
                }
            </select>
        </>
    )
}

export default Select;