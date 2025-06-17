import { useState } from 'react'
import ControlBar from "./ControlBar"
import BoardList from './BoardList'
import Board from '../BoardComponents/Board'


const Home = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [sortMetric, setSortMetric] = useState('all');

    return (
        <div className='home'>
            <ControlBar onSearchSubmit={setSearchTerm} onSortChange={setSortMetric}/>
            <BoardList sortMetric={sortMetric}/>
        </div>
    )
}


export default Home