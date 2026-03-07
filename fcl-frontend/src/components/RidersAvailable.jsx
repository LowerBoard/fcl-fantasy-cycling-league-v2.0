import React from 'react';
import CyclistRow from './cyclistRow';

function RidersAvailable({ridersAvailable, setRidersAvailable, setUserTeam, isRosterFull}) {
    const handleAddRider = (riderId) => {
        if(isRosterFull) {
            return;
        };

        const riderToAdd = ridersAvailable.find(r => r.id === riderId);
        if (!riderToAdd) return;

        setUserTeam(prevTeam => [...prevTeam, riderToAdd]);
        setRidersAvailable(prevRiders => prevRiders.filter(r => r.id !== riderId));

    };

  return (
    <div className='flex flex-col items-center  mt-4 mb-10'>
        <section className='flex flex-col items-center'>
            <h1 className='font-fasterone text-red-700 text-center text-3xl md:text-5xl lg:text-7xl text-shadow-lg/25' >Riders Available</h1>
            <p className='font-fasterone text-sky-700 text-xl lg-text-2xl text-center text-balance text-shadow-lg/50' >---Build your 7 Rider Squad---</p>
            <h2 className='font-fasterone text-yellow-400 text-2xl lg-text-6xl text-shadow-lg/25 mb-2.5'>Available Rider Pool</h2>
        </section>
        <section>
            <table className='table-auto border-green-700 border-4 border-separate border-spacing font-roboto text-center'>
            <thead className='bg-yellow-400 w-full'>
                <tr className='border-yellow-600 border-3'>
                    <th className='border-green-600 border-2'>
                        Rider - Country
                    </th>
                    <th className='border-green-600 border-2'>
                        Team
                    </th>
                    <th className='border-green-600 border-2'>
                        Cost
                    </th>
                    <th className='border-green-600 border-2'>
                        Add
                    </th>
                </tr>
            </thead>
            
            <tbody className='w-full bg-yellow-200'>
                {ridersAvailable.sort((a,b) => b.cost - a.cost).map(rider => (
                    <CyclistRow 
                    key={rider.id}
                    rider={rider}
                    onAction={handleAddRider}
                    actionType={isRosterFull ? 'disabled' : 'add'}
                />
                ))
                }
            </tbody>

        </table>
        </section>
    </div>
  )
}

export default RidersAvailable