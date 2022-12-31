import React from 'react'; 

const Media = (props: any) => {
   
    return(         
    <div>
        <div style= {{ height:'40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{props.media}</div>
    </div>
    )
    
}

export default Media;