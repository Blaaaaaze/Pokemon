import { useNavigate, useParams } from 'react-router';
import TypeDetails from '../features/TypeDetails/TypeDetails';
import { Link } from 'react-router';

export const Type = () => {
    const navigate = useNavigate();
    const {type} = useParams<{ type: string }>();

    return (
        <div>
            <button className='default-btn' onClick={() => navigate(-1)}>Back</button>
            {
                type && <TypeDetails type={type}/>
            }
            <Link to={`/?type=${type}`} className='link'>View pokemons</Link>
        </div>
    );
};