import React, { useState, useRef } from 'react';

import './App.css';
import Song from './components/Song';
import Player from './components/Player';

import data from './data';
import Library from './components/Library';

import Nav from './components/Nav';

import "./styles/app.scss";
import { library } from '@fortawesome/fontawesome-svg-core';

function App() {
  const audioRef = useRef(null);
  // State
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });
  const [libraryStatus, setLibraryStatus] = useState(false);
  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    //Calculate Percentage
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animation = Math.round((roundedCurrent / roundedDuration) * 100);
    setSongInfo({
        ...songInfo,
        currentTime: current, 
        duration,
        animationPercentage: animation,
    })
  }; 
  const songEndHandler = async () => {
    let currentIndex = songs.findIndex(song => song.id === currentSong.id);
    await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    if (isPlaying) audioRef.current.play();
        
  }

  return (
    <div className={`App ${libraryStatus ? 'library-active' : ''}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus}/>
      <Song currentSong={currentSong}/>
      <Player songs={songs} setCurrentSong={setCurrentSong} setSongs={setSongs} audioRef={audioRef} isPlaying={isPlaying} setIsPlaying={setIsPlaying} currentSong={currentSong} setSongInfo={setSongInfo} songInfo={songInfo}/>
      <Library audioRef={audioRef} songs={songs} setCurrentSong={setCurrentSong} isPlaying={isPlaying} setSongs={setSongs} libraryStatus={libraryStatus}/>
      <audio onTimeUpdate={timeUpdateHandler} onLoadedMetadata={timeUpdateHandler} ref={audioRef} src={currentSong.audio} onEnded={songEndHandler}></audio>
    </div>
  );
}

export default App;
