import { useState, useEffect, useCallback} from 'react'

import BoardCard from "./BoardCard";
import CreateModal from './CreateModal';

import './BoardList.css'

const BoardList = ({sortMetric, searchTerm}) => {
    const [boards, setBoards] = useState(null);
    const [deleted, setDeleted] = useState(false);
    const [createModal, setCreateModal] = useState(false);
    const [created, setCreated] = useState(false);
    
    const fetchBoards = useCallback(async () => {
        try {
            const response = await fetch(`https://kudos-board-nyto.onrender.com/boards?sort=${sortMetric}&search=${searchTerm}`);
            if (!response){
                throw new Error('failed to fetch boards');
            }
            const responseJSON = await response.json();
            setBoards(responseJSON);
        } catch (error){
            console.error(error);
        }
    }, [sortMetric, searchTerm]);

    useEffect(()=>{
        fetchBoards();
    }, [fetchBoards, deleted, created]);
    



    return (
        <div>
            <button className='create-board' onClick={()=>setCreateModal(true)}>Create Board</button>
                <div className='board-container'>
                    {boards?.map((board)=>{
                        return(
                            <BoardCard 
                                id={board.board_id}
                                // TODO: fix image image={`https://picsum.photos/id/${Math.floor(Math.random()*100)}/200/300`}
                                image={board.image}
                                title={board.title}
                                category={board.category}
                                key={board.board_id}
                                setDeleted={setDeleted}
                            />
                        )
                    })}
                </div>
            {createModal && <CreateModal setModalOpen={setCreateModal} setCreateRender={setCreated}/>}
        </div>
    )
}

export default BoardList