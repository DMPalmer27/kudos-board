import { useTheme } from '../ThemeContext';
import './Comment.css'

const Comment = ({message, author}) => {
    const {theme} = useTheme();
    return (
        <div className={theme==='light'?'light-comment-container':'dark-comment-container'}>
            <h4>{message}</h4>
            <p className='author'>{author}</p>
        </div>
    )
}

export default Comment;