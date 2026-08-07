import styles from './Chip.module.scss';

interface ChipProps {
    text: string;
}

const Chip = ({text}: ChipProps) => {
    return (
        <div className={`${styles.chip} ${styles[text]}`}>
            <p className={styles.chip__text}>{text}</p>
        </div>
    )
}

export default Chip;