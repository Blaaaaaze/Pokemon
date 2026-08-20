import { useNavigate, useParams } from 'react-router';
import PokemonDetails from '../features/PokemonDetails/PokemonDetails';

export const Pokemon = () => {
    const navigate = useNavigate();
    const {name} = useParams<{ name: string }>();

    return (
        <div>
            <button onClick={() => navigate(-1)}>Back</button>
            {
                name && <PokemonDetails name={name} />
            }
        </div>
    );
};