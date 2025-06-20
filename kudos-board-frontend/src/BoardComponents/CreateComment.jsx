import { useState } from 'react'

const CreateComment = ({setShowCreate, setChanged, cardID}) => {
    const [message, setMessage] = useState('');
    const [author, setAuthor] = useState('');

    const create = async () => {
        try {
            const response = await fetch(`http://localhost:3000/cards/${cardID}/comments`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message,
                    author
                })
            })
            if (!response.ok){
                throw new Error(`failed to create comment on card ${cardID}`);
            }
            setChanged((changed)=>!changed);
        } catch (error){
            console.error(error);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        create();
        handleClose();
    }

    const handleClose = () => {
        setShowCreate(false);
    }

    return (
        <div className='create-comment-container'>
            <form className='create-comment-form' onSubmit={handleSubmit}>
                <p>Message:</p>
                <input type='text' value={message} onChange={(e)=>setMessage(e.target.value)} required />
                <p>Author:</p>
                <input type='text' value={author} onChange={(e)=>setAuthor(e.target.value)} />
                <button type='submit'>Send</button>
            </form>
            <button onClick={handleClose}>Close Create Menu</button>
        </div>
    )
}

export default CreateComment;