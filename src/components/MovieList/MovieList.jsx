import React from 'react';
import { Grid } from '@mui/material';
// import './styles.css';
import { Movie } from '..';
import '../global.css'

const MovieList = ({ movies, numberOfMovies, excludeFirst }) => {

    const results = movies.results;
    // const noOfMovies = numberOfMovies;
    const noOfMovies = Math.min(numberOfMovies, results.length);
    const startFrom = excludeFirst ? 1 : 0

    return (
        <Grid container className='movies-container' >
            {results.slice(startFrom, noOfMovies).map((movie, idx) => (
                <Movie key={movie.title} movie={movie} i={idx} />
            ))}
        </Grid>
    )
}

export default MovieList;