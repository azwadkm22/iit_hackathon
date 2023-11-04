import logo from './logo.svg';
import './App.css';
import BaseMap from './components/BaseMap';
import RankingsPage from './pages/RankingsPage';
import WhatW from './components/WhatW';
import What from './components/What';
import PrimarySearchAppBar from './components/PrimarySearchAppBar';
// import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";


function App() {
  return (
    <div className="App">

      {/* <RankingsPage /> */}
      
      <div>
      <PrimarySearchAppBar />
        <BaseMap />
      </div>
      


      {/* <Router>
      <Link to="/">Home</Link> */}
      {/* <Link to="/about">About</Link> */}
        {/* <Routes>
            <Route path="/" element={<BaseMap />} />
            <Route path="/rankings" element={<RankingsPage />} />
        </Routes>
      </Router> */}


      {/* <WhatW /> */}
      {/* <WhatW /> */}
      {/* <header className="App-header"> */}
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      {/* </header> */}
    </div>
  );
}

export default App;
