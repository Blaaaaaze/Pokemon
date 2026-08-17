import Search from "./Search";
import Select from "./Select";
import styles from './Controls.module.scss';

const Controls = () => {
    return (
        <>
            <div className={styles.wrapper}>
                <Search />
                <Select />
            </div>
        </>
    )
}

export default Controls;