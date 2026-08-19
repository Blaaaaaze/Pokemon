import styles from './Controls.module.scss';

interface SearchProps {
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => void
}

const Search = ({value, onChange}: SearchProps) => {

    return (
        <>
            <input 
                type="text"
                placeholder="Enter pokemon name"
                className={styles.search}
                name="PokemonSearch"
                value={value}
                onChange={(e) => onChange(e)}
            />

        </>
    )
}

export default Search;