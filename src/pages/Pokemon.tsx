import { useParams } from 'react-router';
import PokemonDetails from '../features/PokemonDetails/PokemonDetails';
import BackButton from '../components/BackButton/BackButton';

export const Pokemon = () => {
    const {name} = useParams<{ name: string }>();

    return (
        <div>
            <BackButton />
            {
                
                name && <PokemonDetails name={name} />
            }
        </div>
    );
};