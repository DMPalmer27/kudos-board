import { useState, useRef } from 'react'
import { useTheme } from '../ThemeContext';

import './CreateModal.css'

const CreateModal = ({setModalOpen, setCreateRender}) => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [author, setAuthor] = useState('');
    const overlayRef = useRef(null);
    const {theme} = useTheme();

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
        setModalOpen(false);
    }

    const handleOverlayClick = (e) => {
        if (e.target === overlayRef.current){
            setModalOpen(false);
        }
    }

    return (
        <div className={theme==='light'?'light-modal-overlay':'dark-modal-overlay'}ref={overlayRef} onClick={handleOverlayClick}>
            <div className={theme==='light'?'light-modal':'dark-modal'}>
                <h1>Create New Board</h1>
                <form className="create-form" onSubmit={handleSubmit}>
                    <h3>Title: </h3>
                    <input type='text' value={title} onChange={(e)=>setTitle(e.target.value)} required/>
                    <h3>Category: </h3>
                    <select className="category-selection" value={category} onChange={(e)=>setCategory(e.target.value)} required>
                        <option value=''>Select a category...</option>
                        <option value='celebration'>Celebration</option>
                        <option value='thanks'>Thank You!</option>
                        <option value='inspiration'>Inspiration</option>
                    </select>
                    <h3>Author:</h3>
                    <input type='text' value={author} onChange={(e)=>setAuthor(e.target.value)}/>
                    <button type='submit'>Create Board</button>
                </form>
            </div>
        </div>
    )
}



export default CreateModal