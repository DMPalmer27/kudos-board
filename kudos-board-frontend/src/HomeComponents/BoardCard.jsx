import { Link } from 'react-router-dom'

const BoardCard = ({id, image, title, category, setDeleted}) => {

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:3000/boards/${id}`, {
                method: "DELETE"
            });
            if (!response.ok){
                throw new Error("failed to delete board");
            }
            setDeleted((deleted)=>!deleted); //trigger refetch boards / rerender
        } catch (error){
            console.error(error);
        }
    }

    
    return (
        <div className='board-card'>
            <img className='board-image' src={image}/>
            <h3>{title}</h3>
            <p>{category}</p>
            <div className='board-btns'>
                <button className='view-btn'>
                    <Link to={`/boards/${id}`}>
                    View Board
                    </Link>
                </button>
                <button className='del-btn' onClick={handleDelete}>Delete Board</button>
            </div>
        </div>
    )
}

export default BoardCard