import styles from './ProgressBar.module.scss';

type ProgressBarProps = {
    power: number,
    limit: number
}

const ProgressBar = ({power, limit}: ProgressBarProps) => {
    const percentage = (power / limit) * 100;

    return (
        <div className="container">
            <div className={styles.bar}>
                <div className={`
                    ${styles.progress}
                    `}
                style={{'--progress-width': `${percentage}%`} as React.CSSProperties}
                ></div>
                <span className={styles.label}>{power}/{limit}</span>
            </div>
        </div>
    );
};

export default ProgressBar;