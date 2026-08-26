import { useEffect, useState } from 'react';

const getPageSize = () => {
    if (window.innerWidth < 768) return 10;
    if (window.innerWidth < 1024) return 15;
    if (window.innerWidth < 1440) return 20;

    return 30;
};

const usePageSize = () => {
    const [pageSize, setPageSize] = useState(getPageSize);

    useEffect(() => {
        const handleResize = () => {
            setPageSize(getPageSize());
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    

    return pageSize;
};

export default usePageSize;