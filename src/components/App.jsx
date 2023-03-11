import React from 'react'
import { CssBaseline } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import { Actors, MovieInformation, Movies, NavBar, Profile } from './'
// import useStyles from './styles'
import './styles.css';

const App = () => {
    // const classes = useStyles();
    return (
        <div className='root' >
            <CssBaseline />
            <NavBar />
            <main className='content'>
                <div className='toolbar' />
                <Routes>
                    <Route exact path="/movie/:id" element={<MovieInformation />} /> 
                    <Route exact path="/" element={<Movies/>} /> 
                    <Route exact path="/actors/:id" element={<Actors />} /> 
                    <Route exact path="/profile/:id" element={<Profile />} /> 
                </Routes>
            </main>
        </div>
    )
};

export default App;