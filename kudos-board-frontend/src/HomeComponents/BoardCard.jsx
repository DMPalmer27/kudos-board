import { Link } from 'react-router-dom'
import './BoardCard.css'
import { useTheme } from '../ThemeContext'

const BoardCard = ({id, image, title, category, setDeleted}) => {
    const {theme} = useTheme();

    const handleDelete = async () => {
        try {
            const response = await fetch(`https://kudos-board-nyto.onrender.com/boards/${id}`, {
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
        <div className={theme==='light'?'light-board-card':'dark-board-card'}>
            <img className='board-image' src={image}/>
            <h3>{title}</h3>
            <p>{category}</p>
            <div className='board-btns'>
                <button className='btn'>
                    <Link to={`/boards/${id}`}>
                    View Board
                    </Link>
                </button>
                <button className='btn' id='del-btn' onClick={handleDelete}>Delete Board</button>
            </div>
        </div>
    )
}

export default BoardCard