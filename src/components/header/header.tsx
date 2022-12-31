import React, { Component } from 'react'; 
import './header.css'
import logo from './../../logo.svg';
import TextField from '@mui/material/TextField/TextField';


const Header = () => {

        return(
        <div className="header" style={{backgroundColor: '#252526' }}>    
            <div className="logo">
                <img src={logo} className="image" alt="logo" />
            </div>
            <div className="headerContent">
                <TextField className="searchBar" label="Titre,Genre,Réalisateur..." variant="outlined" />
            </div>          
        </div>
        )
    
}

export default Header;