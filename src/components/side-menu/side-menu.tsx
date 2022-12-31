import React, { Component } from 'react'; 
import './side-menu.css';

const SideMenu = () => {

        const menuElements = ['Film', 'Series', 'Anime', 'Fichiers'];
        return(
        <div className="sideMenu flex-column" >
            <div style={{flex: 1}}/>
            <div style={{flex: 7}}>
                { menuElements.map((menuElement,index) => <p className='menuElement'>{menuElement}</p>) }
            </div>

        </div>
        )
    
}

export default SideMenu;