import { useState, useEffect, useCallback } from 'react'
import { useParams } from "react-router-dom"
import CardCard from './CardCard';
import CreateModal from './CreateModal';
import CommentModal from './CommentModal';
import './Board.css'

const apiKey = import.meta.env.GIPHY_API_KEY;

const Board = () => {
    const [board, setBoard] = useState(null);
    const [changed, setChanged] = useState(false);
    const [createModal, setCreateModal] = useState(false);
    const [commentModal, setCommentModal] = useState(false);
    const { id } = useParams();

    const fetchBoard = async () => {
        try {
            const response = await fetch(`https://kudos-board-nyto.onrender.com/boards/${id}`);
            if (!response.ok){
                throw new Error(`failed to fetch board ${id}`);
            }
            const responseJSON = await response.json();
            setBoard(responseJSON);
        } catch(error){
            console.error(error);
        }
    }

    useEffect(()=>{
        fetchBoard();
    }, [changed])


    return (
        <div className='board-page'>
            {!board ? <h1>Board {id} loading...</h1> : 
                <div className='board'>
                    <h1>{board.title} </h1>
                    <button className='create-card' onClick={()=>setCreateModal(true)}>Create Card</button>
                    <div className='cards-container' id='pinned'>
                        {board.cards.filter(card=>card.pinned===true).map((card)=>{
                            return (
                                <CardCard
                                    id={card.card_id}
                                    message={card.message}
                                    gif={card.gif}
                                    author={card.author}
                                    pinned={card.pinned}
                                    votes={card.votes}
                                    key={card.card_id}
                                    setChanged={setChanged}
                                    setShowComments={setCommentModal}
                                />
                            )
                        })}
                    </div>
                    <div className='cards-container' id='unpinned'>
                        {board.cards.length !== 0 ? board.cards.filter(card=>card.pinned===false).map((card)=>{
                                return (
                                    <CardCard
                                        id={card.card_id}
                                        message={card.message}
                                        gif={card.gif}
                                        author={card.author}
                                        pinned={card.pinned}
                                        votes={card.votes}
                                        key={card.card_id}
                                        setChanged={setChanged}
                                        setShowComments={setCommentModal}
                                    />
                                )
                            }) : 
                            <h3>Board has no cards, add one!</h3>
                        }
                    </div>
                    {createModal && <CreateModal setModalOpen={setCreateModal} setChanged={setChanged} boardID={id}/>}
                    {commentModal && <CommentModal id={commentModal} setModalOpen={setCommentModal}/>}
                </div>
            }
        </div>
    )
}

export default Board