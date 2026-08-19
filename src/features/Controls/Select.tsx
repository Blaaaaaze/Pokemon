import type { PokemonTypeName } from "../../types";
import styles from './Controls.module.scss';

interface SelectProps {
    options: {
        value: PokemonTypeName;
        label: PokemonTypeName;
    }[],
    onChange: (e: React.ChangeEvent<HTMLSelectElement, HTMLSelectElement>) => void
}

const Select = ({options, onChange}: SelectProps) => {

    return (
        <>
            <select 
                name="typeSelect" 
                id="typeSelect" 
                className={styles.select}
                onChange={(e) => onChange(e)}
                >
                    <option value=''>all</option>
                    {
                        options.map(({ value, label }) => {
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