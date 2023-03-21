import React from 'react'
import { Box, Typography, Card, CardContent, CardMedia } from '@mui/material'
import '../global.css';
import { Link } from 'react-router-dom';

const FeaturedMovie = ({ movie }) => {
    if (!movie) return null;

    return (
        <Box component={Link} to={`/movie/${movie.id}`} className='featured--movie--container' >
            <Card className='featured--movie--card'  >
                <CardMedia
                    media='picture'
                    alt={movie.title}
                    image={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
                    title={movie.title}
                    className='featured--movie--cardmedia'
                />
                <Box padding='20px'>
                    <CardContent className='featured--movie--cardcontent'>
                        <Typography variant='h5' gutterBottom>{movie.title}</Typography>
                        <Typography variant='body2'>{movie.overview}</Typography>
                    </CardContent>
                </Box>

            </Card>

        </Box>
    )
}

export default FeaturedMovie