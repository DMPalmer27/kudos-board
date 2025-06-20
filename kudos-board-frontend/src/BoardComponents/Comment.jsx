
import './Comment.css'

const Comment = ({message, author}) => {
    return (
        <div className='comment-container'>
            <h4>{message}</h4>
            <p>{author}</p>
        </div>
    )
}

export default Comment;