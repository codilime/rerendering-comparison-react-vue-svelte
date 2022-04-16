import React, { FunctionComponent, PropsWithChildren } from 'react';
import { HashRouter, Link, Route, Routes } from 'react-router-dom';
import 'common/css/styles.css';
import { GameBoardUseState } from '../game-board-use-state/GameBoardUseState';
import { GameBoardMobX } from '../game-board-mobx/GameBoardMobX';

export const App = () => {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/use-state"
                 element={<WithDocumentTitle title="useState">
                   <section>
                     <h1>React <span className="version">18.0.0</span> / useState</h1>
                     <GameBoardUseState/>
                   </section>
                 </WithDocumentTitle>}/>
          <Route path="/mobx" element={<WithDocumentTitle title="MobX">
            <section>
              <h1>React <span className="version">18.0.0</span> / MobX</h1>
              <GameBoardMobX/>
            </section>
          </WithDocumentTitle>}/>

          <Route path="/*" element={<ul>
            <li><Link to="/use-state">useState</Link></li>
            <li><Link to="/mobx">MobX</Link></li>
          </ul>}/>
        </Routes>
      </HashRouter>
    </div>
  );
}

const WithDocumentTitle: FunctionComponent<PropsWithChildren<{ title: string }>> = ({ title, children }) => {
  document.title = title;
  return <>{children}</>;
}