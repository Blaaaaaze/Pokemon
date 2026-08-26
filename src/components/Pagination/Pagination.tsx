import styles from './Pagination.module.scss';

interface PaginationProps {
    totalPages: number,
    currentPage: number,
    onPageChange: (page: number) => void
}

const Pagination = ({totalPages, currentPage, onPageChange}: PaginationProps) => {
    const getPagination = (
        currentPage: number,
        totalPages: number
    ) => {
        if (totalPages <= 7) {
            return Array.from(
                { length: totalPages },
                (_, index) => index + 1
            );
        }

        if (currentPage <= 4) {
            return [1, 2, 3, 4, 5, '...', totalPages];
        }

        if (currentPage >= totalPages - 3) {
            return [
                1,
                '...',
                totalPages - 4,
                totalPages - 3,
                totalPages - 2,
                totalPages - 1,
                totalPages,
            ];
        }

        return [
            1,
            '...',
            currentPage - 1,
            currentPage,
            currentPage + 1,
            '...',
            totalPages,
        ];
    };

    const pagination = getPagination(currentPage, totalPages);

    return (
        <div className={styles['button-container']}>
            {
                pagination.map((item, index) => {
                    return typeof item !== 'number' ? (
                        <span key={`dots-${index}`}>
                            ...
                        </span>
                    ) : (
                        <button
                            key={item}
                            className={`${item === currentPage ? styles.active : ''} default-btn`}
                            onClick={() => onPageChange(item)}
                        >
                            {item}
                        </button>
                    );
                })
            }
        </div>
    );
};

export default Pagination;