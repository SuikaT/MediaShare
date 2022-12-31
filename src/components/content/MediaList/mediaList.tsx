import React from 'react'; 
import Media from './Media/media';

const MediaList = () => {
    const listElement = ['Thor','Black Widow', 'Armagedon', 'Avatar', 'Avengers', 'Joyeux Noël'];
    

    return(                  
        <div className='content'>
            {listElement.map(e => <Media media={e} />)}         
        </div>
    )
    
}

export default MediaList;