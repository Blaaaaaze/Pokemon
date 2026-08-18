import { useNavigate, useParams } from "react-router"

export const Pokemon = () => {
    const navigate = useNavigate();
    const {name} = useParams<{ name: string }>();

    return (
        <div>

            <button onClick={() => navigate(-1)}>Back</button>

        </div>
    )
}