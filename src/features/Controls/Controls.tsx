import Search from './Search';
import Select from './Select';
import styles from './Controls.module.scss';
import useControls from './use-controls';


const Controls = () => {
    const {
        search, 
        typeOptions,
        handleSearch,
        handleSelect
    } = useControls();
    
    return (
        <>
            <div className={styles.wrapper}>
                <Search value={search} onChange={handleSearch} />
                <Select options={typeOptions} onChange={handleSelect}/>
            </div>
        </>
    );
};

export default Controls;