import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CircularProgress, Box, Button, Typography, Grid } from '@mui/material';
import { useGetActorDetailsQuery, useGetMoviesByActorIdQuery } from '../../services/TMDB';
import { ArrowBack } from '@mui/icons-material';
import {MovieList, Pagination} from '..'
import '../global.css'


const Actors = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [page, setPage] = useState(1)
    const { data, isFetching, error } = useGetActorDetailsQuery(id);
    const { data : actorMovies, isFetching: isFetchingActorMovies, error : isErrorInActorMovies} = useGetMoviesByActorIdQuery({ id, page });
    // console.log(data)
    if (isFetching) {
        return (
            <Box display="flex" justifyContent="center">
                <CircularProgress size="4rem" />
            </Box>
        )
    }

    if (error) {
        return (
            <Box display="flex" justifyContent="center">
                <Button startIcon={<ArrowBack />} onClick={() => navigate('/')} color='primary' >Go Back</Button>
            </Box>
        )
    }

    return (

        <>
            {/* <div>Actor--{id}</div> */}
            <Grid container spacing={3} >
                <Grid item lg={5} xl={4} style={{display: 'flex'}} >
                    <img loading="lazy"  className='actorpage--image' src={`https://image.tmdb.org/t/p/w780/${data?.profile_path}`} alt={data?.name} />
                </Grid>

                <Grid item lg={7} xl={8} style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column'
                }}>
                    <Typography variant='h2' gutterBottom>
                        {data?.name}
                    </Typography>
                    <Typography variant='h5' gutterBottom>
                        Born : {new Date(data?.birthday).toDateString()}
                    </Typography>

                    <Typography variant='body1' align="justify" paragraph>
                        {data?.biography || `Sorry, no biography yet for ${data?.name}`}
                    </Typography>

                    <Box marginTop='2rem' display='flex' justifyContent='space-around'>
                        <Button variant='contained' color='primary' target='_blank' href={`https://www.imdb.com/name/${data?.imdb_id}`} >
                            IMDB
                        </Button>
                        <Button startIcon={<ArrowBack />} onClick={() => navigate('/')}>
                            Back
                        </Button>
                    </Box>
                </Grid>
            </Grid>


            <Box margin='2rem 0'>
                <Typography variant='h2' gutterBottom align='center' >
                Movies
                </Typography>
                {actorMovies
                    &&
                    <MovieList movies={actorMovies} numberOfMovies={12}></MovieList>
                }

                <Pagination currentPage={page} setPage={setPage} totalPages={actorMovies?.total_pages}  />
            </Box>

            
        </>
    )
}

export default Actors;