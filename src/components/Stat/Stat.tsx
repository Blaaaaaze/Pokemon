import styles from './Stat.module.scss';

interface StatProps {
    name: string,
    value: number
}

const Stat = ({name, value}: StatProps) => (
    <div className={styles.stat}>
        <h4 className={styles.stat__title}>{name}</h4>
        <p className={styles.stat__value}>{value}</p>
    </div>
)

export default Stat;