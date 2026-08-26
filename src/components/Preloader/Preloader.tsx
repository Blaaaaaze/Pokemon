import styles from './Preloader.module.scss';

const Preloader = () => (
    <div className={styles.preloader}>
        <div className={styles.spinner}></div>
    </div>
);

export default Preloader;