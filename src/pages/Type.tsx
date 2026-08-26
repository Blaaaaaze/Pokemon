import { useParams } from 'react-router';
import TypeDetails from '../features/TypeDetails/TypeDetails';
import { Link } from 'react-router';
import BackButton from '../components/BackButton/BackButton';

export const Type = () => {
    const {type} = useParams<{ type: string }>();

    return (
        <div>
            <BackButton />
            {
                type && <TypeDetails type={type}/>
            }
            <Link to={`/?type=${type}`} className='link'>View pokemons</Link>
        </div>
    );
};