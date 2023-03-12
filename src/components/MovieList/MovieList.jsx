import React from 'react';
import { Grid } from '@mui/material';
import './styles.css';
import { Movie } from '..';


const MovieList = (props) => {
    const { results } = props.movies;
    return (
        <Grid container className='movies-container' >
            {results.map((movie, idx) => (
                <Movie key={idx} movie={movie} i={idx} />
            ))}
        </Grid>
    )
}

export default MovieList;