import React from 'react';
import { Typography, Grid, Grow, Tooltip, Rating } from '@mui/material';
import { Link } from 'react-router-dom';
import '../global.css'

const Movie = ({ movie, i }) => {
    // const theme = useTheme();
    // console.log(movie.vote_average)
    return (
        <Grid i={i} item xs={12} sm={6} md={4} lg={3} xl={2} className="movie" >
            <Grow in key={i} timeout={(i + 1) * 250}>
                <Link className='links' to={`/movie/${movie.id}`}>
                    <img
                        src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : `https://picsum.photos/200/300`}
                        alt={movie.title}
                        className='image'
                        style={{
                            borderRadius: "20px",
                            height: "300px",
                            marginBottom: "10px",
                            transition: "transform 0.4s ease-out"
                        }}
                    />
                    <Typography color="textPrimary" variant='h6' noWrap className='title' >
                        {movie.title}
                    </Typography>
                    <Tooltip disableTouchListener title={`${movie.vote_average} / 10`}>
                        <div>
                            <Rating readOnly value={movie.vote_average / 2} precision={0.1} />
                        </div>
                    </Tooltip>
                </Link>
            </Grow>

        </Grid>

    )
}

export default Movie;