import BoardCard from "./BoardCard";

const BoardList = ({sortMetric}) => {
    const boards = [] //placeholder boards
    if (sortMetric === 'celebration'){
        //Query for boards w celebration
    } else if (sortMetric === 'thanks'){

    } else if (sortMetric === 'inspiration'){

    } else {
        //get all boards
        if (sortMetric === 'recent'){ //sort by recency
            boards.sort((a,b)=>{
                return b.date - a.date;
            })
        }
    }
        

    return (
        <div className='board-container'>
            {boards.map((board)=>{
                return(
                    <BoardCard />
                )
            })}
        </div>
    )
}

export default BoardList