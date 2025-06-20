import { useState, useEffect } from 'react'

import { Gif } from '@giphy/react-components'
import { GiphyFetch } from '@giphy/js-fetch-api'

import './CardCard.css'


const apiKey = import.meta.env.VITE_GIPHY_API_KEY;

const CardCard = ({id, message, gif, author, pinned, votes, setChanged, setShowComments}) => {
    const [gifData, setGifData] = useState(null);
    const [shownVotes, setShownVotes] = useState(votes);

    const gf = new GiphyFetch(apiKey); 

    const getGif = async () => {
        try {
            const { data } = await gf.gif(gif);
            setGifData(data)
        } catch (error){
            console.error(error);
        }
    }
    useEffect(()=>{
        getGif();
    },[]);

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:3000/cards/${id}`, {
                method: "DELETE"
            });
            if (!response.ok){
                throw new Error("failed to delete card");
            }
            setChanged((changed)=>!changed);
        } catch (error){
            console.error(error);
        }
    }

    const handlePin = async() => {
        try {
            const newPin = !pinned;
            const response = await fetch(`http://localhost:3000/cards/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    pinned: newPin
                })
            })
            if (!response.ok){
                throw new Error(`failed to pin card ${id}`);
            }
            setChanged((changed)=>!changed);
        } catch(error){
            console.error(error);
        }
    }

    const handleUpvote = async () => {
        try {
            const response = await fetch(`http://localhost:3000/cards/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    votes: shownVotes+1
                })
            })
            if (!response.ok){
                throw new Error('failed to upvote');
            }
            setShownVotes((prev)=>prev+1)
        } catch(error){
            console.error(error);
        }
    }

    return (
        <div className='card-card'>
            <h2>{message}</h2>
            {gifData && <Gif gif={gifData} width={300} borderRadius={7} noLink hideAttribution/> }
            <h4>{author}</h4>
            <div className='action-btns'>
                <button className='upvote' onClick={handleUpvote}>Upvote {shownVotes}</button>
                <button className='pin' onClick={handlePin}>{pinned ? 'Pinned' : 'Unpinned' }</button>
                <button className='delete' onClick={handleDelete}>Delete</button>
            </div>
            <button className="comment-btn" onClick={()=>setShowComments(id)}>Open Comments</button>
            
        </div>
    )
}

export default CardCard;