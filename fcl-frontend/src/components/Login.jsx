import React from 'react';
import { useState } from 'react';
import { Navigate, useNavigate, Link } from 'react-router-dom';

function Login({setUserSignedIn, setUserTeamName, userTeamName, setErrorMessage, errorMessage}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrorMessage('');

        if (email === 'chris@chris.com' && password === '123') {
            setUserSignedIn(true);
            setUserTeamName('Back Of The Pack Cycling');
            navigate("/dashboard");
            } else {
            setErrorMessage(`Invalid Login!`);
            }
    };

    const goToRegistration = () => {
        setErrorMessage('')
        navigate('/registration');
    };

  return (
    <div className='flex flex-col justify-center items-center'>
        <h1 className='text-center text-7xl text-red-700 text-shadow-lg/25 m-5 font-fasterone'>Welcome - Join the Peloton</h1>
        
        <section className='bg-stone-300 border-4 border-green-700 py-2 px-3 mt-5 mb-10 mx-10 shadow-xl/50 text-green-700'>
            <p className='text-center text-3xl font-monofett'>Login / Click and Register</p>
            <form className='flex flex-col justify-center m-2 font-roboto' onSubmit={handleSubmit}>
                <div className='m-1 flex justify-center'>
                    <label>Email:
                    <input
                        type='email'
                        id='email'
                        value={email}
                        className='bg-white border-green-700 border-2 rounded-md'
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    </label>
                </div>
                <div className='m-1 flex justify-center'>
                    <label>Password:
                    <input
                        type='password'
                        id='password'
                        value={password}
                        className='bg-white border-green-700 border-2 rounded-md'
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    </label>
                </div>
                {errorMessage ? <p className='text-red-700 flex justify-center'>{errorMessage}</p> : null}
                <div className='flex justify-center items-between'>
                    <button type='submit' className='bg-yellow-300 hover:bg-yellow-100 text-black border-2 rounded-md px-1 m-1'>Log In</button>
                    <button type='button' onClick={goToRegistration} className='bg-red-700 hover:bg-red-500 text-white border-2 rounded-md px-1 m-1'>Register</button>
                </div>
            </form>
        </section>

    </div>
  );
};

export default Login;