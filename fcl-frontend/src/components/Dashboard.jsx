import React, { useEffect, useState } from 'react'
import LeagueService from '../Services/LeagueService';
import RosterService from '../Services/RosterService';

function Dashboard({userSignedIn, userTeam, setUserTeam, currentUser}) {

  const [leagueStandings, setLeagueStandings] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const currentLeagueId = currentUser?.userTeam?.league?.id || 1;

    if (userSignedIn) {
      LeagueService.getStandings(currentLeagueId)
      .then(data => {
        const rankedTeams = data.sort((a,b) => b.totalPoints - a.totalPoints);
        setLeagueStandings(rankedTeams);
      })
      .catch(err => {
        setErrorMessage("Unable to load standings.")
      });
    }
  }, [userSignedIn, currentUser]);

  const pointsTotal = userTeam.reduce((total, rider) => {
    return total + rider.points;
  }, 0);

 
  
  return (
    <div>
      <section className='flex flex-col items-center'>
        <h1 className='font-fasterone text-red-700 text-4xl lg:text-7xl text-shadow-lg/25'>Dashboard</h1>
        <p className='font-fasterone text-sky-700 text-2xl text-shadow-lg/50' >----a snapshot of your team and standings----</p>
        {errorMessage && <p className='text-red-500 bg-red-100 p-2 rounded'>{errorMessage}</p>}
      </section>
      <div className='flex justify-center'>
      <section className='flex flex-col items-center m-2'>
        <h2 className='font-fasterone text-yellow-400 text-3xl text-shadow-lg/25 mb-2.5'>Your Current Team</h2>
        <table className='table-auto border-green-700 border-4 border-separate border-spacing font-roboto text-center'>
          <thead className='bg-yellow-400 w-full'>
            <tr className='border-yellow-600 border-3'>
                <th className='border-green-600 border-2'>
                    Rider
                </th>
                <th className='border-green-600 border-2'>
                    Team
                </th>
                <th className='border-green-600 border-2'>
                    Points
                </th>
                <th className='border-green-600 border-2'>
                    -
                </th>
            </tr>
          </thead>
          <tbody className='w-full bg-yellow-200'>
            {userTeam.length > 0 ? (
                userTeam.map(rider => (
                  <tr key={rider.id}>
                    <td>
                      {rider.name}
                    </td>
                    <td>
                      {rider.proTeam}
                    </td> 
                    <td>
                      {rider.points}
                    </td>
                    <td className='p-2'>
                      <button
                        className='bg-red-600 text-white font-bold py-1 px-3 rounded hover:bg-red-800 transition-colors'
                        onClick={() => {
                          RosterService.dropRider(currentUser?.userTeam?.rosters?.[0]?.id, rider.id)
                          .then(() => {
                            setUserTeam(prevTeam => prevTeam.filter(r => r.id !== rider.id)) // removes the rider 
                          });
                        }}>
                        Drop
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>Your Team Is Empty</td>
                  <td></td>
                  <td></td>
                </tr>
                  )
              }
          </tbody>
          <tfoot className='w-full bg-yellow-200'>
            <tr className='font-bold'>
              <td></td>
              <td>Total Points</td>
              <td>{pointsTotal}</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </section>

      <section className='flex flex-col items-center m-2'>
        <h2 className='font-fasterone text-yellow-400 text-3xl text-shadow-lg/25 mb-2.5'>STANDINGS</h2>
        <table className='table-auto border-green-700 border-4 border-separate border-spacing font-roboto text-center'>
         <thead className='bg-yellow-400 w-full'>
            <tr className='border-yellow-600 border-3'>
                <th className='border-green-600 border-2'>
                    Rank
                </th>
                <th className='border-green-600 border-2'>
                    Team Name
                </th>
                <th className='border-green-600 border-2'>
                    Points
                </th>
            </tr>
          </thead>
          <tbody className='bg-yellow-200 w-full'>
            {leagueStandings.map((team, index) => (
              <tr key={team.id}>
                <td>{index + 1}</td>
                <td>{team.teamName}</td>
                <td>{team.totalPoints}</td>
              </tr>
            ))}
          </tbody>     
        </table>
      </section>
      </div>
        


    </div>
  )
}

export default Dashboard;