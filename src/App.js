import Axios from 'axios';
import React, {useState, useEffect} from "react";
import './App.css';

function App() {
  
  const [genreName, setGenreName] =  useState('');
  const [songName, setSongName] =  useState('');
  const [srutiQueriedSong, setSrutiQueriedSong] =  useState([]);
  const [rishinQueriedSong, setRishinQueriedSong] =  useState([]);

  const findSongSrutiQuery = () => {
  Axios
    .post('https://around-the-world-musically.uc.r.appspot.com/api/findSongNameSrutiQuery', {songName: songName})
    .then(res => {
      console.log(res.data)
      setSrutiQueriedSong([
        ...srutiQueriedSong,
        {songName: songName, song_rec: res.data}
      ]);
    }).catch(err => console.log(err));
  };

  const findSongRishinQuery = () => {
  Axios
    .post('https://around-the-world-musically.uc.r.appspot.com/api/findSongNameRishinQuery', {songName: songName})
    .then(res => {
      console.log(res.data)
      setRishinQueriedSong([
        ...rishinQueriedSong,
        {songName: songName, song_rec: res.data}
      ]);
    }).catch(err => console.log(err));
  };
 
  return (

    <div className="App">
      <h1>Around the World MUSICALLY</h1>
      <h2>Discover music by searching for your favorite song, and we we'll return some diverse new songs that match your preferences.</h2>


    <div className="Input_Div">
    <label id="Song_Input_Label"> Song Name: </label>

    <input type="text" name="songName" onChange={(e) => {
      setSongName(e.target.value)
    } }/>

    <br></br>
    <br></br>

    <button id = "Submit_Artist_Name" onClick={findSongSrutiQuery} title="Finds you a recommendation based on songs with a similar hype level to your input"> Hype me up!</button>

    <button id = "Query" onClick={findSongRishinQuery} title="Calculates a compatibility score based on your song's valence and danceability level and returns songs with the closest match"> Find me a perfect fit</button>


    {srutiQueriedSong.map((val) => {
      return (
        <div className = "card">
          <h1> Songs based on "{val.songName}": </h1>
          { val.song_rec.map(song_rec => <h2> { song_rec.Song_name } </h2> ) }
          <button onClick={() => {setSrutiQueriedSong(srutiQueriedSong.filter((value, i, arr) => {return value !== val} ))} }>Delete Query</button>
        </div>
      );
    })}

    {rishinQueriedSong.map((val) => {
      return (
        <div className = "card">
          <h1> Songs based on "{val.songName}": </h1>
          { val.song_rec.map(song_rec => <h2> { song_rec.Song_name } </h2> ) }
          <button onClick={() => {setRishinQueriedSong(rishinQueriedSong.filter((value, i, arr) => {return value !== val} ))} }>Delete Query</button>
        </div>
      );
    })}

    </div>

    <div className="Input_Div">
    <label id="Genre_Label"> Genre: </label>

    <input type="text" name="artistName"/>

    <br></br>
    <br></br>

    <button id="Submit_Artist_Name"> Insert</button>
    </div>
  </div>
  );
}

export default App;