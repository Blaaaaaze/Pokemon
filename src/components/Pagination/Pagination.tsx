import styles from './Pagination.module.scss';

interface PaginationProps {
    totalPages: number,
    currentPage: number,
    onPageChange: (page: number) => void
}

const Pagination = ({totalPages, currentPage, onPageChange}: PaginationProps) => {
    return (
        <div className={styles['button-container']}>
            <button className={styles.btn} onClick={() => onPageChange(currentPage-1)}>Назад</button>
            <button className={styles.btn} onClick={() => onPageChange(currentPage+1)}>Вперёд</button>
        </div>
    )
}

export default Pagination;