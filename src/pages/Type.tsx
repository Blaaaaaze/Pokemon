import { useNavigate, useParams } from "react-router";
import TypeDetails from "../features/TypeDetails/TypeDetails";

export const Type = () => {
    const navigate = useNavigate();
    const {type} = useParams<{ type: string }>();

    return (
        <div>
            <button onClick={() => navigate(-1)}>Back</button>
            {
                type && <TypeDetails type={type}/>
            }
        </div>
    )
}