import { useLocation, useNavigate } from 'react-router-dom';

const usePageChange = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const handelUrlChange = () => {

        const params = {};
        const queryParams = new URLSearchParams(location.search);
        
        queryParams.keys().forEach( element => {
            params[element] = queryParams.get(element);
        });

        return params;
    }

    const handlePageChange = (page) => {
        const queryParams = new URLSearchParams(location.search);
        queryParams.set('page', page);
        navigate(`?${queryParams.toString()}`);
    };

    const handlePerRowsChange = async (perPage) => {
        const queryParams = new URLSearchParams(location.search);
        queryParams.set('page', 1);
        queryParams.set('per_page', perPage);
        navigate(`?${queryParams.toString()}`);
    } 

    const handleSort = async (column, sortDirection) => {
        
        const queryParams = new URLSearchParams(location.search);

        queryParams.set('page', 1);
        queryParams.set('per_page', 30);
        queryParams.set('sort', column.sortField);
        queryParams.set('order', sortDirection);

        setTimeout( () => {
            navigate(`?${queryParams.toString()}`);
        }, 500)
    }
  
    return { 
        handleSort,
        handelUrlChange, 
        handlePageChange, 
        handlePerRowsChange, 
    };
};

export default usePageChange;