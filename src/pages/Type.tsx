import { useNavigate, useParams } from "react-router";

export const Type = () => {
    const navigate = useNavigate();
    const {type} = useParams<{ type: string }>();

    return (
        <div>
            <button onClick={() => navigate(-1)}>Back</button>

        </div>
    )
}