import { useState } from 'react'
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

const riderPool = [
  {id: 1, name: 'Tadej Pogacar', team: 'UAE Team Emirates', country: 'Slovenia', cost: 95, points: 99},
  {id: 2, name: 'Isaac Del Toro', team: 'UAE Team Emirates', country: 'Mexico', cost: 89, points: 93},
  {id: 3, name: 'Jonas Vingegaard', team: 'Team Visma|Lease a Bike', country: 'Denmark', cost: 88, points: 92},
  {id: 4, name: 'Joao Almeida', team: 'UAE Team Emirates', country: 'Portugal', cost: 88, points: 90},
  {id: 5, name: 'Mads Pedersen', team: 'Lidl-Trek', country: 'Denmark', cost: 86, points: 88},
  {id: 6, name: 'Remco Evenepoel', team: 'Red Bull-Bora-hansgrohe', country: 'Belgium', cost: 86, points: 84},
  {id: 7, name: 'Thomas Pidcock', team: 'Q36.5 Pro Cycling Team', country: 'Great Britain', cost: 85, points: 84},
  {id: 8, name: 'Mathieu Van Der Poel', team: 'Alpecin-Deceuninck', country: 'Netherlands', cost: 85, points: 83},
  {id: 9, name: 'Oscar Onley', team: 'Team Picnic PostNL', country: 'Great Britain', cost: 83, points: 81},
  {id: 10, name: 'Arnaud De Lie', team: 'Lotto', country: 'Belgium', cost: 50, points: 83},
  {id: 11, name: 'Paul Magnier', team: 'Soudal Quick-Step', country: 'France', cost: 81, points: 76},
  {id: 12, name: 'Juan Ayuso', team: 'Lidl-Trek', country: 'Spain', cost: 81, points: 76},
  {id: 13, name: 'Giulio Ciccone', team: 'Lidl-Trek', country: 'Italy', cost: 81, points: 74},
  {id: 14, name: 'Christian Scaroni', team: 'XDS Astana Team', country: 'Italy', cost: 79, points: 72},
  {id: 15, name: 'Brandon McNulty', team: 'UAE Team Emirates', country: 'USA', cost: 79, points: 71},
  {id: 16, name: 'Kevin Vauquelin', team: 'INEOS Grenadiers', country: 'France', cost: 79, points: 71},
  {id: 17, name: 'Tim Merlier', team: 'Soudal Quick-Step', country: 'Belgium', cost: 78, points: 71},
  {id: 18, name: 'Wout Van Aert', team: 'Team Visma|Lease a Bike', country: 'Belgium', cost: 78, points: 70},
  {id: 19, name: 'Jonathan Milan', team: 'Lidl-Trek', country: 'Italy', cost: 78, points: 69},
  {id: 20, name: 'Jasper Philipsen', team: 'Alpecin-Deceuninck', country: 'Belgium', cost: 78, points: 69},
  {id: 21, name: 'Jay Vine', team: 'UAE Team Emirates', country: 'Australia', cost: 76, points: 68},
  {id: 22, name: 'Ben Healy', team: 'EF Education-Easy Post', country: 'Ireland', cost: 76, points: 68},
  {id: 23, name: 'Florian Lipowitz', team: 'Red Bull-Bora-hansgrohe', country: 'Germany', cost: 76, points: 67},
  {id: 24, name: 'Olav Kooij', team: 'Team Visma|Lease a Bike', country: 'Netherlands', cost: 75, points: 65},
  {id: 25, name: 'Michael Storer', team: 'Tudor Pro Cycling Team', country: 'Australia', cost: 74, points: 64},
  {id: 26, name: 'Matteo Jorgenson', team: 'Team Visma|Lease a Bike', country: 'USA', cost: 74, points: 64},
  {id: 27, name: 'Felix Gall', team: 'Decathlon CMA CGM Team', country: 'Austria', cost: 72, points: 62},
  {id: 28, name: 'Romain Gregoire', team: 'Groupama-FDJ', country: 'France', cost: 72, points: 61},
  {id: 29, name: 'Mattias Skjelmose', team: 'Lidl-Trek', country: 'Denmark', cost: 72, points: 60},
  {id: 30, name: 'Matthew Brennan', team: 'Team Visma|Lease a Bike', country: 'Great Britain', cost: 72, points: 60}
]


let fauxOtherTeamPoints = [
  {id:1, teamname: 'Watt-opia Warriors', points: 589},
  {id:2, teamname: 'Pedal Boys', points: 599},
  {id:3, teamname: 'Velo Mafia', points: 601},
  {id:4, teamname: 'Chain Smokers', points: 460},
  {id:5, teamname: 'Ridin Spinners', points: 550},
]



function App() {
  const [userSignedIn, setUserSignedIn] = useState(false);
  const [ridersAvailable, setRidersAvailable] = useState(riderPool);
  const [userTeam, setUserTeam] = useState([]);
  const [userTeamName, setUserTeamName] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [userTeamPoints, setUserTeamPoints] = useState(0)

  const maxTeamSize = 7;
  const isRosterFull = userTeam.length >= maxTeamSize;


  return (
    <div className='bg-[url(./assets/pexels-krizz59-12838.jpg)] bg-cover bg-fixed'>
      <div className='sticky top-0 left-0 right-0'>
        <header>
          {userSignedIn ? <Nav setUserSignedIn={setUserSignedIn} /> : <NavNotSignedIn />}
        </header>
      </div>
      <div className='flex flex-col h-auto min-h-screen'>
        <main>
          <Routes>
            <Route path="/" element={<Login setUserSignedIn={setUserSignedIn} setUserTeamName={setUserTeamName} userTeamName={userTeamName} errorMessage={errorMessage} setErrorMessage={setErrorMessage} />} />
            <Route path="/about" element={<About />}/>
            <Route path="/dashboard" element={<Dashboard userSignedIn={userSignedIn} userTeam={userTeam} fauxOtherTeamPoints={fauxOtherTeamPoints} userTeamPoints={userTeamPoints} setUserTeamPoints={setUserTeamPoints} />} />
            <Route path="/registration" element={<Registration setUserSignedIn={setUserSignedIn} setUserTeamName={setUserTeamName} userTeamName={userTeamName} errorMessage={errorMessage} setErrorMessage={setErrorMessage} />}/>
            <Route path="/ridersavailable" element={<RidersAvailable ridersAvailable={ridersAvailable} setUserTeam={setUserTeam} setRidersAvailable={setRidersAvailable} isRosterFull={isRosterFull}/>}/>
            <Route path="/teampage" element={<TeamPage userTeam={userTeam} setUserTeam={setUserTeam} setRidersAvailable={setRidersAvailable} isRosterFull={isRosterFull} setUserTeamName={setUserTeamName} userTeamName={userTeamName}/>}/>
            <Route path="/nav" element={<Nav setUserSignedIn={setUserSignedIn} setUserTeamName={setUserTeamName} />}/>
            <Route path="/navnotsignedin" element={<NavNotSignedIn setErrorMessage={setErrorMessage} />}/>
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
