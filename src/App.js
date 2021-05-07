import React, { useState, useRef } from 'react';

import './App.css';
import Song from './components/Song';
import Player from './components/Player';

import data from './util';
import Library from './components/Library';


import "./styles/app.scss";

function App() {
  const audioRef = useRef(null);
  // State
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });
  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({
        ...songInfo,
        currentTime: current, 
        duration: duration
    })
  }; 

  return (
    <div className="App">
      <Song currentSong={currentSong}/>
      <Player audioRef={audioRef} isPlaying={isPlaying} setIsPlaying={setIsPlaying} currentSong={currentSong} setSongInfo={setSongInfo} songInfo={songInfo}/>
      <Library audioRef={audioRef} songs={songs} setCurrentSong={setCurrentSong} isPlaying={isPlaying}/>
      <audio onTimeUpdate={timeUpdateHandler} onLoadedMetadata={timeUpdateHandler} ref={audioRef} src={currentSong.audio}></audio>
    </div>
  );
}

export default App;
