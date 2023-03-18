import React from 'react';
import { Grid } from '@mui/material';
// import './styles.css';
import { Movie } from '..';
import '../global.css'

const MovieList = (props) => {
    const { results } = props.movies;
    const noOfMovies = props.numberOfMovies;
    return (
        <Grid container className='movies-container' >
            {results.slice(0, noOfMovies).map((movie, idx) => (
                <Movie key={idx} movie={movie} i={idx} />
            ))}
        </Grid>
    )
}

export default MovieList;