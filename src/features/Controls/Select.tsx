import type { PokemonTypeName } from '../../types';
import styles from './Controls.module.scss';
import { useSelector } from 'react-redux';
import { selectType } from './controls-selectros';

interface SelectProps {
    options: {
        value: PokemonTypeName;
        label: PokemonTypeName;
    }[],
    onChange: (e: React.ChangeEvent<HTMLSelectElement, HTMLSelectElement>) => void
}

const Select = ({options, onChange}: SelectProps) => {
    const type = useSelector(selectType);

    return (
        <>
            <select 
                name="typeSelect" 
                id="typeSelect" 
                className={styles.select}
                onChange={(e) => onChange(e)}
                value={type || ''}
            >
                <option value=''>all</option>
                {
                    options.map(({ value, label }) => {
                        return (
                            <option key={value} value={value} >
                                {label}
                            </option>
                        );
                    })
                }
            </select>
        </>
    );
};

export default Select;