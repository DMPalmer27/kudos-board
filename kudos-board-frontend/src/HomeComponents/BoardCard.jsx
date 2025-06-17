

const BoardCard = () => {
    return (
        <div className='board-card'>
            <img className='board-image' />
            <h3>Title</h3>
            <p>Category</p>
            <div className='board-btns'>
                <button className='view-btn'>View Board</button>
                <button className='del-btn'>Delete Board</button>
            </div>
        </div>
    )
}

export default BoardCard