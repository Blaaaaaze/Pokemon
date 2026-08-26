import type { PokemonTypeName } from '../../types';
import styles from './Controls.module.scss';
import { useSelector } from 'react-redux';
import { selectType } from './controls-selectros';
import { useEffect, useRef, useState } from 'react';

interface SelectProps {
    options: {
        value: PokemonTypeName;
        label: PokemonTypeName;
    }[],
    onChange: (e: React.ChangeEvent<HTMLSelectElement, HTMLSelectElement>) => void
}

const Select = ({options, onChange}: SelectProps) => {
    const type = useSelector(selectType);
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                selectRef.current &&
            !selectRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className={styles.select} ref={selectRef}>
            <button
                type="button"
                className={styles.select__button}
                onClick={() => setIsOpen(prev => !prev)}
            >
                {type || 'All'}
            </button>

            {isOpen && (
                <div className={styles.select__options}>
                    <button
                        className={styles.select__options__button}
                        type="button"
                        onClick={() => {
                            onChange({
                                target: {
                                    value: '',
                                },
                            } as React.ChangeEvent<HTMLSelectElement>);

                            setIsOpen(false);
                        }}
                    >
                        All
                    </button>

                    {options.map(({ value, label }) => (
                        <button
                            className={styles.select__options__button}
                            type="button"
                            key={value}
                            onClick={() => {
                                onChange({
                                    target: {
                                        value,
                                    },
                                } as React.ChangeEvent<HTMLSelectElement>);

                                setIsOpen(false);
                            }}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Select;