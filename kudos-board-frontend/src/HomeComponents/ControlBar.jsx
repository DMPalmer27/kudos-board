import { useState } from "react";


const ControlBar = ({onSearchSubmit, onSortChange}) => {
    const [searchString, setSearchString] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearchSubmit(searchString);
    }

    return (
        <div className='control-bar'>
            <div className='search'>
                <form className='search-form' onSubmit={handleSubmit}>
                    <input
                        type='text'
                        value={searchString}
                        onChange = {(e)=>setSearchString(e.target.value)}
                        placeholder="search"
                    ></input>
                    <button type='submit'>Search</button>
                    <button type='button' onClick={()=>{
                        setSearchString("");
                        onSearchSubmit("");
                    }} >Clear</button>
                </form>
            </div>
            <div className='sort'>
                <button onClick={()=>onSortChange('all')}>All</button>
                <button onClick={()=>onSortChange('recent')}>Recent</button>
                <button onClick={()=>onSortChange('celebration')}>Celebration</button>
                <button onClick={()=>onSortChange('thanks')}>Thank You</button>
                <button onClick={()=>onSortChange('inspiration')}>Inspiration</button>
            </div>
        </div>
    )
}

export default ControlBar;