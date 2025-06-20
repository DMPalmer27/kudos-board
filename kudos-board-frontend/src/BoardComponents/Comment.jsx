

const Comment = ({message, author}) => {
    return (
        <div className='comment-container'>
            <p>{message}</p>
            <p>{author}</p>
        </div>
    )
}

export default Comment;