import { useState } from 'react'

import { Grid } from '@giphy/react-components'
import { GiphyFetch } from '@giphy/js-fetch-api'


const apiKey = import.meta.env.VITE_GIPHY_API_KEY;


const CreateModal = ({setModalOpen, setChanged, boardID}) => {
    const [message, setMessage] = useState('');
    const [gifSearch, setGifSearch] = useState('');
    const [showGifGrid, setShowGifGrid] = useState(false);
    const [gif, setGif] = useState('');
    const [author, setAuthor] = useState('');

    const gf = new GiphyFetch(apiKey);

    const createCard = async () => {
        try {
            const response = await fetch(`http://localhost:3000/boards/${boardID}/cards`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message,
                    gif: gif.id,
                    author
                })
            })
            if (!response.ok){
                throw new Error('failed to create card');
            }
            setChanged((changed)=>!changed)
        } catch (error){
            console.error(error)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('submit modal create');
        if (!gif){
            alert("You must select a gif");
            return;
        }
        createCard();
        setModalOpen(false);
    }
    const handleClose = () => {
        setModalOpen(false);
    }

    const fetchGifs = () => gf.search(gifSearch, {limit: 9});
    
    const handleGifSearch = () => {
        setShowGifGrid(true);
    }

    return (
        <div className='modal-overlay'>
            <div className='modal'>
                <h1>Create New Card</h1>
                <form className='create-form' onSubmit={handleSubmit}>
                    <p>Title:</p>
                    <input type='text' value={message} onChange={(e)=>setMessage(e.target.value)} required />
                    <p>Gif:</p>
                    <input type='text' value={gifSearch} onChange={(e)=>setGifSearch(e.target.value)} placeholder='Search Gifs...' />
                    <button type='button' onClick={handleGifSearch}>Search Gifs</button>
                    {showGifGrid && 
                        <Grid width={500} columns={3} fetchGifs={fetchGifs} noLink={true} onGifClick={setGif} hideAttribution/>
                    }
                    <p>Author:</p>
                    <input type='text' value={author} onChange={(e)=>setAuthor(e.target.value)} placeholder='Optional' />
                    <button type='submit'>Create Card</button>
                </form>
                <button onClick={handleClose}>Close</button>
            </div>
        </div>
    )
}

export default CreateModal;