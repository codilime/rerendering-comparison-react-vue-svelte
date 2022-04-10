import React from 'react';
import { HashRouter, Link, Route, Routes } from 'react-router-dom';
import 'common/css/styles.css';
import { GameBoardUseState } from '../game-board-use-state/GameBoardUseState';
import { GameBoardMobX } from '../game-board-mobx/GameBoardMobX';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/use-state" element={<GameBoardUseState/>}/>
          <Route path="/mobx" element={<GameBoardMobX/>}/>

          <Route path="/*" element={<ul>
            <li><Link to="/use-state">useState</Link></li>
            <li><Link to="/mobx">MobX</Link></li>
          </ul>}/>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
