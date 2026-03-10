import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';


function Registration({setCurrentUser, setUserSignedIn, errorMessage, setErrorMessage}) {

  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');

    try{
      const response = await api.post('/users/register', {
        username: userName,
        email: userEmail,
        password: userPassword
      });

      const newUser = response.data

      setCurrentUser(newUser);
      setUserSignedIn(true);

      alert("Welcome to the FCL Peloton" + newUser.username + "! Allez Allez Allez!");
      navigate("/dashboard");

    } catch (err) {
        console.error("Registration Failed: ", err);
        setErrorMessage("Registration failed. Email/Username may be in use!")
    } 
  };

  return (
    <div className='flex flex-col justify-center items-center'>
      <h1 className='text-center text-7xl text-red-700 text-shadow-lg/25 m-5 font-fasterone'>Join the Peloton</h1>
        <section className='bg-stone-300 border-4 border-green-700 py-2 px-3 mt-5 mb-10 mx-10 shadow-xl/50 text-green-700'>
          <p className='text-center text-3xl font-monofett'>Registration Form</p>
          <form className='flex flex-col justify-center m-2 font-roboto' onSubmit={handleSubmit}>
            <div className='m-1 flex justify-end'>
              <label>User Email:
                <input
                type='email'
                id='email'
                value={userEmail}
                className='bg-white border-green-700 border-2 rounded-md'
                onChange={(e) => setUserEmail(e.target.value)}
                required
                />
              </label>
            </div>
            <div className='m-1 flex justify-end'>
              <label>User Password:
                <input
                type='password'
                id='password'
                value={userPassword}
                className='bg-white border-green-700 border-2 rounded-md'
                onChange={(e) => setUserPassword(e.target.value)}
                required
                />
              </label>
            </div>
            <div className='m-1 flex justify-end'>
              <label>User Name:
                <input
                type='text'
                id='username'
                placeholder=''
                value={userName}
                className='bg-white border-green-700 border-2 rounded-md'
                onChange={(e) => setUserName(e.target.value)}
                />
              </label>
            </div>
            {errorMessage ? <p className='text-red-700 flex justify-center'>{errorMessage}</p> : null}
            <div className='flex justify-center items-between'>
              <button className='bg-red-700 hover:bg-red-500 text-white border-2 rounded-md px-1 m-1' type='submit'>Register</button>
            </div>
          </form>
        </section>

    </div>
  )
}

export default Registration;