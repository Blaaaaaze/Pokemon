import Search from "./Search";
import Select from "./Select";
import styles from './Controls.module.scss';

const Controls = () => {
    return (
        <>
            <div className={styles.wrapper}>
                <Search />
                <Select />
                <button className={styles['search-btn']}>Найти</button>
            </div>
        </>
    )
}

export default Controls;