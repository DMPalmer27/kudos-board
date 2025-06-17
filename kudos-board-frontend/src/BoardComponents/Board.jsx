import { useParams } from "react-router-dom"

const Board = () => {
    const { id } = useParams();
    return (
        <>
            <h1>Board {id}</h1>
        </>
    )
}

export default Board