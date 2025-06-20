import { useState } from 'react'

const CreateModal = ({setModalOpen, setCreateRender}) => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [author, setAuthor] = useState('');

    const createBoard = async () => {
        try {
            const response = await fetch(`http://localhost:3000/boards`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title,
                    category,
                    author
                })
            })
            if (!response.ok){
                throw new Error('failed to create board');
            }
            setCreateRender((created)=>!created)
        } catch (error){
            console.error(error);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        createBoard();
        handleClose();
    }

    const handleClose = () => {
        setModalOpen(false);
    }

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h1>Create New Board</h1>
                <form className="create-form" onSubmit={handleSubmit}>
                    <p>Title: </p>
                    <input type='text' value={title} onChange={(e)=>setTitle(e.target.value)} required/>
                    <p>Category: </p>
                    <select className="category-selection" value={category} onChange={(e)=>setCategory(e.target.value)} required>
                        <option value=''>Select a category...</option>
                        <option value='celebration'>Celebration</option>
                        <option value='thanks'>Thank You!</option>
                        <option value='inspiration'>Inspiration</option>
                    </select>
                    <p>Author:</p>
                    <input type='text' value={author} onChange={(e)=>setAuthor(e.target.value)}/>
                    <button type='submit'>Create Board</button>
                </form>
                <button className='close-btn' onClick={handleClose}>Close</button>
            </div>
        </div>
    )
}



export default CreateModal