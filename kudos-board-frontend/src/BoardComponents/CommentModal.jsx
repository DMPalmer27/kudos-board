import { useState, useEffect } from 'react';
import { Gif } from '@giphy/react-components'
import { GiphyFetch } from '@giphy/js-fetch-api'

import Comment from './Comment';
import CreateComment from './CreateComment';

const apiKey = import.meta.env.VITE_GIPHY_API_KEY;

const CommentModal = ({id, setModalOpen}) => {
    const [card, setCard] = useState(null);
    const [gifData, setGifData] = useState(null);
    const [changed, setChanged] = useState(false);
    const [showCreate, setShowCreate] = useState(false);

    const gf = new GiphyFetch(apiKey);

    const fetchCard = async () => {
        try {
            const response = await fetch(`http://localhost:3000/cards/${id}`);
            if (!response || !response.ok){
                throw new Error(`failed to fetch carrd ${id}`);
            }
            const responseJSON = await response.json();
            setCard(responseJSON);
        } catch (error){
            console.error(error);
        }
    }

    const fetchGif = async () => {
        try {
            const { data } = await gf.gif(card.gif);
            setGifData(data)
        } catch (error){
            console.error(error);
        }
    }

    useEffect(()=>{
        fetchCard();
    }, [changed]);

    useEffect(()=>{
        if (card){
            fetchGif();
        }
    },[card])

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                {!card ? <h3>Card {id} loading...</h3> :
                    <div className='card'>
                        <h2>{card.message}</h2>
                        {gifData && <Gif gif={gifData} width={300} noLink hideAttribution />}
                        <h4>{card.author}</h4>
                        <button className='create-comment-btn' onClick={()=>setShowCreate(true)}>Create Comment</button>
                        {showCreate && <CreateComment setShowCreate={setShowCreate} setChanged={setChanged} cardID={id}/>}
                        <div className='comments-container'>
                            {card.comments ? card.comments.map((comment)=>{
                                return (
                                    <Comment
                                        message={comment.message}
                                        author={comment.author}
                                        key={comment.comment_id}
                                    />
                                )
                            }) : <h3>Card has no comments, add one!</h3>
                            }
                        </div>
                    </div>
                }
                <button className='close-btn' onClick={()=>setModalOpen('')}>Close</button>
            </div>
        </div>
    )
}


export default CommentModal;