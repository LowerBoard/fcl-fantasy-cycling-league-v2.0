import React from 'react';
import CyclistRow from './cyclistRow';

function TeamPage({userTeam, setUserTeam, setRidersAvailable, userTeamName, setUserTeamName}) {
  const handleRemoveRider = (riderId) => {
    const riderToRemove = userTeam.find(r => r.id === riderId);
    if(!riderToRemove) return;

    setUserTeam(prevTeam => prevTeam.filter(r => r.id !== riderId));
    setRidersAvailable(prevRiders => [...prevRiders, riderToRemove]);
  }

  return (
    <div className='flex flex-col items-center  mt-4 mb-10'>
        <section className='flex flex-col items-center'>  
          <h1 className='font-fasterone text-red-700 text-center text-3xl lg:text-7xl text-shadow-lg/25' >The {userTeamName} Team Page</h1>
          <p className='font-fasterone text-sky-700 text-xl lg-text-2xl text-center text-balance text-shadow-lg/50' >----Hold Up to 7 Riders----</p>
        </section>  
        <section className='flex flex-col items-center'>
          <p className='font-fasterone text-yellow-400 text-2xl lg-text-4xl text-shadow-lg/25 mb-2.5'>Your Team</p>
        <table className='table-auto border-green-700 border-4 border-separate border-spacing font-roboto text-center'>
          <thead className='bg-yellow-400 w-full'>
            <tr className='border-yellow-600 border-3'>
                <th className='border-green-600 border-2'>
                    Rider + Country
                </th>
                <th className='border-green-600 border-2'>
                    Team
                </th>
                <th className='border-green-600 border-2'>
                    Cost
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
        </section>
    </div>
  );
};

export default TeamPage