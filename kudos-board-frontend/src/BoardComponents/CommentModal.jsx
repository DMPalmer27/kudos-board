import { useState, useEffect, useRef } from 'react';
import { Gif } from '@giphy/react-components'
import { GiphyFetch } from '@giphy/js-fetch-api'
import { useTheme } from '../ThemeContext';

import Comment from './Comment';
import CreateComment from './CreateComment';

const apiKey = import.meta.env.VITE_GIPHY_API_KEY;

const CommentModal = ({id, setModalOpen}) => {
    const [card, setCard] = useState(null);
    const [gifData, setGifData] = useState(null);
    const [changed, setChanged] = useState(false);
    const [showCreate, setShowCreate] = useState(false);
    const overlayRef = useRef(null);
    const {theme} = useTheme();

    const gf = new GiphyFetch(apiKey);

    const fetchCard = async () => {
        try {
            const response = await fetch(`https://kudos-board-nyto.onrender.com/cards/${id}`);
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

    const handleOverlayClick = (e) => {
        if (e.target === overlayRef.current){
            setModalOpen('');
        }
    }

    return (
        <div className={theme==='light'?'light-modal-overlay':'dark-modal-overlay'} ref={overlayRef} onClick={handleOverlayClick}>
            <div className={theme==='light'?'light-modal':'dark-modal'} id="comment-modal">
                {!card ? <h3>Card {id} loading...</h3> :
                    <div className='card'>
                        <h2>{card.message}</h2>
                        {gifData && <Gif gif={gifData} width={300} noLink hideAttribution />}
                        <h4>{card.author}</h4>
                        <button className='create-comment-btn' onClick={()=>setShowCreate(true)}>Create Comment</button>
                        {showCreate && <CreateComment setShowCreate={setShowCreate} setChanged={setChanged} cardID={id}/>}
                        <div className='comments-container'>
                            {card.comments.length != 0 ? card.comments.map((comment)=>{
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
            </div>
        </div>
    )
}


export default CommentModal;