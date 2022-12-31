import React, { Component } from 'react'; 
import './footer.css';

const Footer = () => {

        return(
        <div className="footer color">
            <div className="flex-row">
            <div style={{flex: 40}}></div>
            <div  style={{flex: 20}} className="flex-row space"> 
                <p style={{color: 'white'}}>2022 - 2023</p>
                <p style={{color: 'white'}}>Mentions légales</p>
                <p style={{color: 'white'}}>Contact</p>
            </div>
            <div style={{flex: 40}}></div>
            </div>
        </div>
        )
    
}

export default Footer;