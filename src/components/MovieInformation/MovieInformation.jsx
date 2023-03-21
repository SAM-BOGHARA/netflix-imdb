import React, { useState, useEffect } from 'react';
import { Modal, Typography, Button, ButtonGroup, Grid, Box, CircularProgress, useMediaQuery, Rating } from '@mui/material';
import { Movie as MovieIcon, Theaters, Language, PlusOne, Favorite, FavoriteBorderOutlined, Remove, ArrowBackIcon, ArrowBack } from '@mui/icons-material'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useGetListQuery, useGetMovieQuery, useGetRecommendationsQuery } from '../../services/TMDB';
import '../global.css';
import genreIcons from '../../assets/assets/genres'
import { useDispatch, useSelector } from 'react-redux';
import { selectGenreOrCategory } from '../../features/createGenreOrCategory';
import { MovieList } from "..";
import { userSelector } from '../../features/auth';
import { useTheme } from '@mui/material';

const MovieInformation = () => {
  const theme = useTheme();
  const { user } = useSelector(userSelector);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [open, setopen] = useState(false);
  const { data, isFetching, error } = useGetMovieQuery(id);
  const { data: recommendations, isFetching: isRecommendationsFetching, error: isErrorInRecommendations } = useGetRecommendationsQuery({ list: `/recommendations`, movie_id: id })
  const { data: favoriteMovies } = useGetListQuery({ listName: 'favorite/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page: 1 })
  const { data: watchlistMovies } = useGetListQuery({ listName: 'watchlist/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page: 1 })
  const [isMovieFavorited, setisMovieFavorited] = useState(false)
  const [isMovieWatchlisted, setisMovieWatchlisted] = useState(false)


  useEffect(() => {
    setisMovieFavorited(!!favoriteMovies?.results?.find((movie) => movie?.id === data?.id))
  }, [favoriteMovies, data]);


  useEffect(() => {
    setisMovieWatchlisted(!!watchlistMovies?.results?.find((movie) => movie?.id === data?.id))
  }, [watchlistMovies, data]);

  // https://api.themoviedb.org/3/account/12689766/favorite/movies?api_key=39c8b7879c058f7b1551bf4f266ae699&session_id=2904a56cb4537ef7dfdd710072bafaf8bb71a9f5&language=en-US&sort_by=created_at.asc&page=1




  const addToFavorites = async () => {
    // console.log(id,isMovieFavorited)
    await axios.post(`https://api.themoviedb.org/3/account/${user.id}/favorite?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${localStorage.getItem('session_id')}`, {
      media_type: 'movie',
      media_id: id,
      favorite: !isMovieFavorited
    })

    setisMovieFavorited((prev) => !prev)
  }

  const addToWatchlist = async () => {
    await axios.post(`https://api.themoviedb.org/3/account/${user.id}/watchlist?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${localStorage.getItem('session_id')}`, {
      media_type: 'movie',
      media_id: id,
      watchlist: !isMovieWatchlisted,

    })
    setisMovieWatchlisted((prev) => !prev)
  }




  // console.log(data)
  console.log(recommendations)

  if (isFetching || isRecommendationsFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="4rem" />
      </Box>
    )
  }

  if (error || isErrorInRecommendations) {
    return (
      <Box display="flex" justifyContent="center">
        <Link to="/">Something has gone wrong go back</Link>
      </Box>
    )
  }


  return (
    <Grid container className="movieinfo--container--spacearound">
      <Grid item sm={12} lg={4} style={{ display: 'flex', marginBottom: '30px' }}>
        <img className='movieinfo--poster' src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`} alt={data?.title} />
      </Grid>

      <Grid item container direction="column" lg={7} >
        <Typography variant="h3" align="center" gutterBottom>
          {data?.title}({(data.release_date.split('-')[0])})
        </Typography>
        <Typography variant="h5" align="center" gutterBottom>
          {data?.tagline}
        </Typography>
        <Grid className='movieinfo--container--spacearound' >
          <Box display="flex" align="center">
            <Rating readOnly value={data.vote_average / 2} />
            <Typography variant='subtitle1' gutterBottom style={{ marginLeft: "10px" }} >
              {data?.vote_average} / 10
            </Typography>
          </Box>
          <Typography variant="h6" align='center' gutterBottom>
            {data?.runtime}min | Language : {data?.spoken_languages[0]?.name}
          </Typography>
        </Grid>
        <Grid item className='movieinfo--genres--container'>
          {data?.genres?.map((genre, i) => (
            <Link key={genre.name} className='movieinfo--links' to="/" onClick={() => dispatch(selectGenreOrCategory(genre.id))}>
              <img className='movieinfo--genre-image' src={genreIcons[genre.name.toLowerCase()]} alt=""
                style={{ filter: theme.palette.mode === 'dark' && 'invert(1)' }} />

              <Typography color="textPrimary" variant='subtitle1' >
                {genre?.name}
              </Typography>
            </Link>
          ))}
        </Grid>
        <Typography variant='h5' gutterBottom style={{ marginTop: "10px" }}>
          Overview
        </Typography>
        <Typography style={{ marginBottom: "2rem" }}>
          {data?.overview}
        </Typography>
        <Typography variant='h5' gutterBottom>Top Cast</Typography>
        <Grid item container spacing={2}>
          {data && data.credits?.cast?.map((character, i) => (
            character.profile_path &&
            <Grid key={i} item xs={4} md={2} component={Link} to={`/actors/${character.id}`} style={{ textDecoration: 'none' }}>
              <img className='movieinfo--cast--image' src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`} alt={`${character.name}`} />
              <Typography color="textPrimary">{character?.name}</Typography>
              <Typography color="textSecondary">{character.character.split('/')[0]}</Typography>
            </Grid>
          )).slice(0, 6)}
        </Grid>

        <Grid item container style={{ marginTop: '2rem' }}>
          <div className="movieinfo--button--container">
            <Grid item xs={12} sm={6}>
              <ButtonGroup size='medium' variant='outlined' >
                <Button target='_blank' rel='noopener noreferrer' href={data?.homepage} endIcon={<Language />}>
                  Website
                </Button>
                <Button target='_blank' rel='noopener noreferrer' href={`https://www.imdb.com/title/${data?.imdb_id}`} endIcon={<Language />}>
                  IMDB
                </Button>
                <Button onClick={() => setopen(true)} href="#" endIcon={<Theaters />} >Trailer</Button>
              </ButtonGroup>
            </Grid>

            <Grid item xs={12} sm={6}>
              <ButtonGroup size='medium' variant='outlined' >
                <Button onClick={addToFavorites} endIcon={isMovieFavorited ? <FavoriteBorderOutlined /> : <Favorite />}>
                  {isMovieFavorited ? 'Unfavorite' : 'Favorite'}
                </Button>
                <Button onClick={addToWatchlist} endIcon={isMovieWatchlisted ? <Remove /> : <PlusOne />}>
                  {isMovieWatchlisted ? 'Remove' : 'Watchlist'}
                </Button>
                <Button endIcon={<ArrowBack />} sx={{ borderColor: 'primary.main' }}   >
                  BACK
                </Button>
              </ButtonGroup>
            </Grid>
          </div>
        </Grid>
      </Grid>



      <Box marginTop='5rem' width='100%'>
        <Typography variant='h3' color="textPrimary" gutterBottom align='center' >
          You might also like
        </Typography>
        {recommendations
          ? <MovieList key={id} movies={recommendations} numberOfMovies={recommendations.results.length < 12 ? recommendations.results.length : 12}></MovieList>
          : <Box>Sorry, nothing was found!</Box>
        }
      </Box>
        {console.log(id)}
      {console.log(data.videos.results[0].key)}
      <Modal closeAfterTransition className='movieinfo--modal' open={open} onClose={() => { setopen(false) }}
      >

        {data?.videos?.results?.length > 0 && (
          <iframe autoPlay className='movieinfo--video' src={`https://www.youtube.com/embed/${data.videos.results[0].key}`} frameborder="0" title='trailer' allow='autoplay' />
        )}
      </Modal>


    </Grid>
  )
}

export default MovieInformation;