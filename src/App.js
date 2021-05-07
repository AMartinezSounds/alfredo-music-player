import React, { useState } from 'react';

import './App.css';
import Song from './components/Song';
import Player from './components/Player';

import data from './util';
import Library from './components/Library';


import "./styles/app.scss";

function App() {
  // State
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <div className="App">
      <Song currentSong={currentSong}/>
      <Player isPlaying={isPlaying} setIsPlaying={setIsPlaying} currentSong={currentSong}/>
      <Library songs={songs}/>
    </div>
  );
}

export default App;
