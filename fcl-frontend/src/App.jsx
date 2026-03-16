import { useEffect, useState } from 'react'
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Registration from './components/Registration';
import TeamPage from './components/TeamPage';
import Nav from './components/Nav';
import Dashboard from './components/Dashboard';
import About from './components/About';
import './App.css'
import './components/Nav.css'
import NavNotSignedIn from './components/NavNotSignedIn';
import RidersAvailable from './components/RidersAvailable';
import RiderService from './Services/RiderService';
import RosterService from './Services/RosterService';
import StravaFeed from './components/StravaFeed';

const fauxOtherTeamPoints = [];

function App() {
  const [userSignedIn, setUserSignedIn] = useState(false);
  const [ridersAvailable, setRidersAvailable] = useState([]);
  const [userTeam, setUserTeam] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [userTeamPoints, setUserTeamPoints] = useState(0)
  const [selectedRaceId, setSelectedRaceId] = useState(1);
  const [loading, setLoading] = useState(true);
  const [currentRosterId, setCurrentRosterId] = useState(null);

useEffect(() => {
  setLoading(true);
  RiderService.getRidersByRace(selectedRaceId)
    .then(response => {
      setRidersAvailable(response.data);
      setLoading(false);
    })
    .catch(err => {
      setRidersAvailable([]);
      setLoading(false);
    });
}, [selectedRaceId]);

useEffect(() => {
  if (userSignedIn && currentUser?.userTeam?.id) {
    RosterService.getOrCreateRoster(currentUser.userTeam.id, selectedRaceId)
    .then(rosterData => {

      setCurrentRosterId(rosterData.id);
      if (rosterData.riders && rosterData.riders.length > 0) {
        setUserTeam(rosterData.riders);

        setRidersAvailable(prevRiders =>
          prevRiders.filter(ar => !rosterData.riders.some(rr => rr.id === ar.id)) // ar=available riders rr=rosterriders
        );
      } else {
        setUserTeam([]);
      }
    })
    .catch(err => {"..."});
  }
}, [userSignedIn, selectedRaceId, currentUser]);

  const maxTeamSize = 7;
  const isRosterFull = userTeam.length >= maxTeamSize;


  return (
    <div className='bg-[url(./assets/pexels-krizz59-12838.jpg)] bg-cover bg-fixed'>
      <div className='sticky top-0 left-0 right-0'>
        <header>
          {userSignedIn && currentUser ? (<Nav setUserSignedIn={setUserSignedIn} currentUser={currentUser} setCurrentUser={setCurrentUser} setUserTeam={setUserTeam} setCurrentRosterId={setCurrentRosterId} />) : (<NavNotSignedIn setErrorMessage={setErrorMessage} />)}
        </header>
      </div>
      <div className='flex flex-col h-auto min-h-screen'>
        <main>
          <Routes>
            <Route path="/" element={<Login setUserSignedIn={setUserSignedIn} setCurrentUser={setCurrentUser} errorMessage={errorMessage} setErrorMessage={setErrorMessage} />} />
            <Route path="/about" element={<About />}/>
            <Route path="/dashboard" element={<Dashboard userSignedIn={userSignedIn} userTeam={userTeam} setUserTeam={setUserTeam} userTeamPoints={userTeamPoints} setUserTeamPoints={setUserTeamPoints} currentUser={currentUser} />} />
            <Route path="/registration" element={<Registration setUserSignedIn={setUserSignedIn} setCurrentUser={setCurrentUser} errorMessage={errorMessage} setErrorMessage={setErrorMessage} />}/>
            <Route path="/ridersavailable" element={<RidersAvailable ridersAvailable={ridersAvailable} setUserTeam={setUserTeam} setRidersAvailable={setRidersAvailable} isRosterFull={isRosterFull} currentRosterId={currentRosterId} />}/>
            <Route path="/teampage" element={<TeamPage userTeam={userTeam} setUserTeam={setUserTeam} setRidersAvailable={setRidersAvailable} isRosterFull={isRosterFull} setCurrentUser={setCurrentUser} currentUser={currentUser} currentRosterId={currentRosterId} />}/>
            <Route path="/strava" element={<StravaFeed currentUser={currentUser} />} />
          </Routes>
        </main>
      </div>
      <div className='fixed bottom-0 left-0 right-0'>
        <footer className='bg-gray-400 text-center font-fasterone '>
          <p>Copyright © {new Date().getFullYear()} - All rights reserved by FCL Co.</p>
        </footer>
      </div>
      
    </div>
  );
};

export default App;
