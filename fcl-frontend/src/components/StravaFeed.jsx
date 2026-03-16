import React, { useEffect, useState } from 'react'   
import StravaService from '../Services/StravaService';

function StravaFeed() {
    const [rides, setRides] = useState([]);

    useEffect(() => {
        StravaService.getRecentActivities()
        .then(response => {
            setRides(response.data);
        })
        .catch(error => {
            setErrorMessage("Error loading recent activities: Token Likely Expired")
        });
    }, []);

  return (
    <div className='p-10'>
        <h1 className='font-fasterone text-red-700 text-5xl mb-6'>Strava Feed</h1>
        <ul>
            {rides.map(ride => (
                <li key={ride.id} className='bg-white border-2 border-black p-4 mb-4 rounded'>
                    <h3 className='text-2xl font-bold'>{ride.name}</h3>
                    <p>Distance: {(ride.distance * 0.000621371).toFixed(1)} miles</p>
                    <p>Date: {new Date(ride.start_date_local).toLocaleDateString()}</p>
                </li>
            ))}
        </ul>
    </div>
  );
}

export default StravaFeed