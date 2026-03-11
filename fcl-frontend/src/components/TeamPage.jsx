import React from 'react';
import CyclistRow from './cyclistRow';
import RosterService from '../Services/RosterService';

function TeamPage({userTeam, setUserTeam, setRidersAvailable, currentUser, currentRosterId}) {
  const handleRemoveRider = (riderId) => {
    const riderToRemove = userTeam.find(r => r.id === riderId);
    if(!riderToRemove) return;

    setUserTeam(prevTeam => prevTeam.filter(r => r.id !== riderId));
    setRidersAvailable(prevRiders => [...prevRiders, riderToRemove]);
  }

  const handleSaveRoster = async () => {
    if (!currentRosterId) {
      alert("Still loading... refresh...");
      return;
    }

    if (userTeam.length <= 0) {
      alert("You need at least 1 rider to save your roster!");
      return;
    }

    const riderIds = userTeam.map(rider => rider.id);

    try {
      await RosterService.updateRoster(currentRosterId, riderIds);
      alert("Roster Saved! Time to hammer down!");
    } catch (e) {
      console.error("Flat tire:", e);
    }
  };

  return (
    <div className='flex flex-col items-center  mt-4 mb-10'>
        <section className='flex flex-col items-center'>  
          <h1 className='font-fasterone text-red-700 text-center text-3xl lg:text-7xl text-shadow-lg/25' >{currentUser?.username}'s Squad</h1>
          <p className='font-fasterone text-sky-700 text-xl lg-text-2xl text-center text-balance text-shadow-lg/50' >----Hold Up to 7 Riders----</p>
        </section>  
        <section className='flex flex-col items-center'>
          <p className='font-fasterone text-yellow-400 text-2xl lg-text-4xl text-shadow-lg/25 mb-2.5'>Your Team</p>
        <table className='table-auto border-green-700 border-4 border-separate border-spacing font-roboto text-center'>
          <thead className='bg-yellow-400 w-full'>
            <tr className='border-yellow-600 border-3'>
                <th className='border-green-600 border-2'>
                    Rider
                </th>
                <th className='border-green-600 border-2'>
                    Pro Team
                </th>
                <th className='border-green-600 border-2'>
                    Points
                </th>
                <th className='border-green-600 border-2'>
                    Remove
                </th>
            </tr>
          </thead>
            <tbody className='w-full bg-yellow-200'>
              {userTeam.length > 0 ? (
                userTeam.map(rider => (
                  <CyclistRow
                  key={rider.id}
                  rider={rider}
                  onAction={handleRemoveRider}
                  actionType={'remove'}
                  />
                ))
              ) : (
                <tr>
                  <td>Your Team Is Empty</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                  )
              }
            </tbody>
        </table>
        {userTeam.length > 0 && (
          <button
            onClick={handleSaveRoster}
            className='mt-8 bg-red-700 text-yellow-200 font-fasterone px-10 py-3 rounded-full hover:bg-green-700 hover:scale-110 transition-all border-2 border-yellow-200 shadow-xl'
            >
            SAVE ROSTER
            </button>
        )}
        </section>
    </div>
  );
};

export default TeamPage