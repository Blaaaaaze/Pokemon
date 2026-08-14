import styles from './Controls.module.scss';
import { useAppDispatch } from '../../store';
import { useSelector } from 'react-redux';
import { selectSearch } from './controls-selectros';
import { setSearch } from './controls-slice';

const Search = () => {
    const dispatch = useAppDispatch();
    const search = useSelector(selectSearch);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        dispatch(setSearch(e.target.value));
    }

    return (
        <>
            <input 
                type="text"
                placeholder="Enter pokemon name"
                className={styles.search}
                name="PokemonSearch"
                value={search}
                onChange={(e) => handleSearch(e)}
            />

        </>
    )
}

export default Search;