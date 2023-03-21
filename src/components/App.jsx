import React, { useRef } from 'react'
import { CssBaseline } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import { Actors, MovieInformation, Movies, NavBar, Profile } from './';
import useAlan from './Alan';
// import useStyles from './styles'
// import './styles.css';
import './global.css'

const App = () => {
    const alanBtnContainer = useRef()
    useAlan();

    return (
        <div className='root' >
            <CssBaseline />
            <NavBar />
            <main className='content'>
                <div className='toolkit' />
                <Routes>
                    <Route exact path="/movie/:id" element={<MovieInformation />} /> 
                    <Route exact path= '/' element={<Movies />} /> 
                    <Route exact path="/approved" element={<Movies />} />
                    <Route exact path="/actors/:id" element={<Actors />} /> 
                    <Route exact path="/profile/:id" element={<Profile />} /> 
                </Routes>
            </main>
            <div ref={alanBtnContainer} />
        </div>
    )
};

export default App;