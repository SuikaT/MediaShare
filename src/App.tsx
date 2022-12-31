import React from 'react';
import './App.css';
import Content from './components/content/content';

import SideMenu from './components/side-menu/side-menu';

function App() {
  return (
    <div className="app">
      <div className="body">
        <div style={{ flex:1}}>
          <SideMenu />
        </div>
        <div style={{ flex:8}}>
          <Content/>
        </div>
      </div>
    </div>
  );
}

export default App;
