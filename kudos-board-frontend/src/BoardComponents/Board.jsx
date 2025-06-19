import { useState, useEffect, useCallback } from 'react'
import { useParams } from "react-router-dom"
import CardCard from './CardCard';
import CreateModal from './CreateModal';

const apiKey = import.meta.env.GIPHY_API_KEY;

const Board = () => {
    const [board, setBoard] = useState(null);
    const [changed, setChanged] = useState(false);
    const [createModal, setCreateModal] = useState(false);
    const { id } = useParams();

    const fetchBoard = async () => {
        try {
            const response = await fetch(`http://localhost:3000/boards/${id}`);
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
                    <h2>{board ? board.title : `board ${id} loading`} </h2>
                    <button className='create-card' onClick={()=>setCreateModal(true)}>Create Card</button>
                    <div className='cards-container'>
                        {board.cards ? board.cards.map((card)=>{
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
                                    />
                                )
                            }) : 
                            <h3>Board {id} has no cards, add one!</h3>
                        }
                    </div>
                    {createModal && <CreateModal setModalOpen={setCreateModal} setChanged={setChanged} boardID={id}/>}
                </div>
            }
        </div>
    )
}

export default Board